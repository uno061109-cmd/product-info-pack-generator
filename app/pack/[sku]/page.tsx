"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { MissingInfoPanel } from "@/components/MissingInfoPanel";
import { ProductImageStrip } from "@/components/ProductImageStrip";
import { generatePack, productPackDisclaimer } from "@/lib/generatePack";
import {
  decodeProductFromShare,
  getProductBySku,
  getShareableProductPath,
  getShareableProductUrl,
  normalizeSku
} from "@/lib/productStorage";
import { createProductVisualDataUri } from "@/lib/productVisual";
import { ProductInput } from "@/lib/productTypes";

export default function PackPage({ params }: { params: { sku: string } }) {
  const [product, setProduct] = useState<ProductInput | null>();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const sharedProduct = decodeProductFromShare(new URLSearchParams(window.location.search).get("data"));
    const nextProduct = sharedProduct || getProductBySku(params.sku);
    setProduct(nextProduct);

    if (nextProduct) {
      setShareUrl(getShareableProductUrl(nextProduct, "product"));
    }
  }, [params.sku]);

  if (product === undefined) {
    return <PageShell>正在整理产品资料包...</PageShell>;
  }

  if (!product) {
    return (
      <PageShell>
        <section className="rounded-lg border border-line bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-ink">未找到商品</h1>
          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            这个 SKU 尚未保存在当前浏览器中，请重新创建，或先查看示例资料包。
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/create" className="rounded-lg bg-ink px-5 py-3 font-semibold text-white">
              创建产品资料包
            </Link>
            <Link href="/pack/SAMPLE-JWL-001" className="rounded-lg border border-line px-5 py-3 font-semibold text-ink">
              查看示例资料包
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const pack = generatePack(product);
  const encodedSku = encodeURIComponent(product.sku);
  const productPagePath = getShareableProductPath(product, "product");
  const printPath = getShareableProductPath(product, "print");
  const missingItems = [...pack.missingInfo.missingFields, ...pack.missingInfo.recommendations];

  function downloadSkuVisual() {
    const link = document.createElement("a");
    link.href = createProductVisualDataUri(product);
    link.download = `${normalizeSku(product.sku || product.productName || "SKU")}-preview.svg`;
    link.click();
  }

  return (
    <PageShell>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">已生成资料包</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">{product.productName}</h1>
          <p className="mt-3 text-slate-600">
            {product.sku} · {product.category} · {product.targetMarket}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href={`/create?sku=${encodedSku}`} className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink transition hover:bg-mist">
            编辑
          </Link>
          <Link href={productPagePath} className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink transition hover:bg-mist">
            公开产品页
          </Link>
          <Link href={printPath} className="rounded-lg bg-ink px-4 py-2.5 font-semibold text-white transition hover:bg-slate-800">
            打印 / PDF
          </Link>
          <button
            type="button"
            onClick={downloadSkuVisual}
            className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink transition hover:bg-mist"
          >
            下载 SKU 预览图
          </button>
          {shareUrl && (
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(shareUrl)}
              className="rounded-lg border border-line bg-white px-4 py-2.5 font-semibold text-ink transition hover:bg-mist"
            >
              复制公开链接
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <PackSection title="英文商品 Listing English Product Listing">
            <h3 className="text-xl font-semibold text-ink">{pack.listing.title}</h3>
            <div className="mt-5">
              <p className="font-semibold text-ink">5 bullet points</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                {pack.listing.bulletPoints.map((point) => (
                  <li key={point} className="rounded-md border border-line bg-mist px-3 py-2">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-ink">Product description</p>
              <p className="mt-2 leading-7 text-slate-700">{pack.listing.description}</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-ink">Suggested keywords</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {pack.listing.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-line bg-white px-3 py-1 text-sm text-slate-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-5">
              <p className="font-semibold text-ink">FAQ</p>
              <div className="mt-3 grid gap-3">
                {pack.listing.faq.map((item) => (
                  <div key={item.question} className="rounded-md border border-line bg-white p-3">
                    <p className="font-semibold text-ink">{item.question}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </PackSection>

          <PackSection title="产品信息卡 Product Information Card">
            <div className="overflow-hidden rounded-lg border border-line">
              <table className="w-full border-collapse text-left text-sm">
                <tbody>
                  {pack.informationCard.map((row) => (
                    <tr key={row.label} className="border-b border-line last:border-b-0">
                      <th className="w-48 bg-mist px-4 py-3 font-semibold text-ink">{row.label}</th>
                      <td className="px-4 py-3 leading-6 text-slate-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PackSection>

          <PackSection title="包装标签文案 Packaging Label Text">
            <ul className="grid gap-3">
              {pack.packagingLabelText.map((item) => (
                <li key={item} className="rounded-md border border-line bg-mist px-3 py-2 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </PackSection>

          <PackSection title="基础风险检查 Basic Risk Checklist">
            <div className="grid gap-3">
              {pack.riskChecklist.map((item) => (
                <div key={item.label} className="rounded-md border border-line bg-white p-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-ink">{item.label}</p>
                    <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-slate-700">{item.value}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-800">
              本清单仅用于资料整理辅助，不构成法律合规认证。This checklist is for documentation support only and is not legal compliance certification.
            </p>
          </PackSection>

          <PackSection title="缺失信息列表 Missing Information List">
            {missingItems.length > 0 ? (
              <ul className="space-y-2">
                {missingItems.map((item) => (
                  <li key={item} className="rounded-md border border-line bg-mist px-3 py-2 text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-700">
                当前规则没有发现缺失信息。No missing information detected by the current rules.
              </p>
            )}
          </PackSection>

          <PackSection title="免责声明 Disclaimer">
            <p className="leading-7 text-slate-700">{productPackDisclaimer}</p>
          </PackSection>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <section className="rounded-lg border border-line bg-ink p-5 text-white shadow-sm">
            <p className="text-sm font-semibold text-slate-300">保存与交付</p>
            <h2 className="mt-2 text-xl font-semibold">资料包已经生成</h2>
            <div className="mt-4 grid gap-2 text-sm leading-6 text-slate-200">
              <p>打印 / PDF：保存完整资料包。</p>
              <p>复制公开链接：发给客户或用于二维码。</p>
              <p>下载 SKU 预览图：保存商品资料视觉卡。</p>
            </div>
          </section>
          <MissingInfoPanel product={product} />
          <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">产品图片</p>
            <ProductImageStrip images={product.imageUrls} product={product} className="mt-4" />
          </section>
        </aside>
      </div>
    </PageShell>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}

function PackSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}
