/**
 * XP 系统工具函数
 * 负责：完成关卡时写入 xp_earned、更新 user_profiles.total_xp
 */
import { getLevelXP, getRankByXP } from "@/lib/content/ranks";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * 完成关卡后授予 XP，并更新用户总 XP 和段位
 * 幂等：如果该关卡已经授予过 XP（xp_earned > 0），不重复累加
 *
 * @returns xp_earned 本次实际授予的 XP（0 表示已授予过）
 */
export async function awardLevelXP(
  supabase: SupabaseClient,
  userId: string,
  levelId: string
): Promise<{ xp_earned: number; total_xp: number; rank_changed: boolean; new_rank_id: string }> {
  const xpToAward = getLevelXP(levelId);

  // 检查是否已经授予过 XP（幂等保护）
  const { data: existing } = await supabase
    .from("user_progress")
    .select("xp_earned")
    .eq("user_id", userId)
    .eq("level_id", levelId)
    .single();

  if (existing && existing.xp_earned > 0) {
    // 已授予过，返回当前总 XP
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("total_xp, current_rank_id")
      .eq("id", userId)
      .single();
    return {
      xp_earned: 0,
      total_xp: profile?.total_xp ?? 0,
      rank_changed: false,
      new_rank_id: profile?.current_rank_id ?? "rank_0",
    };
  }

  // 写入 xp_earned 到 user_progress
  await supabase
    .from("user_progress")
    .update({ xp_earned: xpToAward })
    .eq("user_id", userId)
    .eq("level_id", levelId);

  // 原子性地累加 total_xp（用 RPC 避免并发问题）
  // 先读取当前值，再更新（Supabase 免费版不支持自定义 RPC，用读-写方式）
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("total_xp, current_rank_id")
    .eq("id", userId)
    .single();

  const oldXP = profile?.total_xp ?? 0;
  const oldRankId = profile?.current_rank_id ?? "rank_0";
  const newXP = oldXP + xpToAward;

  // 计算新段位
  const newRank = getRankByXP(newXP);
  const rankChanged = newRank.id !== oldRankId;

  await supabase
    .from("user_profiles")
    .update({
      total_xp: newXP,
      current_rank_id: newRank.id,
    })
    .eq("id", userId);

  return {
    xp_earned: xpToAward,
    total_xp: newXP,
    rank_changed: rankChanged,
    new_rank_id: newRank.id,
  };
}
