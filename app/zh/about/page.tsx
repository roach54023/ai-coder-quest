import Link from "next/link";
import { CheckCircle2, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RANKS } from "@/lib/content/ranks";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

export const metadata: Metadata = {
  title: "什么是 AI 编程（Vibe Coding）零基础入门指南",
  description: "什么是 AI 编程？Vibe Coding 是 2025 年最重要的新技能。不学编程语言，用自然语言指挥 Claude Code / Trae 写代码，零基础 3-5 周做出可上线的真实产品。",
  keywords: [
    "什么是 AI 编程",
    "Vibe Coding 是什么",
    "AI 编程入门",
    "Claude Code 教程",
    "Trae 教程",
    "零基础 AI 编程",
    "AI 编程工具对比",
  ],
  openGraph: {
    title: "什么是 AI 编程（Vibe Coding）零基础入门指南 | VibeCamp",
    description: "什么是 AI 编程？不学编程语言，用自然语言指挥 AI 写代码。零基础 3-5 周做出可上线的真实产品。",
    url: `${siteUrl}/zh/about`,
    siteName: "VibeCamp",
    locale: "zh_CN",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "什么是 AI 编程 Vibe Coding 入门指南" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "什么是 AI 编程（Vibe Coding）零基础入门指南 | VibeCamp",
    description: "什么是 AI 编程？不学编程语言，用自然语言指挥 AI 写代码。零基础 3-5 周做出可上线的真实产品。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/zh/about`,
    languages: {
      "zh-CN": `${siteUrl}/zh/about`,
      en: `${siteUrl}/about`,
    },
  },
};

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "什么是 AI 编程（Vibe Coding）？零基础入门指南",
    description: "什么是 AI 编程？Vibe Coding 是 2025 年最重要的新技能。不学编程语言，用自然语言指挥 Claude Code / Trae 写代码，零基础 3-5 周做出可上线的真实产品。",
    url: `${siteUrl}/zh/about`,
    inLanguage: "zh-CN",
    isPartOf: { "@id": `${siteUrl}/#website` },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "AI 编程（Vibe Coding）需要编程基础吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "完全不需要。你不需要学任何编程语言，只需要学会如何用自然语言指挥 AI 帮你写代码。会打字、会上网就够了。",
        },
      },
      {
        "@type": "Question",
        name: "Claude Code、Trae、Codex 用哪个？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trae 是字节跳动出品，国内用户无需翻墙，完全免费，推荐优先试试。Claude Code 代码理解力强，Codex 有图形界面对零基础最友好。",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI 编程教程", item: `${siteUrl}/zh` },
      { "@type": "ListItem", position: 2, name: "什么是 AI 编程", item: `${siteUrl}/zh/about` },
    ],
  },
];

const tools = [
  {
    name: "Trae",
    tag: "国内推荐",
    color: "#6366F1",
    desc: "字节跳动出品，国内直连无需翻墙，有图形界面，零基础首选",
  },
  {
    name: "Claude Code",
    tag: "代码最强",
    color: "#10B981",
    desc: "Anthropic 出品，代码理解力最强，适合有一定基础的开发者",
  },
  {
    name: "Codex",
    tag: "OpenAI 出品",
    color: "#F59E0B",
    desc: "OpenAI 旗下，与 GitHub Copilot 同源，生态最完善",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <JsonLd data={aboutJsonLd} />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/zh" className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
              <rect width="512" height="512" rx="115" fill="#6C47FF"/>
              <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-base text-gray-900">VibeCamp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="/zh/about" className="text-gray-900 font-medium">什么是 AI 编程</Link>
            <Link href="/zh#journey" className="hover:text-gray-900 transition-colors">课程地图</Link>
            <Link href="/zh/stories" className="hover:text-gray-900 transition-colors">学员案例</Link>
          </nav>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
            <a href="/zh/register">开始闯关 →</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-5 font-medium">What is Vibe Coding</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-gray-900">
            什么是 AI 编程
            <br />
            <span className="text-indigo-600">（Vibe Coding）？</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
            传统编程要背语法、记 API、调 bug，门槛极高。AI 编程完全不同——
            你只需要用中文描述你想要什么，AI 帮你写出代码。
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* 对比 */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {/* 传统编程 */}
            <div className="border border-gray-100 rounded-2xl p-7">
              <div className="text-sm font-bold text-red-500 mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-xs">✕</span>
                传统编程
              </div>
              <ul className="space-y-3 text-sm text-gray-500">
                {[
                  "先学 HTML / CSS / JavaScript，至少 3 个月",
                  "记住几百个 API 和语法规则",
                  "一个 bug 可能卡你几天",
                  "从入门到做出产品，1-2 年起步",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-300 mt-0.5 shrink-0">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI 编程 */}
            <div className="border border-indigo-100 bg-indigo-50/40 rounded-2xl p-7">
              <div className="text-sm font-bold text-indigo-600 mb-5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-xs">✓</span>
                AI 编程（Vibe Coding）
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "用中文描述需求，AI 立刻生成代码",
                  "不需要记语法，专注于「想做什么」",
                  "遇到 bug 直接告诉 AI，秒级修复",
                  "零基础 3-5 周做出可上线的真实产品",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 工具对比 */}
          <div className="border border-gray-100 rounded-2xl p-7">
            <h2 className="text-base font-bold text-gray-900 mb-5">主流 AI 编程工具对比</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-xl p-4 border border-gray-100"
                  style={{ background: tool.color + "08" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">{tool.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: tool.color + "18", color: tool.color }}
                    >
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* 段位系统 */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-medium">Rank System</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">学到哪，能做什么</h2>
            <p className="text-gray-400 max-w-xl text-sm">
              每个段位对应真实的开发能力。完成关卡获得 XP，XP 累计自动晋升。
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {RANKS.map((rank) => (
              <div
                key={rank.id}
                className="relative border rounded-2xl p-5 text-center hover:border-gray-200 transition-all overflow-hidden flex flex-col items-center justify-center min-h-[160px] group bg-white"
                style={{ borderColor: rank.badge_color + "25" }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${rank.badge_color}, transparent)` }}
                />
                <div
                  className="relative w-11 h-11 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: rank.badge_color + "12", border: `1.5px solid ${rank.badge_color}30` }}
                >
                  {rank.badge_icon}
                </div>
                <div className="relative text-sm font-bold text-gray-900 mb-1 leading-tight">{rank.name}</div>
                <div className="relative text-xs text-gray-400 mb-2 leading-snug text-center px-1">{rank.subtitle}</div>
                <div className="relative text-xs font-bold mt-auto" style={{ color: rank.badge_color }}>
                  {rank.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded flex-shrink-0">
                <rect width="512" height="512" rx="115" fill="#6C47FF"/>
                <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
              </svg>
              <span className="font-bold text-gray-900">VibeCamp</span>
            </div>
            <p className="text-sm text-gray-400">AI 编程教程训练营 · 游戏化学习，做出真产品</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/zh/stories" className="hover:text-gray-900 transition-colors">学员案例</Link>
            <Link href="/zh/projects" className="hover:text-gray-900 transition-colors">实战项目库</Link>
            <Link href="https://github.com/roach54023/ai-coder-quest" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <ExternalLink className="h-3 w-3" />GitHub
            </Link>
            <Link href="mailto:roach54023@qq.com" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Mail className="h-3 w-3" />联系
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
