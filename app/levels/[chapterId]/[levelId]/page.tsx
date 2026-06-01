import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { getLevelContent } from "@/lib/content/levels";
import { getStepsByLevelId } from "@/lib/content/steps";
import { getNextLevel, getPrevLevel, getSiblingLevels, getAdjacentChapterFirstLevel } from "@/lib/content/navigation";
import { notFound } from "next/navigation";
import { LevelContent } from "@/components/levels/level-content";
import { SubmissionForm } from "@/components/levels/submission-form";
import { SharePrompt } from "@/components/levels/share-prompt";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Terminal, Map, User, Star, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getRankByXP } from "@/lib/content/ranks";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecodecamp.cn";

interface LevelPageProps {
  params: Promise<{ chapterId: string; levelId: string }>;
}

export async function generateMetadata({ params }: LevelPageProps): Promise<Metadata> {
  const { chapterId, levelId } = await params;
  const levelContent = getLevelContent(levelId);

  if (!levelContent) {
    return { title: '关卡不存在 | VibeCamp' };
  }

  const { meta } = levelContent;
  const title = meta.seo_title ?? meta.page_title ?? meta.title;
  const description = meta.seo_description ?? `VibeCamp 第 ${levelId} 关：${meta.title}，预计 ${meta.estimated_minutes} 分钟完成。`;
  const keywords = meta.keywords ?? [];
  const canonicalUrl = `${siteUrl}/levels/${chapterId}/${levelId}`;

  return {
    title: `${title} | VibeCamp`,
    description,
    keywords: keywords.join(', '),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${title} | VibeCamp`,
      description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | VibeCamp`,
      description,
    },
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { chapterId, levelId } = await params;
  const levelContent = getLevelContent(levelId);

  if (!levelContent) {
    notFound();
  }

  // 获取登录状态（不强制要求登录）
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session?.user;
  const userId = session?.user?.id;

  const supabase = createAdminClient();

  // Get level data from DB
  const { data: level } = await supabase
    .from("levels")
    .select("*")
    .eq("id", levelId)
    .single();

  // 只有登录用户才查进度
  let progress = null;
  if (isLoggedIn && userId) {
    const { data } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("level_id", levelId)
      .single();
    progress = data;
  }

  // 登录用户的 XP 和段位
  let totalXP = 0;
  let currentRank = getRankByXP(0);
  if (isLoggedIn && userId) {
    const { data: profile } = await supabase
      .from("user_profiles")
      .select("total_xp, current_rank_id, display_name")
      .eq("id", userId)
      .single();
    totalXP = profile?.total_xp ?? 0;
    currentRank = getRankByXP(totalXP);
  }

  const isCompleted = progress?.status === "completed";
  const isSkipped = progress?.status === "skipped";

  // checklist 类型 → 操作清单做完即通关，不需要额外提交验证
  const isSimpleLevel =
    level != null &&
    level.verification_type === "checklist";

  // Steps data
  const steps = getStepsByLevelId(levelId);

  // Navigation
  const nextLevel = getNextLevel(levelId);
  const prevLevel = getPrevLevel(levelId);
  const siblingLevels = getSiblingLevels(levelId);
  const nextChapterFirst = getAdjacentChapterFirstLevel(levelId);

  // 内链：同章节其他关卡的标题（从 mdx 读取）
  const siblingContents = siblingLevels
    .map((s) => {
      const c = getLevelContent(s.levelId);
      return c ? { ...s, title: c.meta.seo_title ?? c.meta.page_title ?? c.meta.title, shortTitle: c.meta.title } : null;
    })
    .filter(Boolean) as Array<{ levelId: string; chapterId: string; title: string; shortTitle: string }>;

  const nextChapterContent = nextChapterFirst ? getLevelContent(nextChapterFirst.levelId) : null;

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
            {isLoggedIn && (
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <Map className="h-4 w-4 mr-1" /> 闯关地图
                </Button>
              </Link>
            )}
            {isLoggedIn && (
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-1" /> 个人
                </Button>
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                >
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
              </>
            ) : (
              <Link href={`/login?next=/levels/${chapterId}/${levelId}`}>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <LogIn className="h-4 w-4" />
                  登录
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="pt-14">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {/* Breadcrumb + quick nav */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={isLoggedIn ? "/dashboard" : "/"} className="hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                {isLoggedIn ? "闯关地图" : "首页"}
              </Link>
              <span>/</span>
              <span>{levelContent.meta.title}</span>
            </div>
            {prevLevel && (
              <Link href={`/levels/${prevLevel.chapterId}/${prevLevel.levelId}`}>
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  上一关
                </Button>
              </Link>
            )}
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{levelContent.meta.page_title || levelContent.meta.title}</h1>
              {levelContent.meta.is_delivery && (
                <Badge variant="secondary">🎯 交付关</Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                预计 {levelContent.meta.estimated_minutes} 分钟
              </span>
              {isCompleted && (
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  ✓ 已通关
                </Badge>
              )}
            </div>
          </div>

          {/* Completed: share prompt + next level CTA */}
          {isCompleted && (
            <SharePrompt
              levelTitle={levelContent.meta.title}
              nextLevelUrl={nextLevel ? `/levels/${nextLevel.chapterId}/${nextLevel.levelId}` : null}
            />
          )}

          {/* Skipped banner */}
          {isSkipped && (
            <div className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <span className="text-sm text-amber-600 font-medium">⏭ 已跳过，可随时补交验证</span>
            </div>
          )}

          {/* Content with integrated steps */}
          <LevelContent
            content={levelContent.content}
            levelId={levelId}
            steps={steps}
            isSimpleLevel={isLoggedIn ? isSimpleLevel : false}
            isLevelCompleted={isCompleted}
            nextLevelUrl={nextLevel ? `/levels/${nextLevel.chapterId}/${nextLevel.levelId}` : null}
          />

          {/* 未登录 CTA */}
          {!isLoggedIn && (
            <div className="mt-10 p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 text-center">
              <h3 className="text-lg font-bold mb-2">登录后继续闯关</h3>
              <p className="text-sm text-muted-foreground mb-5">
                保存学习进度、提交作品并获得 XP。完全免费。
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link href={`/login?next=/levels/${chapterId}/${levelId}`}>
                  <Button size="lg" className="gap-2">
                    <LogIn className="h-4 w-4" />
                    登录后开始
                  </Button>
                </Link>
                <Link href={`/register?next=/levels/${chapterId}/${levelId}`}>
                  <Button size="lg" variant="outline">
                    免费注册
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Submission - 只在登录、非简单关且未通关时显示 */}
          {isLoggedIn && !isCompleted && !isSimpleLevel && level && (
            <SubmissionForm
              levelId={levelId}
              verificationType={level.verification_type}
              verificationConfig={level.verification_config as Record<string, any>}
              nextLevelUrl={nextLevel ? `/levels/${nextLevel.chapterId}/${nextLevel.levelId}` : null}
            />
          )}

          {/* 相关教程内链 */}
          {siblingContents.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                本章其他教程
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {siblingContents.map((s) => (
                  <Link
                    key={s.levelId}
                    href={`/levels/${s.chapterId}/${s.levelId}`}
                    className="flex items-start gap-2 p-3 rounded-lg border border-border/40 bg-card/20 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group text-sm"
                  >
                    <ChevronRight className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-foreground/80 group-hover:text-indigo-300 transition-colors leading-snug">
                      {s.shortTitle}
                    </span>
                  </Link>
                ))}
              </div>
              {nextChapterContent && nextChapterFirst && (
                <div className="mt-3">
                  <Link
                    href={`/levels/${nextChapterFirst.chapterId}/${nextChapterFirst.levelId}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 transition-all group text-sm"
                  >
                    <ArrowRight className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span className="text-indigo-300 font-medium">进入下一章：{nextChapterContent.meta.title}</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Navigation footer */}
          <div className="mt-8 pt-6 border-t flex items-center justify-between">
            {prevLevel ? (
              <Link href={`/levels/${prevLevel.chapterId}/${prevLevel.levelId}`}>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  上一关
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {(isCompleted || isSkipped) && nextLevel ? (
              <Link href={`/levels/${nextLevel.chapterId}/${nextLevel.levelId}`}>
                <Button className="gap-1">
                  下一关
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : isCompleted && !nextLevel ? (
              <Link href="/dashboard">
                <Button className="gap-1">
                  🎉 恭喜通关全部关卡！
                </Button>
              </Link>
            ) : nextLevel && !isLoggedIn ? (
              <Link href={`/levels/${nextLevel.chapterId}/${nextLevel.levelId}`}>
                <Button variant="outline" className="gap-1">
                  下一关
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
