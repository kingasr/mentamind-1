"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CheckinCard, CoachCard, ForumCard, MeditationCard, SignalCard, SIGNAL_ROWS } from "@/components/marketing/ProductCards";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "What's inside", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "For HR", href: "#for-hr" },
];

const SECTORS = [
  "Technology",
  "Healthcare",
  "Manufacturing",
  "Banking",
  "Government",
  "Education",
  "PSUs",
  "Startups",
];

const FACTS = [
  { label: "Daily check-in", value: "2 min", note: "Mood, energy and stress. Done before the first meeting." },
  { label: "Guided meditation", value: "30 days", note: "A structured journey, then a library to keep going." },
  { label: "Entries visible to managers", value: "0", note: "HR sees team-level signals. Never a person.", accent: true },
  { label: "AI companion", value: "24×7", note: "Private, always there, never shared with anyone." },
];

const MODULES = [
  {
    category: "Check-in",
    title: "A daily pulse that takes two minutes",
    body: "Mood, energy and stress, logged in a few taps. Patterns surface over weeks, not in a once-a-year survey.",
    tags: ["Mood", "Energy", "Stress", "Streaks"],
  },
  {
    category: "AI companion",
    title: "Someone to talk to at 11pm",
    body: "A private coach that listens, reflects and suggests small next steps. Conversations stay with the employee.",
    tags: ["Private chat", "Reflections", "Next steps"],
  },
  {
    category: "Meditation",
    title: "A 30-day journey, then a library",
    body: "Foundation, depth and integration blocks with a session, a reflection and a task each day. Plus programs for sleep, focus and anxiety.",
    tags: ["30-day journey", "Library", "Programs"],
  },
  {
    category: "Journal",
    title: "Write it down, let it go",
    body: "A quiet space for what is hard to say out loud. Prompts when words do not come easily.",
    tags: ["Prompts", "Private", "Searchable"],
  },
  {
    category: "Community",
    title: "An anonymous forum for the hard weeks",
    body: "Ask the question you would not ask in standup. Moderated, anonymous, and inside your organisation only.",
    tags: ["Anonymous", "Moderated", "Org-only"],
  },
  {
    category: "Assessments",
    title: "Validated screenings, not quizzes",
    body: "Standard wellbeing and burnout screenings employees can take on their own terms, with results that stay theirs.",
    tags: ["Burnout", "Wellbeing", "Self-paced"],
  },
];

const STEPS = [
  { title: "Invite your organisation", body: "HR sends invites. Employees join with their work email in under a minute. No app store, no procurement cycle." },
  { title: "Employees check in daily", body: "Two minutes each morning. The companion, journal and meditation are there when the day gets heavy." },
  { title: "Patterns form over weeks", body: "Mentamind reads the trend across each team and flags where stress is climbing before it turns into leave or attrition." },
  { title: "HR acts on the signal", body: "A weekly digest and a dashboard show which teams need attention and what has helped elsewhere." },
];

const HR_POINTS = [
  "Team-level trends only. A team needs enough members before anything is shown.",
  "No manager can open an employee's check-ins, chats or journal. Ever.",
  "Weekly digest with the teams to watch and what changed since last week.",
  "Invite, roles and seats managed from one admin screen.",
];

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function Logo({ size = 28 }: { size?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Mentamind home">
      <Image src="/logo/mentamind.webp" alt="" width={size} height={size} className="object-contain" />
      <span className="font-geist text-[17px] font-medium tracking-tight text-white">mentamind</span>
    </Link>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${
        light ? "border-white/30 bg-white/15 text-white" : "border-white/10 bg-white/[0.04] text-white/60"
      }`}
    >
      <span className={`h-1 w-1 rounded-full ${light ? "bg-white" : "bg-[#19b2d2]"}`} />
      {children}
    </span>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-1.5 text-[15px] font-medium text-[#0a0c10] transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a0c10] text-white">
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
      </span>
    </Link>
  );
}

function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center rounded-full border border-white/30 bg-white/10 px-6 text-[15px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
    >
      {children}
    </Link>
  );
}

function Headline({
  as: Tag = "h2",
  line1,
  line2,
  className = "",
}: {
  as?: "h1" | "h2";
  line1: string;
  line2: string;
  className?: string;
}) {
  return (
    <Tag className={`font-geist font-normal tracking-[-0.03em] leading-[1.02] ${className}`}>
      {line1}
      <br />
      <em className="font-serif not-italic italic text-[1.08em] tracking-[-0.005em]">{line2}</em>
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero cards                                                         */
/* ------------------------------------------------------------------ */

function HeroCards() {
  const cards = [<CheckinCard key="checkin" />, <MeditationCard key="meditation" />, <CoachCard key="coach" />, <SignalCard key="signal" />, <ForumCard key="forum" />];

  const tilt = [-5, -2.5, 0, 2.5, 5];

  return (
    <div className="mt-16 flex gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:mt-20 sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
      {cards.map((card, i) => (
        <div
          key={i}
          className="mm-rise sm:[transform:rotate(var(--tilt))_translateY(var(--lift))]"
          style={
            {
              animationDelay: `${0.55 + i * 0.07}s`,
              "--tilt": `${tilt[i]}deg`,
              "--lift": i === 2 ? "-14px" : Math.abs(tilt[i]) > 3 ? "14px" : "0px",
            } as React.CSSProperties
          }
        >
          {card}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#0a0d13]/80 pl-5 pr-2 backdrop-blur-xl">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-[14px] text-white/65 transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
          <Link href="/login" className="text-[14px] text-white/65 transition-colors hover:text-white">
            Log in
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/register"
            className="hidden h-10 items-center rounded-full bg-white px-5 text-[14px] font-medium text-[#0a0c10] transition-colors hover:bg-white/90 sm:inline-flex"
          >
            Get started
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-[#0a0d13]/95 p-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-[15px] text-white/80 hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <Link href="/login" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-[15px] text-white/80 hover:bg-white/5">
              Log in
            </Link>
            <Link href="/register" className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-white text-[15px] font-medium text-[#0a0c10]">
              Get started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="px-3 pt-[84px] sm:px-5 sm:pt-[96px]">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#03202f_0%,#075a78_26%,#0f98b8_48%,#67cde3_70%,#b6e9f3_86%,#e3f7fb_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-12%,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0)_62%)]" />
        <div className="relative pt-20 sm:pt-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="mm-rise" style={{ animationDelay: "0.05s" }}>
              <Eyebrow light>Wellbeing for every employee</Eyebrow>
            </div>
            <div className="mm-rise" style={{ animationDelay: "0.15s" }}>
              <Headline
                as="h1"
                line1="Support your team"
                line2="before burnout"
                className="mt-7 text-[44px] text-white sm:text-6xl lg:text-[76px]"
              />
            </div>
            <p className="mm-rise mx-auto mt-6 max-w-xl text-[17px] leading-[1.55] text-white/90 sm:text-lg" style={{ animationDelay: "0.28s" }}>
              Daily check-ins, a private AI companion, guided meditation and an anonymous community for every employee. Team-level signals for HR, with no individual entry ever exposed.
            </p>
            <div className="mm-rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "0.4s" }}>
              <PrimaryButton href="/register">Start free</PrimaryButton>
              <GhostButton href="#how-it-works">See how it works</GhostButton>
            </div>
          </div>
          <HeroCards />
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...SECTORS, ...SECTORS];
  return (
    <section className="py-14 sm:py-16">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Built for teams in</p>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="mm-marquee flex w-max items-center">
          {items.map((s, i) => (
            <span key={i} className="flex items-center font-geist text-[15px] text-white/70">
              <span className="px-6">{s}</span>
              <span className="h-1 w-1 rounded-full bg-white/25" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Facts() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((f) => (
          <div
            key={f.label}
            className={`rounded-2xl p-5 ${
              f.accent ? "bg-[#19b2d2] text-[#03202f]" : "border border-white/10 bg-white/[0.03] text-white"
            }`}
          >
            <div className={`font-mono text-[11px] uppercase tracking-[0.14em] ${f.accent ? "text-[#03202f]/70" : "text-white/45"}`}>{f.label}</div>
            <div className="mt-6 font-geist text-[44px] leading-none tracking-[-0.03em]">{f.value}</div>
            <p className={`mt-3 text-[13px] leading-snug ${f.accent ? "text-[#03202f]/80" : "text-white/55"}`}>{f.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <Eyebrow>What&apos;s inside</Eyebrow>
        <Headline line1="Six things an employee" line2="actually opens" className="mt-6 text-[36px] text-white sm:text-5xl lg:text-[56px]" />
        <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/60">
          Not a benefits portal nobody logs into. Small daily tools that fit between meetings, and that people keep using after the first week.
        </p>
      </div>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((m) => (
          <article key={m.category} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#19b2d2]">{m.category}</div>
            <h3 className="mt-5 font-geist text-[21px] font-medium leading-snug tracking-tight text-white">{m.title}</h3>
            <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/55">{m.body}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {m.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-[#0a0d13] py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <Headline line1="From invite to insight" line2="in four weeks" className="mt-6 text-[36px] text-white sm:text-5xl lg:text-[56px]" />
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/60">
            Nothing to install on company devices and no integration project. Most organisations have their first team signal within a month.
          </p>
        </div>
        <ol className="divide-y divide-white/10 border-y border-white/10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[48px_1fr] gap-4 py-7">
              <span className="pt-1 font-mono text-[12px] text-white/35">0{i + 1}</span>
              <div>
                <h3 className="font-geist text-[20px] font-medium tracking-tight text-white">{s.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/55">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ForHR() {
  return (
    <section id="for-hr" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-6 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>For HR and people teams</Eyebrow>
          <Headline line1="Signals," line2="not surveillance" className="mt-6 text-[36px] text-white sm:text-5xl lg:text-[56px]" />
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/60">
            Employees will only be honest if they trust what happens to the answer. So the dashboard is built around what HR cannot see.
          </p>
          <ul className="mt-8 space-y-4">
            {HR_POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#19b2d2]" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-[#0a0d13] p-2">
          <div className="rounded-[18px] bg-[#0e1218] p-5 ring-1 ring-white/5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">Weekly digest</div>
              <div className="text-[12px] text-white/40">Week 38</div>
            </div>
            <div className="mt-5 space-y-2">
              {SIGNAL_ROWS.map((row) => (
                <div key={row.team} className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3">
                  <span className="text-[14px] text-white/85">{row.team}</span>
                  <span className="flex items-center gap-2 text-[13px]" style={{ color: row.tone }}>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: row.tone }} />
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                { label: "Response rate", value: "82%", width: "82%" },
                { label: "Companion sessions", value: "54%", width: "54%" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl bg-white/[0.04] p-4">
                  <div className="text-[12px] text-white/45">{m.label}</div>
                  <div className="mt-2 font-geist text-[26px] leading-none tracking-tight text-white">{m.value}</div>
                  <div className="mt-3 h-1 w-full rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#19b2d2]" style={{ width: m.width }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] leading-relaxed text-white/35">
              Shown only for teams with enough members to keep every answer anonymous.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px]">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#e3f7fb_0%,#67cde3_30%,#0f98b8_58%,#075a78_82%,#03202f_100%)]" />
        <div className="relative px-6 py-20 text-center sm:py-28">
          <Headline line1="Support your team," line2="before burnout." className="mx-auto text-[40px] text-white sm:text-6xl lg:text-[72px]" />
          <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-white/85">
            Free for small teams. Set up in an afternoon, first signal within a month.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton href="/register">Create your organisation</PrimaryButton>
            <GhostButton href="mailto:noreply.mentamind@gmail.com">Talk to us</GhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <Logo size={24} />
      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/50">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="hover:text-white">
            {l.label}
          </a>
        ))}
        <Link href="/login" className="hover:text-white">Log in</Link>
        <Link href="/register" className="hover:text-white">Create account</Link>
      </nav>
      <p className="text-[13px] text-white/35">© {new Date().getFullYear()} Mentamind</p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

export function LandingPage() {
  return (
    <div className="dark min-h-screen overflow-x-hidden bg-[#06080c] font-geist text-[#f2f5fa] antialiased">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Facts />
        <Modules />
        <HowItWorks />
        <ForHR />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
