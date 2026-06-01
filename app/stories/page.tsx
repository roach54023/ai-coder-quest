import Link from "next/link";
import Image from "next/image";
import { Terminal, ArrowRight, Clock, TrendingUp, Trophy, Star, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学员案例 · VibeCamp AI 编程教程",
  description: "零基础学员用 AI 编程 3-5 周做出有收入的产品。真实案例：工具站月入 ¥2800、SaaS 月入 ¥7000+。",
};

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

const moreStories = [
  {
    name: "小王",
    age: 28,
    role: "外卖骑手",
    project: "路线优化工具",
    result: "用 AI 辅助开发了一个配送路线规划工具，根据订单地址自动计算最短路径，每天能多送 5-8 单。",
    quote: "我连 Excel 都不太会用，但现在我有了自己写的工具，同事都来找我要。",
    time: "3 天",
    avatarColor: "#60A5FA",
  },
  {
    name: "小李",
    age: 35,
    role: "小学老师",
    project: "课堂互动答题 App",
    result: "为班上 40 个学生做了一个在线答题系统，支持随机出题、计时作答、自动批改和错题统计。",
    quote: "孩子们现在抢着做练习题，家长都问我这个 App 在哪下载的。",
    time: "5 天",
    avatarColor: "#34D399",
  },
  {
    name: "老张",
    age: 45,
    role: "餐饮店老板",
    project: "库存管理系统",
    result: "开发了一套进销存系统，自动跟踪食材库存、生成采购清单、统计每日成本。一年省了 3 万块食材浪费。",
    quote: "以前都是手写记账本，现在手机上就能看所有数据，终于不用半夜盘库存了。",
    time: "1 周",
    avatarColor: "#F59E0B",
  },
  {
    name: "小陈",
    age: 22,
    role: "大三学生",
    project: "个人作品集网站",
    result: "用 AI 辅助搭建了个人作品集，展示课程项目和竞赛作品，带动态交互效果和暗色主题。面试时直接甩链接。",
    quote: "面试官说他见过上百份简历，但带自己做的网站的不超过 5 个。我拿到了实习 offer。",
    time: "3 天",
    avatarColor: "#EC4899",
  },
  {
    name: "小赵",
    age: 30,
    role: "产品经理",
    project: "SaaS MVP 原型",
    result: "把写了半年的 PRD 直接变成了可运行的产品原型，带用户注册、数据看板和付费功能。投资人当场拍板。",
    quote: "以前求着开发排期，现在我自己就能出 demo。融到了种子轮，200 万。",
    time: "5 天",
    avatarColor: "#A78BFA",
  },
  {
    name: "小刘",
    age: 40,
    role: "自由职业者",
    project: "3 个客户网站",
    result: "通关后接了外包项目，3 个月做了 3 个企业官网，从设计到部署全用 AI 完成。现在月入 $3K 稳定接单。",
    quote: "40 岁转行听起来疯狂，但 AI 让我 3 天就能交付一个以前要 3 周的项目。",
    time: "1 周",
    avatarColor: "#14B8A6",
  },
];

export default function StoriesPage() {
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
            <Link href="/about" className="hover:text-white transition-colors">什么是 AI 编程</Link>
            <Link href="/projects" className="hover:text-white transition-colors">实战项目</Link>
            <Link href="/#journey" className="hover:text-white transition-colors">闯关地图</Link>
            <Link href="/stories" className="text-white">学员案例</Link>
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
          <p className="text-xs text-indigo-400 uppercase tracking-widest mb-4 font-medium">Player Stories</p>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-[1.05]"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 40%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            零基础，3–5 周，
            <br />做出有收入的产品
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            这些人没有任何编程背景，只是学会了「如何让 AI 帮自己写代码」——然后一切都不一样了。
          </p>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-10 px-6 border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { num: "94%", label: "通关率" },
            { num: "~6h", label: "平均通关时长" },
            { num: "73%", label: "通关后有商业产出" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black text-indigo-400 mb-1">{s.num}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 精选案例（带截图） */}
      <section className="py-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8">精选案例</h2>
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
                        <span className="text-[8px] text-gray-600 truncate">vibecamp.app/{c.project.slice(0, 8)}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded" style={{ background: c.tagColor + "40" }} />
                        <div className="w-2/3 h-2.5 rounded-full bg-white/10" />
                      </div>
                      <div className="w-1/2 h-2 rounded-full bg-white/5" />
                      <div className="mt-1 grid grid-cols-2 gap-1.5 flex-1">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="rounded-lg p-2 border border-white/5 flex flex-col gap-1" style={{ background: c.tagColor + "08" }}>
                            <div className="w-full h-1.5 rounded-full bg-white/10" />
                            <div className="w-2/3 h-1 rounded-full bg-white/5" />
                            <div className="mt-auto w-1/2 h-1 rounded-full" style={{ background: c.tagColor + "50" }} />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="px-2.5 py-1 rounded-full text-[9px] font-bold" style={{ background: c.tagColor, color: "#fff" }}>
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
                  />
                  <div
                    className="absolute inset-0 z-[15] pointer-events-none"
                    style={{ background: `linear-gradient(160deg, ${c.tagColor}28 0%, transparent 50%, #0d0d1a70 100%)` }}
                    aria-hidden="true"
                  />
                  <div className="absolute top-0 left-0 right-0 h-[2px] z-20" style={{ background: `linear-gradient(90deg, transparent, ${c.tagColor}, transparent)` }} />
                  <div className="absolute bottom-0 left-0 right-0 h-16 z-20" style={{ background: "linear-gradient(to top, #0d0d1a, transparent)" }} />
                  <div className="absolute top-3 right-3 z-30 text-xs font-bold text-white/70 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                    <Trophy className="h-3 w-3" style={{ color: c.tagColor }} />
                    {c.level}
                  </div>
                </div>

                <div className="flex-1 flex flex-col p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: c.tagColor + "20", color: c.tagColor, border: `1px solid ${c.tagColor}30` }}>
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

      {/* 更多故事 */}
      <section className="py-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-8">更多学员故事</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moreStories.map((s) => (
              <div
                key={s.name}
                className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.10] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                    style={{ background: s.avatarColor + "20", color: s.avatarColor, border: `1px solid ${s.avatarColor}30` }}
                  >
                    {s.name[1]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {s.name}
                      <span className="text-gray-500 font-normal ml-1 text-xs">{s.age} 岁</span>
                    </div>
                    <div className="text-xs text-gray-500">{s.role}</div>
                  </div>
                </div>
                <div className="text-xs font-semibold mb-2" style={{ color: s.avatarColor }}>{s.project}</div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{s.result}</p>
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-400 italic leading-relaxed">「{s.quote}」</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>用时 {s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/[0.06] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">下一个故事，由你书写</h2>
          <p className="text-gray-400 mb-10 max-w-md mx-auto">
            不需要任何编程基础。你只需要一个想法，和学会跟 AI 对话的决心。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-white rounded-full text-base px-10 h-12 font-semibold shadow-lg shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-500"
              asChild
            >
              <a href="/register">
                开始我的闯关之旅 <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base px-8 h-12 border-white/10 text-gray-300 hover:border-white/30 hover:text-white bg-transparent"
              asChild
            >
              <Link href="/projects">查看实战项目</Link>
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
            <Link href="/projects" className="hover:text-gray-200 transition-colors">实战项目库</Link>
            <Link href="/about" className="hover:text-gray-200 transition-colors">什么是 AI 编程</Link>
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
