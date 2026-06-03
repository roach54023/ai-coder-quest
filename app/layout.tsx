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
    default: "VibeCamp - Free Vibe Coding Course for Beginners",
    template: "%s | VibeCamp",
  },
  description:
    "VibeCamp is a free vibe coding course for beginners. Learn AI coding with Claude Code, Codex, Trae, Cursor, or Windsurf through 26 hands-on levels that help you build and deploy real products.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "VibeCamp Vibe Coding Course for Beginners",
  description:
    "A free AI coding course for beginners. Learn vibe coding through 26 hands-on levels using Claude Code, Codex, Trae, Cursor, or Windsurf to build and deploy real products.",
  provider: {
    "@type": "Organization",
    name: "VibeCamp",
    url: siteUrl,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    inLanguage: "en",
  },
  educationalLevel: "Beginner",
  inLanguage: "en",
  isAccessibleForFree: true,
  url: siteUrl,
  teaches: [
    "Vibe coding workflow",
    "Claude Code basics",
    "OpenAI Codex basics",
    "AI coding tools",
    "React frontend development",
    "Next.js full-stack development",
    "Supabase database basics",
    "Vercel deployment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
