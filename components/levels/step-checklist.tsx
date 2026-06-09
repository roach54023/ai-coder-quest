"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Check, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStepsByLevelId, type StepItem } from "@/lib/content/steps";

interface StepChecklistProps {
  levelId: string;
  isCompleted: boolean;
  /** Simple levels complete once every checklist item is done. */
  isSimpleLevel?: boolean;
}

export function StepChecklist({ levelId, isCompleted, isSimpleLevel = false }: StepChecklistProps) {
  const router = useRouter();
  const steps = getStepsByLevelId(levelId);
  const storageKey = `steps-${levelId}`;

  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted && steps) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedSteps(steps.map((s) => s.id));
    } else {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setCompletedSteps(JSON.parse(saved));
        } catch {}
      }
    }
    setMounted(true);
  }, [isCompleted, steps, storageKey]);

  useEffect(() => {
    if (mounted && !isCompleted) {
      localStorage.setItem(storageKey, JSON.stringify(completedSteps));
    }
  }, [completedSteps, storageKey, isCompleted, mounted]);

  // Auto-complete for simple levels
  const autoComplete = useCallback(async () => {
    if (!isSimpleLevel || completing || isCompleted || justCompleted) return;
    setCompleting(true);
    try {
      const res = await fetch("/api/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level_id: levelId }),
      });
      const data = await res.json();
      if (data.level_completed) {
        setJustCompleted(true);
        setTimeout(() => router.refresh(), 1500);
      }
    } catch {
      // Silently fail - user can retry
    } finally {
      setCompleting(false);
    }
  }, [isSimpleLevel, completing, isCompleted, justCompleted, levelId, router]);

  if (!steps || steps.length === 0) return null;

  const progress = steps.length > 0 ? (completedSteps.length / steps.length) * 100 : 0;
  const allDone = completedSteps.length === steps.length;

  const handleComplete = (step: StepItem) => {
    if (completedSteps.includes(step.id)) return;
    const newCompleted = [...completedSteps, step.id];
    setCompletedSteps(newCompleted);
    setFeedback(step.feedback);
    setTimeout(() => setFeedback(null), 2500);

    // If this was the last step and it's a simple level, auto-complete
    if (newCompleted.length === steps.length && isSimpleLevel) {
      setTimeout(() => autoComplete(), 800);
    }
  };

  if (!mounted) {
    return (
      <div className="mb-8 p-4 rounded-lg border bg-card animate-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-3" />
        <div className="h-2 w-full bg-muted rounded" />
      </div>
    );
  }

  return (
    <div className="mb-8 p-5 rounded-lg border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Checklist
        </h3>
        <span className="text-xs text-muted-foreground">
          {completedSteps.length}/{steps.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {steps.map((step, index) => {
          const isDone = completedSteps.includes(step.id);
          const isNext =
            !isDone &&
            index === steps.findIndex((s) => !completedSteps.includes(s.id));

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                isDone ? "opacity-60" : isNext ? "bg-primary/5" : ""
              }`}
            >
              {/* Checkbox circle */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isDone
                    ? "bg-green-500 border-green-500"
                    : isNext
                      ? "border-primary"
                      : "border-muted-foreground/30"
                }`}
              >
                {isDone && <Check className="w-3 h-3 text-white" />}
              </div>

              {/* Label */}
              <span
                className={`text-sm flex-1 ${
                  isDone ? "line-through text-muted-foreground" : ""
                }`}
              >
                {step.label}
              </span>

              {/* Action button */}
              {isNext && !isCompleted && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs px-2 text-green-600 hover:text-green-700 hover:bg-green-500/10"
                  onClick={() => handleComplete(step)}
                >
                  Done
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback toast */}
      {feedback && (
        <div className="mt-3 text-center animate-[fadeIn_0.3s_ease-out]">
          <span className="inline-block px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-600">
            {feedback}
          </span>
        </div>
      )}

      {/* Completion states */}
      {justCompleted && (
        <div className="mt-3 text-center animate-[fadeIn_0.3s_ease-out]">
          <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
            <PartyPopper className="w-4 h-4" />
            Level complete. Redirecting...
          </span>
        </div>
      )}
      {allDone && !isCompleted && !justCompleted && !isSimpleLevel && (
        <div className="mt-3 text-center">
          <span className="text-sm text-green-600 font-medium">
            All steps complete. You can submit verification now.
          </span>
        </div>
      )}
      {allDone && !isCompleted && !justCompleted && isSimpleLevel && completing && (
        <div className="mt-3 text-center">
          <span className="text-sm text-muted-foreground">
            Recording completion...
          </span>
        </div>
      )}
    </div>
  );
}
