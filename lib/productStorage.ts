import { ProductInput, sampleProduct } from "@/lib/productTypes";

export const PRODUCT_STORAGE_KEY = "product-info-pack-generator-products-v1";
export const FREE_SKU_LIMIT = 3;

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

export function getFreeQuotaUsage(): number {
  return getProducts().length;
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

function encodeBase64Url(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function decodeBase64Url(value: string): string {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = window.atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

export function encodeProductForShare(product: ProductInput): string {
  if (typeof window === "undefined") {
    return "";
  }

  return encodeBase64Url(JSON.stringify(product));
}

export function decodeProductFromShare(value: string | null): ProductInput | null {
  if (!value || typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(decodeBase64Url(value)) as ProductInput;
  } catch {
    return null;
  }
}

export function getShareableProductUrl(product: ProductInput, route: "product" | "pack" | "print" = "product"): string {
  const path = getShareableProductPath(product, route);

  if (typeof window === "undefined") {
    return path;
  }

  return `${window.location.origin}${path}`;
}

export function getShareableProductPath(product: ProductInput, route: "product" | "pack" | "print" = "product"): string {
  const encodedSku = encodeURIComponent(product.sku);

  if (typeof window === "undefined") {
    return `/${route}/${encodedSku}`;
  }

  const data = encodeProductForShare(product);
  return `/${route}/${encodedSku}${data ? `?data=${data}` : ""}`;
}
