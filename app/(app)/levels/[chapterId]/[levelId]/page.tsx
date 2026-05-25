import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";
import { getLevelContent } from "@/lib/content/levels";
import { notFound } from "next/navigation";
import { LevelContent } from "@/components/levels/level-content";
import { SubmissionForm } from "@/components/levels/submission-form";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface LevelPageProps {
  params: Promise<{ chapterId: string; levelId: string }>;
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { chapterId, levelId } = await params;
  const levelContent = getLevelContent(levelId);

  if (!levelContent) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session!.user!.id;

  const supabase = createAdminClient();

  // Get level data from DB
  const { data: level } = await supabase
    .from("levels")
    .select("*")
    .eq("id", levelId)
    .single();

  // Get user progress for this level
  const { data: progress } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .eq("level_id", levelId)
    .single();

  const isCompleted = progress?.status === "completed";

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          闯关地图
        </Link>
        <span>/</span>
        <span>{levelContent.meta.title}</span>
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

      {/* Content */}
      <div className="prose prose-invert max-w-none mb-8">
        <LevelContent content={levelContent.content} />
      </div>

      {/* Submission */}
      {!isCompleted && level && (
        <SubmissionForm
          levelId={levelId}
          verificationType={level.verification_type}
          verificationConfig={level.verification_config as Record<string, any>}
        />
      )}

      {/* Completed state */}
      {isCompleted && (
        <div className="p-6 border rounded-lg bg-green-500/5 border-green-500/20 text-center">
          <p className="text-green-500 font-medium mb-4">🎉 恭喜通关！</p>
          <Link href="/dashboard">
            <Button>返回闯关地图</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
