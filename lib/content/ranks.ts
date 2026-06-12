export interface RankData {
  id: string;
  name: string;
  subtitle: string;
  /** 市场参考价值 */
  salary: string;
  /** 解锁所需最少 XP（XP 制） */
  min_xp: number;
  badge_color: string;
  badge_icon: string;
  order_index: number;
  /** 对应章节（仅用于 dashboard 章节完成徽章展示） */
  chapter_id?: string;
}

/**
 * 每个关卡对应的 XP 奖励
 * 关卡越靠后 XP 越高，体现难度递增
 */
export const LEVEL_XP: Record<string, number> = {
  // 序章
  "0-1": 50,
  "0-2": 100,
  // 第一章
  "1-1": 120,
  "1-2": 150,
  "1-3": 200,
  "1-4": 180,
  "1-5": 200,
  // 第二章
  "2-1": 200,
  "2-2": 250,
  "2-3": 200,
  "2-4": 300,
  "2-5": 250,
  // 第三章
  "3-1": 250,
  "3-2": 300,
  "3-3": 280,
  "3-4": 350,
  "3-5": 400,
  // 第四章
  "4-1": 350,
  "4-2": 400,
  "4-3": 450,
  "4-4": 500,
  "4-5": 550,
  "4-6": 600,
  // 第五章
  "5-1": 500,
  "5-2": 600,
  "5-3": 700,
  "5-4": 800,
};

/** 获取某关卡的 XP 奖励，未配置的关卡默认 100 */
export function getLevelXP(levelId: string): number {
  return LEVEL_XP[levelId] ?? 100;
}

/**
 * 段位定义：按累计 XP 解锁
 *
 * 设计原则：
 * - 用户可以从任意关开始（跳关入场）
 * - 段位 = 累计 XP 的函数，与完成顺序无关
 * - 高难度关卡 XP 更高，有基础的用户跳关也能快速晋升
 *
 * XP 总量参考（全部通关约 8,680 XP）：
 *   序章 150 | 第一章 850 | 第二章 1200 | 第三章 1580 | 第四章 2850 | 第五章 2600
 */
export const RANKS: RankData[] = [
  {
    id: "rank_0",
    name: "AI 新手",
    subtitle: "刚刚起步，万事俱备只欠行动",
    salary: "—",
    min_xp: 0,
    badge_color: "#6B7280",
    badge_icon: "🌱",
    order_index: 0,
  },
  {
    id: "rank_1",
    name: "AI 入门者",
    subtitle: "装好工具，跑通了第一个 AI 作品",
    salary: "¥3K",
    min_xp: 150,       // 完成序章 2 关
    badge_color: "#F97316",
    badge_icon: "🔧",
    order_index: 1,
    chapter_id: "prologue",
  },
  {
    id: "rank_2",
    name: "AI 建站者",
    subtitle: "能用 AI 做出静态网站并上线",
    salary: "¥5K",
    min_xp: 1000,      // 序章 + 第一章大部分
    badge_color: "#EF4444",
    badge_icon: "📄",
    order_index: 2,
    chapter_id: "chapter_1",
  },
  {
    id: "rank_3",
    name: "AI 前端工程师",
    subtitle: "掌握工程化开发，能做完整前端项目",
    salary: "¥15K",
    min_xp: 2200,      // 序章 + 第一章 + 第二章大部分
    badge_color: "#3B82F6",
    badge_icon: "💻",
    order_index: 3,
    chapter_id: "chapter_2",
  },
  {
    id: "rank_4",
    name: "AI 产品开发者",
    subtitle: "能做交互、能接 AI API、能出产品",
    salary: "¥20K",
    min_xp: 3800,      // 到第三章完成
    badge_color: "#8B5CF6",
    badge_icon: "⚡",
    order_index: 4,
    chapter_id: "chapter_3",
  },
  {
    id: "rank_5",
    name: "独立开发者",
    subtitle: "全栈能力，能独立交付完整 SaaS 产品",
    salary: "¥30K",
    min_xp: 6000,      // 到第四章完成
    badge_color: "#F59E0B",
    badge_icon: "🚀",
    order_index: 5,
    chapter_id: "chapter_4",
  },
  {
    id: "rank_6",
    name: "技术合伙人",
    subtitle: "能上线、能运营、能变现，独当一面",
    salary: "¥50K+",
    min_xp: 7500,      // 全部通关
    badge_color: "#EC4899",
    badge_icon: "👑",
    order_index: 6,
    chapter_id: "chapter_5",
  },
];

/**
 * 根据累计 XP 动态计算当前段位
 * 支持跳关入场：XP 越多段位越高，与完成顺序无关
 */
export function getRankByXP(totalXP: number): RankData {
  const sorted = [...RANKS].sort((a, b) => b.order_index - a.order_index);
  for (const rank of sorted) {
    if (totalXP >= rank.min_xp) {
      return rank;
    }
  }
  return RANKS[0];
}

/**
 * 兼容旧接口：根据已完成关卡数计算段位（转换为 XP 后调用 getRankByXP）
 * @deprecated 新代码请直接使用 getRankByXP
 */
export function getRankByCompletedCount(completedCount: number): RankData {
  // 用平均每关 ~300 XP 做粗略估算，保持向后兼容
  return getRankByXP(completedCount * 300);
}

/**
 * 获取下一个段位（用于显示"还差 N XP 升段"）
 */
export function getNextRank(currentRankId: string): RankData | null {
  const current = RANKS.find((r) => r.id === currentRankId);
  if (!current) return null;
  return RANKS.find((r) => r.order_index === current.order_index + 1) ?? null;
}

export function getRankById(id: string): RankData | undefined {
  return RANKS.find((r) => r.id === id);
}

export function getRankByChapter(chapterId: string): RankData | undefined {
  return RANKS.find((r) => r.chapter_id === chapterId);
}
