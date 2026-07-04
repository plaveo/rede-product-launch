'use client'

import { useState } from 'react'
import { Reveal } from './reveal'

type Pin = {
  id: string
  name: string
  district: string
  score: number
  grade: string
  verdict: string
  x: number
  y: number
}

const PINS: Pin[] = [
  { id: 'p1', name: 'Two Serendra', district: 'BGC, Taguig', score: 87, grade: 'A+', verdict: 'Strong Buy', x: 28, y: 34 },
  { id: 'p2', name: 'Park Terraces', district: 'Ayala Center, Makati', score: 88, grade: 'A+', verdict: 'Strong Buy', x: 62, y: 26 },
  { id: 'p3', name: 'The Proscenium', district: 'Rockwell, Makati', score: 91, grade: 'A+', verdict: 'Strong Buy', x: 46, y: 58 },
  { id: 'p4', name: 'Grand Hyatt Residences', district: 'BGC, Taguig', score: 84, grade: 'A', verdict: 'Buy', x: 74, y: 62 },
  { id: 'p5', name: 'The Rise', district: 'Makati CBD', score: 66, grade: 'B', verdict: 'Caution', x: 36, y: 74 },
]

function toneFor(score: number) {
  if (score >= 80) return 'oklch(0.7 0.14 150)'
  if (score >= 55) return 'oklch(0.78 0.14 85)'
  return 'oklch(0.6 0.16 25)'
}

export function PropertyMap() {
  const [activeId, setActiveId] = useState('p3')
  const active = PINS.find((p) => p.id === activeId)!

  return (
    <section
      id="map"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Interactive Property Map
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            See the market spatially.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every property, scored and placed. Tap any point to read the decision
            without leaving the map.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <div className="rede-glass rede-edge-light rede-shadow overflow-hidden rounded-[28px]">
            <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-[oklch(0.6_0.16_25)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.14_85)]" />
              <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.14_150)]" />
              <span className="ml-3 font-rede text-[13px] font-semibold text-foreground">REDE</span>
              <span className="text-[11px] text-muted-foreground">Property Map</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
                <span className="text-[10px] font-medium text-primary">Metro Manila</span>
              </span>
            </div>

            <div className="grid md:grid-cols-5">
              {/* map canvas */}
              <div className="relative md:col-span-3">
                <div className="relative h-[320px] overflow-hidden bg-background/50 md:h-[420px]">
                  {/* abstract district blocks + roads (stylized, not geographic) */}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <defs>
                      <pattern id="mapgrid" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M8 0H0V8" fill="none" stroke="var(--border)" strokeWidth="0.3" opacity="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#mapgrid)" />
                    {/* stylized district blocks */}
                    {[
                      [10, 12, 26, 22], [42, 8, 30, 20], [16, 44, 24, 26],
                      [54, 44, 34, 22], [22, 76, 30, 16], [64, 72, 24, 20],
                    ].map(([x, y, w, h], i) => (
                      <rect
                        key={i}
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx="2"
                        fill="var(--card)"
                        stroke="var(--border)"
                        strokeWidth="0.4"
                        opacity="0.7"
                      />
                    ))}
                    {/* roads */}
                    <path d="M0 40 H100 M40 0 V100" stroke="var(--primary)" strokeWidth="0.5" opacity="0.25" />
                    <path d="M0 66 H100 M70 0 V100" stroke="var(--border)" strokeWidth="0.6" opacity="0.6" />
                  </svg>

                  {/* pins */}
                  {PINS.map((p) => {
                    const isActive = p.id === activeId
                    const tone = toneFor(p.score)
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActiveId(p.id)}
                        aria-label={`${p.name}, decision score ${p.score}`}
                        className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-110"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: isActive ? 20 : 10 }}
                      >
                        {isActive && (
                          <span
                            className="absolute inset-0 -m-1 animate-ping rounded-full"
                            style={{ background: tone, opacity: 0.3 }}
                          />
                        )}
                        <span
                          className="relative flex h-9 w-9 items-center justify-center rounded-full border-2 font-rede text-[11px] font-semibold text-foreground shadow-lg"
                          style={{
                            borderColor: tone,
                            background: isActive ? tone : 'var(--background)',
                            color: isActive ? 'var(--background)' : 'var(--foreground)',
                          }}
                        >
                          {p.grade}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* live property panel */}
              <div className="border-t border-border/60 p-5 md:col-span-2 md:border-l md:border-t-0 md:p-6">
                <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  Selected property
                </p>
                <p className="mt-1 font-display text-xl font-semibold leading-tight text-foreground">
                  {active.name}
                </p>
                <p className="text-[12px] text-muted-foreground">{active.district}</p>

                <div className="mt-5 flex items-center gap-4">
                  <div className="relative flex h-20 w-20 items-center justify-center">
                    <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                      <circle cx="40" cy="40" r="33" fill="none" stroke="var(--border)" strokeWidth="7" />
                      <circle
                        cx="40"
                        cy="40"
                        r="33"
                        fill="none"
                        stroke={toneFor(active.score)}
                        strokeWidth="7"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 33}
                        strokeDashoffset={2 * Math.PI * 33 * (1 - active.score / 100)}
                        style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)' }}
                      />
                    </svg>
                    <span className="absolute font-display text-xl font-semibold text-foreground">
                      {active.score}
                    </span>
                  </div>
                  <div>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold"
                      style={{
                        background: toneFor(active.score).replace(')', ' / 15%)'),
                        color: toneFor(active.score),
                      }}
                    >
                      {active.verdict}
                    </span>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                      Grade {active.grade} • {active.score >= 80 ? 'High' : active.score >= 55 ? 'Moderate' : 'Low'} confidence
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-border/60 pt-4">
                  {['Foundation', 'Market', 'Positioning'].map((l, i) => (
                    <div key={l} className="flex items-center justify-between gap-3">
                      <span className="text-[12px] text-foreground">{l}</span>
                      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-border/60">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.max(30, active.score - i * 8)}%`, transition: 'width 0.6s ease' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
