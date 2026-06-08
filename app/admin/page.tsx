"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { subscriptionPlans } from "@/lib/subscriptionPlans";
import type { PlanKey, SubscriptionRecord } from "@/lib/subscriptionPlans";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at?: string;
  subscription: SubscriptionRecord;
};

const planOrder: PlanKey[] = ["Free", "Starter", "Growth", "Bulk"];

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [paymentNotes, setPaymentNotes] = useState<Record<string, string>>({});
  const [newCustomerEmail, setNewCustomerEmail] = useState("");
  const [newCustomerPlan, setNewCustomerPlan] = useState<PlanKey>("Starter");
  const [newCustomerNote, setNewCustomerNote] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function getAccessToken() {
    const { data } = await supabase!.auth.getSession();
    return data.session?.access_token;
  }

  async function loadUsers() {
    setLoading(true);
    setMessage("");

    if (!supabase) {
      setLoading(false);
      setMessage("登录服务尚未配置。");
      return;
    }

    const token = await getAccessToken();

    if (!token) {
      setLoading(false);
      setMessage("请先使用管理员邮箱登录。");
      return;
    }

    const response = await fetch("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const payload = await response.json();

    setLoading(false);

    if (!response.ok) {
      setMessage(payload.message || "无法读取用户列表。请确认当前邮箱是否在 ADMIN_EMAILS 中。");
      return;
    }

    setUsers(payload.users || []);
  }

  async function updateSubscription(user: AdminUser, plan: PlanKey, status: "active" | "paused" = "active") {
    if (!supabase) {
      return;
    }

    const token = await getAccessToken();

    if (!token) {
      setMessage("请先登录管理员账号。");
      return;
    }

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
        plan,
        skuLimit: subscriptionPlans[plan].skuLimit,
        status,
        paymentNote: paymentNotes[user.id] || user.subscription.payment_note || ""
      })
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "开通失败。");
      return;
    }

    setMessage(`已为 ${user.email || user.id} 开通 ${plan}。`);
    await loadUsers();
  }

  async function createOrOpenCustomer() {
    if (!supabase) {
      return;
    }

    if (!newCustomerEmail.trim()) {
      setMessage("请先填写客户邮箱。");
      return;
    }

    const token = await getAccessToken();

    if (!token) {
      setMessage("请先登录管理员账号。");
      return;
    }

    const response = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: newCustomerEmail,
        plan: newCustomerPlan,
        skuLimit: subscriptionPlans[newCustomerPlan].skuLimit,
        status: "active",
        paymentNote: newCustomerNote
      })
    });
    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.message || "创建或开通客户失败。");
      return;
    }

    setMessage(`已为 ${newCustomerEmail} 开通 ${newCustomerPlan}。客户可用这个邮箱和密码登录。`);
    setNewCustomerEmail("");
    setNewCustomerNote("");
    await loadUsers();
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
          <h1 className="text-3xl font-bold">管理员后台尚未配置</h1>
          <p className="mt-3 leading-7">请先配置 Supabase 和 ADMIN_EMAILS，然后用管理员邮箱登录。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">管理员</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">用户套餐管理</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            客户加微信确认后，你可以在这里输入客户邮箱并开通套餐；客户用同一个邮箱登录后，就能看到对应 SKU 额度。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink">
            管理员登录
          </Link>
          <button onClick={loadUsers} className="rounded-lg bg-ink px-4 py-2.5 font-semibold text-white shadow-soft">
            刷新列表
          </button>
        </div>
      </section>

      {message && <p className="mb-5 rounded-md bg-mist px-4 py-3 text-sm leading-6 text-slate-700">{message}</p>}
      {loading ? <p className="text-slate-600">正在读取用户列表...</p> : null}

      <section className="mb-7 rounded-lg border border-line bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_180px_1fr_auto] lg:items-end">
          <label className="block">
            <span className="text-sm font-semibold text-ink">客户邮箱</span>
            <input
              type="email"
              value={newCustomerEmail}
              onChange={(event) => setNewCustomerEmail(event.currentTarget.value)}
              placeholder="customer@example.com"
              className="input mt-2"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">开通套餐</span>
            <select value={newCustomerPlan} onChange={(event) => setNewCustomerPlan(event.currentTarget.value as PlanKey)} className="input mt-2">
              {planOrder
                .filter((plan) => plan !== "Free")
                .map((plan) => (
                  <option key={plan} value={plan}>
                    {plan} / {subscriptionPlans[plan].skuLimit} SKU
                  </option>
                ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-ink">付款备注</span>
            <input
              value={newCustomerNote}
              onChange={(event) => setNewCustomerNote(event.currentTarget.value)}
              placeholder="例如：微信确认 Growth ¥359"
              className="input mt-2"
            />
          </label>
          <button onClick={createOrOpenCustomer} className="rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft">
            创建并开通
          </button>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          如果客户已经登录过，会直接更新他的套餐；如果还没登录，会先按邮箱创建客户账号，再开通套餐额度。
        </p>
      </section>

      <section className="grid gap-5">
        {users.map((user) => (
          <article key={user.id} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-[1fr_220px_1.2fr] lg:items-start">
              <div>
                <h2 className="text-xl font-semibold text-ink">{user.email || "No email"}</h2>
                <p className="mt-2 break-all text-xs text-slate-500">{user.id}</p>
                <p className="mt-3 text-sm text-slate-600">注册时间：{new Date(user.created_at).toLocaleString()}</p>
                <p className="mt-1 text-sm text-slate-600">
                  最近登录：{user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "暂无"}
                </p>
              </div>

              <div className="rounded-lg border border-line bg-mist p-4">
                <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">当前套餐</p>
                <p className="mt-2 text-2xl font-bold text-ink">{user.subscription.plan}</p>
                <p className="mt-2 text-sm text-slate-600">{user.subscription.sku_limit} SKU 额度</p>
                <p className="mt-1 text-sm text-slate-600">状态：{user.subscription.status}</p>
              </div>

              <div>
                <label className="block">
                  <span className="text-sm font-semibold text-ink">付款备注 / 开通说明</span>
                  <input
                    value={paymentNotes[user.id] ?? user.subscription.payment_note ?? ""}
                    onChange={(event) => setPaymentNotes((current) => ({ ...current, [user.id]: event.currentTarget.value }))}
                    placeholder="例如：微信 Growth ¥359，6月4日确认"
                    className="input mt-2"
                  />
                </label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {planOrder.map((plan) => (
                    <button
                      key={plan}
                      type="button"
                      onClick={() => updateSubscription(user, plan)}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                        user.subscription.plan === plan ? "bg-ink text-white" : "border border-line bg-white text-ink hover:bg-mist"
                      }`}
                    >
                      开通 {plan}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => updateSubscription(user, user.subscription.plan, "paused")}
                    className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist"
                  >
                    暂停
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {!loading && users.length === 0 && (
          <section className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">暂无登录用户</h2>
            <p className="mt-3 text-slate-600">客户注册或登录后，会出现在这里。</p>
          </section>
        )}
      </section>
    </main>
  );
}
