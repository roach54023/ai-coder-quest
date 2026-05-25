import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Terminal,
  Code,
  Rocket,
  Sparkles,
  Layers,
  Crown,
  Quote,
  CheckCircle,
  MessageCircle,
  ExternalLink,
  Mail,
  BookOpen,
} from "lucide-react";

const ranks = [
  { name: "IT文盲", salary: "¥0", color: "#9CA3AF", icon: Terminal },
  { name: "会装软件的普通人", salary: "¥3K/月", color: "#60A5FA", icon: Terminal },
  { name: "能出活的实习生", salary: "¥5K/月", color: "#34D399", icon: Code },
  { name: "不写代码的程序员", salary: "¥15K/月", color: "#A78BFA", icon: Sparkles },
  { name: "全干工程师", salary: "¥30K/月", color: "#F59E0B", icon: Layers },
  { name: "独立开发者", salary: "¥50K/月", color: "#EF4444", icon: Rocket },
  { name: "技术合伙人", salary: "¥∞", color: "#FFFFFF", icon: Crown },
];

const chapters = [
  { id: 0, title: "序章·觉醒", levels: 3, icon: "💡", desc: "认识 AI 编程，打开新世界的大门" },
  { id: 1, title: "第一章·起步", levels: 3, icon: "🚀", desc: "安装工具，写出第一行 AI 生成的代码" },
  { id: 2, title: "第二章·构建", levels: 4, icon: "🏗️", desc: "从零搭建完整项目，掌握项目结构" },
  { id: 3, title: "第三章·进阶", levels: 5, icon: "⚡", desc: "交互功能、AI 生图、产品化打磨" },
  { id: 4, title: "第四章·全栈", levels: 6, icon: "🎯", desc: "后端、数据库、支付、AI 能力集成" },
  { id: 5, title: "第五章·远征", levels: 3, icon: "🌍", desc: "部署上线，让全世界用上你的作品" },
];

const stories = [
  {
    name: "小王",
    role: "外卖骑手",
    quote: "我连打字都不太快，但3天就做出了自己的路线规划工具",
    avatar: "🛵",
  },
  {
    name: "小李",
    role: "小学老师",
    quote: "学生们现在每天追着我要新的答题游戏",
    avatar: "📚",
  },
  {
    name: "老张",
    role: "餐饮店老板",
    quote: "再也不用手写进货单了，省了我每天2小时",
    avatar: "🍜",
  },
];

const faqs = [
  {
    q: "需要编程基础吗？",
    a: "完全不需要！这个课程专门为零基础的人设计。你不需要学任何编程语言，只需要学会如何用自然语言指挥 AI 帮你写代码。会打字、会上网就够了。",
  },
  {
    q: "需要什么设备？",
    a: "一台能上网的电脑就行，Windows、Mac 都可以。不需要高配置，不需要买任何软件，所有工具都是免费的。",
  },
  {
    q: "卡住了怎么办？",
    a: "每关都有详细的 FAQ 和常见问题解答，还有提示系统帮你一步步突破。实在不行还可以看通关攻略视频。",
  },
  {
    q: "免费吗？",
    a: "完全免费开源。没有付费墙，没有会员制，所有内容永久免费。我们相信 AI 编程能力应该人人可及。",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6" />
            <span className="font-bold text-lg">AI Coder Quest</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#path" className="hover:text-foreground transition-colors">
              学习路径
            </Link>
            <Link href="#ranks" className="hover:text-foreground transition-colors">
              段位系统
            </Link>
            <Link href="/stories" className="hover:text-foreground transition-colors">
              故事
            </Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                登录
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">开始闯关</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(34, 211, 238, 0.1) 0%, transparent 40%)",
            }}
          />
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: "linear-gradient(135deg, #6366f1, #ec4899)",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 animate-[fadeIn_0.5s_ease-out]">
            🎮 零基础 → 全栈开发者，不写一行代码
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-[slideUp_0.6s_ease-out]">
            用 AI 写代码
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              你只需要说人话
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-[slideUp_0.7s_ease-out]">
            24 关闯关挑战，从「什么是终端」到「独立上线全栈网站」。
            <br className="hidden md:block" />
            不学编程语言，只学如何驱动 AI —— 这是属于每个人的超能力。
          </p>

          {/* Stats inline */}
          <div className="flex justify-center gap-8 md:gap-12 mb-10 animate-[slideUp_0.8s_ease-out]">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">24 关</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">闯关挑战</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">7 段位</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">成长等级</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">~8h</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">平均通关</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[slideUp_0.9s_ease-out]">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 h-12">
                免费开始闯关 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#path">
              <Button variant="outline" size="lg" className="text-lg px-8 h-12">
                查看学习路径
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Stories Preview */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">他们都做到了</h2>
            <p className="text-muted-foreground">
              零基础的普通人，用 AI 编程改变了自己的工作和生活
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <div
                key={story.name}
                className="relative p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border transition-all hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Quote className="absolute top-4 right-4 h-5 w-5 text-muted-foreground/30" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{story.avatar}</div>
                  <div>
                    <div className="font-semibold">{story.name}</div>
                    <div className="text-sm text-muted-foreground">{story.role}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/stories">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                查看更多故事 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="path" className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">学习路径</h2>
            <p className="text-muted-foreground">
              6 个章节、24 关，带你从零走到独立开发
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-pink-500/50" />

            <div className="space-y-8">
              {chapters.map((chapter, index) => (
                <div key={chapter.id} className="relative flex gap-4 md:gap-6">
                  {/* Timeline dot */}
                  <div className="relative z-10 flex-shrink-0 w-12 md:w-16 h-12 md:h-16 rounded-full bg-background border-2 border-border flex items-center justify-center text-xl md:text-2xl">
                    {chapter.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2 md:pt-3 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-lg">{chapter.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {chapter.levels} 关
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{chapter.desc}</p>
                  </div>
                </div>
              ))}

              {/* Final node */}
              <div className="relative flex gap-4 md:gap-6">
                <div className="relative z-10 flex-shrink-0 w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xl md:text-2xl">
                  🏆
                </div>
                <div className="flex-1 pt-2 md:pt-3">
                  <h3 className="font-semibold text-lg">通关！</h3>
                  <p className="text-sm text-muted-foreground">
                    恭喜你成为能独立开发上线产品的"不写代码的程序员"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranks */}
      <section id="ranks" className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">段位系统</h2>
            <p className="text-muted-foreground">
              每完成一章解锁新段位，量化你的 AI 编程含金量
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ranks.map((rank, index) => (
              <div
                key={rank.name}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-border/80 transition-colors bg-card/30"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: rank.color + "20", color: rank.color }}
                >
                  <rank.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{rank.name}</div>
                </div>
                <div className="font-bold text-sm flex-shrink-0" style={{ color: rank.color }}>
                  {rank.salary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">三步通关</h2>
            <p className="text-muted-foreground">
              像打游戏一样简单，每关只需 20-30 分钟
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">1. 看任务</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                每关有清晰的目标和手把手的操作引导，照着做就行
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">2. 对 AI 说话</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                用自然语言告诉 AI 你要什么，它帮你写代码
              </p>
            </div>
            <div className="text-center group">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="font-semibold mb-2 text-lg">3. 验证通关</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                截图或粘贴结果，系统自动判定是否通关
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">常见问题</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 rounded-xl border border-border/50 bg-card/30"
              >
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-indigo-400">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 border-t border-border/40 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            今天开始，明天就能做出自己的工具
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            不需要天赋，不需要基础，不需要花钱。
            <br />
            你只需要一台电脑和几个小时的好奇心。
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-10 h-13">
              立即开始闯关 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-xs text-muted-foreground">
            完全免费 · 无需信用卡 · 开源项目
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="h-4 w-4" />
              <span>© 2025 AI Coder Quest</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="/stories"
                className="hover:text-foreground transition-colors"
              >
                故事
              </Link>
              <Link
                href="https://github.com/roach54023/ai-coder-quest"
                className="hover:text-foreground transition-colors flex items-center gap-1"
                target="_blank"
              >
                <ExternalLink className="h-3 w-3" />
                GitHub
              </Link>
              <Link
                href="mailto:roach54023@qq.com"
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                <Mail className="h-4 w-4" />
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
