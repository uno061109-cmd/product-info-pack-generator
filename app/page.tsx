import Link from "next/link";

const painPoints = [
  ["资料分散", "商品资料散落在微信、表格、供应商文件和图片里，运营每次上新都要重新翻找。"],
  ["英文不统一", "不同人写出来的英文 Listing 风格不一致，卖点、规格和包装信息看起来不够专业。"],
  ["关键字段缺失", "材料、尺寸、重量、原产国、包装说明和安全提醒经常缺失，上架前才临时补。"],
  ["重复整理低效", "同一个商品要上 Amazon、Etsy、Shopify、TikTok Shop，资料反复复制粘贴。"],
  ["普通 AI 不够结构化", "普通 AI 往往只写一段英文文案，不能交付可复用的 SKU Product Info Pack。"]
];

const deliverables = [
  ["英文商品 Listing", "SEO title, bullet points, description, keywords and FAQ"],
  ["产品信息卡", "Materials, dimensions, origin, use, care and packaging details"],
  ["包装说明", "Care notes, label notes, recycling notes and package content text"],
  ["安全提醒", "Small parts, battery, skin contact and other basic warning prompts"],
  ["QR 产品信息页", "A mobile-friendly product information page for customer transparency"],
  ["可打印 PDF 资料包", "Printable pack for internal archive, supplier handoff and listing preparation"],
  ["缺失信息清单", "Missing Information List for fields that should be confirmed"],
  ["基础风险清单", "Basic Risk Checklist for documentation support"]
];

const workflow = [
  ["01", "你提供商品资料", "发来商品名称、SKU、图片、材质、尺寸、包装、用途和目标平台等信息。"],
  ["02", "我们整理和补齐结构", "按跨境上架资料包格式检查缺失字段，统一英文表达和包装说明结构。"],
  ["03", "交付 Product Info Pack", "交付英文 Listing、产品信息卡、QR 产品页、可打印 PDF、缺失信息清单和基础风险清单。"]
];

const useCases = [
  "饰品 Jewelry",
  "服饰配件 Fashion Accessories",
  "手机配件 Phone Accessories",
  "小家居 Home Goods",
  "厨房用品 Kitchenware",
  "宠物配件 Pet Accessories",
  "Etsy / Amazon / Shopify / TikTok Shop"
];

const serviceHighlights = [
  ["3 个 SKU 免费体验", "先自助体验 3 个 SKU，再决定是否批量整理。"],
  ["20 / 50 / 100 SKU 套餐", "适合店铺上新、旧品资料标准化和团队内部归档。"],
  ["中文沟通，英文交付", "你用中文提交资料，我们整理成英文跨境商品资料包。"]
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 w-fit rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium text-slate-700">
              跨境 SKU 资料包代整理服务
            </p>
            <div className="mb-6 flex items-center gap-3">
              <img src="/images/liucai-pack-logo.svg" alt="留材库 Product Pack logo" className="h-14 w-14 rounded-xl shadow-soft" />
              <div>
                <p className="text-xl font-bold text-ink">留材库 Product Pack</p>
                <p className="text-sm text-slate-500">LiucaiKu Product Info Pack</p>
              </div>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl">
              把杂乱 SKU 资料整理成一套专业英文跨境商品资料包
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              适合 Amazon、Etsy、Shopify、TikTok Shop 小卖家。我们帮你把商品资料整理成英文 Listing、产品信息卡、包装说明、QR 产品页和可打印 PDF 资料包。
            </p>
            <p className="mt-3 max-w-2xl leading-7 text-slate-500">
              Send messy product information. Receive a structured English Product Info Pack ready for listing
              preparation, customer presentation, packaging notes and internal archive.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create"
                className="focus-ring rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft transition hover:bg-slate-800"
              >
                免费体验 3 个 SKU
              </Link>
              <Link
                href="/pack/SAMPLE-JWL-001"
                className="focus-ring rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink transition hover:bg-mist"
              >
                查看资料包示例
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["8", "类交付内容"],
                ["24h", "内联系确认需求"],
                ["PDF", "可打印资料包"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-line bg-mist px-4 py-3">
                  <p className="text-2xl font-bold text-ink">{value}</p>
                  <p className="text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="overflow-hidden rounded-lg border border-line bg-white shadow-soft">
              <img
                src="/images/liucai-product-pack-hero.jpg"
                alt="留材库 Product Pack service preview"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="grid gap-3 border-t border-line p-4 sm:grid-cols-3">
                {["英文 Listing", "QR 产品页", "打印资料包"].map((item) => (
                  <div key={item} className="rounded-md bg-mist px-3 py-2 text-sm font-semibold text-ink">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">卖家痛点 Pain Points</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">跨境上新缺的不是一段文案，而是一套完整资料。</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {painPoints.map(([title, body], index) => (
              <div key={title} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 leading-7 text-slate-700">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">交付结果 Deliverables</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">我们不是只写一段英文文案，而是交付一整套 SKU Product Info Pack。</h2>
              <p className="mt-4 leading-7 text-slate-600">
                每个 SKU 会整理成统一结构，方便你用于平台上架、客户展示、包装说明、供应商沟通和内部归档。
              </p>
              <img
                src="/images/dashboard-preview.svg"
                alt="Product info pack dashboard preview"
                className="mt-8 w-full rounded-lg border border-line bg-mist shadow-sm"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {deliverables.map(([cn, en], index) => (
                <div key={cn} className="rounded-lg border border-line bg-white p-5 shadow-sm">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-ink text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-ink">{cn}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">服务方式 Service</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">先免费体验 3 个 SKU，满意后再批量整理。</h2>
            <p className="mt-4 leading-7 text-slate-600">
              你不需要研究表格模板或英文格式。把商品资料发给我们，我们按 SKU 输出可交付的英文 Product Info Pack。
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {serviceHighlights.map(([title, body], index) => (
              <div key={title} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/pricing" className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft">
              查看整理套餐
            </Link>
            <Link href="/pricing" className="rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink">
              查看付费套餐
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">交付流程 Workflow</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">从零散资料，到可复用英文资料包。</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {workflow.map(([number, title, body]) => (
              <div key={title} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-slate-500">{number}</span>
                <h3 className="mt-4 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">适用卖家 Use Cases</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">适合 SKU 多、团队小、需要专业展示的跨境卖家。</h2>
            <p className="mt-4 leading-7 text-slate-600">
              尤其适合饰品、配件、小家居、宠物用品、手机配件、Etsy 手工配件等需要频繁上新的店铺。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {useCases.map((item) => (
                <span key={item} className="rounded-full border border-line bg-mist px-4 py-2 text-sm font-semibold text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="/images/qr-product-page-preview.svg"
              alt="QR product page preview"
              className="rounded-lg border border-line bg-mist shadow-sm"
            />
            <img
              src="/images/printable-pack-preview.svg"
              alt="Printable product pack preview"
              className="rounded-lg border border-line bg-mist shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-bold">先免费体验 3 个 SKU。</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              超过免费额度后，再选择 20、50 或 100 个 SKU 套餐。
            </p>
          </div>
          <Link
            href="/create"
            className="focus-ring rounded-lg bg-white px-5 py-3 text-center font-semibold text-ink transition hover:bg-slate-100"
          >
            开始免费体验
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-line bg-mist p-5">
            <p className="text-sm font-semibold text-ink">免责声明 Disclaimer</p>
            <p className="mt-2 leading-7 text-slate-600">
              本服务仅用于商品资料整理和上架准备，不构成法律建议、合规认证或官方 Digital Product Passport 认证。
            </p>
            <p className="mt-3 leading-7 text-slate-600">
              This Product Info Pack is generated for product documentation and listing preparation purposes only. It
              is not legal advice, compliance certification, or official Digital Product Passport certification.
              Sellers should verify applicable regulations and platform requirements before using the information
              commercially.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
