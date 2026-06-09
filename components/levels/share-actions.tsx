"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle, Users } from "lucide-react";
import { WechatGroupButton } from "@/components/levels/wechat-group-button";

interface ShareActionsProps {
  rankName: string;
  salary: string;
  displayName: string;
  locale?: "en" | "zh";
}

export function ShareActions({ rankName, salary, displayName, locale = "en" }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText =
    locale === "zh"
      ? `${displayName} 在 VibeCamp 解锁了「${rankName}」段位，市场参考价值：${salary}。\n\n正在通过真实项目学习 AI 编程。`
      : `${displayName} unlocked the "${rankName}" rank on VibeCamp. Market signal: ${salary}.\n\nI am learning AI coding by shipping real projects.`;
  const supportHref = "mailto:roach54023@qq.com?subject=VibeCamp%20course%20help";

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleWechatShare = () => {
    const text = `${shareText}\n\n👉 ${shareUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyLink = () => {
    const text = `${shareText}\n\n👉 ${shareUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-gray-400">
        {locale === "zh" ? "分享你的进度，继续把项目做出来。" : "Share your progress and keep building."}
      </p>

      
      <div className="flex justify-center">
        {locale === "zh" ? (
          <WechatGroupButton variant="solid" className="h-10 px-6 text-sm gap-2" />
        ) : (
          <a
            href={supportHref}
            className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
          >
            <Users className="w-4 h-4" />
            Email support
          </a>
        )}
      </div>

      
      <div className="flex flex-wrap gap-2.5 justify-center">
        <button
          onClick={handleTwitterShare}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {locale === "zh" ? "分享到 X" : "Share on X"}
        </button>

        <button
          onClick={handleWechatShare}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          {locale === "zh" ? "复制到聊天" : "Copy for chat"}
        </button>

        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          {copied
            ? locale === "zh" ? "已复制" : "Copied to clipboard"
            : locale === "zh" ? "复制分享文案" : "Copy share text"}
        </button>
      </div>

      {copied && (
        <p className="text-center text-xs text-emerald-600">
          {locale === "zh" ? "分享文案已复制。" : "Share text copied."}
        </p>
      )}
    </div>
  );
}
