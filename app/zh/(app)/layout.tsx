import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Map, User, Star } from "lucide-react";
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
    redirect("/zh/login");
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
            <svg width="24" height="24" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-md flex-shrink-0" aria-hidden="true">
              <rect width="512" height="512" rx="115" fill="#6C47FF"/>
              <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
            </svg>
            <span className="font-bold">VibeCamp</span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link href="/zh/dashboard">
              <Button variant="ghost" size="sm">
                <Map className="h-4 w-4 mr-1" /> 闯关地图
              </Button>
            </Link>
            <Link href="/zh/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-1" /> 个人
              </Button>
            </Link>
          </nav>

          {/* XP + 段位展示 */}
          <div className="flex items-center gap-3">
            <Link
              href="/zh/profile"
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
