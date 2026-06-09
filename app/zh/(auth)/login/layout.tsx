import type { Metadata } from "next";

import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "登录 VibeCamp",
  description: "登录后继续 VibeCamp AI 编程教程，保存闯关进度、提交作品并获得 XP。",
  alternates: {
    canonical: `${siteUrl}/zh/login`,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ZhLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
