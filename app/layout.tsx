import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthSessionProvider } from "@/components/auth/session-provider";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VibeCamp - 零基础 AI 编程训练营，用 Claude Code / Trae 做出真产品",
    template: "%s | VibeCamp",
  },
  description:
    "VibeCamp 是专为非程序员设计的 AI 编程训练营。26 个实战关卡，用 Claude Code、OpenAI Codex 或 Trae（国内免翻墙）写代码，从零开始做出真实可用的产品并上线。完全免费。",
  keywords: [
    "AI 编程教程",
    "Vibe Coding",
    "Claude Code 教程",
    "Trae 教程",
    "零基础 AI 编程",
    "AI 编程最佳实践",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  authors: [{ name: "VibeCamp", url: siteUrl }],
  creator: "VibeCamp",
  publisher: "VibeCamp",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "VibeCamp",
    title: "VibeCamp - 零基础 AI 编程训练营",
    description:
      "用 Claude Code / Codex / Trae 做出真产品。26 个实战关卡，从零到独立上线。完全免费。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VibeCamp - 零基础 AI 编程训练营",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeCamp - 零基础 AI 编程训练营",
    description: "用 Claude Code / Codex / Trae 做出真产品。26 关，从零到上线。完全免费。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "VibeCamp AI 编程训练营",
  description:
    "专为非程序员设计的 AI 编程训练营，通过 26 个实战关卡学会用 Claude Code、Codex、Trae 写代码，从零开始做出真实产品并上线。",
  provider: {
    "@type": "Organization",
    name: "VibeCamp",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CNY",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    inLanguage: "zh-CN",
  },
  educationalLevel: "Beginner",
  inLanguage: "zh-CN",
  isAccessibleForFree: true,
  url: siteUrl,
  teaches: [
    "Claude Code 使用方法",
    "OpenAI Codex 使用方法",
    "Trae AI 编程工具",
    "vibe coding 方法论",
    "React 前端开发",
    "Next.js 全栈开发",
    "Supabase 数据库",
    "Vercel 部署上线",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7DV9QMDH7N"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7DV9QMDH7N');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
