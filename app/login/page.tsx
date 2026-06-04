"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus("你已经登录，可以进入账户页或管理员后台。");
      }
    });
  }, []);

  async function sendLoginCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("登录服务尚未配置。请先配置 Supabase 环境变量。");
      return;
    }

    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/account`
      }
    });

    setLoading(false);

    if (error) {
      setStatus(`发送失败：${error.message}`);
      return;
    }

    setStatus("已发送登录邮件。请查看邮箱里的验证码或登录链接。");
  }

  async function verifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("登录服务尚未配置。请先配置 Supabase 环境变量。");
      return;
    }

    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: "email"
    });

    setLoading(false);

    if (error) {
      setStatus(`验证码错误或已过期：${error.message}`);
      return;
    }

    window.location.href = "/account";
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">登录 Login</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">邮箱验证码登录</h1>
          <p className="mt-4 leading-7 text-slate-600">
            客户登录后可以查看自己的套餐额度。管理员邮箱登录后，可以进入后台给指定客户开通 Starter、Growth 或 Bulk。
          </p>
          <div className="mt-6 rounded-lg border border-line bg-mist p-5">
            <p className="font-semibold text-ink">手机号 / 微信 / QQ 登录</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              这些方式需要短信服务商或微信、QQ 开放平台资质。当前先使用邮箱验证码登录，更适合快速确认账号和开通额度。
            </p>
          </div>
          {!isSupabaseConfigured() && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              当前登录服务还未配置。需要在 Vercel 添加 NEXT_PUBLIC_SUPABASE_URL、NEXT_PUBLIC_SUPABASE_ANON_KEY、SUPABASE_SERVICE_ROLE_KEY 和 ADMIN_EMAILS。
            </div>
          )}
        </div>

        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <form onSubmit={sendLoginCode} className="grid gap-4">
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
            <button disabled={loading} type="submit" className="rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft disabled:opacity-60">
              发送验证码 / 登录链接
            </button>
          </form>

          <form onSubmit={verifyCode} className="mt-6 grid gap-4 border-t border-line pt-6">
            <label>
              <span className="text-sm font-semibold text-ink">邮箱验证码</span>
              <input
                value={code}
                onChange={(event) => setCode(event.currentTarget.value)}
                placeholder="如果邮件里有 6 位验证码，请填这里"
                className="input mt-2"
              />
            </label>
            <button disabled={loading || !code} type="submit" className="rounded-lg border border-line bg-white px-5 py-3 font-semibold text-ink disabled:opacity-60">
              使用验证码登录
            </button>
          </form>

          {status && <p className="mt-5 rounded-md bg-mist px-3 py-2 text-sm leading-6 text-slate-700">{status}</p>}
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/account" className="text-ink underline">
              进入账户页
            </Link>
            <Link href="/admin" className="text-ink underline">
              管理员后台
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
