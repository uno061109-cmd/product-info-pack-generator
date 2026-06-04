import Link from "next/link";

const plans = [
  {
    name: "免费试用",
    price: "¥0",
    line: "适合体验一个 SKU 的完整流程",
    features: ["3 个 SKU 本地资料包", "英文 listing 模板", "可打印 PDF", "公开分享链接演示"]
  },
  {
    name: "基础版",
    price: "¥39/月",
    line: "适合小卖家日常整理商品资料",
    features: ["30 个 SKU", "更多品类模板", "QR 产品页托管待接入", "缺失信息检查"]
  },
  {
    name: "专业版",
    price: "¥99/月",
    line: "适合 SKU 多、需要批量整理的团队",
    features: ["200 个 SKU", "批量导入规划", "团队资料库规划", "优先接入 AI 生成"]
  }
];

const services = [
  ["¥299", "20 个 SKU 资料整理", "适合先试一批饰品、配件或家居 SKU。"],
  ["¥699", "50 个 SKU 资料整理", "适合店铺上新或旧品资料标准化。"],
  ["¥1299", "100 个 SKU 资料整理", "适合需要集中建立商品资料库的小团队。"]
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">商业方案 Pricing</p>
        <h1 className="mt-2 text-4xl font-bold text-ink">先用工具跑通，再用代整理服务变现。</h1>
        <p className="mt-4 leading-7 text-slate-600">
          留材库 Product Pack 第一阶段建议用“免费试用 + 代整理服务 + 订阅意向”验证需求，后续再接数据库、支付和 AI API。
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className="rounded-lg border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">{plan.name}</h2>
            <p className="mt-3 text-3xl font-bold text-ink">{plan.price}</p>
            <p className="mt-3 leading-7 text-slate-600">{plan.line}</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {plan.features.map((feature) => (
                <li key={feature} className="rounded-md bg-mist px-3 py-2">
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={`/contact?plan=${encodeURIComponent(plan.name)}`} className="mt-6 inline-flex rounded-lg bg-ink px-5 py-3 font-semibold text-white">
              预约开通
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-12 rounded-lg border border-line bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">最快变现方式</p>
            <h2 className="mt-2 text-3xl font-bold text-ink">代整理 SKU 资料包服务</h2>
          </div>
          <Link href="/contact?plan=SKU资料代整理" className="rounded-lg border border-line px-5 py-3 font-semibold text-ink transition hover:bg-mist">
            咨询代整理
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {services.map(([price, title, body]) => (
            <div key={title} className="rounded-lg border border-line bg-mist p-5">
              <p className="text-2xl font-bold text-ink">{price}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
