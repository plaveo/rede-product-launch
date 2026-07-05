'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Reveal } from './reveal'
import type { MapProperty } from './property-map-canvas'

const PropertyMapCanvas = dynamic(
  () => import('./property-map-canvas').then((m) => m.PropertyMapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[340px] w-full items-center justify-center bg-background/50 md:h-[460px]">
        <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
          Loading map…
        </span>
      </div>
    ),
  },
)

// Real Metro Manila coordinates (approx) for each scored property.
const PROPERTIES: MapProperty[] = [
  { id: 'p1', name: 'Two Serendra', district: 'BGC, Taguig', score: 87, grade: 'A+', verdict: 'Strong Buy', lng: 121.0509, lat: 14.5486 },
  { id: 'p2', name: 'Park Terraces', district: 'Ayala Center, Makati', score: 88, grade: 'A+', verdict: 'Strong Buy', lng: 121.0242, lat: 14.5533 },
  { id: 'p3', name: 'The Proscenium', district: 'Rockwell, Makati', score: 91, grade: 'A+', verdict: 'Strong Buy', lng: 121.0355, lat: 14.5636 },
  { id: 'p4', name: 'Grand Hyatt Residences', district: 'BGC, Taguig', score: 84, grade: 'A', verdict: 'Buy', lng: 121.0475, lat: 14.5525 },
  { id: 'p5', name: 'The Rise', district: 'Makati CBD', score: 66, grade: 'B', verdict: 'Caution', lng: 121.018, lat: 14.558 },
]

function toneFor(score: number) {
  if (score >= 80) return 'oklch(0.7 0.14 150)'
  if (score >= 55) return 'oklch(0.78 0.14 85)'
  return 'oklch(0.6 0.16 25)'
}

export function PropertyMap() {
  const [activeId, setActiveId] = useState('p3')
  const active = PROPERTIES.find((p) => p.id === activeId)!

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
            See the market in 3D.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every property, scored and placed on a live map of Metro Manila. Tap
            any point to read the decision without leaving the view.
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
                <span className="text-[10px] font-medium text-primary">Metro Manila · Live</span>
              </span>
            </div>

            <div className="grid md:grid-cols-5">
              {/* 3D map canvas */}
              <div className="relative md:col-span-3">
                <PropertyMapCanvas
                  properties={PROPERTIES}
                  activeId={activeId}
                  onSelect={setActiveId}
                />
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

                <a
                  href="/result"
                  className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-primary px-6 text-[14px] font-medium text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Open full decision
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
