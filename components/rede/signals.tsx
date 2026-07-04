'use client'

import { useEffect, useRef, useState } from 'react'
import { Reveal } from './reveal'

const GROUPS = [
  {
    lens: 'People',
    signals: ['Population Density', 'Population Growth', 'Median Age', 'Catchment Size', 'Buyer/Tenant Mix', 'Demand Durability'],
  },
  {
    lens: 'Economy',
    signals: ['Price per sqm', 'Price Momentum', 'BIR Zonal Anchor', 'Gross Yield', 'Holding Costs', 'Vacancy Level'],
  },
  {
    lens: 'Movement',
    signals: ['Accessibility', 'Human Flow', 'Absorption', 'Demand Drivers', 'Congestion', 'Rental Pace'],
  },
  {
    lens: 'Infrastructure',
    signals: ['Utilities', 'Build Quality', 'Developer Record', 'Development Activity', 'Flood/Seismic', 'Future Projects'],
  },
  {
    lens: 'Connectivity',
    signals: ['Transit Reach', 'Hub Proximity', 'Demand Anchors', 'Walkability', 'Regional Links', 'City Integration'],
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
      { threshold: 0.2 },
    )
    o.observe(node)
    return () => o.disconnect()
  }, [])
  return { ref, inView }
}

export function Signals() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [count, setCount] = useState(0)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    if (!inView) return
    let n = 0
    const id = setInterval(() => {
      n += 1
      setCount(n)
      if (n >= 30) clearInterval(id)
    }, 40)
    return () => clearInterval(id)
  }, [inView])

  let signalIndex = -1

  return (
    <section id="signals" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="max-w-3xl">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          30 Signals
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Thirty signals. One property.
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          REDE reads every property through thirty distinct signals — the same
          data points a seasoned professional would weigh, captured
          systematically and read in seconds.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-14">
        <div
          ref={ref}
          className="rede-glass rede-edge-light rede-shadow overflow-hidden rounded-[28px]"
        >
          {/* header strip */}
          <div className="flex flex-wrap items-center gap-4 border-b border-border/60 px-5 py-4 md:px-7">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tabular-nums text-primary md:text-4xl">
                {count.toString().padStart(2, '0')}
              </span>
              <span className="text-sm text-muted-foreground">/ 30 signals analyzed</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
              <span className="text-[11px] font-medium text-primary">Signal engine</span>
            </div>
          </div>

          {/* signal grid grouped by lens */}
          <div className="grid gap-px bg-border/40 md:grid-cols-5">
            {GROUPS.map((group, gi) => (
              <div key={group.lens} className="bg-background/60 p-4 md:p-5">
                <p className="mb-3 font-rede text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.lens}
                </p>
                <div className="flex flex-col gap-2">
                  {group.signals.map((sig) => {
                    signalIndex += 1
                    const idx = signalIndex
                    const revealed = count > idx
                    return (
                      <button
                        key={sig}
                        type="button"
                        onMouseEnter={() => setActive(idx)}
                        onFocus={() => setActive(idx)}
                        onMouseLeave={() => setActive(null)}
                        className={`group flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all duration-300 ${
                          active === idx
                            ? 'border-primary/50 bg-primary/10'
                            : 'border-border/50 bg-card/40'
                        }`}
                        style={{
                          opacity: revealed ? 1 : 0.2,
                          transform: revealed ? 'translateY(0)' : 'translateY(6px)',
                          transition: 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease, border-color 0.3s ease',
                        }}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                            revealed ? 'bg-primary' : 'bg-muted-foreground/40'
                          }`}
                        />
                        <span className="text-[12px] leading-tight text-foreground">{sig}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
