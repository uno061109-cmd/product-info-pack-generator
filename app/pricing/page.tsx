import Link from "next/link";

const servicePlans = [
  {
    name: "免费体验",
    price: "¥0",
    title: "3 个 SKU 自助体验",
    fit: "第一次了解效果的小卖家",
    cta: "免费体验 3 个 SKU",
    planQuery: "免费体验 3 个 SKU",
    features: ["3 个 SKU Product Info Pack", "英文 Listing 示例", "产品信息卡", "包装说明", "Missing Info List", "PDF 示例"]
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
    price: "¥359",
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
  "建议先用邮箱验证码登录，方便付款后为同一个账号开通 SKU 额度。",
  "提交需求后，我们会在 24 小时内联系你确认品类、SKU 数量和资料范围。",
  "选择套餐后可扫码付款；付款时建议备注微信号、套餐名和 SKU 数量。",
  "付款后请提交咨询表单，便于我们确认开通和交付安排。"
];

const paymentMethods = [
  {
    name: "微信支付",
    image: "/images/payments/wechat-pay.jpg",
    tone: "text-emerald-700",
    note: "适合微信扫码付款，付款备注建议写：微信号 + 套餐名。"
  },
  {
    name: "支付宝",
    image: "/images/payments/alipay-pay.jpg",
    tone: "text-blue-700",
    note: "适合支付宝扫码付款，付款备注建议写：联系方式 + 套餐名。"
  }
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">整理套餐 Pricing</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">免费体验 3 个 SKU，满意后再选择套餐</h1>
          <p className="mt-4 leading-7 text-slate-600">
            你可以先自助生成 3 个 SKU 的 Product Info Pack。继续批量整理时，选择套餐并扫码付款，我们确认后安排开通和交付。
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
              为了避免你买错套餐，我们建议先确认 SKU 数量、商品品类、资料完整度和交付格式，再付款或提交付款备注。
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

      <section className="mt-10 rounded-lg border border-line bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">扫码付款 Payment</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">选择套餐后，用微信或支付宝付款。</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              收款码默认收起，避免页面显得突兀。付款后请在咨询表单里填写联系方式、套餐和付款备注，我们会确认后联系你。
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink">
              先登录账号
            </Link>
            <Link href="/contact?plan=额度开通咨询&payment=paid" className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft">
              已付款，提交信息
            </Link>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {paymentMethods.map((method) => (
            <details key={method.name} className="group rounded-lg border border-line bg-mist p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <div>
                  <p className={`text-lg font-bold ${method.tone}`}>{method.name}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{method.note}</p>
                </div>
                <span className="shrink-0 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink group-open:hidden">
                  展开收款码
                </span>
                <span className="hidden shrink-0 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink group-open:inline-flex">
                  收起
                </span>
              </summary>
              <div className="mt-5 rounded-lg border border-line bg-white p-4">
                <img src={method.image} alt={`${method.name}收款码`} className="mx-auto max-h-[420px] w-full max-w-[280px] rounded-md object-contain" />
                <p className="mt-4 rounded-md bg-mist px-3 py-2 text-center text-sm leading-6 text-slate-600">
                  付款后请回到咨询页提交联系方式、套餐和付款备注。
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-line bg-mist p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">开通方式 Activation</p>
        <h2 className="mt-2 text-2xl font-bold text-ink">免费 3 个 SKU，超过后选择套餐。</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          {[
            ["01", "邮箱登录", "先用邮箱验证码登录，付款确认后会开通到这个邮箱账号。"],
            ["02", "免费体验", "在 Create 页面自助生成 3 个 SKU，确认资料包格式是否适合你的店铺。"],
            ["03", "扫码付款", "选择 Starter、Growth 或 Bulk 套餐，用微信或支付宝付款，并备注联系方式。"],
            ["04", "确认开通", "提交咨询表单后，我们人工确认付款和需求，再为你的账号开通 SKU 额度。"]
          ].map(([number, title, body]) => (
            <div key={title} className="rounded-lg border border-line bg-white p-5">
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
