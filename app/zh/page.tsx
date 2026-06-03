import type { Metadata } from "next";
import HomeClient from "../HomeClient";

export const metadata: Metadata = {
  title: "AI 编程教程 | Vibe Coding 零基础训练营",
  description:
    "VibeCamp 是专注 AI 编程（Vibe Coding）的游戏化教程平台。零基础用 Claude Code / Trae / Codex 做出真实产品，26 个实战关卡，每关都有可上线的产出。",
  keywords: [
    "AI 编程教程",
    "Vibe Coding",
    "AI 编程",
    "Claude Code 教程",
    "Trae 教程",
    "零基础编程",
    "AI 编程实战项目",
    "AI 编程工具",
    "独立开发",
    "副业变现",
  ],
  openGraph: {
    title: "AI 编程教程 | Vibe Coding 零基础训练营",
    description:
      "不学编程语言，用自然语言指挥 AI 写代码。26 个实战关卡，零基础 3-5 周做出可上线的真实产品。",
    url: "https://vibecamps.org/zh",
    siteName: "VibeCamp",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 编程教程 | Vibe Coding 零基础训练营",
    description:
      "不学编程语言，用自然语言指挥 AI 写代码。26 个实战关卡，零基础 3-5 周做出可上线的真实产品。",
  },
  alternates: {
    canonical: "https://vibecamps.org/zh",
    languages: {
      "zh-CN": "https://vibecamps.org/zh",
      en: "https://vibecamps.org/",
    },
  },
};

export default function ZhHomePage() {
  return <HomeClient />;
}
