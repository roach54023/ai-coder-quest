"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, XCircle, SkipForward } from "lucide-react";

interface SubmissionFormProps {
  levelId: string;
  verificationType: string;
  verificationConfig: Record<string, any>;
  nextLevelUrl?: string | null;
}

type SubmissionStatus = "idle" | "submitting" | "passed" | "failed";

export function SubmissionForm({
  levelId,
  verificationType,
  verificationConfig,
  nextLevelUrl,
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
        // 验证通过后短暂展示成功状态，然后刷新页面（会显示分享引导）
        setTimeout(() => {
          router.refresh();
        }, 1500);
      } else if (data.verification.passed === false) {
        setStatus("failed");
        setMessage(data.verification.message);
      }
    } catch {
      setStatus("failed");
      setMessage("提交失败，请重试");
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
          router.push("/dashboard");
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
    <div className="space-y-4 p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold">提交验证</h3>

      {needsText && (
        <div>
          <label className="text-sm text-muted-foreground">粘贴命令输出结果</label>
          <Input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="例如: v22.11.0"
            className="mt-1"
          />
        </div>
      )}

      {needsUrl && (
        <div>
          <label className="text-sm text-muted-foreground">URL 地址</label>
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="mt-1"
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={status === "submitting"}
        className="w-full"
        size="lg"
      >
        {status === "submitting" && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {status === "submitting" ? "验证中..." : "提交验证"}
      </Button>

      {status === "passed" && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}
      {status === "failed" && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
          <XCircle className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}

      {/* 暂时跳过 */}
      {status === "idle" && (
        <div className="pt-3 border-t border-muted/30">
          <button
            onClick={handleSkip}
            disabled={skipping}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {skipping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SkipForward className="w-4 h-4" />
            )}
            {skipping ? "跳过中..." : "暂时跳过，稍后再来"}
          </button>
          <p className="text-xs text-center text-muted-foreground/60 mt-1">
            跳过后可随时回来补交验证
          </p>
        </div>
      )}
    </div>
  );
}
