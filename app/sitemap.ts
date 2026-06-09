import { MetadataRoute } from "next";
import { getAllLevelIds } from "@/lib/content/levels";

import { siteUrl } from "@/lib/site-url";

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
  const englishLevelIds = getAllLevelIds("en");
  const chineseLevelIds = getAllLevelIds("zh");
  const lastModified = new Date("2026-06-04");

  const englishLevelUrls: MetadataRoute.Sitemap = englishLevelIds.map((levelId) => ({
    url: `${siteUrl}/levels/${getChapterId(levelId)}/${levelId}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: {
        en: `${siteUrl}/levels/${getChapterId(levelId)}/${levelId}`,
        "zh-CN": `${siteUrl}/zh/levels/${getChapterId(levelId)}/${levelId}`,
      },
    },
  }));

  const chineseLevelUrls: MetadataRoute.Sitemap = chineseLevelIds.map((levelId) => ({
    url: `${siteUrl}/zh/levels/${getChapterId(levelId)}/${levelId}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.75,
    alternates: {
      languages: {
        "zh-CN": `${siteUrl}/zh/levels/${getChapterId(levelId)}/${levelId}`,
        en: `${siteUrl}/levels/${getChapterId(levelId)}/${levelId}`,
      },
    },
  }));

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          "zh-CN": `${siteUrl}/zh`,
        },
      },
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${siteUrl}/about`,
          "zh-CN": `${siteUrl}/zh/about`,
        },
      },
    },
    {
      url: `${siteUrl}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${siteUrl}/projects`,
          "zh-CN": `${siteUrl}/zh/projects`,
        },
      },
    },
    {
      url: `${siteUrl}/stories`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          en: `${siteUrl}/stories`,
          "zh-CN": `${siteUrl}/zh/stories`,
        },
      },
    },
    {
      url: `${siteUrl}/zh`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: {
        languages: {
          "zh-CN": `${siteUrl}/zh`,
          en: `${siteUrl}/`,
        },
      },
    },
    {
      url: `${siteUrl}/zh/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "zh-CN": `${siteUrl}/zh/about`,
          en: `${siteUrl}/about`,
        },
      },
    },
    {
      url: `${siteUrl}/zh/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          "zh-CN": `${siteUrl}/zh/projects`,
          en: `${siteUrl}/projects`,
        },
      },
    },
    {
      url: `${siteUrl}/zh/stories`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "zh-CN": `${siteUrl}/zh/stories`,
          en: `${siteUrl}/stories`,
        },
      },
    },
    ...englishLevelUrls,
    ...chineseLevelUrls,
  ];
}
