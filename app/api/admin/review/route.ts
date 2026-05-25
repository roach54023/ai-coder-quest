import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Check admin
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("is_admin")
    .eq("id", session.user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { submission_id, user_id, level_id, action, notes } = await request.json();

  if (!submission_id || !action) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const newStatus = action === "approve" ? "admin_approved" : "admin_rejected";

  // Update submission
  const { error: updateError } = await supabase
    .from("submissions")
    .update({
      status: newStatus,
      admin_notes: notes || null,
      reviewed_by: session.user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", submission_id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // If approved, update user progress
  if (action === "approve" && user_id && level_id) {
    await supabase
      .from("user_progress")
      .upsert(
        {
          user_id,
          level_id,
          status: "completed",
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,level_id" }
      );
  }

  return NextResponse.json({ success: true, status: newStatus });
}
