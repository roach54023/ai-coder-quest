import type { Metadata } from "next";
import HomeClientEn from "./HomeClientEn";

export const metadata: Metadata = {
  title: "Vibe Coding Course for Beginners | VibeCamp",
  description:
    "A free vibe coding course for beginners. Learn AI coding with Claude Code, Codex, Trae, Cursor, or Windsurf through 26 hands-on levels that help you build and deploy real products.",
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
    url: "https://vibecamps.org/",
    siteName: "VibeCamp",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Course for Beginners | VibeCamp",
    description:
      "A free, hands-on vibe coding course for beginners who want to build real products with AI coding tools.",
  },
  alternates: {
    canonical: "https://vibecamps.org/",
    languages: {
      en: "https://vibecamps.org/",
      "zh-CN": "https://vibecamps.org/zh",
    },
  },
};

export default function HomePage() {
  return <HomeClientEn />;
}
