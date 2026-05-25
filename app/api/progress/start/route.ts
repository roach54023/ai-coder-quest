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

  const userId = session.user.id;
  const { level_id } = await request.json();

  if (!level_id) {
    return NextResponse.json({ error: "level_id is required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: progress } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        level_id,
        status: "in_progress",
        started_at: new Date().toISOString(),
      },
      { onConflict: "user_id,level_id" }
    )
    .select()
    .single();

  // Update user started_at if first level
  await supabase
    .from("user_profiles")
    .update({ started_at: new Date().toISOString() })
    .eq("id", userId)
    .is("started_at", null);

  return NextResponse.json({ progress });
}
