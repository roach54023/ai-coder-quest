import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RANKS } from "@/lib/content/ranks";

export default async function AdminUsersPage() {
  const supabase = createAdminClient();

  const { data: users } = await supabase
    .from("user_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">用户管理</h2>
        <Badge variant="outline">{users?.length || 0} 位用户</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">用户</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">段位</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">注册时间</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">状态</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => {
                  const rank = RANKS.find((r) => r.id === (user.current_rank_id || "rank_0"));
                  return (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-accent/50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {user.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                              {(user.display_name || "?")[0].toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{user.display_name || "匿名"}</div>
                            {user.is_admin && (
                              <Badge variant="secondary" className="text-xs mt-0.5">Admin</Badge>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="text-sm font-medium"
                          style={{ color: rank?.badge_color }}
                        >
                          {rank?.name || "IT文盲"}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString("zh-CN")}
                      </td>
                      <td className="p-4">
                        {user.completed_at ? (
                          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                            已通关
                          </Badge>
                        ) : user.started_at ? (
                          <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                            闯关中
                          </Badge>
                        ) : (
                          <Badge variant="outline">未开始</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {(!users || users.length === 0) && (
              <p className="text-center text-muted-foreground py-8">暂无用户</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
