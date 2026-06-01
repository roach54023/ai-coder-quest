import Link from "next/link";
import { Terminal, ArrowRight, CheckCircle2, Wrench, Bot, Newspaper, ShoppingBag, BarChart3, CreditCard, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "实战项目库 · VibeCamp AI 编程教程",
  description: "6 个真实可上线的 AI 编程项目模板，从工具站到完整 SaaS，学完对应章节即可动手做，做完直接上线变现。",
};

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
            <Link href="/zh/about" className="hover:text-white transition-colors">什么是 AI 编程</Link>
            <Link href="/zh/projects" className="text-white">实战项目</Link>
            <Link href="/#journey" className="hover:text-white transition-colors">闯关地图</Link>
            <Link href="/zh/stories" className="hover:text-white transition-colors">学员案例</Link>
          </nav>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5" asChild>
            <a href="/zh/register">开始闯关 →</a>
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
          <p className="text-xs text-indigo-400 uppercase tracking-widest mb-4 font-medium">Project Library</p>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-[1.05]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 40%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            跟着做，做完能上线
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            这些都是真实可做的项目，不是练习题。每个项目学完对应章节就能开始做，做完直接上线变现。
          </p>
        </div>
      </section>

      {/* 项目网格 */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link
                key={p.title}
                href={`/zh/levels/${p.chapterId}/${p.levelId}`}
                className="group flex flex-col bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.14] hover:bg-white/[0.04] transition-all"
                style={{ boxShadow: `0 0 40px -20px ${p.color}15` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: p.color + "20", border: `1px solid ${p.color}30` }}
                  >
                    <p.icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: p.difficultyColor + "18", color: p.difficultyColor }}
                    >
                      {p.difficulty}
                    </span>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: p.color + "15", color: p.color }}
                    >
                      {p.tag}
                    </span>
                  </div>
                </div>

                <h2 className="font-bold text-white text-base mb-2 group-hover:text-indigo-200 transition-colors leading-snug">
                  {p.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs text-gray-500 bg-white/[0.05] border border-white/[0.07] px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" style={{ color: p.color }} />
                    <span className="text-xs text-gray-400">{p.output}</span>
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
            <p className="text-gray-500 text-sm mb-6">还没开始闯关？先从序章入手，装好工具再来做项目。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8"
                asChild
              >
                <a href="/zh/register">免费开始闯关 →</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-white/10 text-gray-300 hover:border-white/30 hover:text-white bg-transparent"
                asChild
              >
                <Link href="/#journey">查看课程地图</Link>
              </Button>
            </div>
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
            <Link href="/zh/stories" className="hover:text-gray-200 transition-colors">学员案例</Link>
            <Link href="/zh/about" className="hover:text-gray-200 transition-colors">什么是 AI 编程</Link>
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
