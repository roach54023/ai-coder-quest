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
import { Clock, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, BookOpen, Star, LogIn } from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getRankByXP } from "@/lib/content/ranks";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

import { siteUrl } from "@/lib/site-url";

interface LevelPageProps {
  params: Promise<{ chapterId: string; levelId: string }>;
}

export async function generateMetadata({ params }: LevelPageProps): Promise<Metadata> {
  const { chapterId, levelId } = await params;
  const levelContent = getLevelContent(levelId, "zh");

  if (!levelContent) {
    return { title: 'Level Not Found | VibeCamp' };
  }

  const { meta } = levelContent;
  const rawTitle = meta.seo_title ?? meta.page_title ?? meta.title;
  const title = rawTitle;
  const description = meta.seo_description ?? `VibeCamp 关卡 ${levelId}: ${meta.title}。预计用时 ${meta.estimated_minutes} 分钟。`;
  const keywords = meta.keywords ?? [];
  const canonicalUrl = `${siteUrl}/zh/levels/${chapterId}/${levelId}`;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "zh-CN": canonicalUrl,
        en: `${siteUrl}/levels/${chapterId}/${levelId}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { chapterId, levelId } = await params;
  const levelContent = getLevelContent(levelId, "zh");

  if (!levelContent) {
    notFound();
  }

  // Read login state without requiring auth.
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

  // Only logged-in users have saved progress.
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

  // XP and rank for logged-in users.
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

  // Checklist and URL-submit levels can complete from the checklist.
  const isSimpleLevel =
    level != null &&
    (level.verification_type === "checklist" || level.verification_type === "url_submit");

  // URL-submit levels require a project link.
  const isDeliveryLevel =
    level != null && level.verification_type === "url_submit";

  // Steps data
  const steps = getStepsByLevelId(levelId, "zh");

  // Navigation
  const nextLevel = getNextLevel(levelId);
  const prevLevel = getPrevLevel(levelId);
  const siblingLevels = getSiblingLevels(levelId);
  const nextChapterFirst = getAdjacentChapterFirstLevel(levelId);

  // Internal links to nearby lessons from the same chapter.
  const siblingContents = siblingLevels
    .map((s) => {
      const c = getLevelContent(s.levelId, "zh");
      return c ? { ...s, title: c.meta.seo_title ?? c.meta.page_title ?? c.meta.title, shortTitle: c.meta.title } : null;
    })
    .filter(Boolean) as Array<{ levelId: string; chapterId: string; title: string; shortTitle: string }>;

  const nextChapterContent = nextChapterFirst ? getLevelContent(nextChapterFirst.levelId, "zh") : null;
  const canonicalUrl = `${siteUrl}/zh/levels/${chapterId}/${levelId}`;
  const lessonTitle = levelContent.meta.page_title || levelContent.meta.title;
  const lessonDescription =
    levelContent.meta.seo_description ??
    `VibeCamp level ${levelId}: ${levelContent.meta.title}. Estimated time: ${levelContent.meta.estimated_minutes} minutes.`;
  const lessonJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      "@id": `${canonicalUrl}#learning-resource`,
      name: lessonTitle,
      description: lessonDescription,
      url: canonicalUrl,
      inLanguage: "zh-CN",
      isPartOf: {
        "@type": "Course",
        name: "VibeCamp AI 编程教程 · 零基础 Vibe Coding 训练营",
        url: siteUrl,
      },
      teaches: levelContent.meta.keywords ?? ["vibe coding", "AI coding"],
      timeRequired: `PT${levelContent.meta.estimated_minutes}M`,
      educationalLevel: "Beginner",
      learningResourceType: "Tutorial",
      provider: {
        "@type": "Organization",
        name: "VibeCamp",
        url: siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "@id": `${canonicalUrl}#howto`,
      name: lessonTitle,
      description: lessonDescription,
      totalTime: `PT${levelContent.meta.estimated_minutes}M`,
      step: (steps ?? []).map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.label,
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={lessonJsonLd} />

      {/* Top nav */}
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

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {isLoggedIn && (
              <Link
                href="/zh/dashboard"
                className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
              >
                课程地图
              </Link>
            )}
            {isLoggedIn && (
              <Link
                href="/zh/profile"
                className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
              >
                个人主页
              </Link>
            )}
            <Link
              href={`/levels/${chapterId}/${levelId}`}
              className="text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-full transition-colors"
            >
              English
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
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
                <SignOutButton />
              </>
            ) : (
              <Link
                href={`/zh/login?next=/zh/levels/${chapterId}/${levelId}`}
                className="inline-flex items-center gap-1.5 h-9 px-5 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                登录
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="pt-14">
        <div className="max-w-3xl mx-auto px-6 py-10">

          {/* Breadcrumb and previous level */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-gray-400">
              <Link
                href={isLoggedIn ? "/zh/dashboard" : "/zh"}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {isLoggedIn ? "课程地图" : "首页"}
              </Link>
              <span className="text-gray-200">/</span>
              <span className="text-gray-500 truncate max-w-[200px]">{levelContent.meta.title}</span>
            </div>
            {prevLevel && (
              <Link
                href={`/zh/levels/${prevLevel.chapterId}/${prevLevel.levelId}`}
                className="flex shrink-0 items-center gap-1 text-xs text-gray-400 hover:text-gray-700 px-3 py-1.5 rounded-full border border-gray-100 hover:border-gray-200 transition-all"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">上一关</span>
              </Link>
            )}
          </div>

          {/* Level title */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-3">
              <h1 className="text-3xl font-black text-gray-900 leading-tight">
                {levelContent.meta.page_title || levelContent.meta.title}
              </h1>
              {levelContent.meta.is_delivery && (
                <span className="mt-1.5 shrink-0 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                  交付关卡
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {levelContent.meta.estimated_minutes} 分钟
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-emerald-600 font-medium text-xs px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                  已完成
                </span>
              )}
            </div>
          </div>

          {/* Completed: share prompt + next level CTA */}
          {isCompleted && (
            <SharePrompt
              levelTitle={levelContent.meta.title}
              nextLevelUrl={nextLevel ? `/zh/levels/${nextLevel.chapterId}/${nextLevel.levelId}` : null}
              dashboardUrl="/zh/dashboard"
              locale="zh"
            />
          )}

          {/* Skipped banner */}
          {isSkipped && (
            <div className="mb-6 px-5 py-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3">
              <span className="text-amber-500 text-base">⏭</span>
              <span className="text-sm text-amber-700 font-medium">已跳过。你可以之后回来继续提交验证。</span>
            </div>
          )}

          {/* Content with integrated steps */}
          <LevelContent
            content={levelContent.content}
            levelId={levelId}
            chapterId={chapterId}
            levelTitle={levelContent.meta.title}
            steps={steps}
            isSimpleLevel={isLoggedIn ? isSimpleLevel : false}
            isDeliveryLevel={isLoggedIn ? isDeliveryLevel : false}
            deliveryPrompt={levelContent.meta.delivery_prompt}
            isLevelCompleted={isCompleted}
            nextLevelUrl={nextLevel ? `/zh/levels/${nextLevel.chapterId}/${nextLevel.levelId}` : null}
            dashboardUrl="/zh/dashboard"
            locale="zh"
          />

          {/* Anonymous CTA */}
          {!isLoggedIn && (
            <div className="mt-10 px-8 py-8 rounded-2xl border border-gray-100 bg-gray-50 text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4">
                <LogIn className="h-5 w-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">登录后继续</h3>
              <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto leading-relaxed">
                保存进度、提交作品并获得 XP。免费开始。
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  href={`/zh/login?next=/zh/levels/${chapterId}/${levelId}`}
                  className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  登录后开始
                </Link>
                <Link
                  href={`/zh/register?next=/zh/levels/${chapterId}/${levelId}`}
                  className="inline-flex items-center h-10 px-6 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  创建账号
                </Link>
              </div>
            </div>
          )}

          {/* Submission form for logged-in verification levels. */}
          {isLoggedIn && !isCompleted && !isSimpleLevel && level && (
            <SubmissionForm
              levelId={levelId}
              verificationType={level.verification_type}
              nextLevelUrl={nextLevel ? `/zh/levels/${nextLevel.chapterId}/${nextLevel.levelId}` : null}
              dashboardUrl="/zh/dashboard"
              locale="zh"
            />
          )}

          {/* Related lessons */}
          {siblingContents.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5" />
                本章更多关卡
              </h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {siblingContents.map((s) => (
                  <Link
                    key={s.levelId}
                    href={`/zh/levels/${s.chapterId}/${s.levelId}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group text-sm"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors leading-snug">
                      {s.shortTitle}
                    </span>
                  </Link>
                ))}
              </div>
              {nextChapterContent && nextChapterFirst && (
                <div className="mt-2">
                  <Link
                    href={`/zh/levels/${nextChapterFirst.chapterId}/${nextChapterFirst.levelId}`}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 transition-all group text-sm"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-indigo-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-indigo-600 font-medium">下一章：{nextChapterContent.meta.title}</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Bottom navigation */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            {prevLevel ? (
              <Link
                href={`/zh/levels/${prevLevel.chapterId}/${prevLevel.levelId}`}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 px-4 py-2 rounded-full border border-gray-100 hover:border-gray-200 transition-all"
              >
                <ChevronLeft className="h-4 w-4" />
                上一关
              </Link>
            ) : (
              <div />
            )}

            {(isCompleted || isSkipped) && nextLevel ? (
              <Link
                href={`/zh/levels/${nextLevel.chapterId}/${nextLevel.levelId}`}
                className="flex items-center gap-1.5 h-10 px-6 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
              >
                下一关
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : isCompleted && !nextLevel ? (
              <Link
                href="/zh/dashboard"
                className="flex items-center gap-1.5 h-10 px-6 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
              >
                全部关卡已完成
              </Link>
            ) : nextLevel && !isLoggedIn ? (
              <Link
                href={`/zh/levels/${nextLevel.chapterId}/${nextLevel.levelId}`}
                className="flex items-center gap-1.5 h-10 px-6 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              >
                下一关
                <ArrowRight className="h-4 w-4" />
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
