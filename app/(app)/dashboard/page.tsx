import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Circle, Star } from "lucide-react";
import { RANKS } from "@/lib/content/ranks";

const CHAPTERS_DATA = [
  {
    id: "prologue",
    title: "序章 · 开机",
    subtitle: "把AI编程需要的基础环境装好",
    levels: [
      { id: "0-1", title: "打开终端" },
      { id: "0-2", title: "安装 Node.js" },
      { id: "0-3", title: "召唤 AI 搭档" },
    ],
  },
  {
    id: "chapter_1",
    title: "第一章 · 静态世界",
    subtitle: "用 AI 做出一个纯 HTML 网站",
    levels: [
      { id: "1-1", title: "Hello World" },
      { id: "1-2", title: "个人名片" },
      { id: "1-3", title: "🎯 多页面个人网站", delivery: true },
    ],
  },
  {
    id: "chapter_2",
    title: "第二章 · 工程化起步",
    subtitle: "从HTML文件升级到前端工程",
    levels: [
      { id: "2-1", title: "第一个 npm 项目" },
      { id: "2-2", title: "迁移到组件化" },
      { id: "2-3", title: "让它好看" },
      { id: "2-4", title: "🎯 完整作品集", delivery: true },
    ],
  },
  {
    id: "chapter_3",
    title: "第三章 · 让网站活起来",
    subtitle: "给网站加上交互功能",
    levels: [
      { id: "3-1", title: "暗色模式" },
      { id: "3-2", title: "实时搜索" },
      { id: "3-3", title: "联系表单" },
      { id: "3-4", title: "🎯 一个像样的产品", delivery: true },
    ],
  },
  {
    id: "chapter_4",
    title: "第四章 · 全栈之路",
    subtitle: "后端、数据库、用户认证",
    levels: [
      { id: "4-1", title: "后端 API 初体验" },
      { id: "4-2", title: "数据库" },
      { id: "4-3", title: "用户系统" },
      { id: "4-4", title: "🎯 全栈管理系统", delivery: true },
    ],
  },
  {
    id: "chapter_5",
    title: "第五章 · 上线与发布",
    subtitle: "部署到互联网让全世界访问",
    levels: [
      { id: "5-1", title: "推送到 GitHub" },
      { id: "5-2", title: "部署到 Vercel" },
      { id: "5-3", title: "🎯 正式发布", delivery: true },
    ],
  },
];

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session!.user!.id;

  const supabase = createAdminClient();

  // Fetch user progress
  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId);

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const completedLevels = progress?.filter((p) => p.status === "completed") || [];
  const totalLevels = 21;
  const currentRank = RANKS.find((r) => r.id === (profile?.current_rank_id || "rank_0"));

  const getLevelStatus = (levelId: string) => {
    const p = progress?.find((item) => item.level_id === levelId);
    return p?.status || "locked";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">闯关地图</h1>
            <p className="text-muted-foreground">
              当前段位：
              <span className="font-medium" style={{ color: currentRank?.badge_color }}>
                {currentRank?.name}
              </span>
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-1">
            {completedLevels.length} / {totalLevels}
          </Badge>
        </div>
        <Progress value={completedLevels.length} max={totalLevels} />
      </div>

      {/* Chapters */}
      <div className="space-y-6">
        {CHAPTERS_DATA.map((chapter) => {
          const chapterCompleted = chapter.levels.every(
            (l) => getLevelStatus(l.id) === "completed"
          );
          const chapterRank = RANKS.find((r) => r.chapter_id === chapter.id);

          return (
            <Card key={chapter.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{chapter.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{chapter.subtitle}</p>
                  </div>
                  {chapterCompleted && chapterRank && (
                    <Badge style={{ backgroundColor: chapterRank.badge_color + '20', color: chapterRank.badge_color }}>
                      {chapterRank.name}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapter.levels.map((level) => {
                    const status = getLevelStatus(level.id);
                    return (
                      <Link
                        key={level.id}
                        href={status === "locked" ? "#" : `/levels/${chapter.id}/${level.id}`}
                        className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                          status === "locked"
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-accent"
                        }`}
                      >
                        {status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : status === "locked" ? (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <Circle className="h-5 w-5 text-blue-500" />
                        )}
                        <span className={status === "completed" ? "line-through text-muted-foreground" : ""}>
                          {level.title}
                        </span>
                        {(level as any).delivery && (
                          <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
