import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { RANKS } from "@/lib/content/ranks";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShareActions } from "@/components/levels/share-actions";
import { ArrowRight, Star, Trophy } from "lucide-react";

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

  const displayName = profile?.display_name || "匿名冒险者";
  const totalXP = profile?.total_xp ?? 0;

  return (
    <div className="min-h-screen bg-white">

      {/* ── 导航栏 ── */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
              <rect width="512" height="512" rx="115" fill="#6C47FF"/>
              <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round"/>
            </svg>
            <span className="font-bold text-base text-gray-900">VibeCamp</span>
          </Link>
          <Link
            href="/zh/dashboard"
            className="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            继续闯关 <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main className="pt-14">
        <div className="max-w-lg mx-auto px-6 py-16">

          {/* ── 页面标题 ── */}
          <div className="text-center mb-10">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">Rank Unlocked</p>
            <h1 className="text-4xl font-black text-gray-900">段位解锁！</h1>
          </div>

          {/* ── 段位卡片 ── */}
          <div
            className="rounded-2xl border overflow-hidden mb-6"
            style={{ borderColor: rank.badge_color + "30" }}
          >
            {/* 渐变顶部装饰 */}
            <div
              className="h-1.5 w-full"
              style={{ background: `linear-gradient(90deg, ${rank.badge_color}60, ${rank.badge_color})` }}
            />

            <div
              className="px-8 py-10 text-center"
              style={{ background: `linear-gradient(135deg, ${rank.badge_color}08 0%, #ffffff 60%)` }}
            >
              {/* 段位图标 */}
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-4xl"
                style={{
                  background: rank.badge_color + "15",
                  border: `2px solid ${rank.badge_color}30`,
                }}
              >
                {rank.badge_icon}
              </div>

              {/* 段位名 */}
              <h2
                className="text-3xl font-black mb-1"
                style={{ color: rank.badge_color }}
              >
                {rank.name}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{rank.subtitle}</p>

              {/* 等效月薪 */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
                style={{ background: rank.badge_color + "12", color: rank.badge_color }}
              >
                <Trophy className="h-4 w-4" />
                等效月薪：{rank.salary}
              </div>

              {/* 分割线 */}
              <div className="border-t border-gray-100 pt-5">
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-bold text-amber-500">{totalXP.toLocaleString()} XP</span>
                  </div>
                  <span className="text-gray-200">·</span>
                  <span className="text-sm text-gray-400">{displayName}</span>
                  <span className="text-gray-200">·</span>
                  <span className="text-xs text-gray-400">VibeCamp</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── 分享操作 ── */}
          <ShareActions
            rankName={rank.name}
            salary={rank.salary}
            displayName={displayName}
          />

          {/* ── 继续闯关 CTA ── */}
          <div className="mt-8 text-center">
            <Link
              href="/zh/dashboard"
              className="inline-flex items-center gap-2 h-11 px-8 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
            >
              继续闯关
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
