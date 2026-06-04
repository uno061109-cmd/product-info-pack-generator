"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

type AuthMode = "register" | "code" | "password";

const modes: Array<{ key: AuthMode; label: string; description: string }> = [
  { key: "register", label: "注册", description: "新用户用邮箱数字验证码注册，并设置密码。" },
  { key: "code", label: "验证码登录", description: "已有账号可直接输入邮箱数字验证码登录。" },
  { key: "password", label: "密码登录", description: "注册并设置密码后，可直接用邮箱和密码登录。" }
];

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
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

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
    setCode("");
    setCodeSent(false);
    setStatus("");
  }

  async function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("登录服务尚未配置。请先配置 Supabase 环境变量。");
      return;
    }

    if (mode === "register" && password.length < 6) {
      setStatus("请设置至少 6 位密码。");
      return;
    }

    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: mode === "register"
      }
    });

    setLoading(false);

    if (error) {
      setStatus(`验证码发送失败：${error.message}`);
      return;
    }

    setCodeSent(true);
    setStatus("数字验证码已发送到邮箱。请复制邮件里的 6 位数字，注册链接可以忽略。");
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
      token: code.trim(),
      type: "email"
    });

    if (error) {
      setLoading(false);
      setStatus(`验证码错误或已过期：${error.message}`);
      return;
    }

    if (mode === "register" && password) {
      const { error: passwordError } = await supabase.auth.updateUser({ password });

      if (passwordError) {
        setLoading(false);
        setStatus(`密码设置失败：${passwordError.message}`);
        return;
      }
    }

    setLoading(false);
    window.location.href = "/account";
  }

  async function signInWithPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setStatus("登录服务尚未配置。请先配置 Supabase 环境变量。");
      return;
    }

    setLoading(true);
    setStatus("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setStatus(`密码登录失败：${error.message}`);
      return;
    }

    window.location.href = "/account";
  }

  const activeMode = modes.find((item) => item.key === mode) || modes[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">账户 Account</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">数字验证码注册 / 登录</h1>
          <p className="mt-4 leading-7 text-slate-600">
            新用户先用邮箱数字验证码完成注册，并设置密码。已有账号可以用验证码登录，也可以用邮箱和密码登录。
          </p>
          <div className="mt-6 rounded-lg border border-line bg-mist p-5">
            <p className="font-semibold text-ink">国内访问更稳定</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              不需要点击邮件里的注册链接，只需要复制 6 位数字验证码填入页面。手机号、微信和 QQ 登录需要额外服务商和开放平台资质，当前先用邮箱完成商业验证。
            </p>
          </div>
          {!isSupabaseConfigured() && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-800">
              当前登录服务还未配置。需要在 Vercel 添加 NEXT_PUBLIC_SUPABASE_URL、NEXT_PUBLIC_SUPABASE_ANON_KEY、SUPABASE_SERVICE_ROLE_KEY 和 ADMIN_EMAILS。
            </div>
          )}
        </div>

        <div className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="grid grid-cols-3 gap-2 rounded-lg bg-mist p-1">
            {modes.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => switchMode(item.key)}
                className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                  mode === item.key ? "bg-white text-ink shadow-sm" : "text-slate-600 hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-md border border-line bg-mist px-4 py-3 text-sm leading-6 text-slate-600">
            <strong className="text-ink">{activeMode.label}：</strong>
            {activeMode.description}
          </div>

          {mode === "password" ? (
            <form onSubmit={signInWithPassword} className="mt-6 grid gap-4">
              <EmailField email={email} setEmail={setEmail} />
              <PasswordField password={password} setPassword={setPassword} label="密码" />
              <button disabled={loading} type="submit" className="rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft disabled:opacity-60">
                密码登录
              </button>
            </form>
          ) : (
            <>
              <form onSubmit={sendCode} className="mt-6 grid gap-4">
                <EmailField email={email} setEmail={setEmail} />
                {mode === "register" && <PasswordField password={password} setPassword={setPassword} label="设置密码" />}
                <button disabled={loading} type="submit" className="rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft disabled:opacity-60">
                  {mode === "register" ? "发送注册验证码" : "发送登录验证码"}
                </button>
              </form>

              <form onSubmit={verifyCode} className="mt-6 grid gap-4 border-t border-line pt-6">
                <label>
                  <span className="text-sm font-semibold text-ink">6 位数字验证码</span>
                  <input
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={code}
                    onChange={(event) => setCode(event.currentTarget.value)}
                    placeholder="请输入邮箱里的 6 位数字"
                    className="input mt-2"
                  />
                </label>
                <button disabled={loading || !code || !codeSent} type="submit" className="rounded-lg border border-line bg-white px-5 py-3 font-semibold text-ink disabled:opacity-60">
                  {mode === "register" ? "完成注册并登录" : "使用验证码登录"}
                </button>
              </form>
            </>
          )}

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

function EmailField({ email, setEmail }: { email: string; setEmail: (value: string) => void }) {
  return (
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
  );
}

function PasswordField({
  password,
  setPassword,
  label
}: {
  password: string;
  setPassword: (value: string) => void;
  label: string;
}) {
  return (
    <label>
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        required
        type="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value)}
        placeholder="至少 6 位"
        className="input mt-2"
      />
    </label>
  );
}
