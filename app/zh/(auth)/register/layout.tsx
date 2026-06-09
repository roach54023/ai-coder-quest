import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

export const metadata: Metadata = {
  title: "注册 VibeCamp",
  description: "注册 VibeCamp，开始免费的 AI 编程教程，保存学习进度并完成真实项目。",
  alternates: {
    canonical: `${siteUrl}/zh/register`,
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

export default function ZhRegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
