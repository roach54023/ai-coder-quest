import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import HomeClientEn from "./HomeClientEn";

import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Vibe Coding Course for Beginners | VibeCamp",
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
    "AI coding projects",
  ],
  openGraph: {
    title: "Vibe Coding Course for Beginners | VibeCamp",
    description:
      "Learn AI coding without memorizing programming languages. Build and deploy real products through 26 hands-on vibe coding levels.",
    url: `${siteUrl}/`,
    siteName: "VibeCamp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VibeCamp vibe coding course for beginners",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Course for Beginners | VibeCamp",
    description:
      "A free, hands-on vibe coding course for beginners who want to build real products with AI coding tools.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
      en: `${siteUrl}/`,
      "zh-CN": `${siteUrl}/zh`,
    },
  },
};

const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${siteUrl}/#vibe-coding-course`,
    name: "Vibe Coding Course for Beginners",
    description:
      "A free AI coding course for beginners. Learn vibe coding through 26 hands-on levels using Claude Code, Codex, Trae, Cursor, or Windsurf to build and deploy real products.",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.png`,
    educationalLevel: "Beginner",
    inLanguage: "en",
    isAccessibleForFree: true,
    teaches: [
      "Vibe coding workflow",
      "AI coding tools",
      "Prompting for code generation",
      "React frontend development",
      "Next.js full-stack development",
      "Supabase database basics",
      "Vercel deployment",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/register`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      inLanguage: "en",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this vibe coding course for complete beginners?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. VibeCamp is designed for people who have never coded before. The course teaches beginners how to describe product behavior, inspect AI-generated code, fix issues, and ship real web projects.",
        },
      },
      {
        "@type": "Question",
        name: "Which AI coding tool should I use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Claude Code, Codex, Trae, Cursor, and Windsurf can all work for this course. VibeCamp focuses on durable AI coding workflow rather than one tool's interface.",
        },
      },
      {
        "@type": "Question",
        name: "Will I build deployable projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Each chapter has a concrete deliverable, including a live page, portfolio, Next.js app, database features, AI features, and a launch-ready product flow.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vibe Coding Course",
        item: `${siteUrl}/`,
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <HomeClientEn />
    </>
  );
}
