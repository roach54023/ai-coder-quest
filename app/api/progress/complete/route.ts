import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { awardLevelXP } from "@/lib/xp";

/**
 * POST /api/progress/complete
 * 通关接口，支持两种类型：
 * - checklist：操作清单全勾完直接通关
 * - url_submit：交付关，提交作品 URL 后通关（URL 保存到 submissions 表）
 */
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const body = await request.json();
  const { level_id, url } = body;

  if (!level_id) {
    return NextResponse.json({ error: "Missing level_id" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Check level exists
  const { data: level } = await supabase
    .from("levels")
    .select("id, verification_type")
    .eq("id", level_id)
    .single();

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  // Validate type
  if (level.verification_type !== "checklist" && level.verification_type !== "url_submit") {
    return NextResponse.json(
      { error: "This level requires a formal submission" },
      { status: 403 }
    );
  }

  // url_submit 必须提供 URL
  if (level.verification_type === "url_submit") {
    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json({ error: "Valid URL required" }, { status: 400 });
    }
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

  // 如果是 url_submit，先保存到 submissions 表
  if (level.verification_type === "url_submit" && url) {
    await supabase.from("submissions").insert({
      user_id: userId,
      level_id: level_id,
      submission_type: "url_submit",
      url_content: url,
      status: "auto_passed",
      auto_verification_result: { passed: true, message: "用户提交了作品链接" },
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
