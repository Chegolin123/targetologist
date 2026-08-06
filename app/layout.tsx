import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

const bodyFont = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://chegolin.ru";
const BASE_PATH = process.env.NODE_ENV === "production" ? "/targetologist" : "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Алексей Чеголин — Таргетолог | Яндекс.Директ и VK Реклама",
    template: "%s | Чеголин",
  },
  description:
    "Настройка и ведение рекламы в Яндекс.Директ и VK Рекламе. Лиды без слива бюджета. Data-driven подход, AI-инструменты, прозрачная отчётность.",
  authors: [{ name: "Алексей Чеголин" }],
  creator: "Алексей Чеголин",
  manifest: `${BASE_PATH}/manifest.webmanifest`,
  alternates: { canonical: `${BASE_PATH}/` },
  openGraph: {
    title: "Алексей Чеголин — Таргетолог",
    description: "Лиды из рекламы в Яндекс.Директ и VK Рекламе. Без слива бюджета.",
    type: "website",
    locale: "ru_RU",
    siteName: "Чеголин — Таргетолог",
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-lime focus:text-ink focus:rounded-full"
        >
          К контенту
        </a>
        {children}
      </body>
    </html>
  );
}
