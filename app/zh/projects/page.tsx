import Link from "next/link";
import { ArrowRight, CheckCircle2, Wrench, Bot, Newspaper, ShoppingBag, BarChart3, CreditCard, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

export const metadata: Metadata = {
  title: "AI 编程项目库：实战项目模板",
  description: "AI 编程项目库收录 6 个真实可上线的 AI 编程项目模板，从工具站、内容站到完整 SaaS，学完对应章节即可动手做，做完直接上线变现。",
  keywords: [
    "AI 编程项目",
    "AI 编程实战项目",
    "Vibe Coding 项目",
    "零基础 AI 编程项目",
    "独立开发项目",
    "SaaS 项目模板",
  ],
  openGraph: {
    title: "AI 编程项目库：实战项目模板 | VibeCamp",
    description: "6 个真实可上线的 AI 编程项目，从工具站到完整 SaaS，学完对应章节即可动手做。",
    url: `${siteUrl}/zh/projects`,
    siteName: "VibeCamp",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI 编程实战项目库 VibeCamp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 编程项目库：实战项目模板 | VibeCamp",
    description: "6 个真实可上线的 AI 编程项目，从工具站到完整 SaaS，学完对应章节即可动手做。",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/zh/projects`,
    languages: {
      "zh-CN": `${siteUrl}/zh/projects`,
      en: `${siteUrl}/projects`,
    },
  },
};

const projectsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI 编程实战项目库",
    description: "6 个真实可上线的 AI 编程项目模板，从工具站到完整 SaaS，学完对应章节即可动手做，做完直接上线变现。",
    url: `${siteUrl}/zh/projects`,
    inLanguage: "zh-CN",
    isPartOf: { "@id": `${siteUrl}/#website` },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "AI 编程教程", item: `${siteUrl}/zh` },
      { "@type": "ListItem", position: 2, name: "AI 编程实战项目库", item: `${siteUrl}/zh/projects` },
    ],
  },
];

const projects = [
  {
    icon: Wrench,
    color: "#6366F1",
    tag: "工具站",
    difficulty: "入门",
    difficultyColor: "#10B981",
    title: "关键词流量分析工具",
    desc: "输入任意关键词，抓取搜索结果并分析竞争度、搜索量趋势，输出可视化报告。做完即可上线，接 Adsense 变现。",
    stack: ["Next.js", "Tailwind", "API"],
    output: "可上线的工具站",
    time: "第 2 章完成后可做",
    chapterId: "chapter_2",
    levelId: "2-1",
  },
  {
    icon: Bot,
    color: "#8B5CF6",
    tag: "AI 产品",
    difficulty: "进阶",
    difficultyColor: "#F59E0B",
    title: "AI 文案生成器",
    desc: "输入产品名称和卖点，调用 Claude API 自动生成小红书/朋友圈/详情页文案，支持一键复制。可做成 SaaS 按次收费。",
    stack: ["Next.js", "Claude API", "Supabase"],
    output: "可收费的 AI 工具",
    time: "第 3 章完成后可做",
    chapterId: "chapter_3",
    levelId: "3-1",
  },
  {
    icon: Newspaper,
    color: "#0EA5E9",
    tag: "内容站",
    difficulty: "入门",
    difficultyColor: "#10B981",
    title: "垂直领域资讯聚合站",
    desc: "自动抓取某个垂直领域（健身/宠物/投资）的最新资讯，AI 生成摘要，每天自动更新。SEO 友好，靠自然流量带 Adsense 收入。",
    stack: ["Next.js", "RSS", "OpenAI"],
    output: "每日自动更新的内容站",
    time: "第 3 章完成后可做",
    chapterId: "chapter_3",
    levelId: "3-2",
  },
  {
    icon: ShoppingBag,
    color: "#F97316",
    tag: "电商工具",
    difficulty: "进阶",
    difficultyColor: "#F59E0B",
    title: "选品分析 SaaS",
    desc: "输入亚马逊/淘宝商品链接，AI 分析竞争度、利润空间、差评痛点，生成选品报告。定价 ¥29/次或订阅制。",
    stack: ["Next.js", "Supabase", "Stripe"],
    output: "付费 SaaS 产品",
    time: "第 4 章完成后可做",
    chapterId: "chapter_4",
    levelId: "4-1",
  },
  {
    icon: BarChart3,
    color: "#10B981",
    tag: "数据工具",
    difficulty: "进阶",
    difficultyColor: "#F59E0B",
    title: "竞品监控仪表盘",
    desc: "输入竞品网站 URL，定时抓取价格/功能/评价变化，发邮件提醒。帮助独立开发者和运营人员实时掌握竞争动态。",
    stack: ["Next.js", "Supabase", "Cron"],
    output: "订阅制 SaaS",
    time: "第 4 章完成后可做",
    chapterId: "chapter_4",
    levelId: "4-2",
  },
  {
    icon: CreditCard,
    color: "#EC4899",
    tag: "完整 SaaS",
    difficulty: "高阶",
    difficultyColor: "#EC4899",
    title: "简历优化 AI 助手",
    desc: "上传简历 PDF，AI 对照目标 JD 给出修改建议、关键词补充、格式优化，生成优化版本可直接下载。按次付费或会员制。",
    stack: ["Next.js", "Claude API", "Stripe", "Supabase"],
    output: "完整付费产品",
    time: "第 5 章完成后可做",
    chapterId: "chapter_5",
    levelId: "5-1",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <JsonLd data={projectsJsonLd} />

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
            <Link href="/zh/about" className="hover:text-gray-900 transition-colors">什么是 AI 编程</Link>
            <Link href="/zh/projects" className="text-gray-900 font-medium">实战项目</Link>
            <Link href="/zh#journey" className="hover:text-gray-900 transition-colors">课程地图</Link>
            <Link href="/zh/stories" className="hover:text-gray-900 transition-colors">学员案例</Link>
            <Link href="/projects" className="hover:text-gray-900 transition-colors">English</Link>
          </nav>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
            <a href="/zh/register">开始闯关 →</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-5 font-medium">Project Library</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-gray-900">
            AI 编程项目，
            <br />
            <span className="text-indigo-600">做完能上线</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-xl mx-auto leading-relaxed">
            这些 AI 编程项目都是真实可做的项目，不是练习题。每个项目学完对应章节就能开始做，做完直接上线变现。
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* 项目网格 */}
      <section className="py-20 px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link
                key={p.title}
                href={`/zh/levels/${p.chapterId}/${p.levelId}`}
                className="group flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: p.color + "15", border: `1px solid ${p.color}20` }}
                  >
                    <p.icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: p.difficultyColor + "12", color: p.difficultyColor }}
                    >
                      {p.difficulty}
                    </span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: p.color + "10", color: p.color }}
                    >
                      {p.tag}
                    </span>
                  </div>
                </div>

                <h2 className="font-bold text-gray-900 text-base mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                  {p.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" style={{ color: p.color }} />
                    <span className="text-xs text-gray-500">{p.output}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: p.color }}>
                    <span>开始做</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm mb-6">还没开始闯关？先从序章入手，装好工具再来做项目。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/zh/register"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-base px-10 py-4 font-semibold transition-colors"
              >
                免费开始闯关 <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/zh#journey"
                className="inline-flex items-center justify-center border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 rounded-full text-base px-10 py-4 font-medium transition-colors"
              >
                查看课程地图
              </Link>
            </div>
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
            <Link href="/zh/about" className="hover:text-gray-900 transition-colors">什么是 AI 编程</Link>
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
