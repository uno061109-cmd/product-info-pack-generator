"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type AuthMode = "register" | "login";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus("你已登录，可以继续创建 SKU 资料包。");
      }
    });
  }, []);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setStatus("");
    setConfirmPassword("");
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password.length < 6) {
      setStatus("密码至少需要 6 位。");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("两次输入的密码不一致。");
      return;
    }

    setLoading(true);
    setStatus("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const payload = await response.json();

    if (!response.ok) {
      setLoading(false);
      setStatus(payload.message || "注册失败，请稍后再试。");
      return;
    }

    await signInWithPassword();
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await signInWithPassword();
  }

  async function signInWithPassword() {
    if (!supabase) {
      setLoading(false);
      setStatus("账户服务尚未配置，请稍后再试。");
      return;
    }

    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setStatus("登录失败，请检查邮箱和密码。");
      return;
    }

    window.location.href = "/account";
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-slate-500">账户</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">登录留材库，管理你的 SKU 资料包</h1>
          <p className="mt-4 leading-7 text-slate-600">
            使用邮箱和密码注册，不再需要点击邮件链接。注册后可免费体验 3 个 SKU，付费后由管理员开通更多额度。
          </p>
          <div className="mt-6 grid gap-3">
            {["注册后立即进入账户页", "免费创建 3 个 SKU 资料包", "付费套餐开通后继续生成更多资料"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm">
                {item}
              </div>
            ))}
          </div>
          {!isSupabaseConfigured() && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              当前账户服务还未配置，需要先在部署平台添加 Supabase 环境变量。
            </div>
          )}
        </div>

        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-mist p-1">
            {[
              ["register", "注册账号"],
              ["login", "登录账号"]
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key as AuthMode)}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  mode === key ? "bg-white text-ink shadow-sm" : "text-slate-600 hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={mode === "register" ? register : login} className="mt-6 grid gap-4">
            <label>
              <span className="text-sm font-semibold text-ink">邮箱</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                placeholder="you@example.com"
                className="input mt-2"
              />
            </label>
            <label>
              <span className="text-sm font-semibold text-ink">密码</span>
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                placeholder="至少 6 位"
                className="input mt-2"
              />
            </label>
            {mode === "register" && (
              <label>
                <span className="text-sm font-semibold text-ink">确认密码</span>
                <input
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                  placeholder="再输入一次密码"
                  className="input mt-2"
                />
              </label>
            )}
            <button disabled={loading} type="submit" className="rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft disabled:opacity-60">
              {mode === "register" ? "注册并进入账户" : "登录账户"}
            </button>
          </form>

          {status && <p className="mt-5 rounded-md bg-mist px-3 py-2 text-sm leading-6 text-slate-700">{status}</p>}
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/pricing" className="text-ink underline">
              查看套餐
            </Link>
            <Link href="/contact" className="text-ink underline">
              联系开通
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
