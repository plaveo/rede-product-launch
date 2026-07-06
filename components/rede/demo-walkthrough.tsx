'use client'

import { useCallback, useEffect, useState } from 'react'

const STEP_MS = 5200

type Step = {
  kicker: string
  title: string
  caption: string
  screen: React.ReactNode
}

/* ---------- window chrome shared by every screen ---------- */
function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
      <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.6_0.16_25)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.14_85)]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.14_150)]" />
      <div className="ml-3 flex items-center gap-2">
        <span className="font-rede text-[13px] font-semibold text-foreground">REDE</span>
        <span className="text-[11px] text-muted-foreground">{label}</span>
      </div>
      <div className="ml-auto flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
        <span className="text-[10px] font-medium text-primary">Live</span>
      </div>
    </div>
  )
}

/* ---------- Step 1: open + search ---------- */
function ScreenSearch() {
  const results = [
    { name: 'Two Serendra, Tower One', meta: 'BGC, Taguig • Ayala Land', score: 87 },
    { name: 'The Proscenium, Residences', meta: 'Rockwell, Makati • Rockwell Land', score: 91 },
    { name: 'Grand Hyatt Residences', meta: 'BGC, Taguig • Federal Land', score: 84 },
  ]
  return (
    <div className="text-left">
      <Chrome label="Property Search" />
      <div className="p-5">
        <div className="flex items-center gap-2.5 rounded-full border border-primary/30 bg-background/60 px-4 py-3">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3-3" strokeLinecap="round" />
          </svg>
          <span className="text-[13px] text-foreground">Two Serendra</span>
          <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-primary" />
        </div>
        <div className="mt-3 space-y-2">
          {results.map((r, i) => (
            <div
              key={r.name}
              className="demo-rise flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-3.5 py-2.5"
              style={{ animationDelay: `${i * 130 + 150}ms` }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-foreground">{r.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">{r.meta}</p>
              </div>
              <span className="font-rede text-[13px] font-semibold text-primary">{r.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Step 2: the REDE score ---------- */
function ScoreRing({ score }: { score: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative h-[132px] w-[132px] shrink-0">
      <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90">
        <circle cx="66" cy="66" r={r} fill="none" stroke="var(--border)" strokeWidth="9" />
        <circle
          cx="66"
          cy="66"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
          style={{ animation: 'demo-ring 1.6s cubic-bezier(0.16,1,0.3,1) both' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold tracking-tight text-foreground">{score}</span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Decision</span>
      </div>
    </div>
  )
}

function ScreenScore() {
  return (
    <div className="text-left">
      <Chrome label="Decision Workspace" />
      <div className="p-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Property</p>
        <p className="mt-1 font-display text-[15px] font-semibold leading-tight text-foreground">
          Two Serendra, Tower One
        </p>
        <p className="text-[12px] text-muted-foreground">BGC, Taguig • Residential</p>
        <div className="mt-5 flex items-center gap-5">
          <ScoreRing score={87} />
          <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-[oklch(0.7_0.14_150)]/15 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.8_0.14_150)]">
              Strong Buy
            </span>
            <p className="max-w-[190px] text-[12px] leading-relaxed text-muted-foreground">
              A single 0–100 score, computed the same way every time.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            ['30', 'Signals'],
            ['5', 'Lenses'],
            ['A+', 'Grade'],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-border/60 bg-background/50 px-3 py-2.5 text-center">
              <p className="font-display text-lg font-semibold text-foreground">{v}</p>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------- Step 3: the 5 lenses ---------- */
function ScreenLenses() {
  const lenses = [
    { label: 'People', value: 76 },
    { label: 'Economy', value: 69 },
    { label: 'Movement', value: 83 },
    { label: 'Infrastructure', value: 74 },
    { label: 'Connectivity', value: 91 },
  ]
  return (
    <div className="text-left">
      <Chrome label="Interpretation Lenses" />
      <div className="p-5">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          Measured across 5 lenses
        </p>
        <div className="mt-4 space-y-3.5">
          {lenses.map((s, i) => (
            <div key={s.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[12px] text-foreground">{s.label}</span>
                <span className="font-rede text-[12px] font-semibold text-muted-foreground">{s.value}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-border/60">
                <div
                  className="demo-grow h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                  style={{ ['--w' as string]: `${s.value}%`, animationDelay: `${i * 120 + 200}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          Each lens is backed by evidence — the answer to your client&apos;s &ldquo;bakit ganito?&rdquo;
        </p>
      </div>
    </div>
  )
}

/* ---------- Step 4: the decision briefing ---------- */
function ScreenDecision() {
  const points = [
    'Connectivity is very strong — 91/100, top transit access.',
    'Movement supports demand — steady foot traffic and absorption.',
    'Economy is the watch item — 69/100, monitor supply.',
  ]
  return (
    <div className="text-left">
      <Chrome label="Decision Briefing" />
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[oklch(0.7_0.14_150)]/15 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.8_0.14_150)]">
            Strong Buy • 87
          </span>
          <span className="text-[11px] text-muted-foreground">Two Serendra, Tower One</span>
        </div>
        <p className="mt-4 text-[13px] font-semibold text-foreground">Why this decision</p>
        <div className="mt-3 space-y-2.5">
          {points.map((p, i) => (
            <div
              key={p}
              className="demo-rise flex items-start gap-2.5 rounded-xl border border-border/60 bg-background/50 px-3.5 py-2.5"
              style={{ animationDelay: `${i * 150 + 150}ms` }}
            >
              <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[12px] leading-relaxed text-foreground">{p}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-3">
          <p className="text-[12px] leading-relaxed text-foreground">
            One page, backed by data — the defensible position you bring to the client meeting.
          </p>
        </div>
      </div>
    </div>
  )
}

const STEPS: Step[] = [
  {
    kicker: 'Step 1',
    title: 'Search any property',
    caption: 'Type any building, barangay, or city. Hundreds of developments, all pre-analyzed.',
    screen: <ScreenSearch />,
  },
  {
    kicker: 'Step 2',
    title: 'Read the REDE Score',
    caption: 'A single 0–100 decision score — computed the same way every time, never guessed.',
    screen: <ScreenScore />,
  },
  {
    kicker: 'Step 3',
    title: 'See the 5 lenses',
    caption: 'People, Economy, Movement, Infrastructure, Connectivity — each backed by evidence.',
    screen: <ScreenLenses />,
  },
  {
    kicker: 'Step 4',
    title: 'Decide with confidence',
    caption: 'One clear, defensible decision you can bring to any client meeting.',
    screen: <ScreenDecision />,
  },
]

export function DemoWalkthrough() {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  const go = useCallback((next: number) => {
    setStep((next + STEPS.length) % STEPS.length)
  }, [])

  // auto-advance when playing
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setStep((s) => (s + 1) % STEPS.length), STEP_MS)
    return () => clearTimeout(t)
  }, [step, playing])

  const active = STEPS[step]

  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-10 md:px-8">
      {/* the phone / app frame */}
      <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-2xl shadow-primary/5">
        {/* progress bars */}
        <div className="flex gap-1.5 px-4 pt-4">
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => {
                setPlaying(false)
                go(i)
              }}
              className="group h-1 flex-1 overflow-hidden rounded-full bg-border/70"
              aria-label={`Go to ${s.title}`}
            >
              <span
                className="block h-full rounded-full bg-primary"
                style={{
                  width: i < step ? '100%' : i === step ? undefined : '0%',
                  animation:
                    i === step && playing
                      ? `demo-progress ${STEP_MS}ms linear both`
                      : i === step
                        ? undefined
                        : 'none',
                  ...(i === step && !playing ? { width: '40%' } : null),
                }}
              />
            </button>
          ))}
        </div>

        {/* screen */}
        <div key={step} className="demo-fade min-h-[420px]">
          {active.screen}
        </div>
      </div>

      {/* caption */}
      <div key={`cap-${step}`} className="demo-fade mt-8 text-center">
        <p className="font-rede text-[12px] font-medium uppercase tracking-[0.25em] text-primary">
          {active.kicker}
        </p>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {active.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
          {active.caption}
        </p>
      </div>

      {/* controls */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={() => {
            setPlaying(false)
            go(step - 1)
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          aria-label="Previous step"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play
            </>
          )}
        </button>

        <button
          onClick={() => {
            setPlaying(false)
            go(step + 1)
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          aria-label="Next step"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* step label */}
      <p className="mt-4 text-center text-[12px] text-muted-foreground">
        {step + 1} / {STEPS.length}
      </p>
    </section>
  )
}
