import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthSessionProvider } from "@/components/auth/session-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { Toaster } from "sonner";
import Script from "next/script";
import { headers } from "next/headers";
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
    default: "VibeCamp - Free Vibe Coding Course for Beginners",
    template: "%s | VibeCamp",
  },
  description:
    "Free vibe coding course for beginners. Learn AI coding with Claude Code, Codex, Trae, Cursor, or Windsurf through 26 hands-on levels and real products.",
  keywords: [
    "vibe coding course",
    "vibe coding course for beginners",
    "AI coding course for beginners",
    "vibe coding tutorial",
    "Claude Code course",
    "Codex course",
    "learn AI coding",
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
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    url: siteUrl,
    siteName: "VibeCamp",
    title: "VibeCamp - Free Vibe Coding Course for Beginners",
    description:
      "Learn AI coding with Claude Code, Codex, Trae, Cursor, or Windsurf. Build and deploy real products through 26 hands-on vibe coding levels.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VibeCamp - Vibe Coding Course for Beginners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeCamp - Free Vibe Coding Course for Beginners",
    description: "Learn AI coding by building and deploying real products through 26 hands-on vibe coding levels.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      en: siteUrl,
      "zh-CN": `${siteUrl}/zh`,
    },
  },
};

const globalJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "VibeCamp",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: ["https://github.com/roach54023/ai-coder-quest"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "VibeCamp",
    url: siteUrl,
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const lang = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh-CN" : "en";

  return (
    <html lang={lang} className="dark">
      <head>
        <JsonLd data={globalJsonLd} />
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
