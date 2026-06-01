import { createAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SubmissionReviewActions } from "@/components/admin/submission-review-actions";

export default async function AdminSubmissionsPage() {
  const supabase = createAdminClient();

  const { data: submissions } = await supabase
    .from("submissions")
    .select("*")
    .in("status", ["manual_review", "pending"])
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">待审核提交</h2>
        <Badge variant="outline">{submissions?.length || 0} 条待审核</Badge>
      </div>

      {submissions && submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <Card key={sub.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      关卡 {sub.level_id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      提交类型: {sub.submission_type} · {new Date(sub.created_at).toLocaleString("zh-CN")}
                    </p>
                  </div>
                  <Badge
                    className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                  >
                    待审核
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Text content */}
                {sub.text_content && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">文本内容</p>
                    <pre className="p-3 bg-muted rounded-md text-sm font-mono overflow-x-auto">
                      {sub.text_content}
                    </pre>
                  </div>
                )}

                {/* URL content */}
                {sub.url_content && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">URL</p>
                    <a
                      href={sub.url_content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      {sub.url_content}
                    </a>
                  </div>
                )}

                {/* Auto verification result */}
                {sub.auto_verification_result && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">自动验证结果</p>
                    <pre className="p-3 bg-muted rounded-md text-xs font-mono overflow-x-auto">
                      {JSON.stringify(sub.auto_verification_result, null, 2)}
                    </pre>
                  </div>
                )}

                {/* Review Actions */}
                <SubmissionReviewActions submissionId={sub.id} userId={sub.user_id} levelId={sub.level_id} />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">没有待审核的提交 🎉</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
