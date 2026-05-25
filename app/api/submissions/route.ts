import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { createVerifier, VerificationInput } from "@/lib/verification";

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
  const screenshotFiles = formData.getAll("screenshots") as File[];

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

  // Upload screenshots if any
  let screenshotUrls: string[] = [];
  for (const file of screenshotFiles) {
    const fileName = `${userId}/${levelId}/${Date.now()}-${file.name}`;
    const { data: uploadData } = await supabase.storage
      .from("screenshots")
      .upload(fileName, file);

    if (uploadData) {
      const { data: urlData } = supabase.storage
        .from("screenshots")
        .getPublicUrl(uploadData.path);
      screenshotUrls.push(urlData.publicUrl);
    }
  }

  // Run verification
  const verifier = createVerifier(level.verification_type);
  const verificationInput: VerificationInput = {
    text_content: textContent || undefined,
    url_content: urlContent || undefined,
    screenshot_urls: screenshotUrls.length > 0 ? screenshotUrls : undefined,
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
  } else {
    submissionStatus = "manual_review";
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
      screenshot_urls: screenshotUrls.length > 0 ? screenshotUrls : null,
      status: submissionStatus,
      auto_verification_result: verificationResult as any,
    })
    .select()
    .single();

  // If auto passed, update progress
  let rankUnlocked = null;
  if (verificationResult.passed === true) {
    await supabase
      .from("user_progress")
      .upsert({
        user_id: userId,
        level_id: levelId,
        status: "completed",
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,level_id" });
  }

  return NextResponse.json({
    submission,
    verification: verificationResult,
    level_completed: verificationResult.passed === true,
    rank_unlocked: rankUnlocked,
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
