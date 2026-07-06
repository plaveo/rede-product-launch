'use client'

import { useEffect, useRef, useState } from 'react'
import { TONES, type ReedResult } from '@/lib/rede/result'

export function ResultVerdict({ result }: { result: ReedResult }) {
  const { property, overall, verdict, confidence, signalCount, gapCount } = result
  const tone = TONES[verdict]
  const ref = useRef<HTMLDivElement>(null)
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

  const R = 52
  const C = 2 * Math.PI * R

  return (
    <section className="mx-auto max-w-5xl px-5 pt-28 md:px-8 md:pt-36">
      {/* property line */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="font-rede font-semibold text-foreground">{property.name}</span>
        <span className="text-muted-foreground">{property.address}</span>
        <span className="ml-auto rounded-full border border-border/60 px-3 py-1 text-[11px] text-muted-foreground">
          {property.developer} · {property.type}
        </span>
      </div>

      <p className="mt-8 font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
        The REDE Result
      </p>

      <div
        ref={ref}
        className="mt-6 grid items-center gap-8 md:grid-cols-[auto_1fr]"
      >
        {/* gauge */}
        <div className="relative flex h-40 w-40 shrink-0 items-center justify-center md:h-48 md:w-48">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r={R} fill="none" stroke="var(--border)" strokeWidth="9" />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke={tone}
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={inView ? C * (1 - overall / 100) : C}
              style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-5xl font-semibold tabular-nums text-foreground md:text-6xl">
              {overall}
            </span>
            <span className="text-[11px] text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* verdict + meta */}
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ background: tone.replace(')', ' / 15%)'), color: tone }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: tone }} />
            {verdict}
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
            One position, built from evidence.
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground">
            A single professional verdict, traceable to {signalCount} real signals across
            five lenses — so you can explain this property with confidence.
          </p>

          <div className="mt-6 flex flex-wrap gap-6">
            <Meta label="Confidence" value={`${confidence}%`} />
            <Meta label="Signals read" value={`${signalCount - gapCount} / ${signalCount}`} />
            <Meta label="Honest gaps" value={`${gapCount}`} />
          </div>
        </div>
      </div>

      <p className="mt-8 border-t border-border/50 pt-4 text-[12px] leading-relaxed text-muted-foreground">
        Directional estimates modeled by the REDE engine — not an appraisal. REDE
        recommends; the client decides.
      </p>
    </section>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  )
}
