"use client";

import { useState } from "react";
import { ArrowRight, Share2, Copy, Check, X, Users, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WechatGroupButton } from "@/components/levels/wechat-group-button";

interface SharePromptProps {
  levelId?: string;
  levelTitle: string;
  chapterId?: string;
  nextLevelUrl?: string | null;
  dashboardUrl?: string;
  locale?: "en" | "zh";
}

export function SharePrompt({
  levelId,
  levelTitle,
  chapterId,
  nextLevelUrl,
  dashboardUrl = "/dashboard",
  locale = "en",
}: SharePromptProps) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const copy = locale === "zh" ? zhCopy : enCopy;
  const poster = locale === "zh" ? getChapterPoster(chapterId) : null;
  const celebration = locale === "zh" ? getCelebrationCopy(levelId, chapterId) : null;
  const [posterOpen, setPosterOpen] = useState(Boolean(poster));
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

  const posterModal = poster ? (
    <CompletionPosterModal
      copy={copy}
      celebration={celebration}
      poster={poster}
      nextLevelUrl={nextLevelUrl}
      dashboardUrl={dashboardUrl}
      onClose={() => setPosterOpen(false)}
    />
  ) : null;

  // Collapsed success strip.
  if (dismissed) {
    return (
      <>
        {posterOpen && posterModal}
        <div className="mb-6 px-5 py-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 text-sm">✓</span>
            <span className="text-sm text-emerald-700 font-medium">{copy.levelComplete}</span>
          </div>
          <div className="flex items-center gap-2">
            {poster && (
              <button
                onClick={() => setPosterOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                {copy.viewPoster}
              </button>
            )}
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
      </>
    );
  }

  return (
    <>
      {posterOpen && posterModal}
      <div className="mb-6 rounded-2xl border border-emerald-100 overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />

        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <span className="font-black text-gray-900">{copy.levelComplete}</span>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-300 hover:text-gray-500 transition-colors"
              aria-label={copy.close}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm text-gray-400 mb-4">
            {poster ? copy.posterDescription : copy.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {poster ? (
              <button
                onClick={() => setPosterOpen(true)}
                className="inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5" />
                {copy.viewPoster}
              </button>
            ) : (
              <>
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
              </>
            )}
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
    </>
  );
}

function CompletionPosterModal({
  copy,
  celebration,
  poster,
  nextLevelUrl,
  dashboardUrl,
  onClose,
}: {
  copy: typeof zhCopy;
  celebration: ReturnType<typeof getCelebrationCopy> | null;
  poster: { file: string; transferQr: string };
  nextLevelUrl?: string | null;
  dashboardUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/82 px-4 py-6 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(59,130,246,0.38),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(16,185,129,0.25),transparent_26%),radial-gradient(circle_at_84%_72%,rgba(244,114,182,0.22),transparent_24%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[8%] h-72 w-72 -translate-x-1/2 rounded-full border border-white/10 shadow-[0_0_80px_rgba(96,165,250,0.55)]" />
      <div className="pointer-events-none absolute left-[15%] top-[18%] h-28 w-28 rounded-full border border-yellow-300/40 shadow-[0_0_36px_rgba(253,224,71,0.45)]" />
      <div className="pointer-events-none absolute right-[13%] top-[22%] h-24 w-24 rounded-full border border-cyan-300/40 shadow-[0_0_36px_rgba(103,232,249,0.45)]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {FIREWORKS.map((firework) => (
          <span
            key={`${firework.left}-${firework.top}`}
            className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: firework.left,
              top: firework.top,
              background: firework.background,
              boxShadow: firework.shadow,
              animation: `vcFireworkBloom ${firework.duration}ms ease-out ${firework.delay}ms infinite`,
            }}
          />
        ))}
        {CONFETTI.map((item, index) => (
          <span
            key={`${item.left}-${item.top}-${index}`}
            className={`absolute h-2.5 w-9 rounded-full opacity-90 ${item.color}`}
            style={{
              left: item.left,
              top: item.top,
              transform: `rotate(${item.rotate}deg)`,
              animation: `vcConfettiFloat ${item.duration}ms ease-in-out ${item.delay}ms infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes vcFireworkBloom {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(.18) rotate(0deg); filter: blur(1px); }
          18% { opacity: .95; }
          62% { opacity: .85; transform: translate(-50%, -50%) scale(1) rotate(24deg); filter: blur(0); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.28) rotate(48deg); filter: blur(2px); }
        }
        @keyframes vcConfettiFloat {
          0%, 100% { translate: 0 0; opacity: .45; }
          35% { translate: 8px -18px; opacity: 1; }
          70% { translate: -6px 10px; opacity: .75; }
        }
      `}</style>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center md:hidden">
        <button
          onClick={onClose}
          aria-label={copy.close}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-colors hover:bg-black"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex min-h-0 w-full flex-1 items-start justify-center px-2 pb-20 pt-14">
          <Image
            src={poster.file}
            alt={copy.posterAlt}
            width={1080}
            height={1440}
            priority
            className="h-auto max-h-[calc(100vh-126px)] w-auto max-w-[96vw] rounded-2xl shadow-2xl"
          />
        </div>

        <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/50 bg-white/95 p-3 shadow-2xl backdrop-blur">
          <p className="text-center text-sm font-black text-gray-950">{copy.longPressTitle}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={onClose}
              className="flex h-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600"
            >
              {copy.close}
            </button>
            {nextLevelUrl ? (
              <Link
                href={nextLevelUrl}
                className="flex h-9 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white"
              >
                {copy.continueNext}
              </Link>
            ) : (
              <Link
                href={dashboardUrl}
                className="flex h-9 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white"
              >
                {copy.allComplete}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 hidden max-h-[90vh] w-full max-w-[920px] grid-rows-[auto_1fr] overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.55)] md:grid md:grid-cols-[minmax(0,430px)_minmax(280px,1fr)] md:grid-rows-1">
        <button
          onClick={onClose}
          aria-label={copy.close}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white transition-colors hover:bg-black"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="min-h-0 overflow-auto bg-slate-100 p-3 md:p-4">
          <Image
            src={poster.file}
            alt={copy.posterAlt}
            width={1080}
            height={1440}
            priority
            className="mx-auto h-auto max-h-[66vh] w-auto rounded-2xl shadow-xl md:max-h-[82vh]"
          />
        </div>

        <div className="flex flex-col justify-between gap-5 bg-white p-5 md:p-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">{copy.modalEyebrow}</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-gray-950 md:text-4xl">
              {celebration?.title ?? copy.modalTitle}
            </h2>
            {celebration?.subtitle && (
              <p className="mt-3 text-xl font-black leading-snug text-blue-600 md:text-2xl">
                {celebration.subtitle}
              </p>
            )}
            <p className="mt-3 hidden text-sm leading-6 text-gray-500 md:block md:text-base">
              {celebration?.desktopDescription ?? copy.modalDesktopDescription}
            </p>

            <div className="mt-6 hidden rounded-2xl border border-blue-100 bg-blue-50 p-4 md:block">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Smartphone className="h-4 w-4" />
                {copy.scanTitle}
              </div>
              <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                <Image
                  src={poster.transferQr}
                  alt={copy.transferQrAlt}
                  width={420}
                  height={420}
                  className="mx-auto aspect-square w-full max-w-[230px]"
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">{copy.scanDescription}</p>
            </div>

          </div>

          <div className="flex flex-col gap-2">
            {nextLevelUrl ? (
              <Link
                href={nextLevelUrl}
                className="flex h-11 items-center justify-center gap-2 rounded-full bg-gray-950 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                {copy.continueNext}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={dashboardUrl}
                className="flex h-11 items-center justify-center rounded-full bg-gray-950 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
              >
                {copy.allComplete}
              </Link>
            )}
            <button
              onClick={onClose}
              className="flex h-10 items-center justify-center rounded-full text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              {copy.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CONFETTI = [
  { left: "7%", top: "10%", rotate: -22, color: "bg-blue-400", duration: 3600, delay: 0 },
  { left: "14%", top: "24%", rotate: 31, color: "bg-emerald-400", duration: 4200, delay: 240 },
  { left: "25%", top: "8%", rotate: 12, color: "bg-yellow-300", duration: 3900, delay: 520 },
  { left: "39%", top: "12%", rotate: -35, color: "bg-pink-400", duration: 4400, delay: 120 },
  { left: "61%", top: "9%", rotate: 24, color: "bg-cyan-300", duration: 3700, delay: 360 },
  { left: "76%", top: "18%", rotate: -18, color: "bg-violet-400", duration: 4300, delay: 760 },
  { left: "91%", top: "11%", rotate: 38, color: "bg-emerald-300", duration: 4100, delay: 180 },
  { left: "6%", top: "52%", rotate: 19, color: "bg-yellow-300", duration: 3900, delay: 620 },
  { left: "15%", top: "80%", rotate: -28, color: "bg-blue-300", duration: 4500, delay: 420 },
  { left: "30%", top: "92%", rotate: 34, color: "bg-emerald-300", duration: 4000, delay: 820 },
  { left: "72%", top: "91%", rotate: 14, color: "bg-pink-300", duration: 4300, delay: 300 },
  { left: "87%", top: "78%", rotate: -32, color: "bg-cyan-300", duration: 3800, delay: 680 },
  { left: "95%", top: "47%", rotate: 20, color: "bg-yellow-300", duration: 4200, delay: 500 },
];

const FIREWORKS = [
  {
    left: "12%",
    top: "18%",
    background:
      "repeating-conic-gradient(from 8deg, rgba(96,165,250,.95) 0deg 5deg, transparent 5deg 18deg)",
    shadow: "0 0 42px rgba(96,165,250,.55)",
    duration: 2100,
    delay: 0,
  },
  {
    left: "88%",
    top: "23%",
    background:
      "repeating-conic-gradient(from 20deg, rgba(244,114,182,.9) 0deg 5deg, transparent 5deg 20deg)",
    shadow: "0 0 42px rgba(244,114,182,.55)",
    duration: 2400,
    delay: 420,
  },
  {
    left: "16%",
    top: "78%",
    background:
      "repeating-conic-gradient(from 0deg, rgba(52,211,153,.9) 0deg 5deg, transparent 5deg 19deg)",
    shadow: "0 0 42px rgba(52,211,153,.5)",
    duration: 2300,
    delay: 780,
  },
  {
    left: "86%",
    top: "78%",
    background:
      "repeating-conic-gradient(from 12deg, rgba(250,204,21,.9) 0deg 5deg, transparent 5deg 18deg)",
    shadow: "0 0 42px rgba(250,204,21,.5)",
    duration: 2200,
    delay: 1120,
  },
];

const enCopy = {
  levelComplete: "Level complete",
  share: "Share",
  continueNext: "Continue to next level",
  description: "Share your progress or continue to the next level.",
  posterDescription: "Generate your completion poster and save it on your phone.",
  posterAlt: "VibeCamp completion poster",
  modalEyebrow: "Level complete",
  modalTitle: "Your completion poster is ready",
  modalDesktopDescription: "Scan the QR code with your phone, save the poster, and share it with friends.",
  modalMobileDescription: "Long press the poster image to save it, then share it in WeChat.",
  scanTitle: "Scan to save on your phone",
  scanDescription: "Scan with your phone to open and save the poster.",
  posterQrNote: "The poster QR includes campaign parameters.",
  transferQrAlt: "Scan to open poster on phone",
  longPressTitle: "Save on mobile",
  longPressDescription: "Long press the poster image to save it, then share it in WeChat.",
  viewPoster: "View poster",
  close: "Close",
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
  posterDescription: "生成你的通关海报，在手机上保存后发到朋友圈或微信群。",
  posterAlt: "VibeCamp 通关分享海报",
  modalEyebrow: "CHAPTER CLEAR",
  modalTitle: "你的通关海报已生成",
  modalDesktopDescription: "这张图适合发朋友圈或微信群。用手机微信扫码，把海报保存到手机。",
  modalMobileDescription: "这张图适合发朋友圈或微信群。直接长按海报保存到手机。",
  scanTitle: "微信扫码保存到手机",
  scanDescription: "用手机微信扫这个码，打开海报后长按图片保存，再发朋友圈或微信群。",
  posterQrNote: "海报里的二维码已经带来源参数，别人扫码进站后可以在统计里看来源。",
  transferQrAlt: "扫码在手机打开海报",
  longPressTitle: "长按保存到手机",
  longPressDescription: "当前是手机访问时，直接长按海报图片保存，再发朋友圈或微信群。",
  viewPoster: "查看通关海报",
  close: "关闭",
  getHelp: "微信扫码加群",
  shareOnX: "分享到 X",
  copied: "已复制",
  copyText: "复制文案",
  allComplete: "全部关卡已完成",
};

function getCelebrationCopy(_levelId?: string, chapterId?: string) {
  const chapterKey = chapterId?.replace("-", "_") ?? "";

  const chapterMessages: Record<string, { title: string; subtitle: string; proof: string }> = {
    prologue: {
      title: "恭喜你完成 AI 编程序章",
      subtitle: "你已经把 AI 编程工具真正跑起来了",
      proof: "很多人还停在收藏教程，你已经完成了从安装到生成页面的第一轮闭环。",
    },
    chapter_1: {
      title: "恭喜你通关 AI 编程第一章",
      subtitle: "你已经能用 AI 做出一个完整网站",
      proof: "你不只是看懂了概念，而是亲手把需求、页面、功能和上线串成了一个完整网站。",
    },
    chapter_2: {
      title: "恭喜你通关 AI 编程第二章",
      subtitle: "你开始像前端开发者一样组织项目",
      proof: "你已经能把页面拆成组件，用更工程化的方式把想法变成可维护的作品。",
    },
    chapter_3: {
      title: "恭喜你通关 AI 编程第三章",
      subtitle: "你的作品开始有产品手感了",
      proof: "搜索、表单、移动端和细节体验都在变好，用户已经能认真使用你的页面。",
    },
    chapter_4: {
      title: "恭喜你通关 AI 编程第四章",
      subtitle: "你开始摸到全栈产品的门了",
      proof: "后端、数据库、管理台和 AI 能力接起来后，你做的不再只是静态页面。",
    },
    chapter_5: {
      title: "恭喜你完成 VibeCamp 全部训练",
      subtitle: "你已经走到独立产品发布线前",
      proof: "登录、支付、AI 对话和生产检查都跑通后，这已经接近一个能运营的产品。",
    },
  };

  const message = chapterMessages[chapterKey] ?? {
    title: "恭喜你通关本章",
    subtitle: "你又完成了一次真实交付",
    proof: "每过一关，你都在把 AI 编程从会问问题推进到能做作品。",
  };

  return {
    title: message.title,
    subtitle: message.subtitle,
    desktopDescription: `${message.proof} 用微信扫码把这张海报保存到手机，晒出你的进度。`,
    mobileDescription: `${message.proof} 长按保存这张海报，发给朋友看看你已经做到哪一步。`,
  };
}

function getChapterPoster(chapterId?: string) {
  const normalized = chapterId?.replace("-", "_");
  const posters: Record<string, { file: string; transferQr: string }> = {
    prologue: {
      file: "/share-posters/chapter-prologue.png",
      transferQr: "/share-posters/qr/prologue_transfer.png",
    },
    chapter_1: {
      file: "/share-posters/chapter-1-static-site.png",
      transferQr: "/share-posters/qr/chapter_1_transfer.png",
    },
    chapter_2: {
      file: "/share-posters/chapter-2-frontend.png",
      transferQr: "/share-posters/qr/chapter_2_transfer.png",
    },
    chapter_3: {
      file: "/share-posters/chapter-3-interaction.png",
      transferQr: "/share-posters/qr/chapter_3_transfer.png",
    },
    chapter_4: {
      file: "/share-posters/chapter-4-fullstack.png",
      transferQr: "/share-posters/qr/chapter_4_transfer.png",
    },
    chapter_5: {
      file: "/share-posters/chapter-5-launch.png",
      transferQr: "/share-posters/qr/chapter_5_transfer.png",
    },
  };

  return normalized ? posters[normalized] : null;
}
