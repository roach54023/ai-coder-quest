import { MetadataRoute } from "next";
import { getAllLevelIds } from "@/lib/content/levels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const levelIds = getAllLevelIds();

  const levelUrls: MetadataRoute.Sitemap = levelIds.map((levelId) => ({
    url: `${siteUrl}/zh/levels/${getChapterId(levelId)}/${levelId}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/zh/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/zh/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/zh/stories`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...levelUrls,
  ];
}
