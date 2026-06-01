import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Terminal, Map, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRankByXP } from "@/lib/content/ranks";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // 读取用户 XP 和段位
  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("total_xp, current_rank_id, display_name")
    .eq("id", session.user.id)
    .single();

  const totalXP = profile?.total_xp ?? 0;
  const currentRank = getRankByXP(totalXP);

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-indigo-400" />
            <span className="font-bold">VibeCamp</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <Map className="h-4 w-4 mr-1" /> 闯关地图
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-1" /> 个人
              </Button>
            </Link>
          </nav>

          {/* XP + 段位展示 */}
          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
            >
              {/* 段位图标 */}
              <span className="text-base leading-none">{currentRank.badge_icon}</span>
              <div className="flex flex-col items-start leading-none">
                <span
                  className="text-xs font-bold"
                  style={{ color: currentRank.badge_color }}
                >
                  {currentRank.name}
                </span>
                <span className="flex items-center gap-0.5 text-[10px] text-gray-500 mt-0.5">
                  <Star className="h-2.5 w-2.5 text-amber-400" />
                  {totalXP.toLocaleString()} XP
                </span>
              </div>
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="pt-14">
        {children}
      </main>
    </div>
  );
}
