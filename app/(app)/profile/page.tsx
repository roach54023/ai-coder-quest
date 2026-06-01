import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { RANKS, getRankByXP, getNextRank, LEVEL_XP } from "@/lib/content/ranks";
import { Star, Trophy, Zap, CheckCircle, Clock } from "lucide-react";

// 关卡标题映射（用于 XP 记录展示）
const LEVEL_TITLES: Record<string, string> = {
  "0-1": "安装 AI 编程助手",
  "0-2": "第一个 AI 生成的页面",
  "1-1": "Prompt 核心技巧",
  "1-2": "个人名片页",
  "1-3": "多页作品集",
  "1-4": "发布到互联网",
  "1-5": "设计进阶",
  "2-1": "升级你的工具",
  "2-2": "搭建骨架",
  "2-3": "装修美化",
  "2-4": "完整作品集",
  "2-5": "部署 React 项目",
  "3-1": "暗色模式",
  "3-2": "实时搜索",
  "3-3": "联系表单",
  "3-4": "AI 生图素材",
  "3-5": "产品级打磨",
  "4-1": "后端 API 初体验",
  "4-2": "数据库",
  "4-3": "用户系统",
  "4-4": "全栈管理系统",
  "4-5": "接入支付",
  "4-6": "AI 能力集成",
  "5-1": "推送到 GitHub",
  "5-2": "部署到 Vercel",
  "5-3": "正式发布",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}月${d.getDate()}日`;
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session!.user!.id;

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // 获取所有已完成关卡（含 XP 记录），按完成时间倒序
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

  // XP 进度到下一段位
  const xpToNext = nextRank ? nextRank.min_xp - totalXP : 0;
  const xpRangeSize = nextRank
    ? nextRank.min_xp - currentRank.min_xp
    : 1;
  const xpProgress = nextRank
    ? Math.min(100, ((totalXP - currentRank.min_xp) / xpRangeSize) * 100)
    : 100;

  const displayName =
    profile?.display_name || session!.user!.name || session!.user!.email;

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* ── 用户信息卡 ── */}
        <div
          className="relative rounded-3xl border border-white/[0.08] p-6 mb-6 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${currentRank.badge_color}10 0%, #0d0d1a 60%)` }}
        >
          {/* 顶部彩色线 */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${currentRank.badge_color}, transparent)` }}
          />

          <div className="flex items-start gap-4">
            {/* 头像 */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0"
              style={{ background: currentRank.badge_color + "20", border: `1.5px solid ${currentRank.badge_color}40` }}
            >
              {currentRank.badge_icon}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white truncate">{displayName}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-sm font-bold"
                  style={{ color: currentRank.badge_color }}
                >
                  {currentRank.name}
                </span>
                <span className="text-xs text-gray-500">·</span>
                <span className="text-xs text-gray-400">{currentRank.subtitle}</span>
              </div>
            </div>

            {/* 总 XP */}
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-2xl font-black text-amber-400">{totalXP.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">累计 XP</div>
            </div>
          </div>

          {/* XP 进度条 */}
          {nextRank && (
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>距离「<span style={{ color: nextRank.badge_color }}>{nextRank.name}</span>」</span>
                <span>还差 <span className="text-white font-medium">{xpToNext.toLocaleString()}</span> XP</span>
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
          )}
          {!nextRank && (
            <div className="mt-4 text-sm text-emerald-400 font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              全部通关！已达最高段位 👑
            </div>
          )}

          {/* 统计数字 */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/[0.06]">
            {[
              { label: "已通关", value: `${completedCount}`, sub: `/ ${totalLevels} 关` },
              { label: "当前段位", value: currentRank.badge_icon, sub: currentRank.name },
              { label: "参考月薪", value: currentRank.salary, sub: "市场价值" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-black text-white">{s.value} <span className="text-xs font-normal text-gray-500">{s.sub}</span></div>
                <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 段位路线图 ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-400" />
            段位路线图
          </h2>
          <div className="space-y-2">
            {RANKS.map((rank) => {
              const isUnlocked = totalXP >= rank.min_xp;
              const isCurrent = rank.id === currentRank.id;
              return (
                <div
                  key={rank.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isCurrent
                      ? "border"
                      : isUnlocked
                      ? "opacity-70"
                      : "opacity-30"
                  }`}
                  style={isCurrent ? {
                    borderColor: rank.badge_color + "40",
                    background: rank.badge_color + "08",
                  } : undefined}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
                    style={{
                      background: isUnlocked ? rank.badge_color + "20" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isUnlocked ? rank.badge_color + "40" : "rgba(255,255,255,0.06)"}`,
                    }}
                  >
                    {isUnlocked ? rank.badge_icon : "🔒"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-sm font-bold"
                        style={{ color: isUnlocked ? rank.badge_color : "#6B7280" }}
                      >
                        {rank.name}
                      </span>
                      {isCurrent && (
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{ background: rank.badge_color + "20", color: rank.badge_color }}
                        >
                          当前
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{rank.subtitle}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold" style={{ color: isUnlocked ? rank.badge_color : "#4B5563" }}>
                      {rank.salary}
                    </div>
                    <div className="text-[10px] text-gray-600 mt-0.5">
                      {rank.min_xp === 0 ? "起点" : `${rank.min_xp.toLocaleString()} XP`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── XP 获取记录 ── */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h2 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-400" />
            XP 获取记录
            <span className="ml-auto text-xs text-gray-600 font-normal">{completedCount} 关已完成</span>
          </h2>

          {completedProgress && completedProgress.length > 0 ? (
            <div className="space-y-1">
              {completedProgress.map((p) => {
                const xp = p.xp_earned > 0 ? p.xp_earned : (LEVEL_XP[p.level_id] ?? 100);
                const title = LEVEL_TITLES[p.level_id] ?? p.level_id;
                return (
                  <div
                    key={p.level_id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-gray-200 truncate block">{title}</span>
                      <span className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {formatDate(p.completed_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-sm font-bold text-amber-400">+{xp}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600">
              <Star className="h-8 w-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">还没有完成任何关卡</p>
              <p className="text-xs mt-1">完成关卡后，XP 记录会显示在这里</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
