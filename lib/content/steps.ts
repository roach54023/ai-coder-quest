import type { ContentLocale } from "./levels";
import type { StepItem } from "./steps-en";
import { getStepsByLevelId as getEnglishStepsByLevelId } from "./steps-en";
import { getStepsByLevelId as getChineseStepsByLevelId } from "./steps-zh";

export type { StepItem };

export function getStepsByLevelId(
  levelId: string,
  locale: ContentLocale = "en"
): StepItem[] | null {
  return locale === "zh"
    ? getChineseStepsByLevelId(levelId)
    : getEnglishStepsByLevelId(levelId);
}
