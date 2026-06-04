"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { analyzeMissingInfo } from "@/lib/generatePack";
import { getProducts } from "@/lib/productStorage";
import { categoryLetters, categoryMetadata, ProductInput } from "@/lib/productTypes";

export default function DashboardPage() {
  const [products, setProducts] = useState<ProductInput[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    setProducts(getProducts());
    setLoaded(true);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const meta = categoryMetadata.find((item) => item.value === product.category);
      const analysis = analyzeMissingInfo(product);
      const haystack = [
        product.productName,
        product.sku,
        product.category,
        meta?.zh,
        product.targetMarket,
        product.materials,
        product.brandName,
        product.sellerName
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesLetter = letter === "All" || meta?.letter === letter;
      const matchesStatus = status === "All" || analysis.status === status;

      return matchesQuery && matchesLetter && matchesStatus;
    });
  }, [letter, products, query, status]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">控制台 Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">留材库 Product Pack</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            管理试做和已整理的 SKU 资料包，查看资料完整度、公开产品页和可打印 PDF。
          </p>
        </div>
        <Link
          href="/create"
          className="focus-ring rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft transition hover:bg-slate-800"
        >
          创建第一个 SKU
        </Link>
      </div>

      {loaded && products.length > 0 && (
        <section className="mb-6 rounded-lg border border-line bg-white p-5 shadow-sm">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
            <label>
              <span className="text-sm font-semibold text-ink">搜索 SKU / 商品 / 类目</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="例如：耳环 / SAMPLE / pet / kitchen"
                className="focus-ring mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink shadow-sm placeholder:text-slate-400"
              />
            </label>
            <div>
              <p className="text-sm font-semibold text-ink">类目首字母</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["All", ...categoryLetters].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLetter(item)}
                    className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                      letter === item ? "border-ink bg-ink text-white" : "border-line bg-white text-slate-700 hover:bg-mist"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">状态筛选</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  ["All", "全部"],
                  ["Draft", "草稿"],
                  ["Missing Info", "缺信息"],
                  ["Ready", "可生成"]
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setStatus(value)}
                    className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                      status === value ? "border-ink bg-ink text-white" : "border-line bg-white text-slate-700 hover:bg-mist"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {loaded && products.length === 0 ? (
        <section className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <img
            src="/images/dashboard-preview.svg"
            alt="Empty dashboard preview"
            className="mx-auto mb-8 w-full max-w-xl rounded-lg border border-line bg-mist"
          />
          <h2 className="text-2xl font-semibold text-ink">还没有创建商品资料包</h2>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            先创建一个 SKU，体验完整 Product Info Pack 流程。
          </p>
          <Link
            href="/create"
            className="focus-ring mt-7 inline-flex rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-slate-800"
          >
            创建第一个 SKU
          </Link>
        </section>
      ) : (
        <section className="grid gap-5 lg:grid-cols-2">
          {filteredProducts.map((product) => (
            <SkuCard key={product.sku} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="rounded-lg border border-line bg-white p-8 text-center shadow-sm lg:col-span-2">
              <h2 className="text-2xl font-semibold text-ink">没有符合条件的商品资料包</h2>
              <p className="mt-3 text-slate-600">换一个关键词、类目首字母或状态筛选试试。</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function SkuCard({ product }: { product: ProductInput }) {
  const analysis = analyzeMissingInfo(product);
  const encodedSku = encodeURIComponent(product.sku);
  const meta = categoryMetadata.find((item) => item.value === product.category);
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
            {product.sku} · {meta?.zh || product.category} · {product.targetMarket}
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
