import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { RANKS } from "@/lib/content/ranks";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import Link from "next/link";

interface SharePageProps {
  params: Promise<{ rankId: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { rankId } = await params;
  const rank = RANKS.find((r) => r.id === rankId);

  if (!rank) {
    notFound();
  }

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">段位解锁！</h1>
        <p className="text-muted-foreground">恭喜你达到了新的段位</p>
      </div>

      {/* Share Card */}
      <Card className="overflow-hidden mb-8">
        <CardContent className="p-0">
          <div
            className="p-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${rank.badge_color}20, ${rank.badge_color}05)`,
            }}
          >
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
              style={{
                backgroundColor: rank.badge_color + '30',
                color: rank.badge_color,
              }}
            >
              {rank.order_index}
            </div>
            <h2
              className="text-2xl font-bold mb-1"
              style={{ color: rank.badge_color }}
            >
              {rank.name}
            </h2>
            <p className="text-muted-foreground mb-2">{rank.subtitle}</p>
            <p className="text-lg font-bold" style={{ color: rank.badge_color }}>
              等效月薪：{rank.salary}
            </p>
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {profile?.display_name || "匿名冒险者"} · AI Coder Quest
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          分享到社交媒体
        </Button>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          保存图片
        </Button>
      </div>

      <div className="text-center mt-8">
        <Link href="/dashboard">
          <Button>继续闯关</Button>
        </Link>
      </div>
    </div>
  );
}
