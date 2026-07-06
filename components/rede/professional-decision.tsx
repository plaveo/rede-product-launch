'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from './reveal'

const VERDICTS = [
  {
    key: 'Confidence',
    tone: 'oklch(0.7 0.14 150)',
    range: '80 – 100',
    label: 'Proceed with confidence',
    desc: 'Signals align. The decision is well supported across all five lenses.',
  },
  {
    key: 'Caution',
    tone: 'oklch(0.78 0.14 85)',
    range: '55 – 79',
    label: 'Proceed with caution',
    desc: 'A workable opportunity with specific risks worth managing before you commit.',
  },
  {
    key: 'Further Review',
    tone: 'oklch(0.6 0.16 25)',
    range: '0 – 54',
    label: 'Needs further review',
    desc: 'Conflicting signals. REDE flags exactly what to investigate before deciding.',
  },
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

export function ProfessionalDecision() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [selected, setSelected] = useState(0)
  const v = VERDICTS[selected]

  return (
    <section
      id="decision"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            The Professional Decision
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Thirty signals become one answer.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            REDE resolves everything it reads into a single professional verdict —
            with the reasoning always in view.
          </p>
        </Reveal>

        <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-5">
          {/* verdict selector */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            {VERDICTS.map((verdict, i) => (
              <button
                key={verdict.key}
                type="button"
                onClick={() => setSelected(i)}
                className={`rede-lift group relative overflow-hidden rounded-2xl border p-5 text-left transition-all ${
                  selected === i
                    ? 'border-primary/50 bg-background'
                    : 'border-border/60 bg-background/50 hover:border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: verdict.tone }}
                  />
                  <span className="font-rede text-lg font-semibold text-foreground">
                    {verdict.key}
                  </span>
                  <span className="ml-auto font-rede text-[12px] font-semibold text-muted-foreground">
                    {verdict.range}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {verdict.desc}
                </p>
              </button>
            ))}
          </div>

          {/* decision output */}
          <div className="rede-glass rede-edge-light rede-shadow overflow-hidden rounded-[28px] lg:col-span-3">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
              <span className="font-rede text-[13px] font-semibold text-foreground">REDE</span>
              <span className="text-[11px] text-muted-foreground">Decision Output</span>
              <span className="ml-auto text-[11px] text-primary">Two Serendra • BGC</span>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-5">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 96 96" className="h-full w-full -rotate-90">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="var(--border)" strokeWidth="8" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      stroke={v.tone}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 40}
                      strokeDashoffset={
                        inView
                          ? 2 * Math.PI * 40 * (1 - (selected === 0 ? 0.87 : selected === 1 ? 0.66 : 0.42))
                          : 2 * Math.PI * 40
                      }
                      style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </svg>
                  <span className="absolute font-display text-2xl font-semibold text-foreground">
                    {selected === 0 ? '87' : selected === 1 ? '66' : '42'}
                  </span>
                </div>
                <div>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                    style={{ background: `${v.tone.replace(')', ' / 15%)')}`, color: v.tone }}
                  >
                    {v.label}
                  </span>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Reasoning
                </p>
                {['Market dynamics', 'Risk & opportunity', 'Strategic positioning'].map(
                  (r, i) => (
                    <div key={r} className="flex items-center justify-between">
                      <span className="text-[13px] text-foreground">{r}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-border/60 md:w-40">
                          <div
                            className="h-full rounded-full"
                            style={{
                              background: v.tone,
                              width: inView
                                ? `${[92, 74, 88][i] - selected * 14}%`
                                : '0%',
                              transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 140}ms`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a
            href="/result"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-[15px] font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Open the full decision — Two Serendra
          </a>
        </Reveal>
      </div>
    </section>
  )
}
