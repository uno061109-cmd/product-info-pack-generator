"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

type Lead = {
  name: string;
  contact: string;
  platform: string;
  category: string;
  skuCount: string;
  trialSku: string;
  plan: string;
  message: string;
  createdAt: string;
};

const LEADS_KEY = "liucai-product-pack-leads-v1";

export default function ContactPage() {
  const [lead, setLead] = useState<Lead>({
    name: "",
    contact: "",
    platform: "Amazon",
    category: "",
    skuCount: "",
    trialSku: "需要免费试做 1 个 SKU",
    plan: "免费试做 1 个 SKU",
    message: "",
    createdAt: ""
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");

    if (plan) {
      setLead((current) => ({ ...current, plan, trialSku: plan.includes("免费") ? "需要免费试做 1 个 SKU" : current.trialSku }));
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
        throw new Error("Lead delivery unavailable.");
      }
    } catch {
      const existing = JSON.parse(window.localStorage.getItem(LEADS_KEY) || "[]") as Lead[];
      window.localStorage.setItem(LEADS_KEY, JSON.stringify([nextLead, ...existing]));
    }

    setStatus("已提交需求。我们会在 24 小时内联系你，确认 SKU 数量、品类和资料整理需求。");
    setLead({
      name: "",
      contact: "",
      platform: "Amazon",
      category: "",
      skuCount: "",
      trialSku: "需要免费试做 1 个 SKU",
      plan: lead.plan,
      message: "",
      createdAt: ""
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">咨询 Contact</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">提交需求，预约试做</h1>
          <p className="mt-4 leading-7 text-slate-600">
            告诉我们你的店铺平台、商品品类和预计 SKU 数量。提交后，我们会在 24 小时内联系你，确认 SKU 数量、品类和资料整理需求。
          </p>
          <div className="mt-6 rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="font-semibold text-ink">你可以先准备这些资料</p>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
              {["商品名称和 SKU", "商品图片或链接", "材质、尺寸、重量、颜色", "包装内容和包装材料", "护理说明、安全提醒、目标平台"].map((item) => (
                <li key={item} className="rounded-md bg-mist px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5 rounded-lg border border-line bg-mist p-5">
            <p className="font-semibold text-ink">交付内容</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              英文 Listing、产品信息卡、包装说明、安全提醒、QR 产品信息页、可打印 PDF、Missing Information List 和 Basic Risk Checklist。
            </p>
          </div>
        </div>

        <form onSubmit={submitLead} className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="姓名 / 称呼">
              <input required value={lead.name} onChange={(event) => setLead({ ...lead, name: event.currentTarget.value })} className="input" />
            </Field>
            <Field label="微信或邮箱">
              <input required value={lead.contact} onChange={(event) => setLead({ ...lead, contact: event.currentTarget.value })} placeholder="微信号 / 邮箱" className="input" />
            </Field>
            <Field label="店铺平台">
              <select value={lead.platform} onChange={(event) => setLead({ ...lead, platform: event.currentTarget.value })} className="input">
                <option>Amazon</option>
                <option>Etsy</option>
                <option>Shopify</option>
                <option>TikTok Shop</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="商品品类">
              <input value={lead.category} onChange={(event) => setLead({ ...lead, category: event.currentTarget.value })} placeholder="例如：饰品 / 手机配件 / 小家居" className="input" />
            </Field>
            <Field label="预计 SKU 数量">
              <input value={lead.skuCount} onChange={(event) => setLead({ ...lead, skuCount: event.currentTarget.value })} placeholder="例如：1 / 20 / 50 / 100+" className="input" />
            </Field>
            <Field label="是否需要免费试做 1 个 SKU">
              <select value={lead.trialSku} onChange={(event) => setLead({ ...lead, trialSku: event.currentTarget.value })} className="input">
                <option>需要免费试做 1 个 SKU</option>
                <option>已有批量需求，想直接咨询套餐</option>
              </select>
            </Field>
            <Field label="感兴趣套餐">
              <select value={lead.plan} onChange={(event) => setLead({ ...lead, plan: event.currentTarget.value })} className="input">
                <option>免费试做 1 个 SKU</option>
                <option>Starter 20 个 SKU</option>
                <option>Growth 50 个 SKU</option>
                <option>Bulk 100 个 SKU</option>
                <option>预约工具版</option>
              </select>
            </Field>
          </div>
          <Field label="备注">
            <textarea
              value={lead.message}
              onChange={(event) => setLead({ ...lead, message: event.currentTarget.value })}
              placeholder="例如：饰品 50 个 SKU，需要英文 Listing、包装说明和可打印资料包。"
              className="input min-h-32"
            />
          </Field>
          <button type="submit" className="mt-5 rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft">
            提交需求，预约试做
          </button>
          {status && <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm leading-6 text-emerald-700">{status}</p>}
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
