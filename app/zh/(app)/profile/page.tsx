import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { RANKS, getRankByXP, getNextRank, LEVEL_XP } from "@/lib/content/ranks";
import { Star, Trophy, Zap, CheckCircle, Clock } from "lucide-react";

const LEVEL_TITLES: Record<string, string> = {
  "0-1": "安装 AI 编程助手",
  "0-2": "第一个网页上线",
  "1-1": "搭建 Next.js 项目",
  "1-2": "三页作品集",
  "1-3": "视觉美化",
  "1-4": "部署上线",
  "2-1": "动效与交互",
  "2-2": "作品详情页",
  "2-3": "SEO 优化",
  "2-4": "性能优化",
  "2-5": "部署第二版",
  "3-1": "暗色模式",
  "3-2": "实时搜索",
  "3-3": "联系表单",
  "3-4": "响应式适配",
  "3-5": "部署第三版",
  "4-1": "API 路由入门",
  "4-2": "数据库入门",
  "4-3": "后台管理",
  "4-4": "访问统计",
  "4-5": "部署第四版",
  "5-1": "用户登录",
  "5-2": "接入 AI",
  "5-3": "接入支付",
  "5-4": "最终部署",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
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
  const currentRank = getRankByXP(totalXP);
  const nextRank = getNextRank(currentRank.id);
  const completedCount = completedProgress?.length ?? 0;
  const totalLevels = Object.keys(LEVEL_XP).length;

  const xpToNext = nextRank ? nextRank.min_xp - totalXP : 0;
  const xpRangeSize = nextRank ? nextRank.min_xp - currentRank.min_xp : 1;
  const xpProgress = nextRank
    ? Math.min(100, ((totalXP - currentRank.min_xp) / xpRangeSize) * 100)
    : 100;

  const displayName = profile?.display_name || session!.user!.name || session!.user!.email;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── 页面标题 ── */}
        <div className="mb-8">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-medium">Profile</p>
          <h1 className="text-4xl font-black text-gray-900">我的主页</h1>
        </div>

        {/* ── 顶部两栏 ── */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          {/* 用户信息卡（占 2 列） */}
          <div className="md:col-span-2 rounded-2xl border border-gray-100 p-6">
            <div className="flex items-start gap-4 mb-5">
              {/* 头像 */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
                style={{ background: currentRank.badge_color + "12", border: `1.5px solid ${currentRank.badge_color}25` }}
              >
                {currentRank.badge_icon}
              </div>
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
                <div className="text-xs text-gray-400 mt-0.5">累计 XP</div>
              </div>
            </div>

            {/* XP 进度条 */}
            {nextRank ? (
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>距离「<span style={{ color: nextRank.badge_color }}>{nextRank.name}</span>」</span>
                  <span>还差 <span className="text-gray-700 font-semibold">{xpToNext.toLocaleString()}</span> XP</span>
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

          {/* 统计数字卡 */}
          <div className="rounded-2xl border border-gray-100 p-6 flex flex-col justify-between">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-4">Stats</p>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-black text-gray-900">
                  {completedCount}
                  <span className="text-sm font-normal text-gray-400 ml-1">/ {totalLevels} 关</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">已通关</div>
              </div>
              <div>
                <div className="text-2xl font-black" style={{ color: currentRank.badge_color }}>
                  {currentRank.badge_icon}
                  <span className="text-base ml-1">{currentRank.name}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">当前段位</div>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{currentRank.salary}</div>
                <div className="text-xs text-gray-400 mt-0.5">参考月薪</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 下方两栏：段位路线图 + XP 记录 ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* 段位路线图 */}
          <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-black text-gray-700">段位路线图</h3>
            </div>
            <div className="space-y-1.5">
              {RANKS.map((rank) => {
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
                      {isUnlocked ? rank.badge_icon : "🔒"}
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
                            当前
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
                        {rank.min_xp === 0 ? "起点" : `${rank.min_xp.toLocaleString()} XP`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* XP 获取记录 */}
          <div className="rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="h-4 w-4 text-indigo-400" />
              <h3 className="text-sm font-black text-gray-700">XP 获取记录</h3>
              <span className="ml-auto text-xs text-gray-400">{completedCount} 关</span>
            </div>

            {completedProgress && completedProgress.length > 0 ? (
              <div className="space-y-0.5 max-h-[420px] overflow-y-auto">
                {completedProgress.map((p) => {
                  const xp = p.xp_earned > 0 ? p.xp_earned : (LEVEL_XP[p.level_id] ?? 100);
                  const title = LEVEL_TITLES[p.level_id] ?? p.level_id;
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
                <p className="text-sm text-gray-400">还没有完成任何关卡</p>
                <p className="text-xs text-gray-300 mt-1">完成关卡后，XP 记录会显示在这里</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
