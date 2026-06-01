/**
 * Level navigation helpers — 获取上一关/下一关信息
 */

// 按章节和关卡顺序排列的完整关卡列表
const LEVEL_ORDER: string[] = [
  // prologue
  "0-1", "0-2",
  // chapter_1
  "1-1", "1-2", "1-3", "1-4", "1-5",
  // chapter_2
  "2-1", "2-2", "2-3", "2-4", "2-5",
  // chapter_3
  "3-1", "3-2", "3-3", "3-4", "3-5",
  // chapter_4
  "4-1", "4-2", "4-3", "4-4", "4-5", "4-6",
  // chapter_5
  "5-1", "5-2", "5-3",
];

export interface LevelNavInfo {
  levelId: string;
  chapterId: string;
}

function getChapterId(levelId: string): string {
  const prefix = levelId.split("-")[0];
  const chapterMap: Record<string, string> = {
    "0": "prologue",
    "1": "chapter_1",
    "2": "chapter_2",
    "3": "chapter_3",
    "4": "chapter_4",
    "5": "chapter_5",
  };
  return chapterMap[prefix] || "prologue";
}

export function getNextLevel(currentLevelId: string): LevelNavInfo | null {
  const idx = LEVEL_ORDER.indexOf(currentLevelId);
  if (idx === -1 || idx === LEVEL_ORDER.length - 1) return null;
  const nextId = LEVEL_ORDER[idx + 1];
  return { levelId: nextId, chapterId: getChapterId(nextId) };
}

export function getPrevLevel(currentLevelId: string): LevelNavInfo | null {
  const idx = LEVEL_ORDER.indexOf(currentLevelId);
  if (idx <= 0) return null;
  const prevId = LEVEL_ORDER[idx - 1];
  return { levelId: prevId, chapterId: getChapterId(prevId) };
}

/**
 * 获取同章节的其他关卡（用于关卡页底部内链）
 * 排除当前关卡，最多返回 4 个
 */
export function getSiblingLevels(currentLevelId: string): LevelNavInfo[] {
  const currentChapter = getChapterId(currentLevelId);
  return LEVEL_ORDER
    .filter((id) => getChapterId(id) === currentChapter && id !== currentLevelId)
    .slice(0, 4)
    .map((id) => ({ levelId: id, chapterId: getChapterId(id) }));
}

/**
 * 获取相邻章节的第一关（用于跨章节推荐）
 */
export function getAdjacentChapterFirstLevel(currentLevelId: string): LevelNavInfo | null {
  const currentChapter = getChapterId(currentLevelId);
  const chapterOrder = ["prologue", "chapter_1", "chapter_2", "chapter_3", "chapter_4", "chapter_5"];
  const currentIdx = chapterOrder.indexOf(currentChapter);
  if (currentIdx === -1 || currentIdx >= chapterOrder.length - 1) return null;
  const nextChapter = chapterOrder[currentIdx + 1];
  const firstLevel = LEVEL_ORDER.find((id) => getChapterId(id) === nextChapter);
  if (!firstLevel) return null;
  return { levelId: firstLevel, chapterId: nextChapter };
}
