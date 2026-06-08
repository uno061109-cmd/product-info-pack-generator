import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { subscriptionPlans } from "@/lib/subscriptionPlans";

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ ok: false, message: "账户服务暂未配置。" }, { status: 503 });
  }

  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };
  const email = body.email?.trim().toLowerCase();
  const password = body.password || "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, message: "请填写有效邮箱。" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ ok: false, message: "密码至少需要 6 位。" }, { status: 400 });
  }

  const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 200
  });

  if (usersError) {
    return NextResponse.json({ ok: false, message: usersError.message }, { status: 500 });
  }

  const existingUser = usersData.users.find((user) => user.email?.toLowerCase() === email);

  if (existingUser) {
    return NextResponse.json({ ok: false, message: "这个邮箱已经注册，请直接登录。" }, { status: 409 });
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (error || !data.user) {
    return NextResponse.json({ ok: false, message: error?.message || "注册失败，请稍后再试。" }, { status: 500 });
  }

  await supabaseAdmin.from("subscriptions").upsert({
    user_id: data.user.id,
    email,
    plan: "Free",
    sku_limit: subscriptionPlans.Free.skuLimit,
    status: "active",
    payment_note: null
  });

  return NextResponse.json({ ok: true });
}
