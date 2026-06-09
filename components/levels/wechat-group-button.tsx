"use client";

import { useState } from "react";
import { Users, X } from "lucide-react";

interface WechatGroupButtonProps {
  className?: string;
  variant?: "solid" | "outline";
}

export function WechatGroupButton({ className = "", variant = "outline" }: WechatGroupButtonProps) {
  const [open, setOpen] = useState(false);
  const buttonClass =
    variant === "solid"
      ? "inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-semibold transition-colors"
      : "inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${buttonClass} ${className}`}
      >
        <Users className="w-3.5 h-3.5" />
        微信扫码加群
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8 bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">加入 VibeCamp 中文学习群</h3>
                <p className="text-xs text-gray-400 mt-0.5">用微信扫描二维码入群交流。</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="关闭二维码弹窗"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-6 text-center">
              <div className="mx-auto w-64 max-w-full rounded-xl border border-gray-100 bg-white p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/wechat-group-qr.png"
                  alt="VibeCamp 中文学习群微信二维码"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-gray-900">请使用微信扫码加群</p>
              <p className="mt-1 text-xs text-gray-400">如果二维码失效，请联系 roach54023@qq.com。</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
