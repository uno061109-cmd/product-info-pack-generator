import Link from "next/link";

const plans = {
  Starter: {
    name: "Starter",
    price: "¥39",
    sku: "20 个 SKU",
    description: "适合饰品、配件、小家居上新测试。"
  },
  Growth: {
    name: "Growth",
    price: "¥359",
    sku: "50 个 SKU",
    description: "适合店铺一批商品标准化。",
    popular: true
  },
  Bulk: {
    name: "Bulk",
    price: "¥999",
    sku: "100 个 SKU",
    description: "适合小团队集中建立商品资料库。"
  }
};

const paymentMethods = [
  {
    name: "微信支付",
    image: "/images/payments/wechat-pay.jpg",
    badge: "推荐",
    note: "打开微信扫一扫，付款备注写：邮箱 + 套餐名。"
  },
  {
    name: "支付宝",
    image: "/images/payments/alipay-pay.jpg",
    badge: "可选",
    note: "打开支付宝扫一扫，付款备注写：邮箱 + 套餐名。"
  }
];

export default function CheckoutPage({ searchParams }: { searchParams: { plan?: string } }) {
  const selectedPlan = plans[(searchParams.plan || "Growth") as keyof typeof plans] || plans.Growth;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">确认订阅 Checkout</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">确认套餐后扫码付款</h1>
          <p className="mt-4 leading-7 text-slate-600">
            当前为人工确认开通模式。付款后提交付款备注，我们确认到账后为你的登录邮箱开通 SKU 额度。
          </p>
        </div>
        <div className="rounded-lg border border-line bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">当前套餐</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">{selectedPlan.name}</h2>
              <p className="mt-2 text-slate-600">
                {selectedPlan.sku} · {selectedPlan.description}
              </p>
            </div>
            <p className="rounded-lg bg-ink px-4 py-3 text-3xl font-bold text-white">{selectedPlan.price}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <article key={method.name} className="rounded-lg border border-line bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xl font-bold text-ink">{method.name}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{method.note}</p>
                </div>
                <span className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-slate-700">{method.badge}</span>
              </div>
              <div className="rounded-lg border border-line bg-mist p-4">
                <img src={method.image} alt={`${method.name}收款码`} className="mx-auto max-h-[430px] w-full max-w-[300px] rounded-md object-contain" />
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-lg border border-line bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">付款后 After Payment</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">提交信息，开通额度</h2>
          <ol className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
            <li className="rounded-md bg-mist px-3 py-2">1. 付款备注写：登录邮箱 + {selectedPlan.name}。</li>
            <li className="rounded-md bg-mist px-3 py-2">2. 点击下方按钮提交付款方式和备注。</li>
            <li className="rounded-md bg-mist px-3 py-2">3. 我们确认后在后台开通 {selectedPlan.sku} 额度。</li>
          </ol>
          <div className="mt-5 grid gap-3">
            <Link
              href={`/contact?plan=${encodeURIComponent(`${selectedPlan.name} ${selectedPlan.sku}`)}&payment=paid`}
              className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft"
            >
              我已付款，提交开通信息
            </Link>
            <Link href="/login" className="rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink">
              先登录 / 注册账号
            </Link>
            <Link href="/pricing" className="rounded-lg border border-line bg-mist px-5 py-3 text-center font-semibold text-ink">
              返回选择套餐
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
