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

const AREA = [30, 34, 32, 41, 46, 44, 52, 58, 63, 68, 72, 80]
const BARS = [
  { label: 'BGC', v: 88 },
  { label: 'Makati', v: 82 },
  { label: 'Rockwell', v: 91 },
  { label: 'Ortigas', v: 64 },
  { label: 'QC', v: 58 },
]

export function Analytics() {
  const { ref, inView } = useInView<HTMLDivElement>()

  const w = 320
  const h = 120
  const max = 90
  const pts = AREA.map((v, i) => [(i / (AREA.length - 1)) * w, h - (v / max) * h])
  const line = pts.map((p) => `${p[0]},${p[1]}`).join(' ')
  const area = `0,${h} ${line} ${w},${h}`

  return (
    <section id="analytics" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="max-w-3xl">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Analytics
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Read the market at a glance.
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Demand, momentum and comparative value — visualized the moment you need
          them, across every location you track.
        </p>
      </Reveal>

      <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-3">
        {/* momentum area chart */}
        <Reveal className="rede-glass rede-edge-light rede-shadow rounded-[24px] p-6 lg:col-span-2">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                Demand momentum
              </p>
              <p className="mt-1 font-display text-3xl font-semibold text-foreground">
                +18.4<span className="text-lg text-muted-foreground">%</span>
              </p>
            </div>
            <span className="rounded-full bg-[oklch(0.7_0.14_150)]/15 px-3 py-1 text-[12px] font-semibold text-[oklch(0.8_0.14_150)]">
              12-mo trend
            </span>
          </div>
          <svg viewBox={`0 0 ${w} ${h}`} className="mt-5 h-32 w-full overflow-visible">
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points={area}
              fill="url(#areaFill)"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}
            />
            <polyline
              points={line}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 900,
                strokeDashoffset: inView ? 0 : 900,
                transition: 'stroke-dashoffset 1.8s ease',
              }}
            />
          </svg>
        </Reveal>

        {/* grade donut */}
        <Reveal delay={100} className="rede-glass rede-edge-light rede-shadow flex flex-col items-center justify-center rounded-[24px] p-6">
          <p className="self-start text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Portfolio grade
          </p>
          <div className="relative my-3 flex h-36 w-36 items-center justify-center">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--border)" strokeWidth="12" />
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={inView ? 2 * Math.PI * 48 * (1 - 0.82) : 2 * Math.PI * 48}
                style={{ transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)' }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-3xl font-semibold text-foreground">A</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Avg grade</span>
            </div>
          </div>
          <p className="text-center text-[12px] leading-relaxed text-muted-foreground">
            82% of tracked properties score B or higher.
          </p>
        </Reveal>

        {/* comparative bars */}
        <Reveal delay={60} className="rede-glass rede-edge-light rede-shadow rounded-[24px] p-6 lg:col-span-3">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Comparative value by location
          </p>
          <div className="mt-5 flex items-end justify-between gap-3 sm:gap-6">
            {BARS.map((b, i) => (
              <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-32 w-full items-end justify-center">
                  <div
                    className="w-full max-w-[52px] rounded-t-lg bg-gradient-to-t from-primary/40 to-primary"
                    style={{
                      height: inView ? `${b.v}%` : '2%',
                      transition: `height 1s cubic-bezier(0.16,1,0.3,1) ${i * 100 + 200}ms`,
                    }}
                  />
                </div>
                <span className="font-rede text-[12px] font-semibold text-foreground">{b.v}</span>
                <span className="text-[11px] text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
