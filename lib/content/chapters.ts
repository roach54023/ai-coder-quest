import fs from 'fs';
import path from 'path';
import type { ContentLocale } from './levels';

function getChaptersDir(locale: ContentLocale = 'en') {
  return path.join(process.cwd(), locale === 'zh' ? 'content/chapters-zh' : 'content/chapters-en');
}

export interface ChapterMeta {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  rank_unlocked: {
    id: string;
    name: string;
    subtitle: string;
    salary: string;
  };
  levels: string[];
  delivery_level: string;
  estimated_total_minutes: number;
  completion_message: string;
}

export function getChapterMeta(chapterId: string, locale: ContentLocale = 'en'): ChapterMeta | null {
  try {
    const filePath = path.join(getChaptersDir(locale), `${chapterId}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function getAllChapters(locale: ContentLocale = 'en'): ChapterMeta[] {
  try {
    const chaptersDir = getChaptersDir(locale);
    const files = fs.readdirSync(chaptersDir);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => {
        const content = fs.readFileSync(path.join(chaptersDir, f), 'utf-8');
        return JSON.parse(content);
      })
      .sort((a, b) => {
        const order = ['prologue', 'chapter_1', 'chapter_2', 'chapter_3', 'chapter_4', 'chapter_5', 'hidden'];
        return order.indexOf(a.id) - order.indexOf(b.id);
      });
  } catch {
    return [];
  }
}
