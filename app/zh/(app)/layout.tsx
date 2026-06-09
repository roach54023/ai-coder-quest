import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";
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

  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("user_profiles")
    .select("total_xp, display_name")
    .eq("id", session.user.id)
    .single();

  const totalXP = profile?.total_xp ?? 0;
  const currentRank = getRankByXP(totalXP);
  const displayName = profile?.display_name || session.user.name || session.user.email || "";
  const initials = displayName[0]?.toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-white">
      {/* ── 顶部导航 ── */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">

          {/* Logo */}
          <Link href="/zh" className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
              <rect width="512" height="512" rx="115" fill="#6C47FF"/>
              <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-gray-900">VibeCamp</span>
          </Link>

          {/* 中间导航 */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/zh/dashboard"
              className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
            >
              闯关地图
            </Link>
            <Link
              href="/zh/profile"
              className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
            >
              我的主页
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
            >
              English
            </Link>
          </nav>

          {/* 右侧：段位 + 用户 + 退出 */}
          <div className="flex items-center gap-3">
            {/* XP 段位胶囊 */}
            <Link
              href="/zh/profile"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-100 hover:border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
            >
              <span className="text-sm leading-none">{currentRank.badge_icon}</span>
              <span className="text-xs font-bold" style={{ color: currentRank.badge_color }}>
                {currentRank.name}
              </span>
              <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                <Star className="h-2.5 w-2.5 text-amber-400" />
                {totalXP.toLocaleString()}
              </span>
            </Link>

            {/* 用户头像 */}
            <Link href="/zh/profile">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 hover:bg-indigo-200 transition-colors">
                {initials}
              </div>
            </Link>

            {/* 退出 */}
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
