import { NextResponse } from "next/server";
import { requireAdmin, supabaseAdmin } from "@/lib/supabaseAdmin";
import { getPlanBySkuLimit, isPlanKey, subscriptionPlans } from "@/lib/subscriptionPlans";
import type { PlanKey } from "@/lib/subscriptionPlans";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin.ok) {
    return NextResponse.json({ ok: false, message: admin.message }, { status: admin.status });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, message: "Admin service unavailable." }, { status: 503 });
  }

  const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200
  });

  if (usersError) {
    return NextResponse.json({ ok: false, message: usersError.message }, { status: 500 });
  }

  const { data: subscriptions, error: subscriptionError } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id,email,plan,sku_limit,status,payment_note,created_at,updated_at");

  if (subscriptionError) {
    return NextResponse.json({ ok: false, message: subscriptionError.message }, { status: 500 });
  }

  const subscriptionMap = new Map((subscriptions || []).map((item) => [item.user_id, item]));
  const users = usersData.users.map((user) => {
    const subscription = subscriptionMap.get(user.id);
    return {
      id: user.id,
      email: user.email || subscription?.email || "",
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at,
      subscription: subscription || {
        user_id: user.id,
        email: user.email || null,
        plan: "Free",
        sku_limit: subscriptionPlans.Free.skuLimit,
        status: "active",
        payment_note: null
      }
    };
  });

  return NextResponse.json({ ok: true, users });
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);

  if (!admin.ok) {
    return NextResponse.json({ ok: false, message: admin.message }, { status: admin.status });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, message: "Admin service unavailable." }, { status: 503 });
  }

  const body = (await request.json()) as {
    userId?: string;
    email?: string;
    plan?: PlanKey;
    skuLimit?: number;
    status?: "active" | "paused";
    paymentNote?: string;
  };

  const email = body.email?.trim().toLowerCase();
  let userId = body.userId;

  if (!userId && email) {
    const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 200
    });

    if (usersError) {
      return NextResponse.json({ ok: false, message: usersError.message }, { status: 500 });
    }

    const existingUser = usersData.users.find((user) => user.email?.toLowerCase() === email);

    if (existingUser) {
      userId = existingUser.id;
    } else {
      const { data: createdUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true
      });

      if (createError || !createdUser.user) {
        return NextResponse.json({ ok: false, message: createError?.message || "Unable to create customer." }, { status: 500 });
      }

      userId = createdUser.user.id;
    }
  }

  if (!userId) {
    return NextResponse.json({ ok: false, message: "Missing user id or customer email." }, { status: 400 });
  }

  const plan = isPlanKey(body.plan) ? body.plan : getPlanBySkuLimit(body.skuLimit || subscriptionPlans.Free.skuLimit);
  const skuLimit = body.skuLimit || subscriptionPlans[plan].skuLimit;

  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .upsert({
      user_id: userId,
      email: email || body.email || null,
      plan,
      sku_limit: skuLimit,
      status: body.status || "active",
      payment_note: body.paymentNote || null
    })
    .select("user_id,email,plan,sku_limit,status,payment_note,created_at,updated_at")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, subscription: data });
}
