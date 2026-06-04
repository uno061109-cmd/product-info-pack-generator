"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

type Lead = {
  name: string;
  contact: string;
  company: string;
  plan: string;
  skuCount: string;
  message: string;
  createdAt: string;
};

const LEADS_KEY = "liucai-product-pack-leads-v1";

export default function ContactPage() {
  const [lead, setLead] = useState<Lead>({
    name: "",
    contact: "",
    company: "",
    plan: "免费试用",
    skuCount: "",
    message: "",
    createdAt: ""
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");

    if (plan) {
      setLead((current) => ({ ...current, plan }));
    }
  }, []);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextLead = { ...lead, createdAt: new Date().toISOString() };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextLead)
      });

      if (!response.ok) {
        throw new Error("Lead API is not configured.");
      }

      setStatus("已提交。我们会尽快联系你。");
    } catch {
      const existing = JSON.parse(window.localStorage.getItem(LEADS_KEY) || "[]") as Lead[];
      window.localStorage.setItem(LEADS_KEY, JSON.stringify([nextLead, ...existing]));
      setStatus("已在当前浏览器保存留资。商业部署时可配置 LEAD_WEBHOOK_URL，把线索发送到飞书、企业微信或自动化工具。");
    }

    setLead({
      name: "",
      contact: "",
      company: "",
      plan: lead.plan,
      skuCount: "",
      message: "",
      createdAt: ""
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">咨询 Contact</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">想先整理一批 SKU？</h1>
          <p className="mt-4 leading-7 text-slate-600">
            留下联系方式、SKU 数量和主要品类。第一阶段最适合用代整理服务验证客户是否愿意付费。
          </p>
          <div className="mt-6 rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="font-semibold text-ink">商业部署说明</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              设置环境变量 <code className="rounded bg-mist px-1">LEAD_WEBHOOK_URL</code> 后，线索会发送到你的 Webhook。
              没有配置时，表单会在当前浏览器本地保存，适合演示。
            </p>
          </div>
        </div>

        <form onSubmit={submitLead} className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="姓名 / 称呼">
              <input required value={lead.name} onChange={(event) => setLead({ ...lead, name: event.currentTarget.value })} className="input" />
            </Field>
            <Field label="联系方式">
              <input required value={lead.contact} onChange={(event) => setLead({ ...lead, contact: event.currentTarget.value })} placeholder="微信 / 手机 / 邮箱" className="input" />
            </Field>
            <Field label="店铺 / 公司">
              <input value={lead.company} onChange={(event) => setLead({ ...lead, company: event.currentTarget.value })} className="input" />
            </Field>
            <Field label="感兴趣方案">
              <select value={lead.plan} onChange={(event) => setLead({ ...lead, plan: event.currentTarget.value })} className="input">
                <option>免费试用</option>
                <option>基础版</option>
                <option>专业版</option>
                <option>SKU资料代整理</option>
              </select>
            </Field>
            <Field label="大概 SKU 数量">
              <input value={lead.skuCount} onChange={(event) => setLead({ ...lead, skuCount: event.currentTarget.value })} placeholder="例如：20 / 50 / 100+" className="input" />
            </Field>
          </div>
          <Field label="主要品类和需求">
            <textarea
              value={lead.message}
              onChange={(event) => setLead({ ...lead, message: event.currentTarget.value })}
              placeholder="例如：饰品 50 个 SKU，需要英文 listing、包装文案和 QR 产品页。"
              className="input min-h-32"
            />
          </Field>
          <button type="submit" className="mt-5 rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft">
            提交咨询
          </button>
          {status && <p className="mt-4 rounded-md bg-mist px-3 py-2 text-sm leading-6 text-slate-700">{status}</p>}
        </form>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}
