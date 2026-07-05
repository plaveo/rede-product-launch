'use client'

import { useState } from 'react'
import type { Lens } from '@/lib/rede/result'

function scoreTone(score: number | null): string {
  if (score === null) return 'oklch(0.68 0.014 258)'
  if (score >= 70) return 'oklch(0.7 0.14 150)'
  if (score >= 55) return 'oklch(0.78 0.14 85)'
  if (score >= 40) return 'oklch(0.75 0.13 60)'
  return 'oklch(0.6 0.16 25)'
}

export function ResultSignals({
  lenses,
  gapCount,
  signalCount,
}: {
  lenses: Lens[]
  gapCount: number
  signalCount: number
}) {
  const [open, setOpen] = useState<string>(lenses[0]?.key ?? '')

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
        The Evidence
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Thirty signals. Nothing hidden.
      </h2>
      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
        Every lens score traces back to real readings. Where data is missing, REDE
        says so — {gapCount} of {signalCount} signals are marked as honest gaps.
      </p>

      <div className="mt-10 flex flex-col gap-3">
        {lenses.map((lens) => {
          const isOpen = open === lens.key
          const gaps = lens.signals.filter((s) => s.score === null).length
          return (
            <div
              key={lens.key}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card/30"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? '' : lens.key)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-5 py-4 text-left"
              >
                <span className="font-rede text-base font-semibold text-foreground">
                  {lens.key}
                </span>
                <span className="text-[12px] text-muted-foreground">
                  6 signals{gaps > 0 ? ` · ${gaps} gap${gaps > 1 ? 's' : ''}` : ''}
                </span>
                <span className="ml-auto flex items-center gap-3">
                  <span className="font-display text-lg font-semibold tabular-nums text-foreground">
                    {lens.score}
                  </span>
                  <span
                    className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </span>
              </button>

              <div
                className="grid transition-all duration-400 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-px bg-border/40 sm:grid-cols-2">
                    {lens.signals.map((s) => {
                      const tone = scoreTone(s.score)
                      const gap = s.score === null
                      return (
                        <div key={s.name} className="bg-background/60 p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: tone }}
                            />
                            <span className="text-[13px] font-medium text-foreground">
                              {s.name}
                            </span>
                            <span
                              className="ml-auto text-[12px] font-semibold"
                              style={{ color: tone }}
                            >
                              {gap ? 'No data' : `${s.value}`}
                            </span>
                          </div>
                          <p className="mt-1.5 pl-3.5 text-[12px] leading-relaxed text-muted-foreground">
                            {s.note}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
