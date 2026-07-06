'use client'

import { useEffect, useRef, useState } from 'react'
import type { Band, Lens, LensKey } from '@/lib/rede/result'

/** Per-lens signature colors — matches the live rede.ph swatches. */
const LENS_COLOR: Record<LensKey, string> = {
  People: 'oklch(0.62 0.2 300)', // purple
  Economy: 'oklch(0.72 0.16 155)', // green
  Movement: 'oklch(0.74 0.15 65)', // amber
  Infrastructure: 'oklch(0.62 0.19 260)', // blue
  Connectivity: 'oklch(0.72 0.11 190)', // teal
}

/** Band words render green when positive, amber/red as they weaken. */
const BAND_TONE: Record<Band, string> = {
  'Very Strong': 'oklch(0.74 0.16 155)',
  Strong: 'oklch(0.74 0.16 155)',
  Favorable: 'oklch(0.74 0.16 155)',
  Moderate: 'oklch(0.78 0.14 75)',
  Weak: 'oklch(0.64 0.18 25)',
}

export function ResultLenses({
  lenses,
  highlightKey,
  watchKey,
}: {
  lenses: Lens[]
  highlightKey: string
  watchKey: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), o.unobserve(e.target)),
      { threshold: 0.15 },
    )
    o.observe(node)
    return () => o.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
      <div className="flex items-start gap-4">
        <span className="font-display text-4xl font-semibold leading-none text-primary md:text-5xl">
          05
        </span>
        <div className="border-l border-border/60 pl-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            5 Lenses Overview
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            The 30 signals organize into five lenses that interpret the score.
          </p>
        </div>
      </div>

      <div ref={ref} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {lenses.map((lens, i) => {
          const color = LENS_COLOR[lens.key]
          const bandTone = BAND_TONE[lens.band]
          const role =
            lens.key === highlightKey
              ? 'Lead with this'
              : lens.key === watchKey
                ? 'Watch closely'
                : null
          return (
            <div
              key={lens.key}
              className="rede-glass rede-edge-light relative overflow-hidden rounded-2xl p-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(12px)',
                transition: `opacity 0.6s ease ${i * 90}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
              }}
            >
              {/* subtle color wash in the corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl"
                style={{ background: color }}
              />

              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-3 w-3 rounded-[4px]"
                  style={{ background: color }}
                />
                <span className="font-rede text-[13px] font-semibold uppercase tracking-[0.14em] text-foreground">
                  {lens.key}
                </span>
                {role ? (
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
                    style={{ background: bandTone.replace(')', ' / 14%)'), color: bandTone }}
                  >
                    {role}
                  </span>
                ) : null}
              </div>

              <div className="mt-6 flex flex-col items-center text-center">
                <span className="font-display text-5xl font-semibold tabular-nums leading-none text-foreground md:text-6xl">
                  {lens.score}
                </span>
                <span
                  className="mt-3 text-[13px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: bandTone }}
                >
                  {lens.band}
                </span>
              </div>

              <p className="mt-5 text-center text-[13px] leading-relaxed text-muted-foreground">
                {lens.question}
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-border/50">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: color,
                    width: inView ? `${lens.score}%` : '0%',
                    transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 90 + 200}ms`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
