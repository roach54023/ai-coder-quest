/**
 * 统一埋点工具（GA4）
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * 发送自定义事件到 GA4 + Vercel Analytics
 */
export function trackEvent(eventName: string, params?: EventParams) {
  // GA4
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}

// ─── 具体业务事件 ────────────────────────────────────────────────────────────

/**
 * 用户进入某一关卡页面
 * @param levelId  关卡 ID，如 "1-2"
 * @param chapterId 章节 ID，如 "1"
 * @param levelTitle 关卡标题
 */
export function trackLevelView(levelId: string, chapterId: string, levelTitle: string) {
  trackEvent("level_view", {
    level_id: levelId,
    chapter_id: chapterId,
    level_title: levelTitle,
  });
}

/**
 * 用户完成某一步骤
 * @param levelId  关卡 ID
 * @param stepId   步骤 ID
 * @param stepLabel 步骤描述
 * @param stepIndex 步骤序号（从 1 开始）
 */
export function trackStepComplete(
  levelId: string,
  stepId: string,
  stepLabel: string,
  stepIndex: number
) {
  trackEvent("step_complete", {
    level_id: levelId,
    step_id: stepId,
    step_label: stepLabel,
    step_index: stepIndex,
  });
}

/**
 * 用户通关某一关卡
 * @param levelId  关卡 ID
 * @param chapterId 章节 ID
 * @param levelTitle 关卡标题
 */
export function trackLevelComplete(levelId: string, chapterId: string, levelTitle: string) {
  trackEvent("level_complete", {
    level_id: levelId,
    chapter_id: chapterId,
    level_title: levelTitle,
  });
}

/**
 * 用户跳过某一关卡
 * @param levelId  关卡 ID
 */
export function trackLevelSkip(levelId: string) {
  trackEvent("level_skip", { level_id: levelId });
}
