import type { Metadata, Viewport } from "next";
import { Unbounded, Figtree, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const displayFont = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chegolin.ru";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Алексей Чеголин — Таргетолог | Яндекс.Директ и VK Реклама",
    template: "%s | Алексей Чеголин",
  },
  description:
    "Настройка и ведение рекламы в Яндекс.Директ и VK Рекламе. Привожу целевые лиды без слива бюджета. Data-driven подход, AI-инструменты, прозрачная отчётность.",
  authors: [{ name: "Алексей Чеголин" }],
  creator: "Алексей Чеголин",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Алексей Чеголин — Таргетолог | Яндекс.Директ и VK Реклама",
    description:
      "Настройка и ведение рекламы в Яндекс.Директ и VK Рекламе. Привожу целевые лиды без слива бюджета.",
    type: "website",
    locale: "ru_RU",
    siteName: "Алексей Чеголин — Таргетолог",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#FCFAF7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <body className="min-h-screen">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999]
                     focus:px-4 focus:py-2 focus:bg-amber focus:text-white focus:rounded-full focus:outline-none"
        >
          Пропустить навигацию
        </a>

        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
