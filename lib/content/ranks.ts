export interface RankData {
  id: string;
  name: string;
  subtitle: string;
  salary: string;
  chapter_id: string;
  badge_color: string;
  badge_icon: string;
  order_index: number;
}

export const RANKS: RankData[] = [
  {
    id: 'rank_0',
    name: 'IT文盲',
    subtitle: '连终端都没打开过',
    salary: '¥0',
    chapter_id: 'prologue',
    badge_color: '#9CA3AF',
    badge_icon: 'terminal-off',
    order_index: 0,
  },
  {
    id: 'rank_1',
    name: '会装软件的普通人',
    subtitle: '至少不用找人帮忙了',
    salary: '¥3K/月',
    chapter_id: 'chapter_1',
    badge_color: '#60A5FA',
    badge_icon: 'download',
    order_index: 1,
  },
  {
    id: 'rank_2',
    name: '能出活的实习生',
    subtitle: '老板，我做了个网页',
    salary: '¥5K/月',
    chapter_id: 'chapter_2',
    badge_color: '#34D399',
    badge_icon: 'code',
    order_index: 2,
  },
  {
    id: 'rank_3',
    name: '不写代码的程序员',
    subtitle: '我不写代码，AI替我写',
    salary: '¥15K/月',
    chapter_id: 'chapter_3',
    badge_color: '#A78BFA',
    badge_icon: 'sparkles',
    order_index: 3,
  },
  {
    id: 'rank_4',
    name: '全干工程师',
    subtitle: '前后端数据库都能搞',
    salary: '¥30K/月',
    chapter_id: 'chapter_4',
    badge_color: '#F59E0B',
    badge_icon: 'layers',
    order_index: 4,
  },
  {
    id: 'rank_5',
    name: '独立开发者',
    subtitle: '我的网站上线了，用户来了',
    salary: '¥50K/月',
    chapter_id: 'chapter_5',
    badge_color: '#EF4444',
    badge_icon: 'rocket',
    order_index: 5,
  },
  {
    id: 'rank_hidden',
    name: '技术合伙人',
    subtitle: '要不要一起创业？',
    salary: '¥∞',
    chapter_id: 'hidden',
    badge_color: '#000000',
    badge_icon: 'crown',
    order_index: 6,
  },
];

export function getRankById(id: string): RankData | undefined {
  return RANKS.find((r) => r.id === id);
}

export function getRankByChapter(chapterId: string): RankData | undefined {
  return RANKS.find((r) => r.chapter_id === chapterId);
}
