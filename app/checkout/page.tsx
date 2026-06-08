import Link from "next/link";

const plans = {
  Starter: {
    name: "Starter",
    price: "¥39",
    sku: "20 个 SKU",
    description: "适合小批量上新测试。"
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
    description: "适合集中建立商品资料库。"
  }
};

export default function CheckoutPage({ searchParams }: { searchParams: { plan?: string } }) {
  const selectedPlan = plans[(searchParams.plan || "Growth") as keyof typeof plans] || plans.Growth;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-sm font-semibold text-slate-500">套餐开通</p>
        <h1 className="mt-2 text-4xl font-bold leading-tight text-ink">添加微信，确认需求后开通额度</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          为了避免买错套餐，当前采用微信确认开通。请扫码添加微信，备注你的登录邮箱、套餐和 SKU 数量，我们确认后为账号开通额度。
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="text-sm font-semibold text-slate-500">当前选择</p>
              <h2 className="mt-2 text-4xl font-bold text-ink">{selectedPlan.name}</h2>
              <p className="mt-2 text-slate-600">
                {selectedPlan.sku} · {selectedPlan.description}
              </p>
            </div>
            <p className="rounded-lg bg-ink px-4 py-3 text-3xl font-bold text-white">{selectedPlan.price}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              ["1", "先注册 / 登录", "用邮箱和密码注册账号，后续额度会开通到这个邮箱。"],
              ["2", "添加微信", "扫码添加微信，备注登录邮箱、套餐名和预计 SKU 数量。"],
              ["3", "确认开通", "确认需求和付款后，我们在后台开通对应 SKU 额度。"]
            ].map(([number, title, body]) => (
              <div key={title} className="rounded-lg bg-mist p-4">
                <div className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-ink">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/login" className="rounded-lg bg-ink px-5 py-3 text-center font-semibold text-white shadow-soft">
              先注册 / 登录
            </Link>
            <Link
              href={`/contact?plan=${encodeURIComponent(`${selectedPlan.name} ${selectedPlan.sku}`)}&payment=wechat`}
              className="rounded-lg border border-line bg-white px-5 py-3 text-center font-semibold text-ink"
            >
              已添加微信，提交信息
            </Link>
          </div>
        </article>

        <article className="rounded-lg border border-line bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-[1fr_220px] md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-500">微信咨询</p>
              <h2 className="mt-2 text-3xl font-bold text-ink">扫码添加微信</h2>
              <p className="mt-3 leading-7 text-slate-600">
                添加时建议备注：
                <span className="mt-2 block rounded-md bg-mist px-3 py-2 text-sm font-semibold text-ink">
                  留材库 + 登录邮箱 + {selectedPlan.name} + {selectedPlan.sku}
                </span>
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                例如：留材库 uno@example.com Growth 50 个 SKU
              </p>
            </div>
            <div className="rounded-lg border border-line bg-mist p-3">
              <img src="/images/contact/wechat-contact.jpg" alt="添加微信开通留材库套餐" className="mx-auto w-full rounded-md object-contain" />
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-line bg-mist p-4">
            <h3 className="font-semibold text-ink">你会得到什么</h3>
            <div className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              {["英文 Listing", "产品信息卡", "包装说明", "风险检查", "QR 产品页", "可打印资料包"].map((item) => (
                <span key={item} className="rounded-md bg-white px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
