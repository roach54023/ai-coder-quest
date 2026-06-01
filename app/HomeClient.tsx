"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { LayoutDashboard, LogOut } from "lucide-react";
import {
  ArrowRight,
  Terminal,
  Code2,
  Layers,
  ExternalLink,
  Mail,
  Zap,
  Globe,
  Database,
  ChevronRight,
  TrendingUp,
  Clock,
  Trophy,
  Flame,
  Swords,
  Star,
  Sparkles,
} from "lucide-react";

// ─── 闯关地图数据 ────────────────────────────────────────────────────────────

const journey = [
  {
    chapter: "序章",
    chapterEn: "PROLOGUE",
    title: "认识 AI 编程工具",
    desc: "安装 Claude Code / Codex / Trae，跑通第一个 AI 生成的页面。",
    icon: Terminal,
    levelStart: "0-1",
    chapterId: "prologue",
    color: "#6366F1",
    levels: [
      { id: "0-1", title: "安装 AI 编程助手", desc: "10 分钟装好 Claude Code 或 Trae", xp: 50, unlocked: true },
      { id: "0-2", title: "第一个 AI 生成的页面", desc: "用自然语言让 AI 写出你的第一个网页", xp: 100, unlocked: true },
    ],
  },
  {
    chapter: "第一章",
    chapterEn: "CHAPTER 1",
    title: "做出第一个静态网站",
    desc: "学会写 Prompt，用 AI 做出个人名片、作品集，发布到互联网。",
    icon: Code2,
    levelStart: "1-1",
    chapterId: "chapter_1",
    color: "#10B981",
    levels: [
      { id: "1-1", title: "Prompt 核心技巧", desc: "学会下指令，让 AI 精确理解你的需求", xp: 120, unlocked: true },
      { id: "1-2", title: "个人名片页", desc: "做一个可以发给别人的自我介绍页面", xp: 150, unlocked: false },
      { id: "1-3", title: "多页作品集", desc: "把多个页面组合成完整网站", xp: 200, unlocked: false },
    ],
  },
  {
    chapter: "第二章",
    chapterEn: "CHAPTER 2",
    title: "工程化：React + Tailwind",
    desc: "从 HTML 文件升级到前端工程。组件化开发，响应式布局，做工具站的基础。",
    icon: Zap,
    levelStart: "2-1",
    chapterId: "chapter_2",
    color: "#F59E0B",
    levels: [
      { id: "2-1", title: "搭建 Next.js 项目", desc: "用 AI 初始化一个真正的前端工程", xp: 200, unlocked: false },
      { id: "2-2", title: "组件化思维", desc: "把页面拆成可复用的积木", xp: 250, unlocked: false },
      { id: "2-3", title: "响应式布局", desc: "手机和电脑都好看", xp: 200, unlocked: false },
      { id: "2-4", title: "部署上线", desc: "免费发布到 Vercel，全球可访问", xp: 300, unlocked: false },
    ],
  },
  {
    chapter: "第三章",
    chapterEn: "CHAPTER 3",
    title: "接入 AI 能力",
    desc: "调用 OpenAI API、生图 API，把 AI 能力嵌进自己的产品。",
    icon: Layers,
    levelStart: "3-1",
    chapterId: "chapter_3",
    color: "#EC4899",
    levels: [
      { id: "3-1", title: "调用 OpenAI API", desc: "给你的网站加上对话能力", xp: 350, unlocked: false },
      { id: "3-2", title: "流式输出", desc: "像 ChatGPT 一样逐字显示", xp: 400, unlocked: false },
      { id: "3-3", title: "接入生图 API", desc: "文字生成图片，嵌入你的产品", xp: 450, unlocked: false },
    ],
  },
  {
    chapter: "第四章",
    chapterEn: "CHAPTER 4",
    title: "全栈：后端 + 数据库 + 支付",
    desc: "Next.js API、Supabase 数据库、用户登录、Stripe 支付。做完这章能做完整 SaaS。",
    icon: Database,
    levelStart: "4-1",
    chapterId: "chapter_4",
    color: "#0EA5E9",
    levels: [
      { id: "4-1", title: "API 路由", desc: "写后端接口，处理数据", xp: 500, unlocked: false },
      { id: "4-2", title: "Supabase 数据库", desc: "存储用户数据，读写自如", xp: 550, unlocked: false },
      { id: "4-3", title: "用户登录系统", desc: "注册、登录、权限控制", xp: 600, unlocked: false },
      { id: "4-4", title: "Stripe 支付", desc: "接入支付，开始收钱", xp: 700, unlocked: false },
    ],
  },
  {
    chapter: "第五章",
    chapterEn: "CHAPTER 5",
    title: "上线，让全世界用",
    desc: "GitHub 管理代码、Vercel 部署、SEO 优化。把产品真正推到用户面前。",
    icon: Globe,
    levelStart: "5-1",
    chapterId: "chapter_5",
    color: "#F97316",
    levels: [
      { id: "5-1", title: "GitHub 版本管理", desc: "代码不丢失，多人协作", xp: 600, unlocked: false },
      { id: "5-2", title: "Vercel 生产部署", desc: "自定义域名，HTTPS，全球 CDN", xp: 650, unlocked: false },
      { id: "5-3", title: "SEO 基础优化", desc: "让 Google 找到你的产品", xp: 700, unlocked: false },
    ],
  },
];

const faqs = [
  {
    q: "AI 编程（Vibe Coding）需要编程基础吗？",
    a: "完全不需要。你不需要学任何编程语言，只需要学会如何用自然语言指挥 AI 帮你写代码。会打字、会上网就够了。",
  },
  {
    q: "Claude Code、Codex、Trae 用哪个？",
    a: "三个都可以完成本课程所有关卡。Trae 是字节跳动出品，国内用户无需翻墙，完全免费，推荐优先试试。Claude Code 代码理解力强，Codex 有图形界面对零基础最友好。",
  },
  {
    q: "有编程基础，可以跳过前几关吗？",
    a: "完全可以。每一关都是独立的，你可以直接从任意章节开始。段位系统基于累计 XP 计算，跳关入场完全不影响。",
  },
  {
    q: "这个课程要收费吗？",
    a: "核心关卡内容完全免费开放。游戏化互动让学习更有趣，你可以按自己的节奏闯关，没有任何强制付费墙。",
  },
];

// ─── 组件 ────────────────────────────────────────────────────────────────────

export default function HomeClient() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">

      {/* ── 背景网格纹理 ── */}
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

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0" aria-hidden="true">
              <rect width="512" height="512" rx="115" fill="#6C47FF"/>
              <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-base tracking-tight text-white">VibeCamp</span>
            <span className="hidden sm:inline-block text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full ml-1">
              BETA
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400" aria-label="主导航">
            <Link href="/zh/about" className="hover:text-white transition-colors">什么是 AI 编程</Link>
            <Link href="/zh/projects" className="hover:text-white transition-colors">实战项目</Link>
            <Link href="#journey" className="hover:text-white transition-colors">闯关地图</Link>
            <Link href="/zh/stories" className="hover:text-white transition-colors">学员案例</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : user ? (
              <>
                <Link
                  href="/zh/dashboard"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                    {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="hidden sm:inline">{user.name ?? user.email}</span>
                </Link>
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-4 shadow-lg shadow-indigo-500/20 gap-1.5"
                  asChild
                >
                  <Link href="/zh/dashboard">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    我的闯关
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-white px-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
                  <a href="/zh/login">登录</a>
                </Button>
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5 shadow-lg shadow-indigo-500/20"
                  asChild
                >
                  <a href="/zh/register">开始闯关 →</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 px-6 text-center" aria-labelledby="hero-h1">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
            style={{ background: "radial-gradient(ellipse at center top, rgba(99,102,241,0.18) 0%, transparent 65%)" }}
          />
          <div
            className="absolute top-20 left-1/4 w-[400px] h-[400px] blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-20 right-1/4 w-[300px] h-[300px] blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 rounded-full px-4 py-1.5 mb-8 text-sm text-indigo-300">
            <Flame className="h-3.5 w-3.5 text-orange-400" />
            <span>Vibe Coding · 游戏化 AI 编程训练营</span>
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          </div>

          <h1
            id="hero-h1"
            className="text-5xl md:text-7xl font-black tracking-tight mb-4 leading-[1.05]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 40%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI 编程教程
            <br />
            零基础做出真产品
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Vibe Coding 是 2025 年最重要的新技能——
            <br className="hidden md:block" />
            不学编程语言，用自然语言指挥 Claude Code / Trae 写代码，
            <br className="hidden md:block" />
            26 个实战关卡，每关都有可上线的真实产出。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-base px-8 h-13 shadow-xl shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:-translate-y-0.5"
              asChild
            >
              <a href="/zh/register">
                <Swords className="mr-2 h-4 w-4" />
                免费开始闯关
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 h-13 border-white/10 text-gray-300 hover:border-white/30 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
              asChild
            >
              <Link href="/zh/about">什么是 AI 编程？</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: Code2, text: "零基础可学" },
              { icon: Zap, text: "每关有产出" },
              { icon: Globe, text: "学完能上线" },
              { icon: TrendingUp, text: "副业变现路径" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-sm text-gray-400 bg-white/[0.04] border border-white/[0.07] rounded-full px-4 py-1.5">
                <Icon className="h-3.5 w-3.5 text-indigo-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* 快速入口卡片 */}
          <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { href: "/stories", emoji: "🏆", label: "学员案例", sub: "零基础 3-5 周做出有收入的产品" },
              { href: "/projects", emoji: "🚀", label: "实战项目库", sub: "6 个真实可上线的项目模板" },
              { href: "/about", emoji: "💡", label: "什么是 AI 编程", sub: "Vibe Coding 与传统编程的区别" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-5 py-4 hover:border-indigo-500/30 hover:bg-indigo-500/[0.05] transition-all"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 truncate">{item.sub}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 互动闯关地图 ── */}
      <section id="journey" className="py-24 px-6 border-t border-white/[0.06]" aria-labelledby="journey-h2">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-medium">Quest Map</p>
            <h2 id="journey-h2" className="text-4xl md:text-5xl font-black text-white mb-4">
              互动闯关地图：从零到独立开发
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              26 个关卡，每关结束都有可以展示的产出。有基础可以直接跳到感兴趣的章节。
            </p>
          </div>

          <div className="space-y-5">
            {journey.map((stage) => (
              <div
                key={stage.chapter}
                className="bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-white/10 transition-all"
                style={{ boxShadow: `0 0 40px -15px ${stage.color}15` }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 border-b border-white/5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: stage.color + "20", border: `1px solid ${stage.color}30` }}
                  >
                    <stage.icon className="h-5 w-5" style={{ color: stage.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold tracking-widest" style={{ color: stage.color }}>
                        {stage.chapterEn}
                      </span>
                      <span className="text-xs text-gray-600">·</span>
                      <span className="text-xs text-gray-500">{stage.levels.length} 个关卡</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{stage.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 max-w-sm leading-relaxed hidden md:block">{stage.desc}</p>
                  <Link
                    href={`/levels/${stage.chapterId}/${stage.levelStart}`}
                    className="shrink-0 text-sm font-medium px-4 py-2 rounded-full border transition-all hover:text-white hover:brightness-110"
                    style={{
                      borderColor: stage.color + "40",
                      color: stage.color,
                      backgroundColor: stage.color + "10",
                    }}
                  >
                    进入章节 →
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.03]">
                  {stage.levels.map((level) => (
                    <Link
                      key={level.id}
                      href={`/levels/${stage.chapterId}/${level.id}`}
                      className="group bg-[#0A0A0F] p-5 hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="font-mono px-2.5 py-1 rounded-md text-xs font-bold"
                          style={{ background: stage.color + "22", color: stage.color }}
                        >
                          {level.id}
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-300 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div className="font-bold text-gray-100 text-sm mb-1.5 group-hover:text-white transition-colors leading-snug">{level.title}</div>
                      <div className="text-xs text-gray-500 leading-relaxed mb-3">{level.desc}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" style={{ color: stage.color }} />
                        <span className="text-[11px] font-bold" style={{ color: stage.color + 'cc' }}>+{level.xp} XP</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6 border-t border-white/[0.06]" aria-labelledby="faq-h2">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">FAQ</p>
            <h2 id="faq-h2" className="text-4xl font-bold text-white">常见问题</h2>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <div key={index} className="py-6 border-b border-white/[0.06] last:border-0">
                <h3 className="font-semibold text-gray-100 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 text-center relative overflow-hidden border-t border-white/[0.06]" aria-labelledby="cta-h2">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
          <div className="w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs text-purple-400 uppercase tracking-widest mb-6">Start Building</p>
          <h2
            id="cta-h2"
            className="text-5xl md:text-7xl font-black text-white mb-4 leading-[1.05] tracking-tight"
          >
            从第一关开始，
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #A78BFA 0%, #60A5FA 100%)' }}>
              或者直接跳关。
            </span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">
            不用从头来，有基础的直接选章节入场。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-white rounded-full text-base px-10 h-12 font-semibold shadow-lg shadow-purple-500/20"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)' }}
              asChild
            >
              <a href="/zh/register">
                开始闯关 <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 h-12 border-white/10 text-gray-300 hover:border-white/30 hover:text-white bg-transparent"
              asChild
            >
              <Link href="#journey">查看课程地图</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/[0.06]" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded flex-shrink-0" aria-hidden="true">
                  <rect width="512" height="512" rx="115" fill="#6C47FF"/>
                  <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
                </svg>
                <span className="font-bold text-white">VibeCamp</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                AI 编程教程训练营。<br />游戏化学习，做出真产品。
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">课程地图</div>
              <nav className="space-y-2.5" aria-label="课程导航">
                <Link href="/zh/levels/prologue/0-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">序章 · 装好工具</Link>
                <Link href="/zh/levels/chapter_1/1-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第一章 · 静态网站</Link>
                <Link href="/zh/levels/chapter_2/2-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第二章 · 工程化</Link>
                <Link href="/zh/levels/chapter_3/3-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第三章 · 接入 AI</Link>
                <Link href="/zh/levels/chapter_4/4-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第四章 · 全栈</Link>
                <Link href="/zh/levels/chapter_5/5-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第五章 · 上线</Link>
              </nav>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">探索</div>
              <nav className="space-y-2.5" aria-label="探索导航">
                <Link href="/zh/stories" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">学员案例</Link>
                <Link href="/zh/projects" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">实战项目库</Link>
                <Link href="/zh/about" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">什么是 AI 编程</Link>
                <Link href="/zh/levels/prologue/0-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">AI 编程工具安装</Link>
              </nav>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">关于</div>
              <nav className="space-y-2.5" aria-label="关于导航">
                <Link
                  href="https://github.com/roach54023/ai-coder-quest"
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-200 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  GitHub 开源
                </Link>
                <Link href="mailto:roach54023@qq.com" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-200 transition-colors">
                  <Mail className="h-3 w-3" aria-hidden="true" />
                  联系我们
                </Link>
              </nav>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] text-xs text-gray-600">
            © 2025 VibeCamp · AI 编程教程训练营
          </div>
        </div>
      </footer>
    </div>
  );
}
