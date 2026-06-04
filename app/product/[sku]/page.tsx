"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ProductImageStrip } from "@/components/ProductImageStrip";
import { generatePack, productPackDisclaimer } from "@/lib/generatePack";
import { decodeProductFromShare, getProductBySku } from "@/lib/productStorage";
import { ProductInput } from "@/lib/productTypes";

export default function PublicProductPage({ params }: { params: { sku: string } }) {
  const [product, setProduct] = useState<ProductInput | null>();

  useEffect(() => {
    const sharedProduct = decodeProductFromShare(new URLSearchParams(window.location.search).get("data"));
    setProduct(sharedProduct || getProductBySku(params.sku));
  }, [params.sku]);

  if (product === undefined) {
    return <main className="mx-auto max-w-3xl px-4 py-8">Loading product page...</main>;
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
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

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <div className="bg-ink px-5 py-7 text-white">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-300">公开产品信息页 Product Information Page</p>
          <h1 className="mt-3 text-3xl font-bold">{product.productName}</h1>
          <p className="mt-2 text-sm text-slate-300">
            {product.sku} · {product.category} · {product.targetMarket}
          </p>
        </div>

        <div className="p-5">
          <ProductImageStrip images={product.imageUrls} fallback="/images/qr-product-page-preview.svg" />

          <InfoBlock title="材质 Materials">{product.materials || "Materials to be confirmed."}</InfoBlock>
          <InfoBlock title="用途 Intended Use">{product.intendedUse || "Intended use to be confirmed."}</InfoBlock>
          <InfoBlock title="护理说明 Care Instructions">{product.careInstructions || "Care instructions to be confirmed."}</InfoBlock>
          <InfoBlock title="安全警示 Safety Warnings">{product.safetyWarnings || "Safety warnings to be confirmed."}</InfoBlock>
          <InfoBlock title="包装与回收 Packaging and Recycling">
            <span className="block">{product.packagingMaterial || "Packaging material to be confirmed."}</span>
            <span className="mt-2 block">{product.recyclingInstructions || "Recycling instructions to be confirmed."}</span>
          </InfoBlock>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-ink">常见问题 FAQ</h2>
            <div className="mt-3 grid gap-3">
              {pack.listing.faq.map((item) => (
                <div key={item.question} className="rounded-md border border-line bg-mist p-3">
                  <p className="font-semibold text-ink">{item.question}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <InfoBlock title="卖家联系信息占位 Seller Contact Placeholder">
            {product.manufacturerImporterInfo || "Seller contact / manufacturer / importer details to be added."}
          </InfoBlock>

          <section className="mt-6 rounded-md border border-line bg-mist p-4">
            <h2 className="text-xl font-semibold text-ink">免责声明 Disclaimer</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              本页面仅用于商品透明度展示和资料说明，不构成法律建议或合规认证。
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{productPackDisclaimer}</p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              This product information page is provided for transparency and documentation purposes only.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6 border-t border-line pt-5">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-2 leading-7 text-slate-700">{children}</div>
    </section>
  );
}
