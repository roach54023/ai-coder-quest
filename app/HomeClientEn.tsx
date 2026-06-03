"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, LayoutDashboard, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

const journey = [
  {
    chapter: "PROLOGUE",
    label: "Setup",
    title: "Start Vibe Coding",
    tagline: "Install the tools.\nShip your first page.",
    desc: "Set up Claude Code, Codex, Trae, Cursor, or Windsurf and use AI to create your first web page.",
    chapterId: "prologue",
    levelStart: "0-1",
    color: "#6366F1",
    levels: [
      { id: "0-1", title: "Install an AI coding assistant", desc: "Get your AI coding environment ready." },
      { id: "0-2", title: "Publish your first AI-built page", desc: "Turn a plain-language prompt into a live web page." },
    ],
  },
  {
    chapter: "CHAPTER 1",
    label: "Static Site",
    title: "Build Your First Website",
    tagline: "If you can type,\nyou can build a site.",
    desc: "Learn prompt patterns, build a personal portfolio, and publish it on the internet.",
    chapterId: "chapter_1",
    levelStart: "1-1",
    color: "#10B981",
    levels: [
      { id: "1-1", title: "Prompting fundamentals", desc: "Write clear instructions that AI can turn into code." },
      { id: "1-2", title: "Personal portfolio pages", desc: "Create a real portfolio you can share." },
      { id: "1-3", title: "Visual polish", desc: "Make the site consistent and presentable." },
    ],
  },
  {
    chapter: "CHAPTER 2",
    label: "Frontend",
    title: "React and Tailwind Workflow",
    tagline: "Move from pages\nto a real project.",
    desc: "Upgrade from single files to a Next.js app with components, responsive layout, SEO, and deployment.",
    chapterId: "chapter_2",
    levelStart: "2-1",
    color: "#F59E0B",
    levels: [
      { id: "2-1", title: "Start a Next.js project", desc: "Use AI to initialize a frontend codebase." },
      { id: "2-2", title: "Component thinking", desc: "Break pages into reusable building blocks." },
      { id: "2-3", title: "SEO basics", desc: "Add page titles, descriptions, and sharing metadata." },
      { id: "2-4", title: "Performance optimization", desc: "Improve mobile speed and page quality." },
    ],
  },
  {
    chapter: "CHAPTER 3",
    label: "AI Features",
    title: "Add AI to Your Product",
    tagline: "Put AI\ninside your app.",
    desc: "Connect APIs, build better interactions, and add product features that feel real.",
    chapterId: "chapter_3",
    levelStart: "3-1",
    color: "#EC4899",
    levels: [
      { id: "3-1", title: "Dark mode", desc: "Add a polished theme switcher." },
      { id: "3-2", title: "Live search", desc: "Filter content instantly as users type." },
      { id: "3-3", title: "Contact form", desc: "Build a usable form with validation." },
    ],
  },
  {
    chapter: "CHAPTER 4",
    label: "Full Stack",
    title: "Backend, Database, Admin",
    tagline: "One person,\na full product team.",
    desc: "Use API routes, Supabase, admin screens, and production data to build complete web products.",
    chapterId: "chapter_4",
    levelStart: "4-1",
    color: "#0EA5E9",
    levels: [
      { id: "4-1", title: "API routes", desc: "Create backend endpoints for your app." },
      { id: "4-2", title: "Supabase database", desc: "Store and load real product data." },
      { id: "4-3", title: "Admin dashboard", desc: "Manage content from a private interface." },
      { id: "4-4", title: "Analytics basics", desc: "Track views and user activity." },
    ],
  },
  {
    chapter: "CHAPTER 5",
    label: "Launch",
    title: "Launch a Real Product",
    tagline: "Finish it.\nPut it in front of users.",
    desc: "Add authentication, AI chat, payments, GitHub, Vercel, and launch-ready production checks.",
    chapterId: "chapter_5",
    levelStart: "5-1",
    color: "#F97316",
    levels: [
      { id: "5-1", title: "User login", desc: "Add authentication and protected pages." },
      { id: "5-2", title: "AI assistant", desc: "Connect an AI feature to your product." },
      { id: "5-3", title: "Stripe payments", desc: "Build a monetizable product flow." },
    ],
  },
];

const userCases = [
  {
    emoji: "🎓",
    name: "College Student",
    tag: "Beginner",
    story: "Built a campus marketplace during exam week",
    desc: "With no coding background, they used AI coding tools to ship a second-hand marketplace in three days.",
    result: "3 days to launch",
  },
  {
    emoji: "💼",
    name: "Product Manager",
    tag: "Prototype",
    story: "Turned a PRD into a clickable product demo",
    desc: "Instead of waiting for engineering bandwidth, they used VibeCamp to build a live MVP from a product spec.",
    result: "PRD to demo in 2 weeks",
  },
  {
    emoji: "🏪",
    name: "Shop Owner",
    tag: "Business",
    story: "Created an ordering system for a small store",
    desc: "Followed the full-stack lessons to build a database-backed ordering tool and avoid outsourcing costs.",
    result: "Saved on custom development",
  },
  {
    emoji: "👩‍🏫",
    name: "Teacher",
    tag: "Education",
    story: "Brought AI coding into the classroom",
    desc: "Used the course structure to help a class of students publish their first websites.",
    result: "40 student projects shipped",
  },
];

const faqs = [
  {
    q: "Is this vibe coding course for complete beginners?",
    a: "Yes. VibeCamp is designed for people who have never coded before. You learn how to describe what you want, inspect AI-generated code, fix issues, and ship real web projects.",
  },
  {
    q: "Which AI coding tool should I use?",
    a: "Claude Code, Codex, Trae, Cursor, and Windsurf can all work for this course. The lessons focus on durable AI coding workflow rather than one tool's interface.",
  },
  {
    q: "Will I actually build deployable projects?",
    a: "Yes. Each chapter has a concrete deliverable: a live page, a portfolio, a Next.js app, database features, AI features, and a launch-ready product flow.",
  },
  {
    q: "Is VibeCamp free?",
    a: "The core VibeCamp course content is free. You can start the levels, save progress, and learn at your own pace.",
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

export default function HomeClientEn() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const dashboardHref = "/zh/dashboard";
  const authHref = (next: string) => `/register?next=${encodeURIComponent(next)}`;
  const levelHref = (chapterId: string, levelId: string) => {
    const next = `/zh/levels/${chapterId}/${levelId}`;
    return user ? next : authHref(next);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-base text-gray-900">VibeCamp</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-900 transition-colors">What is Vibe Coding</Link>
            <Link href="/#journey" className="hover:text-gray-900 transition-colors">Course Map</Link>
            <Link href="/stories" className="hover:text-gray-900 transition-colors">Student Stories</Link>
            <Link href="/zh" className="hover:text-gray-900 transition-colors">中文</Link>
          </nav>
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
            ) : user ? (
              <>
                <Link href={dashboardHref} className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name ?? user.email ?? "User avatar"}
                      className="w-7 h-7 rounded-full object-cover bg-indigo-100"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                      {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <span>{user.name ?? user.email}</span>
                </Link>
                <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-4 text-xs gap-1.5" asChild>
                  <Link href={dashboardHref}><LayoutDashboard className="h-3.5 w-3.5" />Dashboard</Link>
                </Button>
                <button className="text-gray-400 hover:text-gray-700 transition-colors p-1" onClick={() => signOut()} aria-label="Sign out">
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 text-sm" asChild>
                  <a href="/login">Log in</a>
                </Button>
                <Button size="sm" className="bg-gray-900 hover:bg-gray-700 text-white rounded-full px-5 text-sm" asChild>
                  <a href={authHref(dashboardHref)}>Start free</a>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="pt-24 pb-12 px-5 text-center">
        <div className="inline-block text-xs text-gray-400 border border-gray-200 rounded-full px-3.5 py-1 mb-5 tracking-wide">
          Vibe coding course for beginners
        </div>
        <h1 className="text-3xl md:text-7xl font-black tracking-tight leading-[1.05] mb-4 text-gray-900">
          Vibe Coding Course
          <br />
          <span className="text-indigo-600">for Beginners</span>
        </h1>
        <p className="text-base text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
          Learn AI coding without memorizing programming languages. VibeCamp gives you 26 hands-on levels that turn plain-language prompts into real, deployed products.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={user ? dashboardHref : authHref(dashboardHref)} className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full text-sm px-8 py-3.5 font-semibold transition-colors">
            Start the free vibe coding course <ArrowRight className="h-4 w-4" />
          </a>
          <Link href="#journey" className="inline-flex items-center justify-center border border-gray-200 hover:border-gray-400 text-gray-600 hover:text-gray-900 rounded-full text-sm px-8 py-3.5 font-medium transition-colors">
            View course map
          </Link>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section id="cases" className="py-10 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">Real People · Real Products</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
            Beginner AI coders,
            <span className="text-indigo-600"> real shipped products</span>
          </h2>
          <p className="text-base text-gray-500 mb-7 max-w-md">
            VibeCamp is a practical AI coding course: every story maps to a product someone can launch, test, and improve.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {userCases.map((c) => (
              <div key={c.story} className="border border-gray-100 rounded-2xl p-5 hover:border-gray-300 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl">
                    {c.emoji}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.tag}</div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug group-hover:text-indigo-600 transition-colors">{c.story}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{c.desc}</p>
                <div className="inline-block text-xs font-bold text-indigo-600 bg-indigo-50 rounded-full px-3 py-1">{c.result}</div>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link href="/stories" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors border border-gray-200 hover:border-gray-400 rounded-full px-6 py-3">
              Read more student stories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section id="journey" className="py-10 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">Course Map</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 md:mb-10">
            From zero to independent builder
            <br />
            <span className="text-gray-300">with one deliverable per level</span>
          </h2>
          <div className="space-y-5">
            {journey.map((stage) => (
              <div key={stage.chapterId} className="rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-56 shrink-0 p-5 flex flex-col justify-between" style={{ background: `${stage.color}10` }}>
                    <div className="text-xs font-black px-2.5 py-1 rounded-full w-fit text-white" style={{ background: stage.color }}>{stage.label}</div>
                    <div className="mt-8">
                      <div className="text-[10px] text-gray-400 font-bold tracking-widest mb-2 uppercase">{stage.chapter}</div>
                      <h3 className="text-xl font-black text-gray-900 mb-2 leading-tight whitespace-pre-line">{stage.tagline}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{stage.desc}</p>
                    </div>
                  </div>
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h3 className="text-lg font-black text-gray-900">{stage.title}</h3>
                      <Link href={levelHref(stage.chapterId, stage.levelStart)} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        Start <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stage.levels.map((level) => (
                        <Link key={level.id} href={levelHref(stage.chapterId, level.id)} className="group/card flex items-start gap-3 rounded-xl p-3 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                          <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black mt-0.5" style={{ background: stage.color + "15", color: stage.color }}>
                            {level.id.split("-")[1]}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-900 text-sm leading-snug group-hover/card:text-indigo-600 transition-colors">{level.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5 leading-relaxed">{level.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-400 uppercase tracking-widest mb-3 font-medium">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Vibe coding course FAQ</h2>
          {faqs.map((faq) => (
            <div key={faq.q} className="py-4 border-b border-gray-100 last:border-0">
              <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-8 md:py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Logo />
              <span className="font-bold text-gray-900">VibeCamp</span>
            </div>
            <p className="text-sm text-gray-400">Free vibe coding course · Learn AI coding by shipping real products</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-6">
            <nav className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Course</div>
              <Link href={levelHref("prologue", "0-1")} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Setup AI coding tools</Link>
              <Link href={levelHref("chapter_1", "1-1")} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Build a portfolio</Link>
              <Link href={levelHref("chapter_4", "4-1")} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Full-stack AI coding</Link>
            </nav>
            <nav className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Explore</div>
              <Link href="/about" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">What is Vibe Coding</Link>
              <Link href="/projects" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">AI Coding Projects</Link>
              <Link href="/stories" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">Student Stories</Link>
            </nav>
            <nav className="space-y-2.5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">About</div>
              <Link href="https://github.com/roach54023/ai-coder-quest" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />GitHub
              </Link>
              <Link href="mailto:roach54023@qq.com" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                <Mail className="h-3 w-3" />Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
