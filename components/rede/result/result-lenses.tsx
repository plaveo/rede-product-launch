'use client'

import { useEffect, useRef, useState } from 'react'
import type { Band, Lens } from '@/lib/rede/result'

const BAND_TONE: Record<Band, string> = {
  'Very Strong': 'oklch(0.7 0.14 150)',
  Strong: 'oklch(0.72 0.13 165)',
  Favorable: 'oklch(0.78 0.14 85)',
  Moderate: 'oklch(0.75 0.13 60)',
  Weak: 'oklch(0.6 0.16 25)',
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
      { threshold: 0.2 },
    )
    o.observe(node)
    return () => o.disconnect()
  }, [])

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
        The Five Lenses
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Where it is strong, where to look closer.
      </h2>

      <div ref={ref} className="mt-10 flex flex-col gap-3">
        {lenses.map((lens, i) => {
          const tone = BAND_TONE[lens.band]
          const role =
            lens.key === highlightKey
              ? 'Lead with this'
              : lens.key === watchKey
                ? 'Watch closely'
                : null
          return (
            <div
              key={lens.key}
              className="rede-glass rede-edge-light rounded-2xl p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-rede text-lg font-semibold text-foreground">
                  {lens.key}
                </span>
                {role ? (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: tone.replace(')', ' / 15%)'), color: tone }}
                  >
                    {role}
                  </span>
                ) : null}
                <span className="ml-auto flex items-baseline gap-2">
                  <span className="font-display text-2xl font-semibold tabular-nums text-foreground">
                    {lens.score}
                  </span>
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: tone }}
                  >
                    {lens.band}
                  </span>
                </span>
              </div>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {lens.question}
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border/50">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: tone,
                    width: inView ? `${lens.score}%` : '0%',
                    transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 120}ms`,
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
