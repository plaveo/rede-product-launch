'use client'

import { Reveal } from '@/components/rede/reveal'

const SECTIONS = [
  ['overview', 'Overview'],
  ['systems', 'The three systems'],
  ['survey', 'KEV 2.0 Survey'],
  ['metrics', 'Founder metrics'],
  ['read', 'How to read the data'],
  ['links', 'Links & access'],
] as const

function Anchor({ id }: { id: string }) {
  return <span id={id} className="block -mt-24 pt-24" aria-hidden />
}

export function Docs() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 md:px-8">
      {/* Header */}
      <Reveal>
        <p className="font-rede text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          Documentation
        </p>
        <h1 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.05] text-foreground md:text-5xl">
          Stress Test &amp; Survey System
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          How REDE validates itself before launch. A small group of real estate
          professionals use the product, then answer one focused question:{' '}
          <span className="text-foreground">will you use REDE — and will you pay for it?</span>
        </p>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
        {/* Table of contents */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <nav className="rede-glass rounded-xl p-4">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              On this page
            </p>
            <ul className="flex flex-col gap-1">
              {SECTIONS.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex flex-col gap-16">
          {/* Overview */}
          <section className="relative">
            <Anchor id="overview" />
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Overview
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  The <span className="text-foreground">Stress Test Program</span>{' '}
                  is not a test for the participants — it is a test of REDE itself.
                  A limited group of licensed brokers, salespersons, appraisers, and
                  property sellers put the platform under real pressure, then report
                  what works and what is missing.
                </p>
                <p>
                  The goal is not to prove REDE is good. It is to discover{' '}
                  <span className="text-foreground">
                    why someone would use it every day
                  </span>{' '}
                  and{' '}
                  <span className="text-foreground">
                    what prevents them from paying for it
                  </span>
                  . Those two answers are the most valuable data from the first users.
                </p>
                <blockquote className="rede-glass rounded-xl border-l-2 border-l-primary px-5 py-4 text-foreground">
                  Don&apos;t ask &ldquo;Do you like REDE?&rdquo; Ask &ldquo;Will you
                  use REDE?&rdquo;
                  <span className="mt-1 block text-sm text-muted-foreground">
                    — KEV 2.0, founder principle
                  </span>
                </blockquote>
              </div>
            </Reveal>
          </section>

          {/* Systems */}
          <section className="relative">
            <Anchor id="systems" />
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                The three systems
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                The program runs on three connected pages, all live on the REDE
                site.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  n: '01',
                  title: 'Application',
                  path: '/stress-test',
                  desc: 'Public recruitment page. Professionals apply to join the program — name, role, license, agency, contact.',
                },
                {
                  n: '02',
                  title: 'Survey',
                  path: '/survey',
                  desc: 'The 14-section KEV 2.0 survey. Captures real usage intent, trust, confidence, time saved, and willingness to pay.',
                },
                {
                  n: '03',
                  title: 'Founder Dashboard',
                  path: '/survey/admin',
                  desc: 'Password-protected. Aggregates every response into the 10 metrics that actually matter.',
                },
              ].map((s, i) => (
                <Reveal key={s.path} delay={i * 80}>
                  <div className="rede-glass rede-lift flex h-full flex-col rounded-xl p-5">
                    <span className="font-rede text-xs font-semibold text-primary">
                      {s.n}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.desc}
                    </p>
                    <code className="mt-4 inline-block rounded-md bg-muted/60 px-2 py-1 text-xs text-foreground">
                      {s.path}
                    </code>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Survey */}
          <section className="relative">
            <Anchor id="survey" />
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                KEV 2.0 Survey — 14 sections
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Structured to move from who they are, to how they work, to whether
                they will use and pay for REDE.
              </p>
            </Reveal>
            <div className="mt-6 overflow-hidden rounded-xl border border-border/60">
              {[
                ['01', 'Profile', 'Name, company, role, years in real estate'],
                ['02', 'Current Workflow', 'How they research a property today'],
                ['03', 'Pain Points', 'Biggest problem when presenting properties'],
                ['04', 'First Impression', 'Rate 1–10: easy, professional, useful, fast, trustworthy'],
                ['05', 'Data', 'Do you trust the information shown? Why?'],
                ['06', 'Assessment', 'Do the scores help you understand the property?'],
                ['07', 'Interpretation', 'Did the explanations help you present better?'],
                ['08', 'Confidence', 'How much more confident are you? (1–10)'],
                ['09', 'Time Saved', 'Minutes normally vs. minutes using REDE'],
                ['10', 'Missing Information', 'What do you wish REDE included?'],
                ['11', 'Willingness to Use', 'Would you use REDE daily? Yes / Maybe / No'],
                ['12', 'Willingness to Pay', 'Would you pay? ₱299 / ₱499 / ₱999 / ₱1,499'],
                ['13', 'Recommendation', 'Would you recommend REDE? (1–10)'],
                ['14', 'Final Comment', 'If you were the founder, what would you fix first?'],
              ].map(([n, title, desc], i) => (
                <div
                  key={n}
                  className={`flex items-start gap-4 px-4 py-3.5 md:px-5 ${
                    i % 2 === 0 ? 'bg-card/40' : 'bg-transparent'
                  }`}
                >
                  <span className="font-rede text-sm font-semibold text-primary">
                    {n}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Metrics */}
          <section className="relative">
            <Anchor id="metrics" />
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Founder metrics — track only these
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Don&apos;t focus on 100 metrics. The dashboard surfaces the ten that
                drive the decision. The first two are the most important.
              </p>
            </Reveal>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ['Willingness to Pay', 'The single most important signal', true],
                ['Daily Use Intent', 'Would they use it every day', true],
                ['Recommendation Score', 'Net advocacy (1–10)', false],
                ['Confidence Gain', 'How much more confident when presenting', false],
                ['Trust Score', 'Do they trust the data', false],
                ['Ease of Use', 'Is it easy to understand', false],
                ['Time Saved', 'Minutes saved per property', false],
                ['Top Price Point', 'The price most are willing to pay', false],
                ['Biggest Pain Point', 'The problem to solve first', false],
                ['Most Requested Feature', 'What to build next', false],
              ].map(([title, desc, hot], i) => (
                <Reveal key={title as string} delay={i * 50}>
                  <div
                    className={`rede-glass flex h-full items-start gap-3 rounded-xl p-4 ${
                      hot ? 'border border-primary/40' : ''
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        hot ? 'bg-primary' : 'bg-muted-foreground/50'
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {title}
                        {hot ? (
                          <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                            Priority
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* How to read */}
          <section className="relative">
            <Anchor id="read" />
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                How to read the data
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Open the Founder Dashboard and read top to bottom. Start with{' '}
                  <span className="text-foreground">Willingness to Pay</span> and{' '}
                  <span className="text-foreground">Daily Use Intent</span> — if these
                  are strong, REDE has a business. If not, the reasons are in the
                  open-text answers below.
                </p>
                <ol className="flex flex-col gap-3">
                  {[
                    'Read the two priority metrics first. High pay + high daily use = validated.',
                    'Cross-check with Confidence Gain and Time Saved — these explain the value.',
                    'Read Biggest Pain Point and Most Requested Feature to decide what to build next.',
                    'Scan the individual comments (section 14) for the sharpest, most specific feedback.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="text-foreground/90">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </section>

          {/* Links */}
          <section className="relative">
            <Anchor id="links" />
            <Reveal>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Links &amp; access
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Public pages can be shared with anyone. Admin pages require the
                founder password.
              </p>
            </Reveal>
            <div className="mt-6 flex flex-col gap-3">
              {[
                ['Application', '/stress-test', 'Public'],
                ['Survey', '/survey', 'Public'],
                ['Founder Dashboard', '/survey/admin', 'Password'],
                ['Application Admin', '/stress-test/admin', 'Password'],
              ].map(([label, path, access], i) => (
                <Reveal key={path} delay={i * 60}>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card/40 px-4 py-3.5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{label}</p>
                      <code className="text-xs text-muted-foreground">{path}</code>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        access === 'Public'
                          ? 'bg-primary/15 text-primary'
                          : 'bg-muted/60 text-muted-foreground'
                      }`}
                    >
                      {access}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
