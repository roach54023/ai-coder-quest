import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Code, Rocket, Sparkles, Layers, Crown } from "lucide-react";

const ranks = [
  { name: "IT文盲", salary: "¥0", color: "#9CA3AF", icon: Terminal },
  { name: "会装软件的普通人", salary: "¥3K/月", color: "#60A5FA", icon: Terminal },
  { name: "能出活的实习生", salary: "¥5K/月", color: "#34D399", icon: Code },
  { name: "不写代码的程序员", salary: "¥15K/月", color: "#A78BFA", icon: Sparkles },
  { name: "全干工程师", salary: "¥30K/月", color: "#F59E0B", icon: Layers },
  { name: "独立开发者", salary: "¥50K/月", color: "#EF4444", icon: Rocket },
  { name: "技术合伙人", salary: "¥∞", color: "#FFFFFF", icon: Crown },
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
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">登录</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">开始闯关</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            🎮 游戏化 AI 编程闯关平台
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            AI 时代的编程入门
            <br />
            <span className="text-muted-foreground">不需要学编程</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            18 关闯关挑战，从打开终端到上线全栈网站。你不需要学任何编程语言，只需要学会"如何驱动 AI 写代码"。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                开始闯关 <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#ranks">
              <Button variant="outline" size="lg" className="text-lg px-8">
                查看段位系统
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold">18</div>
              <div className="text-sm text-muted-foreground">闯关关卡</div>
            </div>
            <div>
              <div className="text-3xl font-bold">7</div>
              <div className="text-sm text-muted-foreground">段位等级</div>
            </div>
            <div>
              <div className="text-3xl font-bold">~6h</div>
              <div className="text-sm text-muted-foreground">平均通关</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ranks */}
      <section id="ranks" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">段位系统</h2>
          <p className="text-center text-muted-foreground mb-12">
            每完成一章解锁新段位，用"AI编程含金量"衡量你的进度
          </p>
          <div className="grid gap-4">
            {ranks.map((rank, index) => (
              <div
                key={rank.name}
                className="flex items-center gap-4 p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: rank.color + '20', color: rank.color }}
                >
                  <rank.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{rank.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold" style={{ color: rank.color }}>
                    {rank.salary}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">怎么玩？</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">阅读关卡指引</h3>
              <p className="text-sm text-muted-foreground">每关有清晰的操作步骤和 AI prompt 示例</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">对 AI 说话</h3>
              <p className="text-sm text-muted-foreground">在终端中用自然语言指挥 AI 写代码</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">提交验证</h3>
              <p className="text-sm text-muted-foreground">截图或粘贴结果，自动验证通关</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">准备好了吗？</h2>
          <p className="text-muted-foreground mb-8">
            从"IT文盲"到"独立开发者"，只需要几个小时。
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              开始闯关 <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/40">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 AI Coder Quest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
