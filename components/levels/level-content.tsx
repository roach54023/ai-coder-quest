"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check, CheckCircle2, Circle, ArrowRight, Rocket, Users, Loader2, Link as LinkIcon, ExternalLink } from "lucide-react";
import { type StepItem } from "@/lib/content/steps";
import { trackLevelView, trackStepComplete, trackLevelComplete } from "@/lib/analytics";
import { WechatGroupButton } from "@/components/levels/wechat-group-button";

// --- Main component ---
interface LevelContentProps {
  content: string;
  levelId: string;
  chapterId: string;
  levelTitle: string;
  steps: StepItem[] | null;
  isSimpleLevel?: boolean;
  isDeliveryLevel?: boolean;
  deliveryPrompt?: string;
  isLevelCompleted?: boolean;
  showCompletionShare?: boolean;
  nextLevelUrl?: string | null;
  dashboardUrl?: string;
  locale?: "en" | "zh";
}

export function LevelContent({
  content,
  levelId,
  chapterId,
  levelTitle,
  steps,
  isSimpleLevel = false,
  isDeliveryLevel = false,
  deliveryPrompt,
  isLevelCompleted = false,
  showCompletionShare = false,
  nextLevelUrl = null,
  dashboardUrl = "/dashboard",
  locale = "en",
}: LevelContentProps) {
  const storageKey = `steps-${levelId}`;

  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [justCompletedStepId, setJustCompletedStepId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [deliveryUrl, setDeliveryUrl] = useState("");
  const [deliverySubmitting, setDeliverySubmitting] = useState(false);
  const [deliveryError, setDeliveryError] = useState("");

  useEffect(() => {
    if (isLevelCompleted && steps) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCompletedSteps(steps.map((s) => s.id));
    } else {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed: string[] = JSON.parse(saved);
          const validIds = steps ? steps.map((s) => s.id) : [];
          const filtered = parsed.filter((id) => validIds.includes(id));
          setCompletedSteps(filtered);
          if (filtered.length !== parsed.length) {
            localStorage.setItem(storageKey, JSON.stringify(filtered));
          }
        } catch {
          localStorage.removeItem(storageKey);
        }
      }
    }
    setMounted(true);
    trackLevelView(levelId, chapterId, levelTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLevelCompleted, steps, storageKey]);

  useEffect(() => {
    if (mounted && !isLevelCompleted) {
      localStorage.setItem(storageKey, JSON.stringify(completedSteps));
    }
  }, [completedSteps, storageKey, isLevelCompleted, mounted]);

  const autoComplete = useCallback(() => {
    if (!isSimpleLevel || completing || isLevelCompleted) return;
    setCompleting(true);
    trackLevelComplete(levelId, chapterId, levelTitle);

    if (locale !== "zh" || !showCompletionShare) {
      if (nextLevelUrl) {
        router.push(nextLevelUrl);
      } else {
        router.push(dashboardUrl);
      }
    }

    fetch("/api/progress/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level_id: levelId }),
    })
      .then(() => {
        if (locale === "zh" && showCompletionShare) {
          router.refresh();
          setCompleting(false);
        }
      })
      .catch(() => {
        if (locale === "zh" && showCompletionShare) {
          setCompleting(false);
        }
      });
  }, [isSimpleLevel, completing, isLevelCompleted, levelId, chapterId, levelTitle, locale, showCompletionShare, nextLevelUrl, router, dashboardUrl]);

  const handleDeliverySubmit = useCallback(async () => {
    if (!deliveryUrl.trim()) {
      setDeliveryError(locale === "zh" ? "请粘贴你的项目链接。" : "Paste your project URL.");
      return;
    }
    if (!deliveryUrl.startsWith("http")) {
      setDeliveryError(locale === "zh" ? "链接必须以 http:// 或 https:// 开头。" : "The URL must start with http:// or https://.");
      return;
    }
    setDeliveryError("");
    setDeliverySubmitting(true);

    try {
      const res = await fetch("/api/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level_id: levelId, url: deliveryUrl.trim() }),
      });
      const data = await res.json();
      if (data.level_completed || data.already_completed) {
        trackLevelComplete(levelId, chapterId, levelTitle);
        if (locale === "zh" && showCompletionShare) {
          router.refresh();
          setDeliverySubmitting(false);
        } else {
          if (nextLevelUrl) {
            router.push(nextLevelUrl);
          } else {
            router.push(dashboardUrl);
          }
        }
      } else {
        setDeliveryError(locale === "zh" ? "提交失败，请重试。" : "Submission failed. Please try again.");
        setDeliverySubmitting(false);
      }
    } catch {
      setDeliveryError(locale === "zh" ? "网络错误，请重试。" : "Network error. Please try again.");
      setDeliverySubmitting(false);
    }
  }, [deliveryUrl, levelId, chapterId, levelTitle, nextLevelUrl, router, dashboardUrl, locale, showCompletionShare]);

  const handleStepComplete = useCallback(
    (step: StepItem) => {
      if (completedSteps.includes(step.id)) return;
      const newCompleted = [...completedSteps, step.id];
      setCompletedSteps(newCompleted);
      setJustCompletedStepId(step.id);
      setTimeout(() => setJustCompletedStepId(null), 2800);

      const stepIndex = steps ? steps.findIndex((s) => s.id === step.id) + 1 : 0;
      trackStepComplete(levelId, step.id, step.label, stepIndex);
    },
    [completedSteps, steps, levelId]
  );

  const progress =
    steps && steps.length > 0
      ? Math.round((completedSteps.length / steps.length) * 100)
      : 0;

  // Split content: intro before "Action Steps" and tutorial sections after it.
  const stepsSectionRegex = locale === "zh" ? /^##\s+操作步骤.*$/m : /^##\s+Action Steps.*$/m;
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

  const tutorialSections = splitBySections(tutorialContent);
  const supportHref = "mailto:roach54023@qq.com?subject=VibeCamp%20course%20help";

  return (
    <div>
      {/* Progress bar */}
      {steps && steps.length > 0 && mounted && (
        <div className="sticky top-14 z-10 py-3 -mx-6 px-6 bg-white/95 backdrop-blur-sm border-b border-gray-100 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 shrink-0 tabular-nums">
              {completedSteps.length}/{steps.length} {locale === "zh" ? "步" : "steps"}
            </span>
          </div>
        </div>
      )}

      {/* Intro content */}
      {introContent && (
        <div className="prose-light mb-8">
          <MarkdownRenderer content={introContent} />
        </div>
      )}

      {/* Action steps woven into lesson content */}
      {steps && steps.length > 0 && mounted && tutorialSections.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-black text-gray-900 mb-6">
            {locale === "zh" ? "操作步骤" : "Action Steps"}
          </h2>

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
                className={`mb-10 ${isDone && !justDoneThis ? "opacity-60" : ""} transition-opacity duration-300`}
              >
                {/* Tutorial content */}
                <div className="prose-light">
                  <MarkdownRenderer content={section} />
                </div>

                {/* Step confirmation */}
                {step && !isLevelCompleted && (
                  <div className="mt-4">
                    {isDone ? (
                      <div
                        className={`flex items-center gap-3 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100 ${justDoneThis ? "animate-[stepDone_0.4s_ease-out]" : ""}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-sm text-emerald-700 font-medium">{step.label}</span>
                        {justDoneThis && (
                          <span className="ml-auto text-sm text-emerald-500 font-medium animate-[toastPop_2.5s_ease-out_forwards]">
                            {step.feedback}
                          </span>
                        )}
                      </div>
                    ) : isNext ? (
                      <button
                        onClick={() => handleStepComplete(step)}
                        className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                          <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                            {locale === "zh" ? "完成：" : "Done: "}{step.label}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="py-2.5 px-4 rounded-xl border border-gray-100 opacity-40 pointer-events-none">
                        <div className="flex items-center gap-2">
                          <Circle className="w-4 h-4 text-gray-300" />
                          <span className="text-xs text-gray-400">
                            {locale === "zh" ? `第 ${index + 1} 步：` : `Step ${index + 1}: `}{step.label}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Completed level badge */}
                {step && isLevelCompleted && (
                  <div className="mt-3 flex items-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm text-emerald-700">{step.label}</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Extra steps without matching tutorial sections */}
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
                        className={`flex items-center gap-3 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100 ${justDoneThis ? "animate-[stepDone_0.4s_ease-out]" : ""}`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-sm text-emerald-700 font-medium">{step.label}</span>
                        {justDoneThis && (
                          <span className="ml-auto text-sm text-emerald-500 font-medium animate-[toastPop_2.5s_ease-out_forwards]">
                            {step.feedback}
                          </span>
                        )}
                      </div>
                    ) : isNext && !isLevelCompleted ? (
                      <button
                        onClick={() => handleStepComplete(step)}
                        className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                          <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                            {locale === "zh" ? "完成：" : "Done: "}{step.label}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 py-2.5 px-4 rounded-xl border border-gray-100 opacity-40">
                        <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                        <span className="text-xs text-gray-400">{step.label}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* All steps done, non-simple level */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            !isSimpleLevel && (
              <div className="mt-6 px-5 py-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto mb-2" />
                <span className="text-sm text-emerald-700 font-semibold block">
                  {locale === "zh" ? "所有步骤已完成。请在下方提交验证。" : "All steps are complete. Submit your verification below."}
                </span>
              </div>
            )}

          {/* All steps done, delivery level */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            isSimpleLevel &&
            isDeliveryLevel && (
              <DeliverySubmitBox
                deliveryPrompt={deliveryPrompt}
                deliveryUrl={deliveryUrl}
                setDeliveryUrl={setDeliveryUrl}
                deliveryError={deliveryError}
                deliverySubmitting={deliverySubmitting}
                locale={locale}
                onSubmit={handleDeliverySubmit}
              />
            )}

          {/* All steps done, simple level */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            isSimpleLevel &&
            !isDeliveryLevel && (
              <div className="mt-8">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-8 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {locale === "zh" ? "准备好了。" : "All set."}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    {locale === "zh" ? "标记本关完成，然后进入下一关。" : "Mark this level complete and move to the next one."}
                  </p>
                  <button
                    onClick={() => autoComplete()}
                    disabled={completing}
                    className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-base font-bold transition-colors w-full max-w-sm mx-auto"
                  >
                    {completing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {locale === "zh" ? "继续中..." : "Moving on..."}
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        {locale === "zh" ? "完成本关" : "Complete level"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
        </div>
      ) : steps && steps.length > 0 && mounted ? (
        // Checklist-only mode.
        <div className="mb-6">
          <h2 className="text-xl font-black text-gray-900 mb-5">
            {locale === "zh" ? "检查清单" : "Checklist"}
          </h2>
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
                      className={`flex items-center gap-3 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-100 ${justDoneThis ? "animate-[stepDone_0.4s_ease-out]" : ""}`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-emerald-700 font-medium">{step.label}</span>
                      {justDoneThis && (
                        <span className="ml-auto text-sm text-emerald-500 font-medium animate-[toastPop_2.5s_ease-out_forwards]">
                          {step.feedback}
                        </span>
                      )}
                    </div>
                  ) : isNext && !isLevelCompleted ? (
                    <button
                      onClick={() => handleStepComplete(step)}
                      className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                        <span className="text-sm font-semibold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                          {locale === "zh" ? "完成：" : "Done: "}{step.label}
                        </span>
                      </div>
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 py-2.5 px-4 rounded-xl border border-gray-100 opacity-40">
                      <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                      <span className="text-xs text-gray-400">{step.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Delivery level URL submit box */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            isSimpleLevel &&
            isDeliveryLevel && (
              <DeliverySubmitBox
                deliveryPrompt={deliveryPrompt}
                deliveryUrl={deliveryUrl}
                setDeliveryUrl={setDeliveryUrl}
                deliveryError={deliveryError}
                deliverySubmitting={deliverySubmitting}
                locale={locale}
                onSubmit={handleDeliverySubmit}
              />
            )}

          {/* Simple level completion button */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            isSimpleLevel &&
            !isDeliveryLevel && (
              <div className="mt-6">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-8 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-xl font-black text-gray-900 mb-2">
                    {locale === "zh" ? "准备好了。" : "All set."}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">
                    {locale === "zh" ? "标记本关完成，然后进入下一关。" : "Mark this level complete and move to the next one."}
                  </p>
                  <button
                    onClick={() => autoComplete()}
                    disabled={completing}
                    className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full bg-gray-900 hover:bg-gray-700 disabled:opacity-60 text-white text-base font-bold transition-colors w-full max-w-sm mx-auto"
                  >
                    {completing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {locale === "zh" ? "继续中..." : "Moving on..."}
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        {locale === "zh" ? "完成本关" : "Complete level"}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          {/* Non-simple level submit hint */}
          {completedSteps.length === steps.length &&
            !isLevelCompleted &&
            !isSimpleLevel && (
              <div className="mt-6 px-5 py-5 rounded-2xl bg-emerald-50 border border-emerald-100 text-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-500 mx-auto mb-2" />
                <span className="text-sm text-emerald-700 font-semibold block">
                  {locale === "zh" ? "所有步骤已完成。请在下方提交验证。" : "All steps are complete. Submit your verification below."}
                </span>
              </div>
            )}
        </div>
      ) : (
        // No checklist; render the remaining lesson content directly.
        tutorialContent && (
          <div className="prose-light mb-8">
            <MarkdownRenderer content={tutorialContent} />
          </div>
        )
      )}

      {/* Pass criteria and troubleshooting sections */}
      {renderAfterSections(content, locale)}

      {/* Help link */}
      {mounted && !isLevelCompleted && (
        <div className="mt-8 px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 font-medium">{locale === "zh" ? "需要帮助？" : "Need help?"}</p>
            <p className="text-xs text-gray-400">
              {locale === "zh" ? "继续之前，可以先问同学、导师或你的 AI 助手。" : "Ask a classmate, mentor, or your AI assistant before moving on."}
            </p>
          </div>
          {locale === "zh" ? (
            <WechatGroupButton className="shrink-0" />
          ) : (
            <a
              href={supportHref}
              className="shrink-0 inline-flex items-center gap-1.5 h-8 px-4 rounded-full border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
            >
              <Users className="w-3 h-3" />
              Email support
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Split tutorial content into sections by ### headings.
 */
function splitBySections(content: string): string[] {
  if (!content.trim()) return [];

  const sections: string[] = [];
  const lines = content.split("\n");
  let currentSection: string[] = [];
  let foundFirstH3 = false;

  for (const line of lines) {
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
 * Extract and render pass criteria and troubleshooting sections.
 */
function renderAfterSections(content: string, locale: "en" | "zh") {
  const passConditionRegex = locale === "zh" ? /^##\s+通关条件.*$/m : /^##\s+Pass Criteria.*$/m;
  const match = content.match(passConditionRegex);

  if (!match || match.index === undefined) return null;

  const afterContent = content.slice(match.index).trim();
  if (!afterContent) return null;

  return (
    <div className="prose-light mb-8 mt-8 pt-6 border-t border-gray-100">
      <MarkdownRenderer content={afterContent} />
    </div>
  );
}

// --- Markdown renderer ---
function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          const codeText = String(children).replace(/\n$/, "");
          const isMultiline = codeText.includes("\n");

          if (match || isMultiline) {
            return (
              <CodeBlock language={match?.[1] ?? "text"}>
                {codeText}
              </CodeBlock>
            );
          }

          return (
            <code
              className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-800 font-mono text-[0.85em] border border-gray-200"
              {...props}
            >
              {children}
            </code>
          );
        },
        h2({ children }) {
          return (
            <h2 className="text-xl font-black text-gray-900 mt-10 mb-4 leading-tight">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="text-base font-bold text-gray-800 mt-7 mb-3 leading-snug">
              {children}
            </h3>
          );
        },
        p({ children }) {
          return (
            <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">
              {children}
            </p>
          );
        },
        ul({ children }) {
          return (
            <ul className="pl-5 mb-4 space-y-1.5 list-none">
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-600 text-[15px]">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return (
            <li className="text-gray-600 leading-relaxed text-[15px] flex items-start gap-2 before:content-['·'] before:text-gray-300 before:mt-0.5 before:shrink-0">
              <span>{children}</span>
            </li>
          );
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-indigo-200 pl-4 py-1 my-4 bg-indigo-50/50 rounded-r-lg">
              <div className="text-gray-600 text-[15px] leading-relaxed italic">
                {children}
              </div>
            </blockquote>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 transition-colors"
            >
              {children}
            </a>
          );
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-5 rounded-xl border border-gray-100">
              <table className="w-full text-sm border-collapse">{children}</table>
            </div>
          );
        },
        th({ children }) {
          return (
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50 border-b border-gray-100">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="px-4 py-2.5 text-gray-600 border-b border-gray-50 text-[14px]">
              {children}
            </td>
          );
        },
        strong({ children }) {
          return (
            <strong className="font-semibold text-gray-900">{children}</strong>
          );
        },
        hr() {
          return <hr className="border-gray-100 my-6" />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// --- Delivery URL submit box ---
function DeliverySubmitBox({
  deliveryPrompt,
  deliveryUrl,
  setDeliveryUrl,
  deliveryError,
  deliverySubmitting,
  locale,
  onSubmit,
}: {
  deliveryPrompt?: string;
  deliveryUrl: string;
  setDeliveryUrl: (v: string) => void;
  deliveryError: string;
  deliverySubmitting: boolean;
  locale: "en" | "zh";
  onSubmit: () => void;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-amber-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
          <LinkIcon className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-black text-gray-900">
            {locale === "zh" ? "提交你的项目" : "Submit your project"}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {locale === "zh" ? "粘贴项目链接，完成这一交付关卡。" : "Paste the project URL to complete this delivery level."}
          </p>
        </div>
      </div>

      <div className="px-6 py-5 space-y-4 bg-white">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {deliveryPrompt ?? (locale === "zh" ? "粘贴你的项目链接（https://...）" : "Paste your project URL (https://...)")}
          </label>
          <div className="flex gap-2">
            <input
              value={deliveryUrl}
              onChange={(e) => setDeliveryUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !deliverySubmitting && onSubmit()}
              placeholder="https://..."
              className="flex-1 h-11 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-50 transition-all"
            />
            {deliveryUrl.startsWith("http") && (
              <a
                href={deliveryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-200 hover:border-gray-300 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                title={locale === "zh" ? "预览链接" : "Preview link"}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          {deliveryError && (
            <p className="mt-2 text-xs text-red-500">{deliveryError}</p>
          )}
        </div>

        <button
          onClick={onSubmit}
          disabled={deliverySubmitting || !deliveryUrl.trim()}
          className="w-full h-12 rounded-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          {deliverySubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {locale === "zh" ? "提交中..." : "Submitting..."}
            </>
          ) : (
            <>
              <Rocket className="w-4 h-4" />
              {locale === "zh" ? "提交项目" : "Submit project"}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// --- Code block with copy button ---
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
    <div className="relative group max-w-full rounded-xl overflow-hidden my-5 border border-gray-100 shadow-sm">
      <button
        className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 h-7 w-7 flex items-center justify-center rounded-md bg-white/80 hover:bg-white border border-gray-200 shadow-sm"
        onClick={handleCopy}
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-gray-500" />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        wrapLongLines
        customStyle={{
          margin: 0,
          maxWidth: "100%",
          overflowX: "auto",
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
        codeTagProps={{
          style: {
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          },
        }}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
