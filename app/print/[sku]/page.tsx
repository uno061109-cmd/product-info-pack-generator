"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { generatePack, productPackDisclaimer } from "@/lib/generatePack";
import { getProductBySku, getPublicProductUrl } from "@/lib/productStorage";
import { ProductInput } from "@/lib/productTypes";

export default function PrintPackPage({ params }: { params: { sku: string } }) {
  const [product, setProduct] = useState<ProductInput | null>();
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    const nextProduct = getProductBySku(params.sku);
    setProduct(nextProduct);

    if (nextProduct) {
      setProductUrl(getPublicProductUrl(nextProduct.sku));
    }
  }, [params.sku]);

  if (product === undefined) {
    return <main className="mx-auto max-w-5xl px-4 py-10">Loading printable pack...</main>;
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <section className="rounded-lg border border-line bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-ink">未找到商品 Product not found</h1>
          <p className="mt-3 leading-7 text-slate-600">这个 SKU 当前不在本浏览器中。This SKU is not available in this browser.</p>
          <Link href="/dashboard" className="mt-6 inline-flex rounded-lg bg-ink px-5 py-3 font-semibold text-white">
            打开控制台
          </Link>
        </section>
      </main>
    );
  }

  const pack = generatePack(product);
  const missingItems = [...pack.missingInfo.missingFields, ...pack.missingInfo.recommendations];

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="no-print mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href={`/pack/${encodeURIComponent(product.sku)}`} className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink transition hover:bg-mist">
          返回资料包
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="focus-ring rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-slate-800"
        >
          打印 / 保存 PDF
        </button>
      </div>

      <article className="print-surface rounded-lg border border-line bg-white p-6 shadow-sm sm:p-10">
        <header className="border-b border-line pb-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">可打印产品资料包 Printable Product Info Pack</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">{product.productName}</h1>
          <p className="mt-3 text-slate-600">
            {product.sku} · {product.category} · {product.targetMarket}
          </p>
        </header>

        <PrintSection title="英文商品 Listing English Product Listing">
          <h3 className="text-xl font-semibold text-ink">{pack.listing.title}</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {pack.listing.bulletPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="mt-4 leading-7 text-slate-700">{pack.listing.description}</p>
        </PrintSection>

        <PrintSection title="产品信息卡 Product Information Card">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              {pack.informationCard.map((row) => (
                <tr key={row.label} className="border-b border-line">
                  <th className="w-52 bg-mist px-3 py-2 font-semibold text-ink">{row.label}</th>
                  <td className="px-3 py-2 leading-6 text-slate-700">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </PrintSection>

        <PrintSection title="包装标签文案 Packaging Label Text">
          <ul className="list-disc space-y-2 pl-5 text-slate-700">
            {pack.packagingLabelText.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </PrintSection>

        <PrintSection title="QR 产品页 QR Product Page">
          {/* TODO: Install qrcode.react and replace this link block with a generated QR code after dependency changes are approved. */}
          <div className="rounded-md border border-line bg-mist p-4">
            <p className="font-semibold text-ink">Product page link</p>
            <p className="mt-2 break-all text-sm leading-6 text-slate-700">{productUrl || `/product/${product.sku}`}</p>
          </div>
        </PrintSection>

        <PrintSection title="基础风险检查 Basic Risk Checklist">
          <div className="grid gap-2">
            {pack.riskChecklist.map((item) => (
              <div key={item.label} className="grid gap-2 rounded-md border border-line p-3 sm:grid-cols-[220px_90px_1fr]">
                <p className="font-semibold text-ink">{item.label}</p>
                <p className="text-slate-700">{item.value}</p>
                <p className="text-sm leading-6 text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-800">
            本清单仅用于资料整理辅助，不构成法律合规认证。This checklist is for documentation support only and is not legal compliance certification.
          </p>
        </PrintSection>

        <PrintSection title="缺失信息列表 Missing Information List">
          {missingItems.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              {missingItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-emerald-700">当前规则没有发现缺失信息。No missing information detected by the current rules.</p>
          )}
        </PrintSection>

        <PrintSection title="免责声明 Disclaimer">
          <p className="mb-3 leading-7 text-slate-700">本工具仅用于商品资料整理和上架准备，不构成法律建议、合规认证或官方 Digital Product Passport 认证。</p>
          <p className="leading-7 text-slate-700">{productPackDisclaimer}</p>
        </PrintSection>
      </article>
    </main>
  );
}

function PrintSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="mb-4 text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}
