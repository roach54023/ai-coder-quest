import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { LEVEL_XP, getRankByXP, getNextRank } from "@/lib/content/ranks";
import { EN_LEVEL_TITLES, EN_RANKS, toEnglishRank } from "@/lib/content/english-course";
import { Star, Trophy, Zap, CheckCircle, Clock } from "lucide-react";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session!.user!.id;
  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const { data: completedProgress } = await supabase
    .from("user_progress")
    .select("level_id, xp_earned, completed_at, status")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("completed_at", { ascending: false });

  const totalXP = profile?.total_xp ?? 0;
  const currentRank = toEnglishRank(getRankByXP(totalXP));
  const nextRankRaw = getNextRank(currentRank.id);
  const nextRank = nextRankRaw ? toEnglishRank(nextRankRaw) : null;
  const completedCount = completedProgress?.length ?? 0;
  const totalLevels = Object.keys(LEVEL_XP).length;

  const xpToNext = nextRank ? nextRank.min_xp - totalXP : 0;
  const xpRangeSize = nextRank ? nextRank.min_xp - currentRank.min_xp : 1;
  const xpProgress = nextRank
    ? Math.min(100, ((totalXP - currentRank.min_xp) / xpRangeSize) * 100)
    : 100;

  const displayName = profile?.display_name || session!.user!.name || session!.user!.email;
  const avatarUrl = profile?.avatar_url || session!.user!.image;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-medium">Profile</p>
          <h1 className="text-4xl font-black text-gray-900">Profile</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-4 mb-5">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={displayName || "User avatar"}
                  className="w-14 h-14 rounded-2xl object-cover bg-indigo-100 shrink-0"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
                  style={{ background: currentRank.badge_color + "12", border: `1.5px solid ${currentRank.badge_color}25` }}
                >
                  {currentRank.badge_icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-gray-900 truncate">{displayName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold" style={{ color: currentRank.badge_color }}>
                    {currentRank.name}
                  </span>
                  <span className="text-gray-200">·</span>
                  <span className="text-xs text-gray-400">{currentRank.subtitle}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span className="text-2xl font-black text-amber-500">{totalXP.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Total XP</div>
              </div>
            </div>

            {nextRank ? (
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Next rank: <span style={{ color: nextRank.badge_color }}>{nextRank.name}</span></span>
                  <span><span className="text-gray-700 font-semibold">{xpToNext.toLocaleString()}</span> XP left</span>
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

          <div className="rounded-2xl border border-gray-100 p-6 flex flex-col justify-between">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-4">Stats</p>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-black text-gray-900">
                  {completedCount}
                  <span className="text-sm font-normal text-gray-400 ml-1">/ {totalLevels} levels</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color: currentRank.badge_color }}>
                  {currentRank.badge_icon}
                  <span className="text-base ml-1">{currentRank.name}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">Current rank</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{currentRank.salary}</div>
                <div className="text-xs text-gray-400 mt-0.5">Market signal</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-black text-gray-700">Rank Path</h3>
            </div>
            <div className="space-y-1.5">
              {EN_RANKS.map((rank) => {
                const isUnlocked = totalXP >= rank.min_xp;
                const isCurrent = rank.id === currentRank.id;
                return (
                  <div
                    key={rank.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isCurrent ? "border" : isUnlocked ? "opacity-60" : "opacity-25"
                    }`}
                    style={isCurrent ? {
                      borderColor: rank.badge_color + "25",
                      background: rank.badge_color + "05",
                    } : undefined}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                      style={{
                        background: isUnlocked ? rank.badge_color + "12" : "rgba(0,0,0,0.03)",
                        border: `1px solid ${isUnlocked ? rank.badge_color + "25" : "rgba(0,0,0,0.06)"}`,
                      }}
                    >
                      {isUnlocked ? rank.badge_icon : "Lock"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold" style={{ color: isUnlocked ? rank.badge_color : "#9CA3AF" }}>
                          {rank.name}
                        </span>
                        {isCurrent && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: rank.badge_color + "12", color: rank.badge_color }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{rank.subtitle}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold" style={{ color: isUnlocked ? rank.badge_color : "#D1D5DB" }}>
                        {rank.salary}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {rank.min_xp === 0 ? "Start" : `${rank.min_xp.toLocaleString()} XP`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-black text-gray-700">XP History</h3>
              <span className="ml-auto text-xs text-gray-400">{completedCount} levels</span>
            </div>

            {completedProgress && completedProgress.length > 0 ? (
              <div className="space-y-0.5 max-h-[420px] overflow-y-auto">
                {completedProgress.map((p) => {
                  const xp = p.xp_earned > 0 ? p.xp_earned : (LEVEL_XP[p.level_id] ?? 100);
                  const title = EN_LEVEL_TITLES[p.level_id] ?? p.level_id;
                  return (
                    <div
                      key={p.level_id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm text-gray-700 truncate block">{title}</span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" />
                          {formatDate(p.completed_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-sm font-bold text-amber-500">+{xp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Star className="h-8 w-8 text-gray-200 mb-3" />
                <p className="text-sm text-gray-400">No completed levels yet</p>
                <p className="text-xs text-gray-300 mt-1">Your XP history appears here after you finish levels.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
