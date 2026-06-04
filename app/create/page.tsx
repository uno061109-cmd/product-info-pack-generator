"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Field, SelectInput, TextArea, TextInput } from "@/components/Field";
import { MissingInfoPanel } from "@/components/MissingInfoPanel";
import { ProductImageStrip } from "@/components/ProductImageStrip";
import { getProductBySku, upsertProduct } from "@/lib/productStorage";
import {
  ageRestrictions,
  binaryAnswers,
  createEmptyProduct,
  productCategories,
  ProductInput,
  targetMarkets
} from "@/lib/productTypes";

export default function CreateProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<ProductInput>(() => createEmptyProduct());
  const [loaded, setLoaded] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const skuParam = new URLSearchParams(window.location.search).get("sku");

    if (skuParam) {
      const existing = getProductBySku(skuParam);
      if (existing) {
        setProduct(existing);
      }
    }

    setLoaded(true);
  }, []);

  function updateField<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setProduct((current) => ({ ...current, [key]: value }));
    setSavedMessage("");
  }

  function save(destination: "dashboard" | "pack") {
    const saved = upsertProduct(product);
    setProduct(saved);
    setSavedMessage("已保存到当前浏览器。Saved to this browser.");

    if (destination === "pack") {
      router.push(`/pack/${encodeURIComponent(saved.sku)}`);
      return;
    }

    router.push("/dashboard");
  }

  if (!loaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-8 text-slate-600 shadow-sm">Loading product form...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">创建 / 编辑 Create / Edit</p>
          <h1 className="mt-2 text-4xl font-bold text-ink">创建产品资料包</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            录入一个 SKU 的基础资料，系统会检查缺失字段，并生成英文 listing、包装文案、QR 产品页和可打印资料包。
          </p>
        </div>
        <Link href="/dashboard" className="rounded-lg border border-line bg-white px-4 py-2.5 text-center font-semibold text-ink transition hover:bg-mist">
          返回控制台
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <FormSection title="基础信息 Basic Information">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="产品名称 Product Name">
                <TextInput value={product.productName} onChange={(event) => updateField("productName", event.currentTarget.value)} placeholder="Gold Plated Pearl Hoop Earrings" />
              </Field>
              <Field label="SKU 编号">
                <TextInput value={product.sku} onChange={(event) => updateField("sku", event.currentTarget.value)} placeholder="SKU-001" />
              </Field>
              <Field label="商品类目 Category">
                <SelectInput value={product.category} onChange={(event) => updateField("category", event.currentTarget.value as ProductInput["category"])}>
                  {productCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="目标市场 Target Market">
                <SelectInput value={product.targetMarket} onChange={(event) => updateField("targetMarket", event.currentTarget.value as ProductInput["targetMarket"])}>
                  {targetMarkets.map((market) => (
                    <option key={market}>{market}</option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="品牌名称 Brand Name">
                <TextInput value={product.brandName} onChange={(event) => updateField("brandName", event.currentTarget.value)} placeholder="Brand or store name" />
              </Field>
              <Field label="卖家名称 Seller Name">
                <TextInput value={product.sellerName} onChange={(event) => updateField("sellerName", event.currentTarget.value)} placeholder="Seller legal or store name" />
              </Field>
              <Field label="原产国 Country of Origin">
                <TextInput value={product.countryOfOrigin} onChange={(event) => updateField("countryOfOrigin", event.currentTarget.value)} placeholder="China" />
              </Field>
            </div>
          </FormSection>

          <FormSection title="商品细节 Product Details">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="材质 Materials">
                <TextArea value={product.materials} onChange={(event) => updateField("materials", event.currentTarget.value)} placeholder="Gold plated copper alloy, imitation pearl..." />
              </Field>
              <Field label="尺寸 Dimensions">
                <TextInput value={product.dimensions} onChange={(event) => updateField("dimensions", event.currentTarget.value)} placeholder="24 mm hoop diameter" />
              </Field>
              <Field label="重量 Weight">
                <TextInput value={product.weight} onChange={(event) => updateField("weight", event.currentTarget.value)} placeholder="Approx. 8 g per pair" />
              </Field>
              <Field label="颜色 Colors">
                <TextInput value={product.colors} onChange={(event) => updateField("colors", event.currentTarget.value)} placeholder="Gold, ivory white" />
              </Field>
              <Field label="用途 Intended Use">
                <TextArea value={product.intendedUse} onChange={(event) => updateField("intendedUse", event.currentTarget.value)} placeholder="Fashion accessory for daily styling..." />
              </Field>
              <Field label="目标客户 Target Customer">
                <TextArea value={product.targetCustomer} onChange={(event) => updateField("targetCustomer", event.currentTarget.value)} placeholder="Adults looking for lightweight accessories..." />
              </Field>
              <Field label="核心卖点 Key Selling Points">
                <TextArea value={product.keySellingPoints} onChange={(event) => updateField("keySellingPoints", event.currentTarget.value)} placeholder="Use commas or line breaks for selling points" />
              </Field>
              <Field label="包装内含物 What is included">
                <TextArea value={product.includedInPackage} onChange={(event) => updateField("includedInPackage", event.currentTarget.value)} placeholder="1 pair of earrings, 1 pouch, 1 care card" />
              </Field>
            </div>
          </FormSection>

          <FormSection title="护理与安全 Care and Safety">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="护理说明 Care Instructions">
                <TextArea value={product.careInstructions} onChange={(event) => updateField("careInstructions", event.currentTarget.value)} placeholder="Keep dry. Wipe with a soft cloth..." />
              </Field>
              <Field label="安全警示 Safety Warnings">
                <TextArea value={product.safetyWarnings} onChange={(event) => updateField("safetyWarnings", event.currentTarget.value)} placeholder="Not intended for children. Keep away from small children..." />
              </Field>
              <Field label="年龄限制 Age Restriction">
                <SelectInput value={product.ageRestriction} onChange={(event) => updateField("ageRestriction", event.currentTarget.value as ProductInput["ageRestriction"])}>
                  {ageRestrictions.map((age) => (
                    <option key={age}>{age}</option>
                  ))}
                </SelectInput>
              </Field>
              <ToggleField label="接触皮肤 Skin Contact" value={product.skinContact} onChange={(value) => updateField("skinContact", value)} />
              <ToggleField label="接触食品 Food Contact" value={product.foodContact} onChange={(value) => updateField("foodContact", value)} />
              <ToggleField label="含电池 Contains Battery" value={product.containsBattery} onChange={(value) => updateField("containsBattery", value)} />
              <ToggleField label="含小部件 Contains Small Parts" value={product.containsSmallParts} onChange={(value) => updateField("containsSmallParts", value)} />
              <Field label="环保 / 可持续声明 Eco Claims">
                <TextArea value={product.ecoClaims} onChange={(event) => updateField("ecoClaims", event.currentTarget.value)} placeholder="Only add claims you can verify with evidence" />
              </Field>
            </div>
          </FormSection>

          <FormSection title="包装 Packaging">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="包装材料 Packaging Material">
                <TextInput value={product.packagingMaterial} onChange={(event) => updateField("packagingMaterial", event.currentTarget.value)} placeholder="Kraft paper box, recyclable paper card" />
              </Field>
              <Field label="回收说明 Recycling Instructions">
                <TextArea value={product.recyclingInstructions} onChange={(event) => updateField("recyclingInstructions", event.currentTarget.value)} placeholder="Separate paper packaging where local recycling facilities exist." />
              </Field>
              <Field label="标签备注 Label Notes">
                <TextArea value={product.labelNotes} onChange={(event) => updateField("labelNotes", event.currentTarget.value)} placeholder="Remove before showering or swimming." />
              </Field>
              <Field label="制造商 / 进口商信息占位 Manufacturer / Importer Info">
                <TextArea value={product.manufacturerImporterInfo} onChange={(event) => updateField("manufacturerImporterInfo", event.currentTarget.value)} placeholder="Add manufacturer or importer info before commercial use." />
              </Field>
            </div>
          </FormSection>

          <FormSection title="图片 Images">
            <Field label="产品图片链接 Product Image URLs" hint="每行一个链接。留空则使用本地占位图。">
              <TextArea
                value={product.imageUrls.join("\n")}
                onChange={(event) =>
                  updateField(
                    "imageUrls",
                    event.currentTarget.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter(Boolean)
                  )
                }
                placeholder={"https://example.com/product-front.jpg\nhttps://example.com/product-packaging.jpg"}
              />
            </Field>
          </FormSection>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <MissingInfoPanel product={product} />
          <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">图片预览 Image Preview</p>
            <ProductImageStrip images={product.imageUrls} className="mt-4" />
          </section>
          <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <div className="grid gap-3">
              <button
                type="button"
                onClick={() => save("pack")}
                className="focus-ring rounded-lg bg-ink px-5 py-3 font-semibold text-white shadow-soft transition hover:bg-slate-800"
              >
                保存并生成资料包
              </button>
              <button
                type="button"
                onClick={() => save("dashboard")}
                className="focus-ring rounded-lg border border-line bg-white px-5 py-3 font-semibold text-ink transition hover:bg-mist"
              >
                保存草稿
              </button>
              {savedMessage && <p className="text-sm text-emerald-700">{savedMessage}</p>}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function ToggleField({
  label,
  value,
  onChange
}: {
  label: string;
  value: ProductInput["skinContact"];
  onChange: (value: ProductInput["skinContact"]) => void;
}) {
  return (
    <Field label={label}>
      <div className="grid grid-cols-2 gap-2">
        {binaryAnswers.map((answer) => {
          const active = answer === value;
          return (
            <button
              key={answer}
              type="button"
              onClick={() => onChange(answer)}
              className={`focus-ring rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                active ? "border-ink bg-ink text-white" : "border-line bg-white text-slate-700 hover:bg-mist"
              }`}
            >
              {answer}
            </button>
          );
        })}
      </div>
    </Field>
  );
}
