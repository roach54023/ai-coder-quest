"use client";

import { useState } from "react";
import { ArrowRight, Share2, Copy, Check, X, Users } from "lucide-react";
import Link from "next/link";

interface SharePromptProps {
  levelTitle: string;
  nextLevelUrl?: string | null;
}

export function SharePrompt({ levelTitle, nextLevelUrl }: SharePromptProps) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const shareText = `我刚在 VibeCamp 通过了「${levelTitle}」🎉 零代码基础也能用 AI 做开发！`;
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

  // 折叠态：简洁横条
  if (dismissed) {
    return (
      <div className="mb-6 px-5 py-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-emerald-500 text-sm">✓</span>
          <span className="text-sm text-emerald-700 font-medium">本关已通过</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDismissed(false)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            分享
          </button>
          {nextLevelUrl && (
            <Link
              href={nextLevelUrl}
              className="inline-flex items-center gap-1 h-8 px-4 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
            >
              继续下一关
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-2xl border border-emerald-100 overflow-hidden">
      {/* 顶部绿色装饰条 */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />

      <div className="px-6 py-5">
        {/* 标题行 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-base">
              🎉
            </div>
            <span className="font-black text-gray-900">通关成功！</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 分享引导文案 */}
        <p className="text-sm text-gray-400 mb-4">
          截图你的成果，分享到交流群一起交流 👇
        </p>

        {/* 分享按钮组 */}
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => window.open("https://REPLACE_WITH_GROUP_LINK", "_blank")}
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            加入交流群
          </button>
          <button
            onClick={handleTwitterShare}
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            发推分享
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
            {copied ? "已复制" : "复制文案"}
          </button>
        </div>

        {/* 下一关 CTA */}
        {nextLevelUrl ? (
          <Link
            href={nextLevelUrl}
            className="flex items-center justify-center gap-2 h-11 w-full rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            继续下一关
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/zh/dashboard"
            className="flex items-center justify-center gap-2 h-11 w-full rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            🎉 恭喜通关全部关卡！
          </Link>
        )}
      </div>
    </div>
  );
}
