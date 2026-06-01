import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/progress/skip
 * 暂时跳过某个关卡的验证，标记为 skipped 状态
 * 用户可以随时回来补交
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

  // Check level exists
  const { data: level } = await supabase
    .from("levels")
    .select("id")
    .eq("id", level_id)
    .single();

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  // Check existing progress
  const { data: existing } = await supabase
    .from("user_progress")
    .select("id, status")
    .eq("user_id", userId)
    .eq("level_id", level_id)
    .single();

  if (existing?.status === "completed") {
    return NextResponse.json({ already_completed: true, skipped: false });
  }

  // Mark as skipped
  if (existing) {
    const { error } = await supabase
      .from("user_progress")
      .update({
        status: "skipped",
      })
      .eq("id", existing.id);

    if (error) {
      console.error("Failed to skip level:", error);
      return NextResponse.json({ error: "Failed to skip", details: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("user_progress")
      .insert({
        user_id: userId,
        level_id: level_id,
        status: "skipped",
      });

    if (error) {
      console.error("Failed to skip level:", error);
      return NextResponse.json({ error: "Failed to skip", details: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ skipped: true });
}
