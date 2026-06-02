"use client";

import { useState } from "react";
import { Copy, Check, MessageCircle, Users } from "lucide-react";

interface ShareActionsProps {
  rankName: string;
  salary: string;
  displayName: string;
}

export function ShareActions({ rankName, salary, displayName }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `🎖️ 我在 VibeCamp 解锁了「${rankName}」段位！等效月薪 ${salary} 💰\n\n零代码基础，纯靠 AI 辅助编程一路闯关。你也来试试？`;

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
        截图你的成果分享到交流群，和同学们一起交流 🚀
      </p>

      {/* 加群引导 */}
      <div className="flex justify-center">
        <button
          onClick={() => window.open("https://REPLACE_WITH_GROUP_LINK", "_blank")}
          className="inline-flex items-center gap-2 h-10 px-6 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold transition-colors"
        >
          <Users className="w-4 h-4" />
          加入交流群，晒出你的成果
        </button>
      </div>

      {/* 分享按钮组 */}
      <div className="flex flex-wrap gap-2.5 justify-center">
        <button
          onClick={handleTwitterShare}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          分享到 X/Twitter
        </button>

        <button
          onClick={handleWechatShare}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          微信分享
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
          {copied ? "已复制到剪贴板" : "复制分享文案"}
        </button>
      </div>

      {copied && (
        <p className="text-center text-xs text-emerald-600">
          文案已复制！粘贴到微信 / 朋友圈 / 小红书即可分享 ✨
        </p>
      )}
    </div>
  );
}
