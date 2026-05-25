import { createAdminClient } from "@/lib/supabase/admin";

/**
 * 确保 user_profiles 表中有对应记录
 * Better Auth 管理 user/account/session 表
 * 但我们的业务数据（段位、进度等）存在 user_profiles 表中
 * 当用户首次登录时，需要在 user_profiles 中创建对应记录
 */
export async function ensureUserProfile(userId: string, data: {
  displayName?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
}) {
  const supabase = createAdminClient();

  // 检查是否已有 profile
  const { data: existing } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("id", userId)
    .single();

  if (existing) {
    return existing;
  }

  // 创建新的 profile
  const { data: profile, error } = await supabase
    .from("user_profiles")
    .insert({
      id: userId,
      display_name: data.displayName || data.email?.split("@")[0] || "用户",
      email: data.email || null,
      username: data.email || userId,
      avatar_url: data.avatarUrl || null,
      current_rank_id: "rank_0",
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create user profile:", error);
    return null;
  }

  return profile;
}
