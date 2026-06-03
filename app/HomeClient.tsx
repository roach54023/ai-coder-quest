"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { LayoutDashboard, LogOut, ArrowRight, ExternalLink, Mail } from "lucide-react";

// ─── 数据 ─────────────────────────────────────────────────────────────────────

// 每个章节的 SVG 插图（主题化图形）
const chapterIllustrations: Record<string, React.ReactNode> = {
  prologue: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" rx="12" fill="#EEF2FF"/>
      {/* 终端窗口 */}
      <rect x="24" y="20" width="152" height="100" rx="8" fill="#1E1B4B"/>
      <circle cx="40" cy="34" r="4" fill="#EF4444"/>
      <circle cx="54" cy="34" r="4" fill="#F59E0B"/>
      <circle cx="68" cy="34" r="4" fill="#10B981"/>
      {/* 代码行 */}
      <rect x="36" y="50" width="60" height="6" rx="3" fill="#6366F1"/>
      <rect x="36" y="64" width="90" height="6" rx="3" fill="#4F46E5" opacity="0.6"/>
      <rect x="36" y="78" width="40" height="6" rx="3" fill="#818CF8"/>
      <rect x="36" y="92" width="70" height="6" rx="3" fill="#4F46E5" opacity="0.4"/>
      {/* 光标 */}
      <rect x="110" y="92" width="6" height="6" rx="1" fill="#A5B4FC"/>
      {/* AI 标签 */}
      <rect x="130" y="78" width="34" height="16" rx="4" fill="#6366F1"/>
      <text x="147" y="90" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AI</text>
    </svg>
  ),
  chapter_1: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" rx="12" fill="#ECFDF5"/>
      {/* 浏览器窗口 */}
      <rect x="20" y="16" width="160" height="108" rx="8" fill="white" stroke="#D1FAE5" strokeWidth="1.5"/>
      <rect x="20" y="16" width="160" height="28" rx="8" fill="#F0FDF4"/>
      <rect x="20" y="36" width="160" height="8" fill="#F0FDF4"/>
      <circle cx="36" cy="30" r="4" fill="#FCA5A5"/>
      <circle cx="50" cy="30" r="4" fill="#FCD34D"/>
      <circle cx="64" cy="30" r="4" fill="#6EE7B7"/>
      <rect x="80" y="24" width="80" height="12" rx="6" fill="#D1FAE5"/>
      {/* 网页内容 */}
      <rect x="36" y="56" width="128" height="10" rx="5" fill="#10B981"/>
      <rect x="36" y="74" width="90" height="6" rx="3" fill="#D1FAE5"/>
      <rect x="36" y="86" width="110" height="6" rx="3" fill="#D1FAE5"/>
      <rect x="36" y="98" width="70" height="6" rx="3" fill="#D1FAE5"/>
      {/* 头像占位 */}
      <circle cx="152" cy="88" r="18" fill="#A7F3D0"/>
      <circle cx="152" cy="83" r="7" fill="#10B981"/>
      <path d="M138 102 Q152 94 166 102" fill="#10B981"/>
    </svg>
  ),
  chapter_2: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" rx="12" fill="#FFFBEB"/>
      {/* 组件积木 */}
      <rect x="20" y="20" width="72" height="44" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="108" y="20" width="72" height="44" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="20" y="76" width="72" height="44" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="108" y="76" width="72" height="44" rx="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5"/>
      {/* 组件内容 */}
      <rect x="30" y="32" width="52" height="6" rx="3" fill="#F59E0B"/>
      <rect x="30" y="44" width="36" height="4" rx="2" fill="#FCD34D"/>
      <rect x="118" y="32" width="52" height="6" rx="3" fill="#F59E0B"/>
      <rect x="118" y="44" width="36" height="4" rx="2" fill="#FCD34D"/>
      <rect x="30" y="88" width="52" height="6" rx="3" fill="#F59E0B"/>
      <rect x="30" y="100" width="36" height="4" rx="2" fill="#FCD34D"/>
      <rect x="118" y="88" width="52" height="6" rx="3" fill="#F59E0B"/>
      <rect x="118" y="100" width="36" height="4" rx="2" fill="#FCD34D"/>
      {/* 连接线 */}
      <line x1="92" y1="42" x2="108" y2="42" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="92" y1="98" x2="108" y2="98" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="56" y1="64" x2="56" y2="76" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2"/>
      <line x1="144" y1="64" x2="144" y2="76" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  ),
  chapter_3: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" rx="12" fill="#FDF2F8"/>
      {/* 对话气泡 */}
      <rect x="20" y="20" width="110" height="36" rx="10" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5"/>
      <polygon points="30,56 20,68 44,56" fill="#FCE7F3" stroke="#EC4899" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="70" y="72" width="110" height="36" rx="10" fill="#EC4899"/>
      <polygon points="170,108 180,120 156,108" fill="#EC4899"/>
      {/* 文字行 */}
      <rect x="30" y="32" width="70" height="5" rx="2.5" fill="#EC4899" opacity="0.5"/>
      <rect x="30" y="43" width="50" height="5" rx="2.5" fill="#EC4899" opacity="0.3"/>
      <rect x="80" y="84" width="70" height="5" rx="2.5" fill="white" opacity="0.8"/>
      <rect x="80" y="95" width="50" height="5" rx="2.5" fill="white" opacity="0.5"/>
      {/* AI 图标 */}
      <circle cx="162" cy="38" r="18" fill="#EC4899"/>
      <text x="162" y="44" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AI</text>
      {/* 闪光 */}
      <path d="M148 22 L150 16 L152 22 L158 24 L152 26 L150 32 L148 26 L142 24 Z" fill="#F9A8D4"/>
    </svg>
  ),
  chapter_4: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" rx="12" fill="#F0F9FF"/>
      {/* 服务器/数据库堆叠 */}
      <rect x="60" y="16" width="80" height="22" rx="6" fill="#BAE6FD" stroke="#0EA5E9" strokeWidth="1.5"/>
      <rect x="60" y="44" width="80" height="22" rx="6" fill="#7DD3FC" stroke="#0EA5E9" strokeWidth="1.5"/>
      <rect x="60" y="72" width="80" height="22" rx="6" fill="#38BDF8" stroke="#0EA5E9" strokeWidth="1.5"/>
      {/* 连接线 */}
      <line x1="100" y1="38" x2="100" y2="44" stroke="#0EA5E9" strokeWidth="2"/>
      <line x1="100" y1="66" x2="100" y2="72" stroke="#0EA5E9" strokeWidth="2"/>
      {/* 标签 */}
      <circle cx="76" cy="27" r="5" fill="#0EA5E9"/>
      <circle cx="76" cy="55" r="5" fill="#0284C7"/>
      <circle cx="76" cy="83" r="5" fill="#0369A1"/>
      <rect x="86" y="24" width="40" height="6" rx="3" fill="#0EA5E9" opacity="0.4"/>
      <rect x="86" y="52" width="40" height="6" rx="3" fill="#0EA5E9" opacity="0.4"/>
      <rect x="86" y="80" width="40" height="6" rx="3" fill="#0EA5E9" opacity="0.4"/>
      {/* 支付卡 */}
      <rect x="30" y="104" width="140" height="24" rx="6" fill="#0EA5E9"/>
      <rect x="38" y="110" width="28" height="12" rx="3" fill="#BAE6FD"/>
      <rect x="80" y="113" width="50" height="5" rx="2.5" fill="white" opacity="0.5"/>
      <rect x="140" y="113" width="22" height="5" rx="2.5" fill="white" opacity="0.5"/>
    </svg>
  ),
  chapter_5: (
    <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="200" height="140" rx="12" fill="#FFF7ED"/>
      {/* 地球/全球 */}
      <circle cx="100" cy="70" r="50" fill="#FED7AA" stroke="#F97316" strokeWidth="1.5"/>
      <ellipse cx="100" cy="70" rx="20" ry="50" fill="none" stroke="#F97316" strokeWidth="1.5"/>
      <line x1="50" y1="70" x2="150" y2="70" stroke="#F97316" strokeWidth="1.5"/>
      <path d="M58 46 Q100 36 142 46" fill="none" stroke="#F97316" strokeWidth="1.5"/>
      <path d="M58 94 Q100 104 142 94" fill="none" stroke="#F97316" strokeWidth="1.5"/>
      {/* 火箭 */}
      <path d="M148 28 L158 18 L168 28 L163 38 L153 38 Z" fill="#F97316"/>
      <path d="M153 38 L148 48 L158 44 Z" fill="#FED7AA"/>
      <path d="M163 38 L168 48 L158 44 Z" fill="#FED7AA"/>
      <circle cx="158" cy="28" r="4" fill="#FFF7ED"/>
      {/* 轨迹 */}
      <path d="M148 48 Q130 70 110 80" stroke="#F97316" strokeWidth="1.5" strokeDasharray="4 3" fill="none"/>
    </svg>
  ),
};

const journey = [
  {
    chapterEn: "PROLOGUE",
    chapterLabel: "序章",
    title: "认识 AI 编程工具",
    tagline: "装好工具，\n跑通第一行代码。",
    desc: "安装 Claude Code / Trae，10 分钟内让 AI 帮你写出第一个网页。",
    chapterId: "prologue",
    levelStart: "0-1",
    color: "#6366F1",
    levels: [
      { id: "0-1", title: "安装 AI 编程助手", desc: "10 分钟装好 Claude Code 或 Trae", xp: 50 },
      { id: "0-2", title: "第一个 AI 生成的页面", desc: "用自然语言让 AI 写出你的第一个网页", xp: 100 },
    ],
  },
  {
    chapterEn: "CHAPTER 1",
    chapterLabel: "第一章",
    title: "做出第一个静态网站",
    tagline: "会打字，\n就能做网站。",
    desc: "学会写 Prompt，用 AI 做出个人名片、作品集，发布到互联网。",
    chapterId: "chapter_1",
    levelStart: "1-1",
    color: "#10B981",
    levels: [
      { id: "1-1", title: "Prompt 核心技巧", desc: "学会下指令，让 AI 精确理解你的需求", xp: 120 },
      { id: "1-2", title: "个人名片页", desc: "做一个可以发给别人的自我介绍页面", xp: 150 },
      { id: "1-3", title: "多页作品集", desc: "把多个页面组合成完整网站", xp: 200 },
    ],
  },
  {
    chapterEn: "CHAPTER 2",
    chapterLabel: "第二章",
    title: "工程化：React + Tailwind",
    tagline: "从网页，\n升级到工程。",
    desc: "从 HTML 文件升级到前端工程。组件化开发，响应式布局，做工具站的基础。",
    chapterId: "chapter_2",
    levelStart: "2-1",
    color: "#F59E0B",
    levels: [
      { id: "2-1", title: "搭建 Next.js 项目", desc: "用 AI 初始化一个真正的前端工程", xp: 200 },
      { id: "2-2", title: "组件化思维", desc: "把页面拆成可复用的积木", xp: 250 },
      { id: "2-3", title: "响应式布局", desc: "手机和电脑都好看", xp: 200 },
      { id: "2-4", title: "部署上线", desc: "免费发布到 Vercel，全球可访问", xp: 300 },
    ],
  },
  {
    chapterEn: "CHAPTER 3",
    chapterLabel: "第三章",
    title: "接入 AI 能力",
    tagline: "把 AI，\n装进你的产品。",
    desc: "调用 OpenAI API、生图 API，把 AI 能力嵌进自己的产品。",
    chapterId: "chapter_3",
    levelStart: "3-1",
    color: "#EC4899",
    levels: [
      { id: "3-1", title: "调用 OpenAI API", desc: "给你的网站加上对话能力", xp: 350 },
      { id: "3-2", title: "流式输出", desc: "像 ChatGPT 一样逐字显示", xp: 400 },
      { id: "3-3", title: "接入生图 API", desc: "文字生成图片，嵌入你的产品", xp: 450 },
    ],
  },
  {
    chapterEn: "CHAPTER 4",
    chapterLabel: "第四章",
    title: "全栈：后端 + 数据库 + 支付",
    tagline: "一个人，\n就是一支团队。",
    desc: "Next.js API、Supabase 数据库、用户登录、Stripe 支付。做完这章能做完整 SaaS。",
    chapterId: "chapter_4",
    levelStart: "4-1",
    color: "#0EA5E9",
    levels: [
      { id: "4-1", title: "API 路由", desc: "写后端接口，处理数据", xp: 500 },
      { id: "4-2", title: "Supabase 数据库", desc: "存储用户数据，读写自如", xp: 550 },
      { id: "4-3", title: "用户登录系统", desc: "注册、登录、权限控制", xp: 600 },
      { id: "4-4", title: "Stripe 支付", desc: "接入支付，开始收钱", xp: 700 },
    ],
  },
  {
    chapterEn: "CHAPTER 5",
    chapterLabel: "第五章",
    title: "上线，让全世界用",
    tagline: "做完，\n就要让人用到。",
    desc: "GitHub 管理代码、Vercel 部署、SEO 优化。把产品真正推到用户面前。",
    chapterId: "chapter_5",
    levelStart: "5-1",
    color: "#F97316",
    levels: [
      { id: "5-1", title: "GitHub 版本管理", desc: "代码不丢失，多人协作", xp: 600 },
      { id: "5-2", title: "Vercel 生产部署", desc: "自定义域名，HTTPS，全球 CDN", xp: 650 },
      { id: "5-3", title: "SEO 基础优化", desc: "让 Google 找到你的产品", xp: 700 },
    ],
  },
];

const userCases = [
  {
    emoji: "🎓",
    name: "大二学生",
    tag: "在校生",
    story: "期末考试周，我偷偷用 AI 造了个「校园闲鱼」",
    desc: "完全没有编程基础，用 Claude Code 花了 3 天做出二手交易平台，上线第一周就有 200 个用户。",
    result: "3 天上线 · 200 用户",
  },
  {
    emoji: "👩‍💼",
    name: "产品经理",
    tag: "转型",
    story: "我用 AI 把自己的 PRD 直接变成了可以演示的产品",
    desc: "做了 5 年产品，第一次不用求开发。用 Trae 把需求文档直接变成了可点击的原型，老板当场拍板立项。",
    result: "2 周 · 从 PRD 到上线",
  },
  {
    emoji: "🏪",
    name: "小店老板",
    tag: "副业",
    story: "我给自己的奶茶店做了个点单小程序",
    desc: "高中学历，完全不懂代码。跟着第四章教程，用 AI 做出了带数据库的点单系统，省下了 2 万外包费。",
    result: "省下 2 万外包费",
  },
  {
    emoji: "👨‍🏫",
    name: "高中信息技术老师",
    tag: "教育",
    story: "我把 AI 编程带进了课堂，学生比我学得还快",
    desc: "用这套课程给学生上了一门公选课，期末每个学生都做出了自己的第一个网站，家长群炸了。",
    result: "全班 40 人都上线了作品",
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

// ─── 组件 ─────────────────────────────────────────────────────────────────────

export default function HomeClient() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
              <rect width="512" height="512" rx="115" fill="#6C47FF"/>
              <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-base text-gray-900">VibeCamp</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="/zh/about" className="hover:text-gray-900 transition-colors">什么是 AI 编程</Link>
            <Link href="#journey" className="hover:text-gray-900 transition-colors">课程地图</Link>
            <Link href="#cases" className="hover:text-gray-900 transition-colors">学员案例</Link>
          </nav>

          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <>
                <Link href="/zh/dashboard" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                    {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className="hidden sm:inline text-sm">{user.name ?? user.email}</span>
                </Link>
                <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-4 text-xs gap-1.5" asChild>
                  <Link href="/zh/dashboard"><LayoutDashboard className="h-3.5 w-3.5" />我的闯关</Link>
                </Button>
                <button className="text-gray-400 hover:text-gray-700 transition-colors p-1" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 text-sm" asChild>
                  <a href="/zh/login">登录</a>
                </Button>
                <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
                  <a href="/zh/register">开始闯关 →</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-24 pb-12 px-5 text-center">
        {/* 标签 */}
        <div className="inline-block text-xs text-gray-400 border border-gray-200 rounded-full px-3.5 py-1 mb-5 tracking-wide">
          AI 编程教程 · 零基础做出真产品
        </div>

        {/* 主标题 */}
        <h1 className="text-3xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4 text-gray-900">
          Vibe Coding
          <br />
          <span className="text-indigo-600">游戏化</span> AI 编程训练营
        </h1>

        <p className="text-base text-gray-400 mb-8 max-w-lg mx-auto leading-relaxed">
          不学编程语言，用自然语言指挥 AI 写代码。
          <br />
          26 个实战关卡，每关都有可上线的真实产出。
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/zh/register"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-sm px-8 py-3.5 font-semibold transition-colors"
          >
            免费开始闯关 <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="#journey"
            className="inline-flex items-center justify-center border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 rounded-full text-sm px-8 py-3.5 font-medium transition-colors"
          >
            查看课程地图
          </Link>
        </div>

      </section>

      <div className="border-t border-gray-100" />

      {/* ── 学员案例 ── */}
      <section id="cases" className="py-10 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-4">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">Real People · Real Products</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              真实学员，
              <span className="text-indigo-600">真实产品</span>
            </h2>
          </div>
          <p className="text-base text-gray-400 mb-7 max-w-md">
            零基础，3–5 周，做出有人用、有收入的产品
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {userCases.map((c, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-300 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl">
                    {c.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.tag}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug group-hover:text-indigo-600 transition-colors">
                  {c.story}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{c.desc}</p>
                <div className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">
                  {c.result}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/zh/stories"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 hover:border-gray-400 rounded-full px-6 py-3"
            >
              查看更多学员故事 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── 课程地图 ── */}
      <section id="journey" className="py-10 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 md:mb-10">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">Course Map</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              从零到独立开发
              <br />
              <span className="text-gray-300">每关都有真实产出</span>
            </h2>
          </div>

          <div className="space-y-5">
            {journey.map((stage) => (
              <div
                key={stage.chapterId}
                className="rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all"
                style={{ boxShadow: `0 2px 20px -8px ${stage.color}18` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* 左侧插图 */}
                  <div className="hidden md:block md:w-56 shrink-0 relative overflow-hidden" style={{ minHeight: "140px" }}>
                    <div className="absolute inset-0">
                      {chapterIllustrations[stage.chapterId]}
                    </div>
                    <div
                      className="absolute top-3 left-3 text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: stage.color, color: "white" }}
                    >
                      {stage.chapterLabel}
                    </div>
                  </div>

                  {/* 右侧内容 */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row gap-5 md:gap-6">
                    {/* 章节简介 */}
                    <div className="md:w-52 shrink-0">
                      {/* 移动端章节标签（桌面端在插图上显示） */}
                      <div
                        className="inline-block md:hidden text-xs font-black px-2.5 py-1 rounded-full mb-3"
                        style={{ background: stage.color, color: "white" }}
                      >
                        {stage.chapterLabel}
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold tracking-widest mb-2 uppercase">{stage.chapterEn}</div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight whitespace-pre-line">
                        {stage.tagline}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4">{stage.desc}</p>
                      <Link
                        href={`/zh/levels/${stage.chapterId}/${stage.levelStart}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
                      >
                        进入{stage.chapterLabel} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    {/* 关卡列表 */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
                      {stage.levels.map((level) => (
                        <Link
                          key={level.id}
                          href={`/zh/levels/${stage.chapterId}/${level.id}`}
                          className="group/card flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                        >
                          <div
                            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black mt-0.5"
                            style={{ background: stage.color + "15", color: stage.color }}
                          >
                            {level.id.split("-")[1]}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-sm leading-snug group-hover/card:text-indigo-600 transition-colors">
                              {level.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{level.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── FAQ ── */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">常见问题</h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="py-4 border-b border-gray-100 last:border-0">
                <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
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

          <div className="flex flex-wrap gap-x-8 gap-y-6">
            <nav className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">课程</div>
              <Link href="/zh/levels/prologue/0-1" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">序章 · 装好工具</Link>
              <Link href="/zh/levels/chapter_1/1-1" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">第一章 · 静态网站</Link>
              <Link href="/zh/levels/chapter_2/2-1" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">第二章 · 工程化</Link>
              <Link href="/zh/levels/chapter_3/3-1" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">第三章 · 接入 AI</Link>
              <Link href="/zh/levels/chapter_4/4-1" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">第四章 · 全栈</Link>
              <Link href="/zh/levels/chapter_5/5-1" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">第五章 · 上线</Link>
            </nav>
            <nav className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">探索</div>
              <Link href="/zh/stories" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">学员案例</Link>
              <Link href="/zh/projects" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">实战项目库</Link>
              <Link href="/zh/about" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">什么是 AI 编程</Link>
            </nav>
            <nav className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">关于</div>
              <Link href="https://github.com/roach54023/ai-coder-quest" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />GitHub 开源
              </Link>
              <Link href="mailto:roach54023@qq.com" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Mail className="h-3 w-3" />联系我们
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}