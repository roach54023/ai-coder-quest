import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", session.user.id);

  return NextResponse.json({
    user: {
      id: session.user.id,
      current_rank_id: profile?.current_rank_id || "rank_0",
      total_time_seconds: profile?.total_time_seconds || 0,
      started_at: profile?.started_at,
    },
    progress: progress || [],
  });
}
