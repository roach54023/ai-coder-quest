"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check, CheckCircle2, Circle, ArrowRight, Rocket, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { type StepItem } from "@/lib/content/steps";

// --- Main component ---
interface LevelContentProps {
  content: string;
  levelId: string;
  steps: StepItem[] | null;
  isSimpleLevel?: boolean;
  isLevelCompleted?: boolean;
  nextLevelUrl?: string | null;
}

export function LevelContent({
  content,
  levelId,
  steps,
  isSimpleLevel = false,
  isLevelCompleted = false,
  nextLevelUrl = null,
}: LevelContentProps) {
  const storageKey = `steps-${levelId}`;

  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [justCompletedStepId, setJustCompletedStepId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    if (isLevelCompleted && steps) {
      setCompletedSteps(steps.map((s) => s.id));
    } else {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed: string[] = JSON.parse(saved);
          // Filter out any stale step IDs that no longer exist in current steps
          const validIds = steps ? steps.map((s) => s.id) : [];
          const filtered = parsed.filter((id) => validIds.includes(id));
          setCompletedSteps(filtered);
          // Clean up localStorage if stale entries were removed
          if (filtered.length !== parsed.length) {
            localStorage.setItem(storageKey, JSON.stringify(filtered));
          }
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
    }
    setMounted(true);
  }, [isLevelCompleted, steps, storageKey]);

  useEffect(() => {
    if (mounted && !isLevelCompleted) {
      localStorage.setItem(storageKey, JSON.stringify(completedSteps));
    }
  }, [completedSteps, storageKey, isLevelCompleted, mounted]);

  // Complete level via API — one click: loading → toast → navigate
  const autoComplete = useCallback(async () => {
    if (!isSimpleLevel || completing || isLevelCompleted) return;
    setCompleting(true);
    try {
      const res = await fetch("/api/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level_id: levelId }),
      });
      const data = await res.json();
      if (data.level_completed) {
        toast.success("通关成功！");
        // Navigate to next level or dashboard
        if (nextLevelUrl) {
          router.push(nextLevelUrl);
        } else {
          router.push("/dashboard");
        }
      } else {
        toast.error("通关失败，请重试");
        setCompleting(false);
      }
    } catch {
      toast.error("网络错误，请重试");
      setCompleting(false);
    }
  }, [isSimpleLevel, completing, isLevelCompleted, levelId, nextLevelUrl, router]);

  const handleStepComplete = useCallback(
    (step: StepItem) => {
      if (completedSteps.includes(step.id)) return;
      const newCompleted = [...completedSteps, step.id];
      setCompletedSteps(newCompleted);
      setJustCompletedStepId(step.id);
      setTimeout(() => setJustCompletedStepId(null), 2800);

      // If last step completed → scroll to the completion button (user clicks manually)
      if (steps && newCompleted.length === steps.length) {
        // Don't auto-complete; let user see the big button and click it
      }
    },
    [completedSteps, steps, isSimpleLevel, autoComplete]
  );

  const progress =
    steps && steps.length > 0
      ? Math.round((completedSteps.length / steps.length) * 100)
      : 0;

  // Split content: intro (before "## 操作步骤") and tutorial sections (after it)
  const stepsSectionRegex = /^##\s+操作步骤.*$/m;
  const match = content.match(stepsSectionRegex);
  let introContent: string;
  let tutorialContent: string;

  if (match && match.index !== undefined) {
    introContent = content.slice(0, match.index).trim();
    tutorialContent = content.slice(match.index + match[0].length).trim();
  } else {
    introContent = content;
    tutorialContent = "";
  }

  // Split tutorial content into sections by ### headings
  const tutorialSections = splitBySections(tutorialContent);

  return (
    <div>
      {/* Sticky progress bar */}
      {steps && steps.length > 0 && mounted && (
        <div className="sticky top-0 z-10 py-3 -mx-4 px-4 bg-background/90 backdrop-blur-sm border-b mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground shrink-0">
              {completedSteps.length}/{steps.length} 步
            </span>
          </div>
        </div>
      )}

      {/* Intro content */}
      {introContent && (
        <div className="prose prose-invert max-w-none mb-6">
          <MarkdownRenderer content={introContent} />
        </div>
      )}

      {/* Tutorial with interleaved step confirmations */}
      {steps && steps.length > 0 && mounted && tutorialSections.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">操作步骤</h2>

          {tutorialSections.map((section, index) => {
            const step = steps[index];
            const isDone = step ? completedSteps.includes(step.id) : false;
            const isNext = step
              ? !isDone && index === steps.findIndex((s) => !completedSteps.includes(s.id))
              : false;
            const justDoneThis = step ? justCompletedStepId === step.id : false;

            return (
              <div
                key={index}
                className={`mb-8 ${isDone && !justDoneThis ? "opacity-70" : ""} transition-opacity duration-300`}
              >
                {/* Tutorial section content */}
                <div className="prose prose-invert max-w-none">
                  <MarkdownRenderer content={section} />
                </div>

                {/* Step confirmation */}
                {step && !isLevelCompleted && (
                  <div className="mt-4">
                    {isDone ? (
                      // Completed state
                      <div
                        className={`flex items-center gap-3 py-2.5 px-4 rounded-lg bg-green-500/10 border border-green-500/20 ${justDoneThis ? "animate-[stepDone_0.4s_ease-out]" : ""}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm text-green-600">{step.label}</span>
                        {justDoneThis && (
                          <span className="ml-auto text-sm text-green-500 font-medium animate-[toastPop_2.5s_ease-out_forwards]">
                            {step.feedback}
                          </span>
                        )}
                      </div>
                    ) : isNext ? (
                      // Active step — clickable button
                      <button
                        onClick={() => handleStepComplete(step)}
                        className="w-full py-3.5 px-4 rounded-lg border-2 border-dashed border-green-500/50 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/70 transition-all duration-200 active:scale-[0.97] cursor-pointer group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600/50 group-hover:text-green-500 transition-colors" />
                          <span className="text-sm font-semibold text-green-600/80 group-hover:text-green-500 transition-colors">
                            ✅ 我已完成：{step.label}
                          </span>
                        </div>
                      </button>
                    ) : (
                      // Future step — locked
                      <div className="py-2 px-4 rounded-lg border border-muted/20 opacity-40 pointer-events-none">
                        <div className="flex items-center gap-2">
                          <Circle className="w-4 h-4 text-muted-foreground/40" />
                          <span className="text-xs text-muted-foreground">
                            第 {index + 1} 步：{step.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Already completed level — just show done badge */}
                {step && isLevelCompleted && (
                  <div className="mt-3 flex items-center gap-2 py-2 px-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-sm text-green-600">{step.label}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Remaining steps not covered by tutorial sections */}
          {steps.length > tutorialSections.length && (
            <div className="space-y-2 mb-4">
              {steps.slice(tutorialSections.length).map((step, idx) => {
                const realIndex = tutorialSections.length + idx;
                const isDone = completedSteps.includes(step.id);
                const isNext =
                  !isDone &&
                  realIndex === steps.findIndex((s) => !completedSteps.includes(s.id));
                const justDoneThis = justCompletedStepId === step.id;

                return (
                  <div key={step.id}>
                    {isDone ? (
                      <div
                        className={`flex items-center gap-3 py-2.5 px-4 rounded-lg bg-green-500/10 border border-green-500/20 ${justDoneThis ? "animate-[stepDone_0.4s_ease-out]" : ""}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm text-green-600">{step.label}</span>
                        {justDoneThis && (
                          <span className="ml-auto text-sm text-green-500 font-medium animate-[toastPop_2.5s_ease-out_forwards]">
                            {step.feedback}
                          </span>
                        )}
                      </div>
                    ) : isNext && !isLevelCompleted ? (
                      <button
                        onClick={() => handleStepComplete(step)}
                        className="w-full py-3.5 px-4 rounded-lg border-2 border-dashed border-green-500/50 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/70 transition-all duration-200 active:scale-[0.97] cursor-pointer group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600/50 group-hover:text-green-500 transition-colors" />
                          <span className="text-sm font-semibold text-green-600/80 group-hover:text-green-500 transition-colors">
                            ✅ 我已完成：{step.label}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 py-2 px-4 rounded-lg border border-muted/20 opacity-40">
                        <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                        <span className="text-xs text-muted-foreground">{step.label}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* All steps done but not yet auto-completed (non-simple levels) */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            !isSimpleLevel && (
              <div className="mt-6 text-center p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <span className="text-sm text-green-600 font-medium block">
                  ✅ 全部步骤完成！请在下方提交验证
                </span>
              </div>
            )}

          {/* All steps done for simple level — one-click complete & navigate */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            isSimpleLevel && (
              <div className="mt-8 text-center">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/15 border border-green-500/30 p-8">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-500 mb-2">全部完成！</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    点击下方按钮通关，自动进入下一关
                  </p>

                  <Button
                    size="lg"
                    onClick={() => autoComplete()}
                    disabled={completing}
                    className="w-full max-w-sm mx-auto h-14 text-lg gap-2 font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-shadow"
                  >
                    {completing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        正在验证…
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        通关！进入下一关
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
        </div>
      ) : steps && steps.length > 0 && mounted ? (
        // Fallback: no tutorial sections, show steps as standalone checklist
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">操作清单</h2>
          <div className="space-y-2 mb-4">
            {steps.map((step, index) => {
              const isDone = completedSteps.includes(step.id);
              const isNext =
                !isDone &&
                index === steps.findIndex((s) => !completedSteps.includes(s.id));
              const justDoneThis = justCompletedStepId === step.id;

              return (
                <div key={step.id}>
                  {isDone ? (
                    <div
                      className={`flex items-center gap-3 py-2.5 px-4 rounded-lg bg-green-500/10 border border-green-500/20 ${justDoneThis ? "animate-[stepDone_0.4s_ease-out]" : ""}`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-sm text-green-600">{step.label}</span>
                      {justDoneThis && (
                        <span className="ml-auto text-sm text-green-500 font-medium animate-[toastPop_2.5s_ease-out_forwards]">
                          {step.feedback}
                        </span>
                      )}
                    </div>
                  ) : isNext && !isLevelCompleted ? (
                    <button
                      onClick={() => handleStepComplete(step)}
                      className="w-full py-3.5 px-4 rounded-lg border-2 border-dashed border-green-500/50 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/70 transition-all duration-200 active:scale-[0.97] cursor-pointer group"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600/50 group-hover:text-green-500 transition-colors" />
                        <span className="text-sm font-semibold text-green-600/80 group-hover:text-green-500 transition-colors">
                          ✅ 我已完成：{step.label}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 py-2 px-4 rounded-lg border border-muted/20 opacity-40">
                      <Circle className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                      <span className="text-xs text-muted-foreground">{step.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* All steps done for simple level — one-click complete & navigate */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            isSimpleLevel && (
              <div className="mt-6 text-center">
                <div className="rounded-2xl bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-teal-500/15 border border-green-500/30 p-8">
                  <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-green-500 mb-2">全部完成！</h3>
                  <p className="text-sm text-muted-foreground mb-5">点击下方按钮通关，自动进入下一关</p>
                  <Button
                    size="lg"
                    onClick={() => autoComplete()}
                    disabled={completing}
                    className="w-full max-w-sm mx-auto h-14 text-lg gap-2 font-bold shadow-lg shadow-green-500/20"
                  >
                    {completing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        正在验证…
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        通关！进入下一关
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

          {/* Non-simple levels: prompt to submit below */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            !isSimpleLevel && (
              <div className="mt-6 text-center p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <span className="text-sm text-green-600 font-medium block">
                  ✅ 全部完成！请在下方提交验证
                </span>
              </div>
            )}
        </div>
      ) : (
        // No steps, just render remaining content as tutorial
        tutorialContent && (
          <div className="prose prose-invert max-w-none mb-8">
            <MarkdownRenderer content={tutorialContent} />
          </div>
        )
      )}

      {/* After tutorial: "通关条件" and "卡住了？" sections */}
      {renderAfterSections(content)}

      {/* 交流群入口 — 始终可见 */}
      {mounted && !isLevelCompleted && (
        <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-muted/50 flex items-center gap-3">
          <Users className="w-5 h-5 text-muted-foreground shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              遇到问题？加入交流群和同学们一起讨论
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("https://REPLACE_WITH_GROUP_LINK", "_blank")}
            className="shrink-0 gap-1.5 text-xs"
          >
            <Users className="w-3.5 h-3.5" />
            加入交流群
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * Split tutorial content into sections by ### headings.
 * Stops when encountering a ## heading (next major section like "通关条件").
 */
function splitBySections(content: string): string[] {
  if (!content.trim()) return [];

  const sections: string[] = [];
  const lines = content.split("\n");
  let currentSection: string[] = [];
  let foundFirstH3 = false;

  for (const line of lines) {
    // Stop at ## headings (major sections like "通关条件", "本章交付物")
    if (foundFirstH3 && line.match(/^##\s+/) && !line.match(/^###/)) {
      break;
    }
    if (line.match(/^###\s+/)) {
      if (foundFirstH3 && currentSection.length > 0) {
        sections.push(currentSection.join("\n").trim());
      }
      currentSection = [line];
      foundFirstH3 = true;
    } else if (foundFirstH3) {
      currentSection.push(line);
    }
  }

  if (currentSection.length > 0) {
    sections.push(currentSection.join("\n").trim());
  }

  return sections;
}

/**
 * Extract and render "通关条件" and "卡住了？" sections from the full content
 */
function renderAfterSections(content: string) {
  const passConditionRegex = /^##\s+通关条件.*$/m;
  const match = content.match(passConditionRegex);

  if (!match || match.index === undefined) return null;

  const afterContent = content.slice(match.index).trim();

  if (!afterContent) return null;

  return (
    <div className="prose prose-invert max-w-none mb-8 mt-8 pt-6 border-t border-muted/20">
      <MarkdownRenderer content={afterContent} />
    </div>
  );
}

// --- Shared Markdown renderer ---
function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const isInline = !match;

          if (!isInline && match) {
            return (
              <CodeBlock language={match[1]}>
                {String(children).replace(/\n$/, "")}
              </CodeBlock>
            );
          }

          return (
            <code
              className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm"
              {...props}
            >
              {children}
            </code>
          );
        },
        h2({ children }) {
          return <h2 className="text-xl font-bold mt-8 mb-4">{children}</h2>;
        },
        h3({ children }) {
          return <h3 className="text-lg font-semibold mt-6 mb-3">{children}</h3>;
        },
        p({ children }) {
          return <p className="mb-4 leading-relaxed">{children}</p>;
        },
        ul({ children }) {
          return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
        },
        ol({ children }) {
          return <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>;
        },
        li({ children }) {
          return <li className="leading-relaxed">{children}</li>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground my-4">
              {children}
            </blockquote>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          );
        },
        th({ children }) {
          return <th className="border border-muted px-3 py-2 text-left font-semibold bg-muted/30">{children}</th>;
        },
        td({ children }) {
          return <td className="border border-muted px-3 py-2">{children}</td>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// --- Code block with copy ---
function CodeBlock({
  language,
  children,
}: {
  language: string;
  children: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden my-4">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-8 w-8"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: "0.5rem" }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
