"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Trophy, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const stories = [
  {
    name: "小王",
    age: 28,
    occupation: "外卖骑手",
    avatar: "王",
    avatarColor: "#60A5FA",
    project: "路线优化工具",
    description:
      "用 AI 辅助开发了一个配送路线规划工具，根据订单地址自动计算最短路径，每天能多送 5-8 单。",
    quote: "我连 Excel 都不太会用，但现在我有了自己写的工具，同事都来找我要。",
    duration: "3天通关",
    rank: "不写代码的程序员",
    rankColor: "#A78BFA",
  },
  {
    name: "小李",
    age: 35,
    occupation: "小学老师",
    avatar: "李",
    avatarColor: "#34D399",
    project: "课堂互动答题 App",
    description:
      "为班上 40 个学生做了一个在线答题系统，支持随机出题、计时作答、自动批改和错题统计。",
    quote: "孩子们现在抢着做练习题，家长都问我这个 App 在哪下载的。",
    duration: "5天通关",
    rank: "全干工程师",
    rankColor: "#F59E0B",
  },
  {
    name: "老张",
    age: 45,
    occupation: "餐饮店老板",
    avatar: "张",
    avatarColor: "#F59E0B",
    project: "库存管理系统",
    description:
      "开发了一套进销存系统，自动跟踪食材库存、生成采购清单、统计每日成本。一年省了 3 万块食材浪费。",
    quote: "以前都是手写记账本，现在手机上就能看所有数据，终于不用半夜盘库存了。",
    duration: "1周通关",
    rank: "全干工程师",
    rankColor: "#F59E0B",
  },
  {
    name: "小陈",
    age: 22,
    occupation: "大三学生",
    avatar: "陈",
    avatarColor: "#EC4899",
    project: "个人作品集网站",
    description:
      "用 AI 辅助搭建了个人作品集，展示课程项目和竞赛作品，带动态交互效果和暗色主题。面试时直接甩链接。",
    quote: "面试官说他见过上百份简历，但带自己做的网站的不超过 5 个。我拿到了实习 offer。",
    duration: "3天通关",
    rank: "独立开发者",
    rankColor: "#EF4444",
  },
  {
    name: "小赵",
    age: 30,
    occupation: "产品经理",
    avatar: "赵",
    avatarColor: "#A78BFA",
    project: "SaaS MVP 原型",
    description:
      "把写了半年的 PRD 直接变成了可运行的产品原型，带用户注册、数据看板和付费功能。投资人当场拍板。",
    quote: "以前求着开发排期，现在我自己就能出 demo。融到了种子轮，200 万。",
    duration: "5天通关",
    rank: "技术合伙人",
    rankColor: "#FFFFFF",
  },
  {
    name: "小刘",
    age: 40,
    occupation: "自由职业者",
    avatar: "刘",
    avatarColor: "#14B8A6",
    project: "3 个客户网站",
    description:
      "通关后接了外包项目，3 个月做了 3 个企业官网，从设计到部署全用 AI 完成。现在月入 $3K 稳定接单。",
    quote: "40 岁转行听起来疯狂，但 AI 让我 3 天就能交付一个以前要 3 周的项目。",
    duration: "1周通关",
    rank: "独立开发者",
    rankColor: "#EF4444",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">返回首页</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold text-lg">Vibe Stories</span>
          </div>
          <Link href="/register">
            <Button size="sm">开始闯关</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6">
              🌟 真实用户故事
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              他们从零开始
              <br />
              <span className="text-muted-foreground">用 AI 改变了职业轨迹</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              这些人没有任何编程背景。他们只是学会了"如何让 AI 帮自己写代码"——然后一切都不一样了。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stories.map((story) => (
              <motion.div key={story.name} variants={cardVariants}>
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all duration-300 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Avatar + Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0"
                        style={{
                          backgroundColor: story.avatarColor + "20",
                          color: story.avatarColor,
                        }}
                      >
                        {story.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">
                          {story.name}
                          <span className="text-muted-foreground font-normal ml-1">
                            {story.age}岁
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {story.occupation}
                        </div>
                      </div>
                    </div>

                    {/* Project */}
                    <div className="mb-3">
                      <div className="text-sm font-medium text-primary mb-1">
                        {story.project}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {story.description}
                      </p>
                    </div>

                    {/* Quote */}
                    <div className="flex-1 mb-4">
                      <div className="relative bg-muted/30 rounded-lg p-3 border border-border/30">
                        <Quote className="h-3 w-3 text-muted-foreground/50 absolute top-2 left-2" />
                        <p className="text-sm italic text-muted-foreground pl-4">
                          {story.quote}
                        </p>
                      </div>
                    </div>

                    {/* Footer Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{story.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy
                          className="h-3 w-3"
                          style={{ color: story.rankColor }}
                        />
                        <span
                          className="text-xs font-medium"
                          style={{ color: story.rankColor }}
                        >
                          {story.rank}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            className="grid grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-3xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground mt-1">
                通关率
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">~6h</div>
              <div className="text-sm text-muted-foreground mt-1">
                平均通关时长
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">73%</div>
              <div className="text-sm text-muted-foreground mt-1">
                通关后有商业产出
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-border/40">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">下一个故事，由你书写</h2>
            <p className="text-muted-foreground mb-8">
              不需要任何编程基础。你只需要一个想法，和学会跟 AI 对话的决心。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="text-lg px-8">
                  开始我的闯关之旅 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  了解更多
                </Button>
              </Link>
            </div>
          </motion.div>
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
