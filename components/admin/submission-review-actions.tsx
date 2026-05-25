"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface SubmissionReviewActionsProps {
  submissionId: string;
  userId: string;
  levelId: string;
}

export function SubmissionReviewActions({
  submissionId,
  userId,
  levelId,
}: SubmissionReviewActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const handleReview = async (action: "approve" | "reject") => {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          user_id: userId,
          level_id: levelId,
          action,
          notes,
        }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Review failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 pt-3 border-t">
      <Input
        placeholder="审核备注（可选）"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="flex-1"
      />
      <Button
        size="sm"
        variant="outline"
        className="text-green-600 border-green-600/30 hover:bg-green-600/10"
        onClick={() => handleReview("approve")}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <CheckCircle className="w-4 h-4 mr-1" />
        )}
        通过
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 border-red-600/30 hover:bg-red-600/10"
        onClick={() => handleReview("reject")}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XCircle className="w-4 h-4 mr-1" />
        )}
        拒绝
      </Button>
    </div>
  );
}
