export type PlanKey = "Free" | "Starter" | "Growth" | "Bulk";

export type SubscriptionRecord = {
  user_id: string;
  email: string | null;
  plan: PlanKey;
  sku_limit: number;
  status: "active" | "paused";
  payment_note: string | null;
  updated_at?: string;
  created_at?: string;
};

export const subscriptionPlans: Record<PlanKey, { label: string; price: string; skuLimit: number }> = {
  Free: { label: "Free", price: "¥0", skuLimit: 3 },
  Starter: { label: "Starter", price: "¥39", skuLimit: 20 },
  Growth: { label: "Growth", price: "¥359", skuLimit: 50 },
  Bulk: { label: "Bulk", price: "¥999", skuLimit: 100 }
};

export function getPlanBySkuLimit(skuLimit: number): PlanKey {
  if (skuLimit >= subscriptionPlans.Bulk.skuLimit) {
    return "Bulk";
  }

  if (skuLimit >= subscriptionPlans.Growth.skuLimit) {
    return "Growth";
  }

  if (skuLimit >= subscriptionPlans.Starter.skuLimit) {
    return "Starter";
  }

  return "Free";
}

export function isPlanKey(value: unknown): value is PlanKey {
  return typeof value === "string" && value in subscriptionPlans;
}

export function parseAdminEmails(value: string | undefined): string[] {
  return (value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}
