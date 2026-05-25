import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RANKS } from "@/lib/content/ranks";
import { formatTime } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session!.user!.id;

  const supabase = createAdminClient();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed");

  const currentRank = RANKS.find((r) => r.id === (profile?.current_rank_id || "rank_0"));
  const completedCount = progress?.length || 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">个人主页</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{profile?.display_name || session!.user!.name || session!.user!.email}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">当前段位：</span>
            <Badge style={{ backgroundColor: currentRank?.badge_color + '20', color: currentRank?.badge_color }}>
              {currentRank?.name}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">等效月薪：</span>
            <span className="font-bold" style={{ color: currentRank?.badge_color }}>
              {currentRank?.salary}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">已通关：</span>
            <span>{completedCount} / 21 关</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">总耗时：</span>
            <span>{formatTime(profile?.total_time_seconds || 0)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Rank history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">段位历程</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {RANKS.map((rank) => {
              const isUnlocked = rank.order_index <= (currentRank?.order_index || 0);
              return (
                <div
                  key={rank.id}
                  className={`flex items-center gap-3 p-3 rounded-md ${
                    isUnlocked ? "" : "opacity-40"
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: isUnlocked ? rank.badge_color + '20' : undefined,
                      color: isUnlocked ? rank.badge_color : undefined,
                    }}
                  >
                    {rank.order_index}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{rank.name}</div>
                    <div className="text-xs text-muted-foreground">{rank.subtitle}</div>
                  </div>
                  <div className="ml-auto text-sm font-medium" style={{ color: isUnlocked ? rank.badge_color : undefined }}>
                    {rank.salary}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
