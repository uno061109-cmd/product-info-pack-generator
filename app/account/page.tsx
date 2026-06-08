"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/productStorage";
import { subscriptionPlans } from "@/lib/subscriptionPlans";
import type { SubscriptionRecord } from "@/lib/subscriptionPlans";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type AccountUser = {
  id: string;
  email?: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [localSkuCount, setLocalSkuCount] = useState(0);

  useEffect(() => {
    setLocalSkuCount(getProducts().length);

    async function loadAccount() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const sessionUser = sessionData.session?.user;

      if (!sessionUser) {
        setLoading(false);
        return;
      }

      setUser({ id: sessionUser.id, email: sessionUser.email || undefined });

      const { data } = await supabase
        .from("subscriptions")
        .select("user_id,email,plan,sku_limit,status,payment_note,created_at,updated_at")
        .eq("user_id", sessionUser.id)
        .maybeSingle();

      if (data) {
        setSubscription(data as SubscriptionRecord);
      } else {
        setSubscription({
          user_id: sessionUser.id,
          email: sessionUser.email || null,
          plan: "Free",
          sku_limit: subscriptionPlans.Free.skuLimit,
          status: "active",
          payment_note: null
        });
      }

      setLoading(false);
    }

    loadAccount();
  }, []);

  async function signOut() {
    await supabase?.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return <main className="mx-auto max-w-5xl px-4 py-12 text-slate-600">正在读取账户信息...</main>;
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <h1 className="text-3xl font-bold">登录服务尚未配置</h1>
          <p className="mt-3 leading-7">配置 Supabase 环境变量后，账户页会显示登录用户的套餐和 SKU 额度。</p>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-line bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-ink">请先登录</h1>
          <p className="mt-3 leading-7 text-slate-600">登录后可以查看套餐额度，并继续创建 Product Info Pack。</p>
          <Link href="/login" className="mt-6 inline-flex rounded-lg bg-ink px-5 py-3 font-semibold text-white">
            去登录
          </Link>
        </section>
      </main>
    );
  }

  const skuLimit = subscription?.sku_limit || subscriptionPlans.Free.skuLimit;
  const plan = subscription?.plan || "Free";

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">账户</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">我的套餐额度</h1>
          <p className="mt-3 text-slate-600">{user.email}</p>
        </div>
        <button onClick={signOut} className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink">
          退出登录
        </button>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">当前套餐</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">{plan}</h2>
          <p className="mt-2 text-slate-600">{subscription?.status === "paused" ? "已暂停" : "可使用"}</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">SKU 额度</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">{skuLimit}</h2>
          <p className="mt-2 text-slate-600">管理员开通后会显示新的额度。</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">已创建</p>
          <h2 className="mt-3 text-3xl font-bold text-ink">{localSkuCount}</h2>
          <p className="mt-2 text-slate-600">当前浏览器里的 SKU 资料包数量。</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-line bg-mist p-6">
        <h2 className="text-2xl font-bold text-ink">继续创建 Product Info Pack</h2>
        <p className="mt-3 leading-7 text-slate-600">
          免费用户可创建 3 个 SKU。付款后由管理员确认并开通 Starter、Growth 或 Bulk 额度。
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link href="/create" className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft">
            创建 SKU
          </Link>
          <Link href="/checkout?plan=Growth" className="rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink">
            升级并加微信开通
          </Link>
          <Link href="/pricing" className="rounded-lg border border-line bg-mist px-5 py-3 text-center font-semibold text-ink">
            查看套餐
          </Link>
        </div>
      </section>
    </main>
  );
}
