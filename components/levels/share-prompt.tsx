"use client";

import { useState } from "react";
import { ArrowRight, Share2, Copy, Check, X, Users } from "lucide-react";
import Link from "next/link";
import { WechatGroupButton } from "@/components/levels/wechat-group-button";

interface SharePromptProps {
  levelTitle: string;
  nextLevelUrl?: string | null;
  dashboardUrl?: string;
  locale?: "en" | "zh";
}

export function SharePrompt({
  levelTitle,
  nextLevelUrl,
  dashboardUrl = "/dashboard",
  locale = "en",
}: SharePromptProps) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const copy = locale === "zh" ? zhCopy : enCopy;
  const shareText = locale === "zh"
    ? `我刚刚在 VibeCamp 完成了「${levelTitle}」。正在通过真实项目学习 AI 编程。`
    : `I just completed "${levelTitle}" on VibeCamp. Learning AI coding by shipping real projects.`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "https://vibecodecamp.cn";

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

  const supportHref = "mailto:roach54023@qq.com?subject=VibeCamp%20course%20help";

  // Collapsed success strip.
  if (dismissed) {
    return (
      <div className="mb-6 px-5 py-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 text-sm">✓</span>
          <span className="text-sm text-emerald-700 font-medium">{copy.levelComplete}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDismissed(false)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            {copy.share}
          </button>
          {nextLevelUrl && (
            <Link
              href={nextLevelUrl}
              className="inline-flex items-center gap-1 h-8 px-4 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
            >
              {copy.continueNext}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-2xl border border-emerald-100 overflow-hidden">
      
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />

      <div className="px-6 py-5">
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-base">
              🎉
            </div>
            <span className="font-black text-gray-900">{copy.levelComplete}</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Share prompt */}
        <p className="text-sm text-gray-400 mb-4">
          {copy.description}
        </p>

        {/* Share buttons */}
        <div className="flex flex-wrap gap-2 mb-5">
          {locale === "zh" ? (
            <WechatGroupButton variant="solid" />
          ) : (
            <a
              href={supportHref}
              className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              {copy.getHelp}
            </a>
          )}
          <button
            onClick={handleTwitterShare}
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copy.shareOnX}
          </button>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? copy.copied : copy.copyText}
          </button>
        </div>

        
        {nextLevelUrl ? (
          <Link
            href={nextLevelUrl}
            className="flex items-center justify-center gap-2 h-11 w-full rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            {copy.continueNext}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href={dashboardUrl}
            className="flex items-center justify-center gap-2 h-11 w-full rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            {copy.allComplete}
          </Link>
        )}
      </div>
    </div>
  );
}

const enCopy = {
  levelComplete: "Level complete",
  share: "Share",
  continueNext: "Continue to next level",
  description: "Share your progress or continue to the next level.",
  getHelp: "Email support",
  shareOnX: "Share on X",
  copied: "Copied",
  copyText: "Copy text",
  allComplete: "All levels complete",
};

const zhCopy = {
  levelComplete: "关卡已完成",
  share: "分享",
  continueNext: "继续下一关",
  description: "分享你的进度，或继续进入下一关。",
  getHelp: "微信扫码加群",
  shareOnX: "分享到 X",
  copied: "已复制",
  copyText: "复制文案",
  allComplete: "全部关卡已完成",
};
