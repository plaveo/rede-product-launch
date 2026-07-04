'use client'

import { useEffect, useRef, useState } from 'react'

const SIGNALS = [
  { label: 'Foundation & Activity', value: 92 },
  { label: 'Connectivity', value: 78 },
  { label: 'Market Dynamics', value: 85 },
  { label: 'Risk & Opportunity', value: 71 },
  { label: 'Strategic Position', value: 88 },
]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), o.unobserve(e.target)),
      { threshold: 0.3 },
    )
    o.observe(node)
    return () => o.disconnect()
  }, [])
  return { ref, inView }
}

function ScoreRing({ score, active }: { score: number; active: boolean }) {
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
          strokeDashoffset={active ? c - (c * score) / 100 : c}
          style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold tracking-tight text-foreground">
          {score}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Decision
        </span>
      </div>
    </div>
  )
}

export function DecisionDashboard() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="w-full select-none text-left">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[oklch(0.6_0.16_25)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.14_85)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.14_150)]" />
        <div className="ml-3 flex items-center gap-2">
          <span className="font-rede text-[13px] font-semibold text-foreground">REDE</span>
          <span className="text-[11px] text-muted-foreground">Decision Workspace</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
          <span className="text-[10px] font-medium text-primary">Live analysis</span>
        </div>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-5">
        {/* left: property + score */}
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-border/60 bg-background/50 p-4">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Property
            </p>
            <p className="mt-1 font-display text-[15px] font-semibold leading-tight text-foreground">
              Two Serendra, Tower One
            </p>
            <p className="text-[12px] text-muted-foreground">BGC, Taguig • Residential</p>

            <div className="mt-4 flex items-center gap-4">
              <ScoreRing score={87} active={inView} />
              <div className="space-y-1.5">
                <span className="inline-flex items-center rounded-full bg-[oklch(0.7_0.14_150)]/15 px-2.5 py-1 text-[11px] font-semibold text-[oklch(0.8_0.14_150)]">
                  Strong Buy
                </span>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  High confidence across 30 signals.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ['30', 'Signals'],
              ['5', 'Lenses'],
              ['A+', 'Grade'],
            ].map(([v, l]) => (
              <div
                key={l}
                className="rounded-xl border border-border/60 bg-background/50 px-3 py-2.5 text-center"
              >
                <p className="font-display text-lg font-semibold text-foreground">{v}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* right: lens signal bars */}
        <div className="rounded-2xl border border-border/60 bg-background/50 p-4 md:col-span-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Interpretation Lenses
            </p>
            <span className="text-[11px] text-primary">View report</span>
          </div>
          <div className="mt-4 space-y-3.5">
            {SIGNALS.map((s, i) => (
              <div key={s.label}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12px] text-foreground">{s.label}</span>
                  <span className="font-rede text-[12px] font-semibold text-muted-foreground">
                    {s.value}
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border/60">
                  <div
                    className="h-full origin-left rounded-full bg-gradient-to-r from-primary/70 to-primary"
                    style={{
                      width: `${s.value}%`,
                      transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                      transition: `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${i * 120 + 200}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
