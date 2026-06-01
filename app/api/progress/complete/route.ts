import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { awardLevelXP } from "@/lib/xp";

/**
 * POST /api/progress/complete
 * 简单关卡通过操作清单直接通关（checklist 类型）
 * 完成后自动授予 XP 并更新段位
 */
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { level_id } = await request.json();

  if (!level_id) {
    return NextResponse.json({ error: "Missing level_id" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Check level exists and is a checklist level
  const { data: level } = await supabase
    .from("levels")
    .select("id, verification_type")
    .eq("id", level_id)
    .single();

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  // Only allow checklist completion for checklist-type levels
  if (level.verification_type !== "checklist") {
    return NextResponse.json(
      { error: "This level requires a formal submission" },
      { status: 403 }
    );
  }

  // Check existing progress
  const { data: existing } = await supabase
    .from("user_progress")
    .select("id, status, xp_earned")
    .eq("user_id", userId)
    .eq("level_id", level_id)
    .single();

  if (existing?.status === "completed") {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("total_xp, current_rank_id")
      .eq("id", userId)
      .single();
    return NextResponse.json({
      already_completed: true,
      level_completed: true,
      xp_earned: 0,
      total_xp: profile?.total_xp ?? 0,
    });
  }

  // Mark as completed
  if (existing) {
    const { error } = await supabase
      .from("user_progress")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Failed to update progress:", error);
      return NextResponse.json({ error: "Failed to save progress", details: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("user_progress")
      .insert({
        user_id: userId,
        level_id: level_id,
        status: "completed",
        completed_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Failed to insert progress:", error);
      return NextResponse.json({ error: "Failed to save progress", details: error.message }, { status: 500 });
    }
  }

  // 授予 XP
  const xpResult = await awardLevelXP(supabase, userId, level_id);

  return NextResponse.json({
    level_completed: true,
    xp_earned: xpResult.xp_earned,
    total_xp: xpResult.total_xp,
    rank_changed: xpResult.rank_changed,
    new_rank_id: xpResult.new_rank_id,
  });
}
