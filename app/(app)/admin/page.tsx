import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Clock, Trophy } from "lucide-react";

export default async function AdminPage() {
  const supabase = createAdminClient();

  const { count: totalUsers } = await supabase
    .from("user_profiles")
    .select("*", { count: "exact", head: true });

  const { count: totalSubmissions } = await supabase
    .from("submissions")
    .select("*", { count: "exact", head: true });

  const { count: pendingReviews } = await supabase
    .from("submissions")
    .select("*", { count: "exact", head: true })
    .eq("status", "manual_review");

  const { count: completedUsers } = await supabase
    .from("user_profiles")
    .select("*", { count: "exact", head: true })
    .not("completed_at", "is", null);

  const stats = [
    { label: "总用户数", value: totalUsers || 0, icon: Users, color: "text-blue-500" },
    { label: "总提交数", value: totalSubmissions || 0, icon: FileText, color: "text-green-500" },
    { label: "待审核", value: pendingReviews || 0, icon: Clock, color: "text-amber-500" },
    { label: "通关用户", value: completedUsers || 0, icon: Trophy, color: "text-purple-500" },
  ];

  // Recent submissions
  const { data: recentSubmissions } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <CardTitle>最近提交</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSubmissions?.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50"
              >
                <div>
                  <div className="font-medium text-sm">{sub.level_id}</div>
                  <div className="text-xs text-muted-foreground">
                    {sub.submission_type}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      sub.status === "auto_passed"
                        ? "bg-green-500/10 text-green-500"
                        : sub.status === "auto_failed"
                        ? "bg-red-500/10 text-red-500"
                        : sub.status === "manual_review"
                        ? "bg-amber-500/10 text-amber-500"
                        : sub.status === "admin_approved"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-gray-500/10 text-gray-500"
                    }`}
                  >
                    {sub.status === "auto_passed"
                      ? "自动通过"
                      : sub.status === "auto_failed"
                      ? "自动失败"
                      : sub.status === "manual_review"
                      ? "待审核"
                      : sub.status === "admin_approved"
                      ? "已批准"
                      : sub.status === "admin_rejected"
                      ? "已拒绝"
                      : sub.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(sub.created_at).toLocaleString("zh-CN")}
                  </span>
                </div>
              </div>
            ))}
            {(!recentSubmissions || recentSubmissions.length === 0) && (
              <p className="text-center text-muted-foreground py-8">暂无提交记录</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
