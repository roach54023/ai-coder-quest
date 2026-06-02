import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { CheckCircle, Circle, Star, SkipForward, Zap, Trophy, ArrowRight } from "lucide-react";
import { getRankByXP, getNextRank, getRankByChapter, LEVEL_XP } from "@/lib/content/ranks";

const CHAPTERS_DATA = [
  {
    id: "prologue",
    title: "序章",
    titleFull: "序章 · 开机",
    subtitle: "装好 AI 助手，10 分钟跑通第一个网页并部署上线",
    color: "#6366F1",
    levels: [
      { id: "0-1", title: "安装 AI 编程助手" },
      { id: "0-2", title: "第一个网页上线", delivery: true },
    ],
  },
  {
    id: "chapter_1",
    title: "第一章",
    titleFull: "第一章 · 作品集网站",
    subtitle: "用 Next.js 做出三页作品集，部署到 Vercel",
    color: "#10B981",
    levels: [
      { id: "1-1", title: "搭建 Next.js 项目" },
      { id: "1-2", title: "三页作品集" },
      { id: "1-3", title: "视觉美化" },
      { id: "1-4", title: "部署上线", delivery: true },
    ],
  },
  {
    id: "chapter_2",
    title: "第二章",
    titleFull: "第二章 · 专业工作流",
    subtitle: "GitHub + Vercel 自动部署，SEO 与性能优化",
    color: "#F59E0B",
    levels: [
      { id: "2-1", title: "动效与交互" },
      { id: "2-2", title: "作品详情页" },
      { id: "2-3", title: "SEO 优化" },
      { id: "2-4", title: "性能优化" },
      { id: "2-5", title: "部署第二版", delivery: true },
    ],
  },
  {
    id: "chapter_3",
    title: "第三章",
    titleFull: "第三章 · 交互与体验",
    subtitle: "暗色模式、实时搜索、联系表单、响应式适配",
    color: "#EC4899",
    levels: [
      { id: "3-1", title: "暗色模式" },
      { id: "3-2", title: "实时搜索" },
      { id: "3-3", title: "联系表单" },
      { id: "3-4", title: "响应式适配" },
      { id: "3-5", title: "部署第三版", delivery: true },
    ],
  },
  {
    id: "chapter_4",
    title: "第四章",
    titleFull: "第四章 · 全栈",
    subtitle: "API 路由、数据库、后台管理、访问统计",
    color: "#0EA5E9",
    levels: [
      { id: "4-1", title: "API 路由入门" },
      { id: "4-2", title: "数据库入门" },
      { id: "4-3", title: "后台管理" },
      { id: "4-4", title: "访问统计" },
      { id: "4-5", title: "部署第四版", delivery: true },
    ],
  },
  {
    id: "chapter_5",
    title: "第五章",
    titleFull: "第五章 · 能赚钱的产品",
    subtitle: "用户登录、AI 对话、Stripe 支付，做出可运营的产品",
    color: "#F97316",
    levels: [
      { id: "5-1", title: "用户登录" },
      { id: "5-2", title: "接入 AI" },
      { id: "5-3", title: "接入支付" },
      { id: "5-4", title: "最终部署", delivery: true },
    ],
  },
];

const ALL_LEVEL_IDS = CHAPTERS_DATA.flatMap((ch) => ch.levels.map((l) => l.id));
const TOTAL_LEVELS = ALL_LEVEL_IDS.length;

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
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

  const nextLevelId = ALL_LEVEL_IDS.find((id) => !completedIds.has(id) && !skippedIds.has(id));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── 页面标题 ── */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-medium">Course Map</p>
          <h1 className="text-4xl font-black text-gray-900">闯关地图</h1>
        </div>

        {/* ── 顶部两栏：段位卡 + 继续闯关 ── */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">

          {/* 段位 + XP 卡 */}
          <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                style={{ background: currentRank.badge_color + "12", border: `1.5px solid ${currentRank.badge_color}25` }}
              >
                {currentRank.badge_icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base" style={{ color: currentRank.badge_color }}>
                    {currentRank.name}
                  </span>
                  {nextRank && (
                    <span className="text-xs text-gray-400">→ {nextRank.badge_icon} {nextRank.name}</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{currentRank.subtitle}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-3">
              <Star className="h-4 w-4 text-amber-400 mb-0.5" />
              <span className="text-3xl font-black text-amber-500">{totalXP.toLocaleString()}</span>
              <span className="text-sm text-gray-400">XP</span>
              <span className="text-xs text-gray-300 ml-1">{completedCount}/{TOTAL_LEVELS} 关</span>
            </div>

            {nextRank ? (
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>{currentRank.min_xp.toLocaleString()} XP</span>
                  <span>还差 <span className="text-gray-700 font-semibold">{xpToNext.toLocaleString()} XP</span> 升段</span>
                  <span>{nextRank.min_xp.toLocaleString()} XP</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${xpProgress}%`,
                      background: `linear-gradient(90deg, ${currentRank.badge_color}, ${nextRank.badge_color})`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <Trophy className="h-4 w-4" />
                全部通关！已达最高段位 👑
              </div>
            )}
          </div>

          {/* 继续闯关 / 完成提示 */}
          {nextLevelId ? (() => {
            const ch = CHAPTERS_DATA.find((c) => c.levels.some((l) => l.id === nextLevelId));
            const lv = ch?.levels.find((l) => l.id === nextLevelId);
            if (!ch || !lv) return null;
            const xp = LEVEL_XP[nextLevelId] ?? 100;
            return (
              <Link
                href={`/zh/levels/${ch.id}/${nextLevelId}`}
                className="rounded-2xl border border-gray-100 p-6 hover:border-gray-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">继续闯关</p>
                  <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {lv.title}
                  </h3>
                  <p className="text-sm text-gray-400">{ch.titleFull}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-sm font-bold text-amber-500">+{xp} XP</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400 group-hover:text-gray-700 transition-colors">
                    开始 <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })() : (
            <div className="rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
              <Trophy className="h-8 w-8 text-amber-400 mb-3" />
              <h3 className="font-black text-gray-900 mb-1">全部通关！</h3>
              <p className="text-sm text-gray-400">你已完成所有关卡，恭喜 🎉</p>
            </div>
          )}
        </div>

        {/* ── 章节列表 ── */}
        <div className="space-y-3">
          {CHAPTERS_DATA.map((chapter) => {
            const chapterCompletedCount = chapter.levels.filter((l) => completedIds.has(l.id)).length;
            const chapterAllDone = chapterCompletedCount === chapter.levels.length;
            const chapterRank = getRankByChapter(chapter.id);
            const progressPct = (chapterCompletedCount / chapter.levels.length) * 100;

            return (
              <div
                key={chapter.id}
                className="rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all"
              >
                {/* 章节头 */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    {/* 彩色圆点 */}
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: chapter.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-black" style={{ color: chapter.color }}>
                          {chapter.title}
                        </span>
                        <span className="text-xs text-gray-400">
                          {chapterCompletedCount}/{chapter.levels.length} 关
                        </span>
                        {chapterAllDone && chapterRank && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: chapterRank.badge_color + "12", color: chapterRank.badge_color }}
                          >
                            {chapterRank.badge_icon} {chapterRank.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{chapter.subtitle}</p>
                    </div>
                  </div>

                  {/* 进度条 */}
                  <div className="w-24 shrink-0">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progressPct}%`, background: chapter.color }}
                      />
                    </div>
                  </div>
                </div>

                {/* 关卡列表 */}
                <div className="divide-y divide-gray-50">
                  {chapter.levels.map((level) => {
                    const isCompleted = completedIds.has(level.id);
                    const isSkipped = skippedIds.has(level.id);
                    const xp = LEVEL_XP[level.id] ?? 100;
                    const levelUrl = `/zh/levels/${chapter.id}/${level.id}`;

                    return (
                      <Link
                        key={level.id}
                        href={levelUrl}
                        className={`flex items-center gap-3 px-6 py-3.5 transition-all group ${
                          isCompleted ? "hover:bg-emerald-50/40" : "hover:bg-gray-50"
                        }`}
                      >
                        {/* 状态图标 */}
                        <div className="shrink-0 w-5 flex justify-center">
                          {isCompleted ? (
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" style={{ width: "18px", height: "18px" }} />
                          ) : isSkipped ? (
                            <SkipForward className="text-amber-400" style={{ width: "18px", height: "18px" }} />
                          ) : (
                            <Circle style={{ width: "18px", height: "18px", color: chapter.color + "50" }} />
                          )}
                        </div>

                        {/* 关卡编号 */}
                        <span
                          className="font-mono text-[11px] px-2 py-0.5 rounded-md shrink-0 font-bold"
                          style={{
                            background: chapter.color + (isCompleted ? "10" : "08"),
                            color: isCompleted ? chapter.color : chapter.color + "80",
                          }}
                        >
                          {level.id}
                        </span>

                        {/* 标题 */}
                        <span
                          className={`flex-1 text-sm transition-colors ${
                            isCompleted
                              ? "text-gray-400 line-through"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {level.title}
                        </span>

                        {/* 交付物 */}
                        {(level as any).delivery && !isCompleted && (
                          <span className="text-[10px] text-amber-600 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 shrink-0">
                            交付
                          </span>
                        )}

                        {/* 补交 */}
                        {isSkipped && (
                          <span className="text-[10px] text-amber-600 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 shrink-0">
                            补交
                          </span>
                        )}

                        {/* XP */}
                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="h-3 w-3 text-amber-400 opacity-50" />
                          <span className={`text-xs font-bold ${isCompleted ? "text-emerald-500" : "text-gray-400"}`}>
                            {isCompleted ? `+${xp}` : `${xp} XP`}
                          </span>
                        </div>

                        {/* 箭头 */}
                        <ArrowRight
                          className={`shrink-0 transition-all group-hover:translate-x-0.5 ${
                            isCompleted ? "text-gray-200" : "text-gray-300 group-hover:text-gray-500"
                          }`}
                          style={{ width: "14px", height: "14px" }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 底部提示 ── */}
        <div className="mt-6 flex items-start gap-3 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50">
          <Zap className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-0.5">有基础？直接跳到感兴趣的章节</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              不用从头来。每完成一关获得 XP，累计 XP 自动升段，与完成顺序无关。
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
