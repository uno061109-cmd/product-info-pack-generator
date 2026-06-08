import Link from "next/link";

const servicePlans = [
  {
    name: "免费体验",
    price: "¥0",
    title: "3 个 SKU 自助体验",
    fit: "第一次了解效果的小卖家",
    cta: "开始免费体验",
    href: "/create",
    features: ["3 个 SKU Product Info Pack", "英文 Listing 示例", "产品信息卡", "包装说明", "Missing Info List", "PDF 示例"]
  },
  {
    name: "Starter",
    price: "¥39",
    title: "20 个 SKU 资料整理",
    fit: "饰品、配件、小家居上新测试",
    cta: "加微信开通",
    href: "/checkout?plan=Starter",
    features: ["20 个 SKU 英文资料包", "英文 Listing", "产品信息卡", "包装说明", "Basic Risk Checklist", "可打印 PDF"]
  },
  {
    name: "Growth",
    price: "¥359",
    title: "50 个 SKU 资料整理",
    fit: "店铺一批商品标准化",
    cta: "加微信开通",
    href: "/checkout?plan=Growth",
    popular: true,
    features: ["50 个 SKU 英文资料包", "批量字段检查", "统一英文风格", "QR 产品页", "PDF 资料包", "缺失信息清单"]
  },
  {
    name: "Bulk",
    price: "¥999",
    title: "100 个 SKU 资料整理",
    fit: "小团队集中建立商品资料库",
    cta: "加微信开通",
    href: "/checkout?plan=Bulk",
    features: ["100 个 SKU 英文资料包", "批量 SKU 信息标准化", "统一包装说明格式", "QR 产品页", "PDF 资料包", "批量 Missing Info List"]
  }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold text-slate-500">整理套餐</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">免费体验 3 个 SKU，需要更多额度再加微信开通</h1>
          <p className="mt-4 leading-7 text-slate-600">
            选择套餐后进入开通页，扫码添加微信并备注登录邮箱。我们确认需求和付款后，为你的账号开通 SKU 额度。
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
                最受欢迎
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
              href={plan.href}
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
        <div className="grid gap-5 lg:grid-cols-4">
          {[
            ["01", "注册 / 登录", "用邮箱和密码注册，付款开通会绑定到这个邮箱。"],
            ["02", "选择套餐", "超过 3 个免费 SKU 后，选择 Starter、Growth 或 Bulk。"],
            ["03", "添加微信", "扫码添加微信，备注登录邮箱、套餐和 SKU 数量。"],
            ["04", "确认开通", "确认需求和付款后，我们人工开通 SKU 额度。"]
          ].map(([number, title, body]) => (
            <div key={title} className="rounded-lg border border-line bg-mist p-5">
              <span className="text-sm font-semibold text-slate-500">{number}</span>
              <h3 className="mt-3 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
