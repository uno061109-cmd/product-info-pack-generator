import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "留材库 Product Pack | 跨境 SKU 资料包代整理服务",
  description:
    "留材库 Product Pack 为中国跨境电商卖家把 SKU 信息整理成英文 Listing、QR 产品页、包装说明和可打印 Product Info Pack。"
};

const navItems = [
  { href: "/", label: "首页 Home" },
  { href: "/dashboard", label: "控制台 Dashboard" },
  { href: "/create", label: "创建资料包 Create" },
  { href: "/pricing", label: "方案 Pricing" },
  { href: "/contact", label: "咨询 Contact" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-mist text-ink antialiased">
        <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/liucai-pack-logo.svg" alt="留材库 Product Pack logo" className="h-11 w-11 rounded-lg shadow-soft" />
              <span>
                <span className="block text-base font-semibold text-ink">留材库 Product Pack</span>
                <span className="block text-xs text-slate-500">跨境 SKU 资料包代整理服务</span>
              </span>
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-line bg-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
            <p>© 2026 留材库 Product Pack. Built for cross-border product documentation workflows.</p>
            <p>
              本服务仅用于商品资料整理和上架准备，不构成法律建议、合规认证或官方 Digital Product Passport 认证。
              This Product Info Pack is generated for product documentation and listing preparation purposes only. It is
              not legal advice, compliance certification, or official Digital Product Passport certification. Sellers
              should verify applicable regulations and platform requirements before using the information commercially.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
