import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createVerifier, VerificationInput } from "@/lib/verification";
import { awardLevelXP } from "@/lib/xp";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const supabase = createAdminClient();

  const formData = await request.formData();
  const levelId = formData.get("level_id") as string;
  const type = formData.get("type") as string;
  const textContent = formData.get("text_content") as string | null;
  const urlContent = formData.get("url_content") as string | null;

  if (!levelId || !type) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Get level verification config
  const { data: level } = await supabase
    .from("levels")
    .select("verification_type, verification_config")
    .eq("id", levelId)
    .single();

  if (!level) {
    return NextResponse.json({ error: "Level not found" }, { status: 404 });
  }

  // Run verification
  const verifier = createVerifier(level.verification_type);
  const verificationInput: VerificationInput = {
    text_content: textContent || undefined,
    url_content: urlContent || undefined,
  };

  const verificationResult = await verifier.verify(
    verificationInput,
    (level.verification_config as Record<string, any>) || {}
  );

  // Determine submission status
  let submissionStatus = "pending";
  if (verificationResult.passed === true) {
    submissionStatus = "auto_passed";
  } else if (verificationResult.passed === false) {
    submissionStatus = "auto_failed";
  }

  // Create submission record
  const { data: submission } = await supabase
    .from("submissions")
    .insert({
      user_id: userId,
      level_id: levelId,
      submission_type: type,
      text_content: textContent,
      url_content: urlContent,
      status: submissionStatus,
      auto_verification_result: verificationResult as any,
    })
    .select()
    .single();

  // If auto passed, update progress and award XP
  let xpResult = { xp_earned: 0, total_xp: 0, rank_changed: false, new_rank_id: "rank_0" };
  if (verificationResult.passed === true) {
    await supabase
      .from("user_progress")
      .upsert({
        user_id: userId,
        level_id: levelId,
        status: "completed",
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,level_id" });

    xpResult = await awardLevelXP(supabase, userId, levelId);
  }

  return NextResponse.json({
    submission,
    verification: verificationResult,
    level_completed: verificationResult.passed === true,
    xp_earned: xpResult.xp_earned,
    total_xp: xpResult.total_xp,
    rank_changed: xpResult.rank_changed,
    new_rank_id: xpResult.new_rank_id,
  });
}

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { searchParams } = new URL(request.url);
  const levelId = searchParams.get("level_id");

  let query = supabase
    .from("submissions")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (levelId) {
    query = query.eq("level_id", levelId);
  }

  const { data: submissions } = await query;

  return NextResponse.json({ submissions });
}
