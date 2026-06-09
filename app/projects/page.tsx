import Link from "next/link";
import { ArrowRight, BarChart3, Bot, CheckCircle2, CreditCard, ExternalLink, Mail, Newspaper, ShoppingBag, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "AI Coding Projects for Beginners",
  description:
    "Explore AI coding projects for beginners: SEO tools, AI copy generators, dashboards, content sites, and paid SaaS products you can build with vibe coding.",
  keywords: [
    "AI coding projects",
    "AI coding projects for beginners",
    "vibe coding projects",
    "AI app ideas",
    "beginner coding projects with AI",
    "SaaS project ideas",
  ],
  openGraph: {
    title: "AI Coding Projects for Beginners | VibeCamp",
    description:
      "Explore practical AI coding projects you can ship with vibe coding: tools, dashboards, content sites, and paid SaaS ideas.",
    url: `${siteUrl}/projects`,
    siteName: "VibeCamp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI coding projects for beginners by VibeCamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Coding Projects for Beginners | VibeCamp",
    description:
      "Beginner-friendly AI coding projects you can build, deploy, and turn into real products.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/projects`,
    languages: {
      en: `${siteUrl}/projects`,
      "zh-CN": `${siteUrl}/zh/projects`,
    },
  },
};

const projects = [
  {
    icon: Wrench,
    color: "#6366F1",
    tag: "SEO Tool",
    difficulty: "Beginner",
    difficultyColor: "#10B981",
    title: "Keyword Traffic Analysis Tool",
    desc: "Enter a keyword, analyze search intent and competition, then generate a visual report for content planning and SEO decisions.",
    stack: ["Next.js", "Tailwind", "API"],
    output: "Deployable SEO tool",
    chapterId: "chapter_2",
    levelId: "2-1",
  },
  {
    icon: Bot,
    color: "#8B5CF6",
    tag: "AI Product",
    difficulty: "Intermediate",
    difficultyColor: "#F59E0B",
    title: "AI Copy Generator",
    desc: "Generate product copy, social posts, landing-page text, and sales messages from a short product brief.",
    stack: ["Next.js", "AI API", "Supabase"],
    output: "Chargeable AI tool",
    chapterId: "chapter_3",
    levelId: "3-1",
  },
  {
    icon: Newspaper,
    color: "#0EA5E9",
    tag: "Content Site",
    difficulty: "Beginner",
    difficultyColor: "#10B981",
    title: "Niche News Aggregator",
    desc: "Collect updates from a niche, summarize them with AI, and publish an SEO-friendly content site that updates regularly.",
    stack: ["Next.js", "RSS", "OpenAI"],
    output: "Auto-updated content site",
    chapterId: "chapter_3",
    levelId: "3-2",
  },
  {
    icon: ShoppingBag,
    color: "#F97316",
    tag: "Commerce",
    difficulty: "Intermediate",
    difficultyColor: "#F59E0B",
    title: "Product Research SaaS",
    desc: "Analyze product links, competition, margin signals, review pain points, and buying opportunities for small sellers.",
    stack: ["Next.js", "Supabase", "Stripe"],
    output: "Paid SaaS product",
    chapterId: "chapter_4",
    levelId: "4-1",
  },
  {
    icon: BarChart3,
    color: "#10B981",
    tag: "Dashboard",
    difficulty: "Intermediate",
    difficultyColor: "#F59E0B",
    title: "Competitor Monitoring Dashboard",
    desc: "Track competitor pages, pricing, feature changes, and reviews, then send alerts when important changes happen.",
    stack: ["Next.js", "Supabase", "Cron"],
    output: "Subscription SaaS",
    chapterId: "chapter_4",
    levelId: "4-2",
  },
  {
    icon: CreditCard,
    color: "#EC4899",
    tag: "Full SaaS",
    difficulty: "Advanced",
    difficultyColor: "#EC4899",
    title: "AI Resume Optimization Assistant",
    desc: "Upload a resume, compare it with a job description, suggest keywords, improve structure, and generate an optimized version.",
    stack: ["Next.js", "AI API", "Stripe", "Supabase"],
    output: "Complete paid product",
    chapterId: "chapter_5",
    levelId: "5-1",
  },
];

const projectsJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Coding Projects for Beginners",
    description:
      "A collection of practical AI coding projects for beginners, including SEO tools, AI copy generators, dashboards, content sites, and paid SaaS ideas.",
    url: `${siteUrl}/projects`,
    inLanguage: "en",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI Coding Projects for Beginners",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      description: project.desc,
      url: `${siteUrl}/projects#${project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Vibe Coding Course",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Coding Projects",
        item: `${siteUrl}/projects`,
      },
    ],
  },
];

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="rounded-lg flex-shrink-0">
      <rect width="512" height="512" rx="115" fill="#6C47FF" />
      <path d="M 168 148 L 80 256 L 168 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 344 148 L 432 256 L 344 364" fill="none" stroke="white" strokeWidth="52" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="296" y1="136" x2="216" y2="376" stroke="white" strokeWidth="52" strokeLinecap="round" />
    </svg>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <JsonLd data={projectsJsonLd} />
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2"><Logo /><span className="font-bold text-base text-gray-900">VibeCamp</span></Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-900 transition-colors">What is Vibe Coding</Link>
            <Link href="/projects" className="text-gray-900 font-medium">AI Coding Projects</Link>
            <Link href="/#journey" className="hover:text-gray-900 transition-colors">Course Map</Link>
            <Link href="/stories" className="hover:text-gray-900 transition-colors">Student Stories</Link>
          </nav>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
            <a href="/register">Start free</a>
          </Button>
        </div>
      </header>

      <section className="pt-36 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-5 font-medium">AI coding projects</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-gray-900">
            AI Coding Projects for Beginners{" "}
            <br />
            <span className="text-indigo-600">You Can Actually Ship</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-xl mx-auto leading-relaxed">
            These AI coding projects are not toy exercises. Each one is designed to become a deployed tool, content site, dashboard, or paid SaaS product.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-20 px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <Link
                key={p.title}
                id={p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                href="/register?next=%2Fdashboard"
                className="group flex flex-col border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: p.color + "15", border: `1px solid ${p.color}20` }}>
                    <p.icon className="h-5 w-5" style={{ color: p.color }} />
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: p.difficultyColor + "12", color: p.difficultyColor }}>{p.difficulty}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: p.color + "10", color: p.color }}>{p.tag}</span>
                  </div>
                </div>
                <h2 className="font-bold text-gray-900 text-base mb-2 group-hover:text-indigo-600 transition-colors leading-snug">{p.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {p.stack.map((s) => <span key={s} className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">{s}</span>)}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" style={{ color: p.color }} />
                    <span className="text-xs text-gray-500">{p.output}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: p.color }}>
                    <span>Build it</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm mb-6">New to AI coding? Start with the course map, then use this library to choose your first real product.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-base px-10 py-4 font-semibold transition-colors">
                Start free <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/#journey" className="inline-flex items-center justify-center border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 rounded-full text-base px-10 py-4 font-medium transition-colors">
                View course map
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3"><Logo /><span className="font-bold text-gray-900">VibeCamp</span></div>
            <p className="text-sm text-gray-400">AI coding projects for beginners who want to ship real products.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/stories" className="hover:text-gray-900 transition-colors">Student Stories</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">What is Vibe Coding</Link>
            <Link href="https://github.com/roach54023/ai-coder-quest" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <ExternalLink className="h-3 w-3" />GitHub
            </Link>
            <Link href="mailto:roach54023@qq.com" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
              <Mail className="h-3 w-3" />Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
