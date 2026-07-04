'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from './reveal'

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const o = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), o.unobserve(e.target)),
      { threshold: 0.25 },
    )
    o.observe(node)
    return () => o.disconnect()
  }, [])
  return { ref, inView }
}

const HIGHLIGHTS = [
  ['Executive summary', 'A clear verdict and the reasoning behind it, up front.'],
  ['Signal breakdown', 'All thirty signals, grouped and scored.'],
  ['Charts & comparables', 'Market trends and side-by-side comparisons.'],
  ['Ready to present', 'Export a polished PDF your clients will trust.'],
]

export function ProfessionalReports() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section
      id="reports"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Professional Reports
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            The report writes itself.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Every analysis becomes a professional, presentation-ready document —
            structured like the work of a seasoned analyst, generated in seconds.
          </p>

          <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {HIGHLIGHTS.map(([t, d]) => (
              <div key={t}>
                <dt className="font-rede text-[15px] font-semibold text-foreground">{t}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{d}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* PDF preview */}
        <Reveal delay={140}>
          <div ref={ref} className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[40px] bg-primary/10 blur-[90px]"
            />
            <div className="rede-shadow relative mx-auto max-w-md overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.97_0.005_260)] text-[oklch(0.2_0.02_260)]">
              {/* document header */}
              <div className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-4">
                <div>
                  <p className="font-rede text-sm font-semibold text-[oklch(0.45_0.15_256)]">REDE</p>
                  <p className="text-[10px] uppercase tracking-widest text-black/40">
                    Property Decision Report
                  </p>
                </div>
                <span className="rounded-full bg-[oklch(0.7_0.14_150)]/15 px-2.5 py-1 text-[10px] font-semibold text-[oklch(0.42_0.13_150)]">
                  Strong Buy
                </span>
              </div>

              <div className="space-y-5 px-6 py-5">
                {/* title */}
                <div>
                  <p className="font-display text-lg font-semibold leading-tight">
                    Two Serendra, Tower One
                  </p>
                  <p className="text-[11px] text-black/50">BGC, Taguig • Residential Condominium</p>
                </div>

                {/* executive summary */}
                <div>
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-black/40">
                    Executive Summary
                  </p>
                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded bg-black/10" />
                    <div className="h-2 w-11/12 rounded bg-black/10" />
                    <div className="h-2 w-4/5 rounded bg-black/10" />
                  </div>
                </div>

                {/* score + chart row */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center justify-center rounded-lg bg-[oklch(0.45_0.15_256)]/8 px-4 py-3">
                    <span className="font-display text-2xl font-semibold text-[oklch(0.45_0.15_256)]">
                      87
                    </span>
                    <span className="text-[9px] uppercase tracking-wide text-black/40">Decision</span>
                  </div>
                  {/* mini line chart */}
                  <div className="flex-1 rounded-lg border border-black/10 p-3">
                    <svg viewBox="0 0 160 56" className="h-14 w-full">
                      <polyline
                        points="0,44 27,38 54,40 80,26 107,28 134,14 160,10"
                        fill="none"
                        stroke="oklch(0.45 0.15 256)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 260,
                          strokeDashoffset: inView ? 0 : 260,
                          transition: 'stroke-dashoffset 1.6s ease',
                        }}
                      />
                    </svg>
                  </div>
                </div>

                {/* bars */}
                <div className="space-y-2">
                  {[92, 74, 88, 66].map((w, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-[oklch(0.45_0.15_256)]"
                          style={{
                            width: inView ? `${w}%` : '0%',
                            transition: `width 1s ease ${i * 120}ms`,
                          }}
                        />
                      </div>
                      <span className="w-7 text-right text-[10px] tabular-nums text-black/50">{w}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black/10 bg-white px-6 py-3">
                <span className="text-[10px] text-black/40">Prepared by REDE • PEPWORLD</span>
                <span className="rounded-md bg-[oklch(0.45_0.15_256)] px-3 py-1 text-[10px] font-semibold text-white">
                  Download PDF
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
