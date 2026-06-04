"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { analyzeMissingInfo } from "@/lib/generatePack";
import { getProducts } from "@/lib/productStorage";
import { ProductInput } from "@/lib/productTypes";

export default function DashboardPage() {
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProducts(getProducts());
    setLoaded(true);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">控制台 Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">产品资料包生成器</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            管理 SKU 记录、资料完整度、公开产品页和可打印产品资料包。
          </p>
        </div>
        <Link
          href="/create"
          className="focus-ring rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft transition hover:bg-slate-800"
        >
          创建新的产品资料包
        </Link>
      </div>

      {loaded && products.length === 0 ? (
        <section className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <img
            src="/images/dashboard-preview.svg"
            alt="Empty dashboard preview"
            className="mx-auto mb-8 w-full max-w-xl rounded-lg border border-line bg-mist"
          />
          <h2 className="text-2xl font-semibold text-ink">还没有 SKU 资料包</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            先从一个商品开始。第一版会把 SKU 数据保存在当前浏览器 localStorage 中。
          </p>
          <Link
            href="/create"
            className="focus-ring mt-7 inline-flex rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-slate-800"
          >
            创建新的产品资料包
          </Link>
        </section>
      ) : (
        <section className="grid gap-5 lg:grid-cols-2">
          {products.map((product) => (
            <SkuCard key={product.sku} product={product} />
          ))}
        </section>
      )}
    </div>
  );
}

function SkuCard({ product }: { product: ProductInput }) {
  const analysis = analyzeMissingInfo(product);
  const encodedSku = encodeURIComponent(product.sku);
  const statusLabel = {
    Draft: "草稿 Draft",
    "Missing Info": "缺信息 Missing Info",
    Ready: "可生成 Ready"
  }[analysis.status];

  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-ink">{product.productName || "Untitled Product"}</h2>
          <p className="mt-2 text-sm text-slate-500">
            {product.sku} · {product.category} · {product.targetMarket}
          </p>
        </div>
        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
            analysis.status === "Ready"
              ? "bg-emerald-50 text-emerald-700"
              : analysis.status === "Draft"
                ? "bg-slate-100 text-slate-600"
                : "bg-amber-50 text-amber-700"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-600">完成度 Completion</span>
          <span className="font-semibold text-ink">{analysis.completionPercentage}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-ink" style={{ width: `${Math.max(8, analysis.completionPercentage)}%` }} />
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Link href={`/create?sku=${encodedSku}`} className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold text-ink transition hover:bg-mist">
          编辑
        </Link>
        <Link href={`/pack/${encodedSku}`} className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold text-ink transition hover:bg-mist">
          生成资料包
        </Link>
        <Link href={`/product/${encodedSku}`} className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold text-ink transition hover:bg-mist">
          公开产品页
        </Link>
        <Link href={`/print/${encodedSku}`} className="rounded-lg border border-line px-3 py-2 text-center text-sm font-semibold text-ink transition hover:bg-mist">
          打印 / PDF
        </Link>
      </div>
    </article>
  );
}
