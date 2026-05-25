"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScreenshotUpload } from "./screenshot-upload";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

interface SubmissionFormProps {
  levelId: string;
  verificationType: string;
  verificationConfig: Record<string, any>;
}

type SubmissionStatus = "idle" | "submitting" | "passed" | "failed" | "pending_review";

export function SubmissionForm({
  levelId,
  verificationType,
  verificationConfig,
}: SubmissionFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [message, setMessage] = useState("");
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [screenshots, setScreenshots] = useState<File[]>([]);

  const handleSubmit = async () => {
    setStatus("submitting");

    const formData = new FormData();
    formData.append("level_id", levelId);
    formData.append("type", verificationType);

    if (textInput) formData.append("text_content", textInput);
    if (urlInput) formData.append("url_content", urlInput);
    screenshots.forEach((file) => formData.append("screenshots", file));

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.verification.passed === true) {
        setStatus("passed");
        setMessage(data.verification.message);
        if (data.rank_unlocked) {
          setTimeout(() => {
            router.push(`/share/${data.rank_unlocked.id}`);
          }, 2000);
        } else {
          setTimeout(() => {
            router.refresh();
          }, 1500);
        }
      } else if (data.verification.passed === false) {
        setStatus("failed");
        setMessage(data.verification.message);
      } else {
        setStatus("pending_review");
        setMessage(data.verification.message);
      }
    } catch {
      setStatus("failed");
      setMessage("提交失败，请重试");
    }
  };

  const needsText = verificationType === "regex" || verificationType === "composite";
  const needsUrl =
    verificationType === "url_check" ||
    verificationType === "github_url" ||
    verificationType === "composite";
  const needsScreenshot =
    verificationType === "screenshot" || verificationType === "composite";

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

      {needsScreenshot && (
        <ScreenshotUpload
          files={screenshots}
          onChange={setScreenshots}
          maxFiles={3}
        />
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
      {status === "pending_review" && (
        <div className="flex items-center gap-2 text-amber-600 bg-amber-50 dark:bg-amber-950 p-3 rounded-lg">
          <Clock className="w-5 h-5" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
