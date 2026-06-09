import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type ContentLocale = 'en' | 'zh';

function getContentDir(locale: ContentLocale = 'en') {
  return path.join(process.cwd(), locale === 'zh' ? 'content/levels-zh' : 'content/levels-en');
}

export interface LevelContent {
  meta: {
    id: string;
    title: string;
    page_title: string;
    chapter: string;
    order: number;
    is_delivery: boolean;
    verification_type: string;
    verification_config: Record<string, unknown>;
    estimated_minutes: number;
    // delivery
    delivery_prompt?: string;
    // SEO fields
    seo_title?: string;
    seo_description?: string;
    keywords?: string[];
  };
  content: string;
}

export function getLevelContent(levelId: string, locale: ContentLocale = 'en'): LevelContent | null {
  try {
    const filePath = path.join(getContentDir(locale), `${levelId}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      meta: data as LevelContent['meta'],
      content,
    };
  } catch {
    return null;
  }
}

export function getAllLevelIds(locale: ContentLocale = 'en'): string[] {
  try {
    const files = fs.readdirSync(getContentDir(locale));
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''))
      .sort();
  } catch {
    return [];
  }
}
