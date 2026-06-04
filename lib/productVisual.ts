import type { ProductInput } from "@/lib/productTypes";

const palettes = [
  { bg: "#f8fafc", panel: "#ffffff", ink: "#0f172a", accent: "#0f766e", line: "#dbe3ea" },
  { bg: "#f7f5f0", panel: "#ffffff", ink: "#111827", accent: "#92400e", line: "#e6dfd2" },
  { bg: "#f5f7fb", panel: "#ffffff", ink: "#111827", accent: "#1d4ed8", line: "#d7deea" },
  { bg: "#f6f8f4", panel: "#ffffff", ink: "#17201a", accent: "#166534", line: "#d9e4d2" }
];

function hashText(value: string) {
  return value.split("").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 9973, 7);
}

function clean(value: string, fallback: string) {
  return value.trim() || fallback;
}

function escapeSvg(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shortLine(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > maxLength ? `${normalized.slice(0, maxLength - 1)}...` : normalized;
}

export function createProductVisualDataUri(product: ProductInput) {
  const palette = palettes[hashText(`${product.sku}-${product.category}`) % palettes.length];
  const name = escapeSvg(shortLine(clean(product.productName, "Untitled Product"), 34));
  const sku = escapeSvg(shortLine(clean(product.sku, "SKU"), 24));
  const category = escapeSvg(shortLine(product.category, 28));
  const material = escapeSvg(shortLine(clean(product.materials, "Materials to be confirmed"), 42));
  const use = escapeSvg(shortLine(clean(product.intendedUse, "Intended use to be confirmed"), 42));

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="${palette.bg}"/>
  <rect x="72" y="72" width="1056" height="756" rx="36" fill="${palette.panel}" stroke="${palette.line}" stroke-width="2"/>
  <rect x="112" y="112" width="976" height="260" rx="28" fill="${palette.ink}"/>
  <text x="152" y="180" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="700" fill="#cbd5e1">LiucaiKu SKU Visual</text>
  <text x="152" y="258" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#ffffff">${name}</text>
  <text x="152" y="322" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#dbeafe">${sku} · ${category} · ${escapeSvg(product.targetMarket)}</text>
  <circle cx="960" cy="230" r="86" fill="${palette.accent}" opacity="0.92"/>
  <path d="M910 232h100M960 182v100" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
  <rect x="112" y="430" width="460" height="178" rx="24" fill="${palette.bg}" stroke="${palette.line}" stroke-width="2"/>
  <text x="148" y="492" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">Materials</text>
  <text x="148" y="546" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${palette.ink}">${material}</text>
  <rect x="628" y="430" width="460" height="178" rx="24" fill="${palette.bg}" stroke="${palette.line}" stroke-width="2"/>
  <text x="664" y="492" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="${palette.ink}">Intended Use</text>
  <text x="664" y="546" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${palette.ink}">${use}</text>
  <rect x="112" y="666" width="976" height="88" rx="24" fill="#ffffff" stroke="${palette.line}" stroke-width="2"/>
  <text x="148" y="720" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="${palette.ink}">Generated from seller-provided product fields. Replace with real product photos when available.</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
