import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { CheckCircle, Circle, Star, SkipForward, Zap, Trophy, ArrowRight, Lock } from "lucide-react";
import { getRankByXP, getNextRank, getRankByChapter, LEVEL_XP } from "@/lib/content/ranks";

const CHAPTERS_DATA = [
  {
    id: "prologue",
    title: "序章",
    titleFull: "序章 · 开机",
    subtitle: "装好 AI 助手（Claude Code / Codex / Trae），跑通第一个作品",
    color: "#6366F1",
    levels: [
      { id: "0-1", title: "安装 AI 编程助手" },
      { id: "0-2", title: "第一个 AI 生成的页面" },
    ],
  },
  {
    id: "chapter_1",
    title: "第一章",
    titleFull: "第一章 · 静态网站",
    subtitle: "学会 Prompt，用 AI 做出一个纯 HTML 网站并上线",
    color: "#10B981",
    levels: [
      { id: "1-1", title: "Prompt 核心技巧" },
      { id: "1-2", title: "个人名片页" },
      { id: "1-3", title: "多页作品集", delivery: true },
      { id: "1-4", title: "发布到互联网" },
      { id: "1-5", title: "设计进阶" },
    ],
  },
  {
    id: "chapter_2",
    title: "第二章",
    titleFull: "第二章 · 工程化起步",
    subtitle: "从 HTML 文件升级到前端工程，组件化开发",
    color: "#F59E0B",
    levels: [
      { id: "2-1", title: "升级你的工具" },
      { id: "2-2", title: "搭建骨架" },
      { id: "2-3", title: "装修美化" },
      { id: "2-4", title: "完整作品集", delivery: true },
      { id: "2-5", title: "部署 React 项目" },
    ],
  },
  {
    id: "chapter_3",
    title: "第三章",
    titleFull: "第三章 · 让网站活起来",
    subtitle: "给网站加上交互功能和视觉素材",
    color: "#EC4899",
    levels: [
      { id: "3-1", title: "暗色模式" },
      { id: "3-2", title: "实时搜索" },
      { id: "3-3", title: "联系表单" },
      { id: "3-4", title: "AI 生图素材" },
      { id: "3-5", title: "产品级打磨", delivery: true },
    ],
  },
  {
    id: "chapter_4",
    title: "第四章",
    titleFull: "第四章 · 全栈之路",
    subtitle: "后端、数据库、支付、AI 集成",
    color: "#0EA5E9",
    levels: [
      { id: "4-1", title: "后端 API 初体验" },
      { id: "4-2", title: "数据库" },
      { id: "4-3", title: "用户系统" },
      { id: "4-4", title: "全栈管理系统" },
      { id: "4-5", title: "接入支付" },
      { id: "4-6", title: "AI 能力集成", delivery: true },
    ],
  },
  {
    id: "chapter_5",
    title: "第五章",
    titleFull: "第五章 · 上线与发布",
    subtitle: "部署到互联网，让全世界访问你的产品",
    color: "#F97316",
    levels: [
      { id: "5-1", title: "推送到 GitHub" },
      { id: "5-2", title: "部署到 Vercel" },
      { id: "5-3", title: "正式发布", delivery: true },
    ],
  },
];

const ALL_LEVEL_IDS = CHAPTERS_DATA.flatMap((ch) => ch.levels.map((l) => l.id));
const TOTAL_LEVELS = ALL_LEVEL_IDS.length;

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session!.user!.id;

  const supabase = createAdminClient();

  const [{ data: progress }, { data: profile }] = await Promise.all([
    supabase.from("user_progress").select("*").eq("user_id", userId),
    supabase.from("user_profiles").select("total_xp, current_rank_id").eq("id", userId).single(),
  ]);

  const completedIds = new Set(
    progress?.filter((p) => p.status === "completed").map((p) => p.level_id) ?? []
  );
  const skippedIds = new Set(
    progress?.filter((p) => p.status === "skipped").map((p) => p.level_id) ?? []
  );

  const totalXP = profile?.total_xp ?? 0;
  const completedCount = completedIds.size;
  const currentRank = getRankByXP(totalXP);
  const nextRank = getNextRank(currentRank.id);
  const xpToNext = nextRank ? nextRank.min_xp - totalXP : 0;
  const xpRangeSize = nextRank ? nextRank.min_xp - currentRank.min_xp : 1;
  const xpProgress = nextRank
    ? Math.min(100, ((totalXP - currentRank.min_xp) / xpRangeSize) * 100)
    : 100;

  // 找到第一个未完成的关卡（推荐继续的位置）
  const nextLevelId = ALL_LEVEL_IDS.find((id) => !completedIds.has(id) && !skippedIds.has(id));

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ── 段位 + XP 进度卡 ── */}
        <div
          className="relative rounded-3xl border border-white/[0.08] p-6 mb-8 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${currentRank.badge_color}10 0%, #0d0d1a 70%)` }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${currentRank.badge_color}, transparent)` }}
          />

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: currentRank.badge_color + "20", border: `1.5px solid ${currentRank.badge_color}40` }}
              >
                {currentRank.badge_icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black" style={{ color: currentRank.badge_color }}>
                    {currentRank.name}
                  </span>
                  {nextRank && (
                    <span className="text-xs text-gray-500">
                      → {nextRank.badge_icon} {nextRank.name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{currentRank.subtitle}</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-2xl font-black text-amber-400">{totalXP.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500">XP · {completedCount}/{TOTAL_LEVELS} 关</div>
            </div>
          </div>

          {/* XP 进度条 */}
          {nextRank ? (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                <span>{currentRank.min_xp.toLocaleString()} XP</span>
                <span>还差 <span className="text-white font-medium">{xpToNext.toLocaleString()} XP</span> 升段</span>
                <span>{nextRank.min_xp.toLocaleString()} XP</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${xpProgress}%`,
                    background: `linear-gradient(90deg, ${currentRank.badge_color}, ${nextRank.badge_color})`,
                    boxShadow: `0 0 8px ${currentRank.badge_color}80`,
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
              <Trophy className="h-4 w-4" />
              全部通关！已达最高段位 👑
            </div>
          )}
        </div>

        {/* ── 继续闯关提示 ── */}
        {nextLevelId && (() => {
          const ch = CHAPTERS_DATA.find((c) => c.levels.some((l) => l.id === nextLevelId));
          const lv = ch?.levels.find((l) => l.id === nextLevelId);
          if (!ch || !lv) return null;
          const xp = LEVEL_XP[nextLevelId] ?? 100;
          return (
            <Link
              href={`/zh/levels/${ch.id}/${nextLevelId}`}
              className="flex items-center gap-4 p-4 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all mb-8 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-indigo-400 font-medium mb-0.5">继续闯关</p>
                <p className="text-sm font-bold text-white truncate">{lv.title}</p>
                <p className="text-xs text-gray-500">{ch.titleFull}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-sm font-bold text-amber-400">+{xp} XP</span>
                </div>
                <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          );
        })()}

        {/* ── 章节列表 ── */}
        <div className="space-y-4">
          {CHAPTERS_DATA.map((chapter) => {
            const chapterCompletedCount = chapter.levels.filter((l) => completedIds.has(l.id)).length;
            const chapterAllDone = chapterCompletedCount === chapter.levels.length;
            const chapterRank = getRankByChapter(chapter.id);

            return (
              <div
                key={chapter.id}
                className="rounded-2xl border border-white/[0.06] overflow-hidden"
                style={{ boxShadow: `0 0 30px -15px ${chapter.color}20` }}
              >
                {/* 章节头 */}
                <div
                  className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]"
                  style={{ background: chapter.color + "08" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: chapter.color, boxShadow: `0 0 6px ${chapter.color}` }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: chapter.color }}>
                          {chapter.title}
                        </span>
                        <span className="text-xs text-gray-600">
                          {chapterCompletedCount}/{chapter.levels.length} 关
                        </span>
                        {chapterAllDone && chapterRank && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: chapterRank.badge_color + "20", color: chapterRank.badge_color }}
                          >
                            {chapterRank.badge_icon} {chapterRank.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{chapter.subtitle}</p>
                    </div>
                  </div>

                  {/* 章节进度条 */}
                  <div className="w-20 shrink-0">
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(chapterCompletedCount / chapter.levels.length) * 100}%`,
                          background: chapter.color,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 关卡列表 */}
                <div className="divide-y divide-white/[0.04]">
                  {chapter.levels.map((level) => {
                    const isCompleted = completedIds.has(level.id);
                    const isSkipped = skippedIds.has(level.id);
                    const xp = LEVEL_XP[level.id] ?? 100;
                    const levelUrl = `/zh/levels/${chapter.id}/${level.id}`;

                    return (
                      <Link
                        key={level.id}
                        href={levelUrl}
                        className={`flex items-center gap-3 px-5 py-3.5 transition-all group ${
                          isCompleted
                            ? "bg-emerald-500/[0.03] hover:bg-emerald-500/[0.06]"
                            : "hover:bg-white/[0.03]"
                        }`}
                      >
                        {/* 状态图标 */}
                        <div className="shrink-0 w-6 flex justify-center">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          ) : isSkipped ? (
                            <SkipForward className="h-5 w-5 text-amber-500" />
                          ) : (
                            <Circle
                              className="h-5 w-5 transition-colors"
                              style={{ color: chapter.color + "60" }}
                            />
                          )}
                        </div>

                        {/* 关卡 ID */}
                        <span
                          className="font-mono text-xs px-2 py-0.5 rounded-md shrink-0"
                          style={{
                            background: chapter.color + (isCompleted ? "15" : "10"),
                            color: isCompleted ? chapter.color : chapter.color + "80",
                          }}
                        >
                          {level.id}
                        </span>

                        {/* 标题 */}
                        <span
                          className={`flex-1 text-sm transition-colors ${
                            isCompleted
                              ? "text-gray-500 line-through"
                              : "text-gray-200 group-hover:text-white"
                          }`}
                        >
                          {level.title}
                        </span>

                        {/* 交付物标记 */}
                        {(level as any).delivery && !isCompleted && (
                          <Star className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        )}

                        {/* 跳过标记 */}
                        {isSkipped && (
                          <span className="text-[10px] text-amber-500 font-medium px-2 py-0.5 rounded-full bg-amber-500/10 shrink-0">
                            补交
                          </span>
                        )}

                        {/* XP */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="h-3 w-3 text-amber-400 opacity-60" />
                          <span
                            className={`text-xs font-bold ${
                              isCompleted ? "text-emerald-500" : "text-amber-400 opacity-60"
                            }`}
                          >
                            {isCompleted ? `+${xp}` : `${xp} XP`}
                          </span>
                        </div>

                        {/* 箭头 */}
                        <ArrowRight
                          className={`h-3.5 w-3.5 shrink-0 transition-all group-hover:translate-x-0.5 ${
                            isCompleted ? "text-gray-700" : "text-gray-600 group-hover:text-gray-400"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 跳关入场提示 ── */}
        <div className="mt-6 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-start gap-3">
            <Zap className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-gray-300 mb-1">有基础？直接跳到感兴趣的章节</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                不用从头来。每完成一关获得 XP，累计 XP 自动升段，与完成顺序无关。
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
