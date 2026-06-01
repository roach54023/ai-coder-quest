import Link from "next/link";
import { Terminal, CheckCircle2, ArrowRight, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RANKS } from "@/lib/content/ranks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "什么是 AI 编程（Vibe Coding）· VibeCamp",
  description: "Vibe Coding 是 2025 年最重要的新技能。不学编程语言，用自然语言指挥 Claude Code / Trae 写代码，零基础 3-5 周做出可上线的真实产品。",
};

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
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">

      {/* 背景网格 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">VibeCamp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <Link href="/about" className="text-white">什么是 AI 编程</Link>
            <Link href="/projects" className="hover:text-white transition-colors">实战项目</Link>
            <Link href="/#journey" className="hover:text-white transition-colors">闯关地图</Link>
            <Link href="/stories" className="hover:text-white transition-colors">学员案例</Link>
          </nav>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5" asChild>
            <a href="/register">开始闯关 →</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-36 pb-16 px-6 text-center">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(99,102,241,0.15) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs text-indigo-400 uppercase tracking-widest mb-4 font-medium">What is Vibe Coding</p>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-[1.05]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 40%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            什么是 AI 编程
            <br />（Vibe Coding）？
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            传统编程要背语法、记 API、调 bug，门槛极高。AI 编程完全不同——
            你只需要用中文描述你想要什么，AI 帮你写出代码。
          </p>
        </div>
      </section>

      {/* 对比 */}
      <section className="py-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* 传统编程 */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <div className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-xs">✕</span>
                传统编程
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                {[
                  "先学 HTML / CSS / JavaScript，至少 3 个月",
                  "记住几百个 API 和语法规则",
                  "一个 bug 可能卡你几天",
                  "从入门到做出产品，1-2 年起步",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="text-red-500/60 mt-0.5 shrink-0">✕</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI 编程 */}
            <div className="bg-indigo-500/[0.05] border border-indigo-500/20 rounded-2xl p-6">
              <div className="text-sm font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs">✓</span>
                AI 编程（Vibe Coding）
              </div>
              <ul className="space-y-3 text-sm text-gray-300">
                {[
                  "用中文描述需求，AI 立刻生成代码",
                  "不需要记语法，专注于「想做什么」",
                  "遇到 bug 直接告诉 AI，秒级修复",
                  "零基础 3-5 周做出可上线的真实产品",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 工具对比 */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-4">主流 AI 编程工具对比</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {tools.map((tool) => (
                <div key={tool.name} className="rounded-xl p-4 border border-white/[0.06]" style={{ background: tool.color + "08" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-white">{tool.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: tool.color + "20", color: tool.color }}>
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 段位系统 */}
      <section className="py-16 px-6 border-t border-white/[0.05]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.04) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-medium">Rank System</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">学到哪，能做什么</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              每个段位对应真实的开发能力。完成关卡获得 XP，XP 累计自动晋升。
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {RANKS.map((rank) => (
              <div
                key={rank.id}
                className="relative bg-white/[0.02] border rounded-2xl p-5 text-center hover:bg-white/[0.05] transition-all overflow-hidden flex flex-col items-center justify-center min-h-[180px] group"
                style={{
                  borderColor: rank.badge_color + "30",
                  boxShadow: `0 0 30px -10px ${rank.badge_color}20`,
                }}
              >
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
                  style={{ background: rank.badge_color }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${rank.badge_color}, transparent)` }}
                />
                <div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: rank.badge_color + "18", border: `1.5px solid ${rank.badge_color}40` }}
                >
                  {rank.badge_icon}
                </div>
                <div className="relative text-sm font-bold text-white mb-1 leading-tight">{rank.name}</div>
                <div className="relative text-xs text-gray-500 mb-2 leading-snug text-center px-1">{rank.subtitle}</div>
                <div className="relative text-xs font-bold mt-auto" style={{ color: rank.badge_color }}>
                  {rank.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/[0.06] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">准备好了吗？</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">
            26 个关卡，从零开始，每关都有真实产出。有基础可以直接跳关入场。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-base px-10 h-12 font-semibold shadow-lg shadow-indigo-500/20"
              asChild
            >
              <a href="/register">
                免费开始闯关 <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 h-12 border-white/10 text-gray-300 hover:border-white/30 hover:text-white bg-transparent"
              asChild
            >
              <Link href="/stories">查看学员案例</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span className="font-bold text-white text-sm">VibeCamp</span>
            <span className="text-xs text-gray-600">· AI 编程教程训练营</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/stories" className="hover:text-gray-200 transition-colors">学员案例</Link>
            <Link href="/projects" className="hover:text-gray-200 transition-colors">实战项目库</Link>
            <Link href="https://github.com/roach54023/ai-coder-quest" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              <ExternalLink className="h-3 w-3" />GitHub
            </Link>
            <Link href="mailto:roach54023@qq.com" className="flex items-center gap-1 hover:text-gray-200 transition-colors">
              <Mail className="h-3 w-3" />联系
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
