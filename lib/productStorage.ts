import { ProductInput, sampleProduct } from "@/lib/productTypes";

export const PRODUCT_STORAGE_KEY = "product-info-pack-generator-products-v1";

export function normalizeSku(value: string): string {
  const normalized = value
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || `SKU-${Date.now()}`;
}

export function getProducts(): ProductInput[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(PRODUCT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProductInput[]) : [];
  } catch {
    return [];
  }
}

export function saveProducts(products: ProductInput[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(products));
}

export function upsertProduct(product: ProductInput): ProductInput {
  const sku = normalizeSku(product.sku);
  const products = getProducts();
  const existing = products.find((item) => normalizeSku(item.sku) === sku);
  const now = new Date().toISOString();
  const nextProduct: ProductInput = {
    ...product,
    productName: product.productName.trim() || "Untitled Product",
    sku,
    createdAt: existing?.createdAt || product.createdAt || now,
    updatedAt: now,
    imageUrls: product.imageUrls.map((item) => item.trim()).filter(Boolean)
  };
  const nextProducts = existing
    ? products.map((item) => (normalizeSku(item.sku) === sku ? nextProduct : item))
    : [nextProduct, ...products];

  saveProducts(nextProducts);
  return nextProduct;
}

export function getProductBySku(sku: string): ProductInput | null {
  const normalizedSku = normalizeSku(decodeURIComponent(sku));
  const localProduct = getProducts().find((product) => normalizeSku(product.sku) === normalizedSku);

  if (localProduct) {
    return localProduct;
  }

  if (normalizedSku === normalizeSku(sampleProduct.sku)) {
    return sampleProduct;
  }

  return null;
}

export function getPublicProductUrl(sku: string): string {
  if (typeof window === "undefined") {
    return `/product/${encodeURIComponent(sku)}`;
  }

  return `${window.location.origin}/product/${encodeURIComponent(sku)}`;
}
