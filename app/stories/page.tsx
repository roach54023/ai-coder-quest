import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ExternalLink, Mail, Star, TrendingUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Vibe Coding Examples: Beginner Student Stories",
  description:
    "Real vibe coding examples from beginners who built tools, websites, dashboards, and SaaS products. These vibe coding examples show what students shipped with AI coding in 3–5 weeks.",
  keywords: [
    "vibe coding examples",
    "beginner AI coding stories",
    "vibe coding projects examples",
    "AI coding beginner results",
    "learn AI coding results",
  ],
  openGraph: {
    title: "Vibe Coding Examples: Beginner Student Stories | VibeCamp",
    description:
      "Real vibe coding examples from beginners who built tools, websites, dashboards, and SaaS products with AI coding in 3–5 weeks.",
    url: `${siteUrl}/stories`,
    siteName: "VibeCamp",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vibe coding examples from beginner students at VibeCamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Coding Examples: Beginner Student Stories | VibeCamp",
    description:
      "Real vibe coding examples from beginners who shipped tools, websites, and SaaS products in 3–5 weeks.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/stories`,
    languages: {
      en: `${siteUrl}/stories`,
      "zh-CN": `${siteUrl}/zh/stories`,
    },
  },
};

const cases = [
  {
    name: "Operations Specialist",
    role: "Built after work",
    project: "Social Content Topic Research Tool",
    result: "Used SEO traffic to grow a small tool site, then monetized it with ads and paid reports.",
    time: "3 weeks",
    income: "$400/month",
    screenshot: "/cases/case-1.png",
    tag: "Tool Site",
    tagColor: "#F97316",
    tool: "Trae",
    level: "Lv.12",
    xp: 1240,
  },
  {
    name: "Parent Builder",
    role: "Built during nap time",
    project: "Children's Book Recommendation Site",
    result: "Created a niche recommendation tool with AI summaries and a repeatable content workflow.",
    time: "4 weeks",
    income: "$450/month",
    screenshot: "/cases/case-2.png",
    tag: "Content Tool",
    tagColor: "#A855F7",
    tool: "Claude Code",
    level: "Lv.18",
    xp: 1820,
  },
  {
    name: "Product Manager",
    role: "Side-project founder",
    project: "SaaS Competitor Monitoring Tool",
    result: "Shipped a paid monitoring dashboard with subscription pricing and a real customer workflow.",
    time: "5 weeks",
    income: "$1K+/month",
    screenshot: "/cases/case-3.png",
    tag: "SaaS",
    tagColor: "#0EA5E9",
    tool: "Codex",
    level: "Lv.26",
    xp: 2600,
  },
];

const storiesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vibe Coding Examples: Beginner Student Stories",
    description:
      "Real vibe coding examples from beginners who built tools, websites, dashboards, and SaaS products with AI coding in 3–5 weeks.",
    url: `${siteUrl}/stories`,
    inLanguage: "en",
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Beginner AI Coding Stories",
    itemListElement: cases.map((story, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: story.project,
      description: story.result,
      url: `${siteUrl}/stories#${story.project.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
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
        name: "Student Stories",
        item: `${siteUrl}/stories`,
      },
    ],
  },
];

const moreStories = [
  {
    name: "Delivery Worker",
    role: "Route planning tool",
    result: "Built a small route helper that plans delivery order sequences and saves time during daily work.",
    quote: "I was not trying to become a software engineer. I just wanted a tool that solved my own problem.",
    time: "3 days",
    avatarColor: "#6366F1",
  },
  {
    name: "Teacher",
    role: "Classroom quiz app",
    result: "Created a quiz app for 40 students with timed questions, scoring, and review screens.",
    quote: "The best part was seeing students ask how they could build their own version.",
    time: "5 days",
    avatarColor: "#10B981",
  },
  {
    name: "Restaurant Owner",
    role: "Inventory system",
    result: "Built a lightweight stock tracker for ingredients, purchase lists, and daily cost checks.",
    quote: "It was the first internal tool that matched exactly how my store works.",
    time: "1 week",
    avatarColor: "#F59E0B",
  },
  {
    name: "College Junior",
    role: "Portfolio website",
    result: "Created a portfolio with project pages, responsive layout, dark mode, and deployment.",
    quote: "The website gave me something concrete to show in interviews.",
    time: "3 days",
    avatarColor: "#EC4899",
  },
  {
    name: "Product Lead",
    role: "SaaS MVP",
    result: "Turned a long PRD into a working MVP with login, dashboards, and a paid feature path.",
    quote: "I used to wait for engineering capacity. Now I can test the product idea first.",
    time: "5 days",
    avatarColor: "#8B5CF6",
  },
  {
    name: "Freelancer",
    role: "Client websites",
    result: "Used AI coding workflows to deliver small business sites from design to deployment.",
    quote: "AI did not remove the need for judgment, but it changed how fast I could deliver.",
    time: "1 week",
    avatarColor: "#0EA5E9",
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

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <JsonLd data={storiesJsonLd} />
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2"><Logo /><span className="font-bold text-base text-gray-900">VibeCamp</span></Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-900 transition-colors">What is Vibe Coding</Link>
            <Link href="/#journey" className="hover:text-gray-900 transition-colors">Course Map</Link>
            <Link href="/stories" className="text-gray-900 font-medium">Student Stories</Link>
          </nav>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
            <a href="/register">Start free</a>
          </Button>
        </div>
      </header>

      <section className="pt-36 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-5 font-medium">Vibe coding examples</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-gray-900">
            Vibe Coding Examples{" "}
            <br />
            <span className="text-indigo-600">from Real Beginners</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-xl mx-auto leading-relaxed">
            These VibeCamp stories show how non-programmers used vibe coding to build tools, websites, and SaaS products in 3–5 weeks.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">Featured Cases</p>
            <h2 className="text-3xl font-black text-gray-900">Featured vibe coding examples</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((c) => (
              <article
                key={c.project}
                id={c.project.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                className="group flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${c.tagColor}12 0%, #f8f9fa 60%)` }}>
                  <Image src={c.screenshot} alt={`${c.project} built with an AI coding course`} fill className="object-cover object-top z-10 mix-blend-multiply opacity-25" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 right-3 z-20 text-xs font-bold text-gray-600 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-100 flex items-center gap-1">
                    <Trophy className="h-3 w-3" style={{ color: c.tagColor }} />
                    {c.level}
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: c.tagColor + "15", color: c.tagColor }}>{c.tag}</span>
                    <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">{c.tool}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{c.project}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1">{c.result}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{c.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-black" style={{ color: c.tagColor }}>
                      <TrendingUp className="h-3.5 w-3.5" />
                      <span>{c.income}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style={{ background: c.tagColor + "18", color: c.tagColor }}>{c.name[0]}</div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">{c.name}</div>
                      <div className="text-[11px] text-gray-400">{c.role}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <Star className="h-3 w-3" style={{ color: c.tagColor }} />
                      <span className="text-[11px]" style={{ color: c.tagColor }}>{c.xp} XP</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">More Stories</p>
            <h2 className="text-3xl font-black text-gray-900">More beginner vibe coding examples</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moreStories.map((s) => (
              <div key={s.name} className="border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0" style={{ background: s.avatarColor + "15", color: s.avatarColor }}>{s.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                    <div className="text-xs text-gray-400">{s.role}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.result}</p>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-4">
                  <p className="text-xs text-gray-500 italic leading-relaxed">&ldquo;{s.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{s.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-base px-10 py-4 font-semibold transition-colors">
              Start the AI coding course <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3"><Logo /><span className="font-bold text-gray-900">VibeCamp</span></div>
            <p className="text-sm text-gray-400">Beginner AI coding course stories from product-focused builders.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/projects" className="hover:text-gray-900 transition-colors">AI Coding Projects</Link>
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
