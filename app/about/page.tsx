import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EN_RANKS } from "@/lib/content/english-course";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

export const metadata: Metadata = {
  title: "What Is Vibe Coding? Beginner Guide to AI Coding",
  description:
    "What is vibe coding? Learn how beginners use Claude Code, Codex, Trae, Cursor, and Windsurf to build real products with plain-language prompts.",
  keywords: [
    "what is vibe coding",
    "vibe coding",
    "AI coding",
    "AI coding for beginners",
    "Claude Code tutorial",
    "AI coding tools",
  ],
  openGraph: {
    title: "What Is Vibe Coding? Beginner Guide to AI Coding",
    description:
      "Learn what vibe coding means and how beginners use AI coding tools to build real websites and products with plain-language prompts.",
    url: `${siteUrl}/about`,
    siteName: "VibeCamp",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "What is vibe coding guide by VibeCamp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Vibe Coding? Beginner Guide to AI Coding",
    description:
      "A practical beginner guide to vibe coding, AI coding tools, and plain-language software building.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: `${siteUrl}/about`,
    languages: {
      en: `${siteUrl}/about`,
      "zh-CN": `${siteUrl}/zh/about`,
    },
  },
};

const aboutJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What Is Vibe Coding? Beginner Guide to AI Coding",
    description:
      "A beginner guide explaining vibe coding, AI coding tools, and how non-programmers can build software with plain-language prompts.",
    image: `${siteUrl}/og-image.png`,
    mainEntityOfPage: `${siteUrl}/about`,
    author: {
      "@id": `${siteUrl}/#organization`,
    },
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is vibe coding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vibe coding is building software by describing the product behavior you want in natural language, then using AI coding tools to generate, inspect, fix, and ship the code.",
        },
      },
      {
        "@type": "Question",
        name: "Do beginners need to know programming before vibe coding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Beginners can start by learning how to write clear prompts, test the generated product, and iterate with AI while gradually learning engineering basics.",
        },
      },
      {
        "@type": "Question",
        name: "Which tools are used for vibe coding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common vibe coding tools include Claude Code, Codex, Trae, Cursor, and Windsurf. The workflow matters more than a single tool interface.",
        },
      },
    ],
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
        name: "What Is Vibe Coding",
        item: `${siteUrl}/about`,
      },
    ],
  },
];

const tools = [
  {
    name: "Claude Code",
    tag: "Deep code reasoning",
    color: "#10B981",
    desc: "Strong for multi-step code changes, codebase understanding, debugging, and review-oriented workflows.",
  },
  {
    name: "Codex",
    tag: "OpenAI coding agent",
    color: "#F59E0B",
    desc: "Useful for turning product instructions into code changes, terminal work, and structured implementation.",
  },
  {
    name: "Trae, Cursor, Windsurf",
    tag: "Beginner-friendly editors",
    color: "#6366F1",
    desc: "Visual AI coding environments that help beginners start building without living inside a terminal.",
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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <JsonLd data={aboutJsonLd} />
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-base text-gray-900">VibeCamp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="/about" className="text-gray-900 font-medium">What is Vibe Coding</Link>
            <Link href="/#journey" className="hover:text-gray-900 transition-colors">Course Map</Link>
            <Link href="/stories" className="hover:text-gray-900 transition-colors">Student Stories</Link>
            <Link href="/zh/about" className="hover:text-gray-900 transition-colors">Chinese</Link>
          </nav>
          <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
            <a href="/register">Start free</a>
          </Button>
        </div>
      </header>

      <section className="pt-36 pb-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-5 font-medium">What is vibe coding</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05] text-gray-900">
            What Is{" "}
            <br />
            <span className="text-indigo-600">Vibe Coding?</span>
          </h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
            Vibe coding is building software by describing the product you want in natural language, then using AI coding tools to generate, inspect, fix, and ship the code.
          </p>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed mt-5">
            If you are asking what is vibe coding, the practical answer is this: it is a product-building workflow where prompts, testing, and iteration matter as much as the generated code.
          </p>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="border border-gray-100 rounded-2xl p-7">
              <div className="text-sm font-bold text-red-500 mb-5">Traditional beginner coding</div>
              <ul className="space-y-3 text-sm text-gray-500">
                {[
                  "Spend months learning syntax before building a useful product.",
                  "Memorize APIs, build tools, and framework conventions.",
                  "Get stuck on bugs without knowing what to ask.",
                  "Wait a long time before publishing anything real.",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <span className="text-red-300 mt-0.5 shrink-0">x</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-indigo-100 bg-indigo-50/40 rounded-2xl p-7">
              <div className="text-sm font-bold text-indigo-600 mb-5">Vibe coding with AI</div>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  "Describe the feature, then let AI produce the first implementation.",
                  "Focus on product behavior, acceptance criteria, and iteration.",
                  "Ask AI to explain failures, propose fixes, and update the code.",
                  "Build and deploy real products while learning the engineering basics.",
                ].map((text) => (
                  <li key={text} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border border-gray-100 rounded-2xl p-7">
            <h2 className="text-base font-bold text-gray-900 mb-3">What is vibe coding in practice?</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              What is vibe coding beyond the phrase itself? It is a way to turn product intent into working software by giving AI a clear brief, reviewing the output, and improving the result through real browser feedback.
            </p>
            <h2 className="text-base font-bold text-gray-900 mb-5">AI coding tools used in vibe coding</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {tools.map((tool) => (
                <div key={tool.name} className="rounded-xl p-4 border border-gray-100" style={{ background: tool.color + "08" }}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-bold text-gray-900">{tool.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: tool.color + "18", color: tool.color }}>
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-4 font-medium">Rank System</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 leading-tight">What you can build as you level up</h2>
          <p className="text-gray-500 max-w-xl text-sm mb-12">
            VibeCamp turns vibe coding into a structured AI coding course. Each rank maps to practical product-building ability.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {EN_RANKS.map((rank) => (
              <div key={rank.id} className="relative border rounded-2xl p-5 text-center hover:border-gray-200 transition-all overflow-hidden flex flex-col items-center justify-center min-h-[160px] group bg-white" style={{ borderColor: rank.badge_color + "25" }}>
                <div className="relative w-11 h-11 rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform" style={{ background: rank.badge_color + "12", border: `1.5px solid ${rank.badge_color}30` }}>
                  {rank.badge_icon}
                </div>
                <div className="relative text-sm font-bold text-gray-900 mb-1 leading-tight">{rank.name}</div>
                <div className="relative text-xs text-gray-400 mb-2 leading-snug text-center px-1">{rank.subtitle}</div>
                <div className="relative text-xs font-bold mt-auto" style={{ color: rank.badge_color }}>{rank.salary}</div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-sm px-7 py-3 font-semibold transition-colors">
              Start the vibe coding course <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3"><Logo /><span className="font-bold text-gray-900">VibeCamp</span></div>
            <p className="text-sm text-gray-400">Learn what vibe coding is, then practice it by building real products.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/projects" className="hover:text-gray-900 transition-colors">AI Coding Projects</Link>
            <Link href="/stories" className="hover:text-gray-900 transition-colors">Student Stories</Link>
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
