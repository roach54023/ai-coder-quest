import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { CheckCircle, Circle, Star, SkipForward, Zap, Trophy, ArrowRight } from "lucide-react";
import { getRankByXP, getNextRank, getRankByChapter, LEVEL_XP } from "@/lib/content/ranks";
import { EN_CHAPTERS_DATA, toEnglishRank } from "@/lib/content/english-course";

const ALL_LEVEL_IDS = EN_CHAPTERS_DATA.flatMap((ch) => ch.levels.map((l) => l.id));
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
  const currentRank = toEnglishRank(getRankByXP(totalXP));
  const nextRankRaw = getNextRank(currentRank.id);
  const nextRank = nextRankRaw ? toEnglishRank(nextRankRaw) : null;
  const xpToNext = nextRank ? nextRank.min_xp - totalXP : 0;
  const xpRangeSize = nextRank ? nextRank.min_xp - currentRank.min_xp : 1;
  const xpProgress = nextRank
    ? Math.min(100, ((totalXP - currentRank.min_xp) / xpRangeSize) * 100)
    : 100;

  const nextLevelId = ALL_LEVEL_IDS.find((id) => !completedIds.has(id) && !skippedIds.has(id));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-medium">Course Map</p>
          <h1 className="text-4xl font-black text-gray-900">Course Map</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
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
                    <span className="text-xs text-gray-400">to {nextRank.badge_icon} {nextRank.name}</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{currentRank.subtitle}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-3">
              <Star className="h-4 w-4 text-amber-400 mb-0.5" />
              <span className="text-3xl font-black text-amber-500">{totalXP.toLocaleString()}</span>
              <span className="text-sm text-gray-400">XP</span>
              <span className="text-xs text-gray-300 ml-1">{completedCount}/{TOTAL_LEVELS} levels</span>
            </div>

            {nextRank ? (
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>{currentRank.min_xp.toLocaleString()} XP</span>
                  <span><span className="text-gray-700 font-semibold">{xpToNext.toLocaleString()} XP</span> to next rank</span>
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
                All levels complete. You have reached the top rank.
              </div>
            )}
          </div>

          {nextLevelId ? (() => {
            const ch = EN_CHAPTERS_DATA.find((c) => c.levels.some((l) => l.id === nextLevelId));
            const lv = ch?.levels.find((l) => l.id === nextLevelId);
            if (!ch || !lv) return null;
            const xp = LEVEL_XP[nextLevelId] ?? 100;
            return (
              <Link
                href={`/levels/${ch.id}/${nextLevelId}`}
                className="rounded-2xl border border-gray-100 p-6 hover:border-gray-200 transition-all group flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-3">Continue Learning</p>
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
                    Start <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })() : (
            <div className="rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-center">
              <Trophy className="h-8 w-8 text-amber-400 mb-3" />
              <h3 className="font-black text-gray-900 mb-1">All levels complete</h3>
              <p className="text-sm text-gray-400">You have completed the full course.</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {EN_CHAPTERS_DATA.map((chapter) => {
            const chapterCompletedCount = chapter.levels.filter((l) => completedIds.has(l.id)).length;
            const chapterAllDone = chapterCompletedCount === chapter.levels.length;
            const chapterRankRaw = getRankByChapter(chapter.id);
            const chapterRank = chapterRankRaw ? toEnglishRank(chapterRankRaw) : null;
            const progressPct = (chapterCompletedCount / chapter.levels.length) * 100;

            return (
              <div
                key={chapter.id}
                className="rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                  <div className="flex items-center gap-3">
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
                          {chapterCompletedCount}/{chapter.levels.length} levels
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

                  <div className="w-24 shrink-0">
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${progressPct}%`, background: chapter.color }}
                      />
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-50">
                  {chapter.levels.map((level) => {
                    const isCompleted = completedIds.has(level.id);
                    const isSkipped = skippedIds.has(level.id);
                    const xp = LEVEL_XP[level.id] ?? 100;
                    const levelUrl = `/levels/${chapter.id}/${level.id}`;

                    return (
                      <Link
                        key={level.id}
                        href={levelUrl}
                        className={`flex items-center gap-3 px-6 py-3.5 transition-all group ${
                          isCompleted ? "hover:bg-emerald-50/40" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="shrink-0 w-5 flex justify-center">
                          {isCompleted ? (
                            <CheckCircle className="h-4.5 w-4.5 text-emerald-500" style={{ width: "18px", height: "18px" }} />
                          ) : isSkipped ? (
                            <SkipForward className="text-amber-400" style={{ width: "18px", height: "18px" }} />
                          ) : (
                            <Circle style={{ width: "18px", height: "18px", color: chapter.color + "50" }} />
                          )}
                        </div>

                        <span
                          className="font-mono text-[11px] px-2 py-0.5 rounded-md shrink-0 font-bold"
                          style={{
                            background: chapter.color + (isCompleted ? "10" : "08"),
                            color: isCompleted ? chapter.color : chapter.color + "80",
                          }}
                        >
                          {level.id}
                        </span>

                        <span
                          className={`flex-1 text-sm transition-colors ${
                            isCompleted
                              ? "text-gray-400 line-through"
                              : "text-gray-700 group-hover:text-gray-900"
                          }`}
                        >
                          {level.title}
                        </span>

                        {"delivery" in level && level.delivery && !isCompleted && (
                          <span className="text-[10px] text-amber-600 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 shrink-0">
                            Deliverable
                          </span>
                        )}

                        {isSkipped && (
                          <span className="text-[10px] text-amber-600 font-bold px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 shrink-0">
                            Resume
                          </span>
                        )}

                        <div className="flex items-center gap-1 shrink-0">
                          <Star className="h-3 w-3 text-amber-400 opacity-50" />
                          <span className={`text-xs font-bold ${isCompleted ? "text-emerald-500" : "text-gray-400"}`}>
                            {isCompleted ? `+${xp}` : `${xp} XP`}
                          </span>
                        </div>

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

        <div className="mt-6 flex items-start gap-3 px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50">
          <Zap className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-0.5">Already have some experience? Jump to the chapter you need.</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              You earn XP for each completed level. Your rank is based on total XP, not completion order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
