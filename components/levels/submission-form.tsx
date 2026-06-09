"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, XCircle, SkipForward, Send } from "lucide-react";

interface SubmissionFormProps {
  levelId: string;
  verificationType: string;
  nextLevelUrl?: string | null;
  dashboardUrl?: string;
  locale?: "en" | "zh";
}

type SubmissionStatus = "idle" | "submitting" | "passed" | "failed";

export function SubmissionForm({
  levelId,
  verificationType,
  nextLevelUrl,
  dashboardUrl = "/dashboard",
  locale = "en",
}: SubmissionFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [skipping, setSkipping] = useState(false);

  const handleSubmit = async () => {
    setStatus("submitting");

    const formData = new FormData();
    formData.append("level_id", levelId);
    formData.append("type", verificationType);
    formData.append("locale", locale);

    if (textInput) formData.append("text_content", textInput);
    if (urlInput) formData.append("url_content", urlInput);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.verification.passed === true) {
        setStatus("passed");
        setMessage(data.verification.message);
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else if (data.verification.passed === false) {
        setStatus("failed");
        setMessage(data.verification.message);
      }
    } catch {
      setStatus("failed");
      setMessage(locale === "zh" ? "提交失败，请重试。" : "Submission failed. Please try again.");
    }
  };

  const handleSkip = async () => {
    setSkipping(true);
    try {
      const res = await fetch("/api/progress/skip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level_id: levelId }),
      });
      const data = await res.json();
      if (data.skipped) {
        if (nextLevelUrl) {
          router.push(nextLevelUrl);
        } else {
          router.push(dashboardUrl);
        }
      }
    } catch {
      setSkipping(false);
    }
  };

  const needsText = verificationType === "regex" || verificationType === "composite";
  const needsUrl =
    verificationType === "url_check" ||
    verificationType === "github_url" ||
    verificationType === "composite";

  return (
    <div className="mt-8 rounded-2xl border border-gray-100 overflow-hidden">
      
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-base font-black text-gray-900">{locale === "zh" ? "提交验证" : "Submit verification"}</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          {locale === "zh" ? "完成上面的步骤后，在这里提交你的证明。" : "Complete the steps above, then submit your proof here."}
        </p>
      </div>

      <div className="px-6 py-5 space-y-4">
        {needsText && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {locale === "zh" ? "粘贴命令输出" : "Paste command output"}
            </label>
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Example: v22.11.0"
              className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>
        )}

        {needsUrl && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              URL
            </label>
            <input
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="w-full h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>
        )}

        
        <button
          onClick={handleSubmit}
          disabled={status === "submitting"}
          className="w-full h-11 rounded-full bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {locale === "zh" ? "验证中..." : "Verifying..."}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {locale === "zh" ? "提交验证" : "Submit verification"}
            </>
          )}
        </button>

        
        {status === "passed" && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm text-emerald-700 font-medium">{message}</span>
          </div>
        )}
        {status === "failed" && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
            <span className="text-sm text-red-600">{message}</span>
          </div>
        )}

        
        {status === "idle" && (
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={handleSkip}
              disabled={skipping}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              {skipping ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <SkipForward className="w-4 h-4" />
              )}
              {skipping ? (locale === "zh" ? "跳过中..." : "Skipping...") : (locale === "zh" ? "暂时跳过" : "Skip for now")}
            </button>
            <p className="text-xs text-center text-gray-300 mt-1">
              {locale === "zh" ? "你可以之后回来继续提交这一关。" : "You can come back and submit this level later."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
