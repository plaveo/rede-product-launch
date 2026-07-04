'use client'

import { useEffect, useRef, useState } from 'react'

const RESULTS = [
  { name: 'The Proscenium, Residences', meta: 'Rockwell, Makati • Rockwell Land', score: 91 },
  { name: 'Grand Hyatt Residences', meta: 'BGC, Taguig • Federal Land', score: 84 },
  { name: 'Park Terraces, Tower 3', meta: 'Ayala Center, Makati • Ayala Land', score: 88 },
]

const BARS = [42, 58, 51, 67, 73, 69, 82, 88]

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

export function ResearchPreview() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div ref={ref} className="w-full select-none text-left">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[oklch(0.6_0.16_25)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.14_85)]" />
        <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.14_150)]" />
        <span className="ml-3 font-rede text-[13px] font-semibold text-foreground">REDE</span>
        <span className="text-[11px] text-muted-foreground">Property Research</span>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-5">
        {/* search + results */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-2.5 rounded-full border border-primary/30 bg-background/60 px-4 py-2.5">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3-3" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] text-foreground">Makati condominium</span>
            <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-primary" />
          </div>

          <div className="mt-3 space-y-2">
            {RESULTS.map((r, i) => (
              <div
                key={r.name}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 px-3.5 py-2.5"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(10px)',
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 130 + 150}ms`,
                }}
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

        {/* analytics */}
        <div className="rounded-2xl border border-border/60 bg-background/50 p-4 md:col-span-2">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Demand trend
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">
            +18.4<span className="text-base text-muted-foreground">%</span>
          </p>
          <p className="text-[11px] text-[oklch(0.8_0.14_150)]">12-month momentum</p>

          <div className="mt-5 flex h-24 items-end gap-1.5">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary"
                style={{
                  height: inView ? `${h}%` : '4%',
                  transition: `height 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 70 + 200}ms`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
