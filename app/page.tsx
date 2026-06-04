import Link from "next/link";

const painPoints = [
  ["资料分散", "商品信息分散在微信聊天、表格、供应商文件和图片里，很难整理成可复用的 SKU 档案。"],
  ["英文不统一", "不同平台、不同运营手写出来的英文 listing 风格不一致，卖点和规格容易漏。"],
  ["包装说明不完整", "护理说明、警示语、回收说明和包装标签文案经常临时补，质量不稳定。"],
  ["资料难复用", "同一个商品上 Amazon、Etsy、Shopify、TikTok Shop 时，重复整理成本很高。"],
  ["展示不够专业", "小卖家也需要更像品牌方的产品资料页、QR 页面和可打印资料包。"]
];

const deliverables = [
  ["英文 Listing", "English product listing"],
  ["产品信息卡", "Product information card"],
  ["包装标签文案", "Packaging label text"],
  ["QR 产品页", "QR product page"],
  ["缺失信息检查", "Missing information checker"],
  ["可打印资料包", "Printable Product Info Pack"]
];

const useCases = [
  "饰品 Jewelry",
  "服装 Apparel",
  "手机配件 Phone Accessories",
  "厨房用品 Kitchenware",
  "宠物配件 Pet Accessories",
  "玩具游戏 Toys & Games",
  "美妆工具 Beauty Tools",
  "Etsy / Amazon / Shopify / TikTok Shop"
];

const workflow = [
  ["01", "录入 SKU 信息", "Enter SKU details", "整理材质、尺寸、重量、目标市场、包装内容、护理说明和安全提示。"],
  ["02", "检查缺失字段", "Check missing information", "自动提示必填字段、条件性风险提醒和需要补充的商品资料。"],
  ["03", "生成资料包", "Generate pack", "输出英文 listing、QR 产品页、包装文案、检查清单和可打印 PDF 资料。"]
];

const commercialSteps = [
  ["免费试用", "先让卖家生成 1-3 个 SKU，验证资料包是否真的节省时间。"],
  ["代整理服务", "用 20/50/100 个 SKU 的人工整理套餐先收现金，验证付费意愿。"],
  ["订阅工具", "接入数据库、账号和支付后，按 SKU 数量和 QR 托管页收费。"]
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 w-fit rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium text-slate-700">
              给中国跨境电商小卖家的结构化商品资料工具
            </p>
            <div className="mb-6 flex items-center gap-3">
              <img src="/images/liucai-pack-logo.svg" alt="留材库 Product Pack logo" className="h-14 w-14 rounded-xl shadow-soft" />
              <div>
                <p className="text-xl font-bold text-ink">留材库 Product Pack</p>
                <p className="text-sm text-slate-500">跨境商品资料包生成器</p>
              </div>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-ink sm:text-5xl">
              把杂乱 SKU 信息，沉淀成可复用的跨境商品资料库。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              留材库 Product Pack 面向中国跨境卖家：生成英文 listing、产品信息卡、包装说明、QR 产品页、缺失信息检查和可打印资料包。
            </p>
            <p className="mt-3 max-w-2xl leading-7 text-slate-500">
              Turn messy SKU information into structured English listings, QR product pages, packaging notes and
              printable product documentation packs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/create"
                className="focus-ring rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft transition hover:bg-slate-800"
              >
                创建产品资料包
              </Link>
              <Link
                href="/pack/SAMPLE-JWL-001"
                className="focus-ring rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink transition hover:bg-mist"
              >
                查看示例资料包
              </Link>
              <Link
                href="/pricing"
                className="focus-ring rounded-lg border border-line bg-mist px-5 py-3 text-center font-semibold text-ink transition hover:bg-white"
              >
                查看商业方案
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["6", "类结构化交付物"],
                ["0", "无需 API Key"],
                ["PDF", "浏览器打印保存"]
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
                alt="留材库 Product Pack premium desk preview"
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="grid gap-3 border-t border-line p-4 sm:grid-cols-3">
                {["SKU 资料库", "QR 产品页", "打印资料包"].map((item) => (
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
            <h2 className="mt-2 text-3xl font-bold text-ink">跨境商品资料整理，不应该每次都从零开始。</h2>
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
              <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">解决方案 Solution</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">一个 SKU 记录，生成六类专业资料。</h2>
              <p className="mt-4 leading-7 text-slate-600">
                它不是普通 AI 文案工具，而是先收集 SKU 字段、检查缺失信息，再把同一份结构化资料输出到 listing、包装、QR 页面和打印资料包。
              </p>
              <p className="mt-3 leading-7 text-slate-500">
                One structured SKU record becomes reusable English product documentation across channels.
              </p>
              <img
                src="/images/dashboard-preview.svg"
                alt="Dashboard preview"
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
                  <p className="mt-1 text-sm font-medium text-slate-500">{en}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    基于同一份 SKU 档案生成，减少复制粘贴和版本混乱。
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">商业闭环 Business Model</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">先跑通服务收入，再升级为 SaaS 订阅。</h2>
            <p className="mt-4 leading-7 text-slate-600">
              当前版本已经能公开展示、创建 SKU、生成资料包、复制分享链接和收集咨询线索。下一阶段接入数据库与支付后，就能从演示工具进入真实商用。
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {commercialSteps.map(([title, body], index) => (
              <div key={title} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-slate-500">0{index + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/pricing" className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft">
              查看定价与代整理服务
            </Link>
            <Link href="/contact" className="rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink">
              留资咨询
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">工作流 Workflow</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">从原始商品信息，到可交付资料包。</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {workflow.map(([number, title, subtitle, body]) => (
              <div key={title} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-slate-500">{number}</span>
                <h3 className="mt-4 text-2xl font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">{subtitle}</p>
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
              创建页支持 20+ 常见跨境类目，并提供首字母检索和类目填写提示。
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
            <h2 className="text-3xl font-bold">先从一个 SKU 开始。</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              几分钟生成一份结构化商品资料包，后续再替换为真实截图、真实商品图和真实 QR 示例。
            </p>
          </div>
          <Link
            href="/create"
            className="focus-ring rounded-lg bg-white px-5 py-3 text-center font-semibold text-ink transition hover:bg-slate-100"
          >
            创建产品资料包
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-line bg-mist p-5">
            <p className="text-sm font-semibold text-ink">免责声明 Disclaimer</p>
            <p className="mt-2 leading-7 text-slate-600">
              本工具仅用于商品资料整理和上架准备，不构成法律建议、合规认证或官方 Digital Product Passport 认证。
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
