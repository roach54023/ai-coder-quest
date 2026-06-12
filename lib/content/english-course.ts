import { RANKS, type RankData } from "@/lib/content/ranks";

export const EN_CHAPTERS_DATA = [
  {
    id: "prologue",
    title: "Prologue",
    titleFull: "Prologue · Setup",
    subtitle: "Install an AI coding assistant and ship your first web page.",
    color: "#6366F1",
    levels: [
      { id: "0-1", title: "Install an AI coding assistant" },
      { id: "0-2", title: "Publish your first page", delivery: true },
    ],
  },
  {
    id: "chapter_1",
    title: "Chapter 1",
    titleFull: "Chapter 1 · First Website",
    subtitle: "Use prompts to build and publish a polished static website.",
    color: "#10B981",
    levels: [
      { id: "1-1", title: "Prompting fundamentals" },
      { id: "1-2", title: "Multi-page website" },
      { id: "1-3", title: "Visual polish" },
      { id: "1-4", title: "Deploy the site", delivery: true },
      { id: "1-5", title: "Search, maps, and sharing" },
    ],
  },
  {
    id: "chapter_2",
    title: "Chapter 2",
    titleFull: "Chapter 2 · Professional Workflow",
    subtitle: "Move into React, reusable components, GitHub, Vercel, SEO, and performance.",
    color: "#F59E0B",
    levels: [
      { id: "2-1", title: "React project setup" },
      { id: "2-2", title: "Portfolio pages" },
      { id: "2-3", title: "SEO basics" },
      { id: "2-4", title: "Performance optimization" },
      { id: "2-5", title: "Deploy version two", delivery: true },
    ],
  },
  {
    id: "chapter_3",
    title: "Chapter 3",
    titleFull: "Chapter 3 · Interaction and UX",
    subtitle: "Add dark mode, live search, forms, and responsive polish.",
    color: "#EC4899",
    levels: [
      { id: "3-1", title: "Dark mode" },
      { id: "3-2", title: "Live search" },
      { id: "3-3", title: "Contact form" },
      { id: "3-4", title: "Responsive layout" },
      { id: "3-5", title: "Deploy version three", delivery: true },
    ],
  },
  {
    id: "chapter_4",
    title: "Chapter 4",
    titleFull: "Chapter 4 · Full Stack",
    subtitle: "Build API routes, database-backed features, admin screens, and analytics.",
    color: "#0EA5E9",
    levels: [
      { id: "4-1", title: "API routes" },
      { id: "4-2", title: "Database basics" },
      { id: "4-3", title: "Admin dashboard" },
      { id: "4-4", title: "Analytics basics" },
      { id: "4-5", title: "Deploy version four", delivery: true },
      { id: "4-6", title: "AI feature integration" },
    ],
  },
  {
    id: "chapter_5",
    title: "Chapter 5",
    titleFull: "Chapter 5 · Launchable Product",
    subtitle: "Add authentication, AI, payments, and production launch checks.",
    color: "#F97316",
    levels: [
      { id: "5-1", title: "User login" },
      { id: "5-2", title: "AI assistant" },
      { id: "5-3", title: "Stripe payments" },
      { id: "5-4", title: "Final deployment", delivery: true },
    ],
  },
];

export const EN_LEVEL_TITLES: Record<string, string> = Object.fromEntries(
  EN_CHAPTERS_DATA.flatMap((chapter) => chapter.levels.map((level) => [level.id, level.title]))
);

const EN_RANK_COPY: Record<string, Pick<RankData, "name" | "subtitle" | "salary">> = {
  rank_0: {
    name: "AI Beginner",
    subtitle: "Just getting started and ready to build.",
    salary: "-",
  },
  rank_1: {
    name: "AI Starter",
    subtitle: "Tools installed, first AI-built project shipped.",
    salary: "$ entry",
  },
  rank_2: {
    name: "AI Website Builder",
    subtitle: "Can build and publish static websites with AI.",
    salary: "$ junior",
  },
  rank_3: {
    name: "AI Frontend Builder",
    subtitle: "Can work with React projects and frontend workflows.",
    salary: "$ frontend",
  },
  rank_4: {
    name: "AI Product Builder",
    subtitle: "Can add interactions, APIs, and product features.",
    salary: "$ product",
  },
  rank_5: {
    name: "Indie Builder",
    subtitle: "Can deliver a full-stack SaaS-style product.",
    salary: "$ full stack",
  },
  rank_6: {
    name: "Technical Co-founder",
    subtitle: "Can launch, operate, and monetize a product.",
    salary: "$ senior+",
  },
};

export function toEnglishRank(rank: RankData): RankData {
  return {
    ...rank,
    ...(EN_RANK_COPY[rank.id] ?? {}),
  };
}

export const EN_RANKS = RANKS.map(toEnglishRank);
