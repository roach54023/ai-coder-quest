import fs from 'fs';
import path from 'path';

const CHAPTERS_DIR = path.join(process.cwd(), 'content/chapters');

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

export function getChapterMeta(chapterId: string): ChapterMeta | null {
  try {
    const filePath = path.join(CHAPTERS_DIR, `${chapterId}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export function getAllChapters(): ChapterMeta[] {
  try {
    const files = fs.readdirSync(CHAPTERS_DIR);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => {
        const content = fs.readFileSync(path.join(CHAPTERS_DIR, f), 'utf-8');
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
