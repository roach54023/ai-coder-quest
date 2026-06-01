"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RANKS } from "@/lib/content/ranks";
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
  CheckCircle2,
  MessageSquare,
  GitBranch,
  Repeat2,
} from "lucide-react";

// ─── 数据 ────────────────────────────────────────────────────────────────────

const cases = [
  {
    name: "苏雨桐",
    role: "互联网运营 · 白天上班晚上做站",
    project: "小红书爆款选题分析工具",
    result: "靠 SEO 自然流量，月 UV 1.2 万，Adsense 月入 ¥2,800，完全被动收入",
    time: "3 周",
    income: "¥2,800/月",
    screenshot: "/cases/case-1.png",
    tag: "工具站",
    tagColor: "#F97316",
    tool: "Trae",
    level: "Lv.12",
    xp: 1240,
  },
  {
    name: "周敏",
    role: "全职妈妈 · 孩子 3 岁",
    project: "亲子绘本推荐工具站",
    result: "利用孩子午睡时间做站，上线 6 周后 Adsense 月入 ¥3,200，每天维护 1 小时",
    time: "4 周",
    income: "¥3,200/月",
    screenshot: "/cases/case-2.png",
    tag: "内容工具站",
    tagColor: "#A855F7",
    tool: "Claude Code",
    level: "Lv.18",
    xp: 1820,
  },
  {
    name: "李昊",
    role: "产品经理 · 副业做独立产品",
    project: "SaaS 竞品监控工具",
    result: "定价 ¥39/月，上线 3 个月积累 180 个付费用户，月收入稳定在 ¥7,000+",
    time: "5 周",
    income: "¥7,000+/月",
    screenshot: "/cases/case-3.png",
    tag: "订阅 SaaS",
    tagColor: "#0EA5E9",
    tool: "Codex",
    level: "Lv.26",
    xp: 2600,
  },
];

const bestPractices = [
  {
    icon: MessageSquare,
    color: "#6366F1",
    title: "用自然语言描述需求，而不是写代码",
    desc: "AI 编程的核心是「说清楚你要什么」。不需要记语法，只需要像跟人说话一样描述目标：「做一个带搜索框的商品列表页，点击卡片跳转详情」。描述越具体，AI 给出的结果越准确。",
    tip: "最佳实践：先说目标，再说约束，最后给参照物",
  },
  {
    icon: GitBranch,
    color: "#10B981",
    title: "小步迭代，每次只改一件事",
    desc: "不要一次让 AI 做完所有功能。先做出能跑的最小版本，确认没问题再加下一个功能。每次改动后立刻在浏览器里看效果，出了问题马上修，不要积累。",
    tip: "最佳实践：每完成一个功能就提交一次 Git，方便回滚",
  },
  {
    icon: Repeat2,
    color: "#F59E0B",
    title: "读懂 AI 给的代码，而不是盲目复制",
    desc: "AI 给出代码后，让它解释关键部分的逻辑。你不需要能默写，但要知道「这段代码在做什么」。这样遇到 bug 时你能准确描述问题，AI 才能精准修复。",
    tip: "最佳实践：遇到不懂的代码，直接问 AI「这段是什么意思」",
  },
];

const journey = [
  {
    chapter: "序章",
    chapterEn: "PROLOGUE",
    title: "认识 AI 编程工具",
    desc: "安装 Claude Code / Codex / Trae，跑通第一个 AI 生成的页面。验证「你说话，AI 写代码」的完整循环。",
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
    desc: "学会写 Prompt，用 AI 做出个人名片、作品集，发布到互联网。这一章结束，你就有一个真实的 URL 可以分享。",
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
    desc: "从 HTML 文件升级到前端工程。组件化开发，响应式布局，改一处全生效。这是做工具站的基础。",
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
    desc: "调用 OpenAI API、生图 API，把 AI 能力嵌进自己的产品。做出来的东西，别人用 AI 工具做不到。",
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
    desc: "Next.js API、Supabase 数据库、用户登录、Stripe 支付。做完这章，你能做出一个完整的 SaaS 产品。",
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
    desc: "GitHub 管理代码、Vercel 部署、SEO 优化。把产品真正推到用户面前，开始获取自然流量。",
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
    a: "完全可以。每一关都是独立的，你可以直接从任意章节开始。段位系统基于累计 XP 计算，完成任意关卡都能获得 XP 并晋升，跳关入场完全不影响。",
  },
  {
    q: "需要什么设备？",
    a: "一台能上网的电脑就行，Windows 或 Mac 都可以。不需要高配置，不需要买任何软件，所有工具都是免费的。",
  },
  {
    q: "这个课程要收费吗？",
    a: "核心关卡内容完全免费开放。我们通过游戏化互动让学习更有趣，你可以按自己的节奏闯关，没有任何强制付费墙。",
  },
];

// ─── 组件 ────────────────────────────────────────────────────────────────────

export default function HomeClient() {
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
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
            </div>
            <span className="font-bold text-base tracking-tight text-white">VibeCamp</span>
            <span className="hidden sm:inline-block text-xs text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full ml-1">
              BETA
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400" aria-label="主导航">
            <Link href="#what-is" className="hover:text-white transition-colors">什么是 AI 编程</Link>
            <Link href="#best-practices" className="hover:text-white transition-colors">最佳实践</Link>
            <Link href="#journey" className="hover:text-white transition-colors">闯关地图</Link>
            <Link href="#faq" className="hover:text-white transition-colors">常见问题</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white" asChild>
              <a href="/login">登录</a>
            </Button>
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5 shadow-lg shadow-indigo-500/20"
              asChild
            >
              <a href="/register">开始闯关 →</a>
            </Button>
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

          {/* H1：主打「AI 编程教程」核心词 */}
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

          {/* 副标题：解释 Vibe Coding */}
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Vibe Coding（AI 编程）是 2025 年最重要的新技能——
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
              <a href="/register">
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
              <Link href="#what-is">什么是 AI 编程？</Link>
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
        </div>
      </section>

      {/* ── 什么是 AI 编程 / Vibe Coding ── */}
      <section id="what-is" className="py-24 px-6 border-t border-white/[0.05]" aria-labelledby="what-is-h2">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-medium">What is Vibe Coding</p>
            <h2 id="what-is-h2" className="text-4xl md:text-5xl font-black text-white mb-4">
              什么是 AI 编程（Vibe Coding）？
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              传统编程要背语法、记 API、调 bug，门槛极高。AI 编程完全不同——
              你只需要用中文描述你想要什么，AI 帮你写出代码。
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* 传统编程 */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
              <div className="text-sm font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-xs">✕</span>
                传统编程
              </div>
              <ul className="space-y-3 text-sm text-gray-400">
                {["先学 HTML / CSS / JavaScript，至少 3 个月", "记住几百个 API 和语法规则", "一个 bug 可能卡你几天", "从入门到做出产品，1-2 年起步"].map(t => (
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
                {["用中文描述需求，AI 立刻生成代码", "不需要记语法，专注于「想做什么」", "遇到 bug 直接告诉 AI，秒级修复", "零基础 3-5 周做出可上线的真实产品"].map(t => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 工具介绍 */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">主流 AI 编程工具对比</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { name: "Trae", tag: "国内推荐", color: "#6366F1", desc: "字节跳动出品，国内直连无需翻墙，有图形界面，零基础首选" },
                { name: "Claude Code", tag: "代码最强", color: "#10B981", desc: "Anthropic 出品，代码理解力最强，适合有一定基础的开发者" },
                { name: "Codex", tag: "OpenAI 出品", color: "#F59E0B", desc: "OpenAI 旗下，与 GitHub Copilot 同源，生态最完善" },
              ].map(tool => (
                <div key={tool.name} className="rounded-xl p-4 border border-white/[0.06]" style={{ background: tool.color + "08" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-white">{tool.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: tool.color + "20", color: tool.color }}>{tool.tag}</span>
                  </div>
                  <p className="text-gray-400 text-xs leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI 编程最佳实践 ── */}
      <section id="best-practices" className="py-24 px-6 border-t border-white/[0.05]" aria-labelledby="best-practices-h2">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-medium">Best Practices</p>
            <h2 id="best-practices-h2" className="text-4xl md:text-5xl font-black text-white mb-4">
              AI 编程最佳实践
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              90% 的初学者踩的坑，都能用这三条原则避开。
              VibeCamp 的每个关卡都围绕这些实践设计。
            </p>
          </div>

          <div className="space-y-4">
            {bestPractices.map((p, i) => (
              <div
                key={p.title}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all"
                style={{ boxShadow: `0 0 40px -20px ${p.color}20` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: p.color + "20", border: `1px solid ${p.color}30` }}
                  >
                    <p.icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-gray-600 font-mono">0{i + 1}</span>
                      <h3 className="font-bold text-white text-base">{p.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">{p.desc}</p>
                    <div
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                      style={{ background: p.color + "15", color: p.color, border: `1px solid ${p.color}25` }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {p.tip}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/levels/chapter_1/1-1">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 gap-2">
                从 Prompt 技巧开始练习
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
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

      {/* ── 学员案例 ── */}
      <section id="cases" className="py-24 px-6 border-t border-white/[0.06]" aria-labelledby="cases-h2">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-medium">Player Stories</p>
            <h2 id="cases-h2" className="text-4xl md:text-5xl font-black text-white mb-4">
              零基础，3–5 周，做出有收入的产品
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <article
                key={c.name}
                className="group flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden hover:border-white/[0.14] transition-all"
                style={{ boxShadow: `0 0 60px -20px ${c.tagColor}20` }}
              >
                <div className="relative h-52 overflow-hidden" style={{ background: `linear-gradient(135deg, ${c.tagColor}18 0%, #0d0d1a 60%)` }}>
                  <div className="absolute inset-0 flex flex-col" aria-hidden="true">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-black/20">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <div className="w-2 h-2 rounded-full bg-green-500/40" />
                      <div className="flex-1 mx-3 bg-white/5 rounded-md h-4 flex items-center px-2">
                        <span className="text-[8px] text-gray-600 truncate">vibecamp.app/{c.project.slice(0,8)}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ background: c.tagColor + '40' }} />
                        <div className="w-2/3 h-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="w-1/2 h-2 rounded-full bg-white/5" />
                      <div className="mt-1 grid grid-cols-2 gap-1.5 flex-1">
                        {[1,2,3,4].map(n => (
                          <div key={n} className="rounded-lg p-2 border border-white/5 flex flex-col gap-1" style={{ background: c.tagColor + '08' }}>
                            <div className="w-full h-1.5 rounded-full bg-white/10" />
                            <div className="w-2/3 h-1 rounded-full bg-white/5" />
                            <div className="mt-auto w-1/2 h-1 rounded-full" style={{ background: c.tagColor + '50' }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="px-2.5 py-1 rounded-full text-[9px] font-bold" style={{ background: c.tagColor, color: '#fff' }}>
                          {c.income}
                        </div>
                        <div className="text-[9px] text-gray-500">月收入</div>
                        <div className="ml-auto flex items-center gap-1">
                          <Star className="h-2.5 w-2.5" style={{ color: c.tagColor }} />
                          <span className="text-[9px]" style={{ color: c.tagColor }}>{c.xp} XP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Image
                    src={c.screenshot}
                    alt={`${c.name}的项目截图：${c.project}`}
                    fill
                    className="object-cover object-top z-10 mix-blend-luminosity opacity-75"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }}
                  />
                  <div
                    className="absolute inset-0 z-[15] pointer-events-none"
                    style={{ background: `linear-gradient(160deg, ${c.tagColor}28 0%, transparent 50%, #0d0d1a70 100%)` }}
                    aria-hidden="true"
                  />
                  <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ background: `linear-gradient(90deg, transparent, ${c.tagColor}, transparent)` }} />
                  <div className="absolute bottom-0 left-0 right-0 h-16 z-20" style={{ background: 'linear-gradient(to top, #0d0d1a, transparent)' }} />
                  <div className="absolute top-3 right-3 z-30 text-xs font-bold text-white/70 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Trophy className="h-3 w-3" style={{ color: c.tagColor }} />
                    {c.level}
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: c.tagColor + "20", color: c.tagColor, border: `1px solid ${c.tagColor}30` }}
                    >
                      {c.tag}
                    </span>
                    <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                      {c.tool}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{c.project}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">{c.result}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock className="h-3.5 w-3.5" />
                      <span>学了 {c.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-black" style={{ color: c.tagColor }}>
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{c.income}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                      style={{ background: c.tagColor + "30", color: c.tagColor, border: `1px solid ${c.tagColor}40` }}
                    >
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{c.name}</div>
                      <div className="text-[11px] text-gray-500">{c.role}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 段位系统 ── */}
      <section id="ranks" className="py-24 px-6 relative border-t border-white/[0.06]" aria-labelledby="ranks-h2">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-xs text-indigo-400 uppercase tracking-widest mb-3 font-medium">Rank System</p>
            <h2 id="ranks-h2" className="text-4xl md:text-5xl font-black text-white mb-4">
              学到哪，能做什么
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              每个段位对应真实的开发能力。完成关卡获得 XP，XP 累计自动晋升。
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {RANKS.map((rank) => (
              <div
                key={rank.id}
                className="relative bg-white/[0.02] border rounded-2xl p-5 text-center hover:bg-white/[0.05] transition-all overflow-hidden flex flex-col items-center justify-center min-h-[180px] cursor-pointer group"
                style={{
                  borderColor: rank.badge_color + '30',
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
                  style={{ background: rank.badge_color + '18', border: `1.5px solid ${rank.badge_color}40` }}
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
              <a href="/register">
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
                <Terminal className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                <span className="font-bold text-white">VibeCamp</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                AI 编程教程训练营。<br />游戏化学习，做出真产品。
              </p>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">课程地图</div>
              <nav className="space-y-2.5" aria-label="课程导航">
                <Link href="/levels/prologue/0-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">序章 · 装好工具</Link>
                <Link href="/levels/chapter_1/1-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第一章 · 静态网站</Link>
                <Link href="/levels/chapter_2/2-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第二章 · 工程化</Link>
                <Link href="/levels/chapter_3/3-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第三章 · 接入 AI</Link>
                <Link href="/levels/chapter_4/4-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第四章 · 全栈</Link>
                <Link href="/levels/chapter_5/5-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">第五章 · 上线</Link>
              </nav>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">热门教程</div>
              <nav className="space-y-2.5" aria-label="教程导航">
                <Link href="/levels/prologue/0-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">AI 编程工具安装</Link>
                <Link href="/levels/chapter_1/1-1" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">AI 编程 Prompt 技巧</Link>
                <Link href="/levels/chapter_2/2-3" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">Tailwind CSS 教程</Link>
                <Link href="/levels/chapter_4/4-2" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">Supabase 数据库教程</Link>
                <Link href="/stories" className="block text-sm text-gray-500 hover:text-gray-200 transition-colors">学员故事</Link>
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
