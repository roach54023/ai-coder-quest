"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Share2, Copy, Check, X, Users } from "lucide-react";
import Link from "next/link";

interface SharePromptProps {
  levelTitle: string;
  nextLevelUrl?: string | null;
}

export function SharePrompt({ levelTitle, nextLevelUrl }: SharePromptProps) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const shareText = `我刚在 AI Coder Quest 通过了「${levelTitle}」🎉 零代码基础也能用 AI 做开发！`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://ai-coder-quest.com";

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleCopyLink = () => {
    const text = `${shareText}\n${shareUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (dismissed) {
    // 折叠后只显示简洁的通关状态 + 下一关按钮
    return (
      <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-between">
        <span className="text-sm text-green-600 font-medium">✓ 本关已通过</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDismissed(false)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            分享
          </button>
          {nextLevelUrl && (
            <Link href={nextLevelUrl}>
              <Button size="sm" className="gap-1">
                继续下一关
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 border border-green-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <span className="font-semibold text-green-600">通关成功！</span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Share encouragement */}
      <p className="text-sm text-muted-foreground mb-3">
        截图你的成果，分享到交流群一起交流 👇
      </p>

      {/* Group chat + share buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant="default"
          size="sm"
          onClick={() => window.open("https://REPLACE_WITH_GROUP_LINK", "_blank")}
          className="gap-1.5 text-xs"
        >
          <Users className="w-3.5 h-3.5" />
          加入交流群
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleTwitterShare}
          className="gap-1.5 text-xs"
        >
          <Share2 className="w-3.5 h-3.5" />
          发推分享
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          className="gap-1.5 text-xs"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied ? "已复制" : "复制文案"}
        </Button>
      </div>

      {/* Next level CTA */}
      {nextLevelUrl ? (
        <Link href={nextLevelUrl} className="block">
          <Button className="w-full gap-1">
            继续下一关
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Link href="/dashboard" className="block">
          <Button className="w-full gap-1">
            🎉 恭喜通关全部关卡！
          </Button>
        </Link>
      )}
    </div>
  );
}
