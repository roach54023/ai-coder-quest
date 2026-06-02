import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content/levels');

export interface LevelContent {
  meta: {
    id: string;
    title: string;
    page_title: string;
    chapter: string;
    order: number;
    is_delivery: boolean;
    verification_type: string;
    verification_config: Record<string, any>;
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

export function getLevelContent(levelId: string): LevelContent | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${levelId}.mdx`);
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

export function getAllLevelIds(): string[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => f.replace('.mdx', ''))
      .sort();
  } catch {
    return [];
  }
}
