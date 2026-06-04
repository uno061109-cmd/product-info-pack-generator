import { analyzeMissingInfo } from "@/lib/generatePack";
import { ProductInput } from "@/lib/productTypes";

export function MissingInfoPanel({ product, compact = false }: { product: ProductInput; compact?: boolean }) {
  const analysis = analyzeMissingInfo(product);
  const items = [...analysis.missingFields, ...analysis.recommendations];
  const statusLabel = {
    Draft: "草稿 Draft",
    "Missing Info": "缺信息 Missing Info",
    Ready: "可生成 Ready"
  }[analysis.status];

  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-slate-500">缺失信息检查 Missing Info Checker</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">{analysis.completionPercentage}% 完成</h2>
          <p className="mt-2 text-sm text-slate-600">
            已填写 {analysis.completedRequiredFields} / {analysis.totalRequiredFields} 个必填字段
          </p>
        </div>
        <span
          className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
            analysis.status === "Ready"
              ? "bg-emerald-50 text-emerald-700"
              : analysis.status === "Draft"
                ? "bg-slate-100 text-slate-600"
                : "bg-amber-50 text-amber-700"
          }`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="mt-5 h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-ink"
          style={{ width: `${Math.max(8, analysis.completionPercentage)}%` }}
        />
      </div>
      {!compact && (
        <div className="mt-5">
          {items.length > 0 ? (
            <ul className="space-y-2 text-sm text-slate-700">
              {items.map((item) => (
                <li key={item} className="rounded-md border border-line bg-mist px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              当前规则没有发现缺失信息。No missing information detected by the current rules.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
