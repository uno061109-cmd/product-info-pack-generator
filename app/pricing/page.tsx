import Link from "next/link";

const servicePlans = [
  {
    name: "免费试做",
    price: "¥0",
    title: "1 个 SKU 示例资料包",
    fit: "第一次了解效果的小卖家",
    cta: "免费试做 1 个 SKU",
    planQuery: "免费试做 1 个 SKU",
    features: ["英文 Listing 示例", "产品信息卡", "包装说明", "Missing Info List", "PDF 示例"]
  },
  {
    name: "Starter",
    price: "¥39",
    title: "20 个 SKU 资料整理",
    fit: "饰品、配件、小家居上新测试",
    cta: "咨询 20 个 SKU",
    planQuery: "Starter 20 个 SKU",
    features: ["20 个 SKU 英文资料包", "英文 Listing", "产品信息卡", "包装说明", "Basic Risk Checklist", "可打印 PDF"]
  },
  {
    name: "Growth",
    price: "¥299",
    title: "50 个 SKU 资料整理",
    fit: "店铺一批商品标准化",
    cta: "咨询 50 个 SKU",
    planQuery: "Growth 50 个 SKU",
    popular: true,
    features: ["50 个 SKU 英文资料包", "批量字段检查", "统一英文风格", "QR 产品页", "PDF 资料包", "缺失信息清单"]
  },
  {
    name: "Bulk",
    price: "¥999",
    title: "100 个 SKU 资料整理",
    fit: "小团队集中建立商品资料库",
    cta: "咨询 100 个 SKU",
    planQuery: "Bulk 100 个 SKU",
    features: ["100 个 SKU 英文资料包", "批量 SKU 信息标准化", "统一包装说明格式", "QR 产品页", "PDF 资料包", "批量 Missing Info List"]
  }
];

const paymentNotes = [
  "提交需求后，我们会在 24 小时内联系你确认品类、SKU 数量和资料范围。",
  "确认后可通过微信或支付宝付款；付款方式会在沟通中发送。",
  "免费试做适合先看交付格式，不承诺覆盖复杂法规判断。"
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">整理套餐 Pricing</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">先试做 1 个 SKU，满意后再批量整理</h1>
          <p className="mt-4 leading-7 text-slate-600">
            你只需要提供商品资料，我们帮你整理成英文上架资料包、产品信息卡、包装说明、QR 产品页和可打印 PDF。
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <p className="font-semibold text-ink">每个 SKU 资料包包含</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
            {["英文 Listing", "产品信息卡", "包装说明", "安全提醒", "QR 产品信息页", "可打印 PDF", "Missing Information List", "Basic Risk Checklist"].map((item) => (
              <span key={item} className="rounded-md bg-mist px-3 py-2">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-4">
        {servicePlans.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-lg border bg-white p-6 shadow-sm ${
              plan.popular ? "border-ink shadow-soft" : "border-line"
            }`}
          >
            {plan.popular && (
              <span className="absolute right-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">{plan.name}</p>
            <p className="mt-4 text-4xl font-bold text-ink">{plan.price}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{plan.title}</h2>
            <p className="mt-3 leading-7 text-slate-600">适合：{plan.fit}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {plan.features.map((feature) => (
                <li key={feature} className="rounded-md bg-mist px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?plan=${encodeURIComponent(plan.planQuery)}`}
              className={`mt-6 inline-flex w-full justify-center rounded-lg px-5 py-3 font-semibold ${
                plan.popular ? "bg-ink text-white" : "border border-line bg-white text-ink hover:bg-mist"
              }`}
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">付款与沟通 Payment</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">先确认需求，再开始整理。</h2>
            <p className="mt-3 leading-7 text-slate-600">
              为了避免你买错套餐，我们会先确认 SKU 数量、商品品类、资料完整度和交付格式。
            </p>
          </div>
          <ul className="grid gap-3 text-slate-700">
            {paymentNotes.map((item) => (
              <li key={item} className="rounded-md bg-mist px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-line bg-mist p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">工具版 Tool Edition</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">工具版即将开放</h2>
            <p className="mt-2 max-w-3xl leading-7 text-slate-600">
              如果你希望长期自己管理 SKU，可以预约工具版体验名额。当前阶段我们优先提供代整理交付服务。
            </p>
          </div>
          <Link href="/contact?plan=预约工具版" className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft">
            预约工具版
          </Link>
        </div>
      </section>
    </main>
  );
}
