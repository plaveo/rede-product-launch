'use client'

import { useState } from 'react'
import { Reveal } from './reveal'

const TABS = [
  { key: 'Dashboard', desc: 'Every decision, scored and ready to act on.' },
  { key: 'Search', desc: 'Find and research any property in seconds.' },
  { key: 'Maps', desc: 'See the market spatially, block by block.' },
  { key: 'Reports', desc: 'Professional documents, generated instantly.' },
  { key: 'Analytics', desc: 'Trends and demand, read at a glance.' },
]

function Bars({ n, active }: { n: number; active: boolean }) {
  return (
    <div className="flex items-end gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <div
          key={i}
          className="w-3 rounded-sm bg-gradient-to-t from-primary/40 to-primary"
          style={{
            height: active ? `${20 + ((i * 37) % 60)}px` : '4px',
            transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
          }}
        />
      ))}
    </div>
  )
}

function SurfaceMock({ tab }: { tab: string }) {
  if (tab === 'Dashboard')
    return (
      <div className="grid h-full grid-cols-3 gap-3">
        <div className="col-span-1 flex flex-col items-center justify-center rounded-xl border border-border/60 bg-background/60 p-4">
          <div className="font-display text-3xl font-semibold text-primary">87</div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Decision</div>
        </div>
        <div className="col-span-2 space-y-2 rounded-xl border border-border/60 bg-background/60 p-4">
          {[88, 74, 92].map((w, i) => (
            <div key={i} className="h-2 overflow-hidden rounded-full bg-border/60">
              <div className="h-full rounded-full bg-primary/80" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    )
  if (tab === 'Search')
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[12px] text-muted-foreground">Search property, project, developer…</span>
        </div>
        {['Two Serendra • BGC', 'Park Terraces • Makati', 'The Proscenium • Rockwell'].map((r) => (
          <div key={r} className="flex items-center justify-between rounded-lg border border-border/60 bg-background/60 px-4 py-2.5">
            <span className="text-[12px] text-foreground">{r}</span>
            <span className="font-rede text-[11px] font-semibold text-primary">View</span>
          </div>
        ))}
      </div>
    )
  if (tab === 'Maps')
    return (
      <div className="relative h-full overflow-hidden rounded-xl border border-border/60 bg-background/60 rede-grid-bg">
        {[
          { x: '22%', y: '30%', s: 'A+' },
          { x: '58%', y: '48%', s: 'A' },
          { x: '38%', y: '68%', s: 'B' },
          { x: '74%', y: '24%', s: 'A' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-primary/20 font-rede text-[10px] font-semibold text-primary"
            style={{ left: p.x, top: p.y }}
          >
            {p.s}
          </div>
        ))}
      </div>
    )
  if (tab === 'Reports')
    return (
      <div className="flex h-full gap-3">
        <div className="flex-1 space-y-2 rounded-xl border border-border/60 bg-background/60 p-4">
          <div className="h-3 w-2/3 rounded bg-foreground/20" />
          <div className="h-2 w-full rounded bg-border/60" />
          <div className="h-2 w-5/6 rounded bg-border/60" />
          <div className="h-2 w-4/6 rounded bg-border/60" />
          <div className="mt-3 h-14 rounded-lg bg-primary/10" />
        </div>
        <div className="flex w-16 flex-col items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
          <span className="font-rede text-[11px] font-semibold text-primary">PDF</span>
        </div>
      </div>
    )
  return (
    <div className="flex h-full items-end justify-center rounded-xl border border-border/60 bg-background/60 p-5">
      <Bars n={9} active />
    </div>
  )
}

export function ProductExperience() {
  const [tab, setTab] = useState('Dashboard')
  const activeDesc = TABS.find((t) => t.key === tab)?.desc

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="max-w-3xl">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          The Product Experience
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Five surfaces. One product.
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {activeDesc}
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-5 py-2.5 font-rede text-sm font-medium transition-all ${
                tab === t.key
                  ? 'border-primary/50 bg-primary/15 text-primary'
                  : 'border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground'
              }`}
            >
              {t.key}
            </button>
          ))}
        </div>

        <div className="rede-glass rede-edge-light rede-shadow rede-grid-bg mt-6 overflow-hidden rounded-[28px]">
          <div className="flex items-center gap-2 border-b border-border/60 px-5 py-3.5">
            <span className="h-3 w-3 rounded-full bg-[oklch(0.6_0.16_25)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.14_85)]" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.14_150)]" />
            <span className="ml-3 font-rede text-[13px] font-semibold text-foreground">REDE</span>
            <span className="text-[11px] text-muted-foreground">{tab}</span>
          </div>
          <div className="h-[240px] p-5 md:h-[280px] md:p-7">
            <SurfaceMock tab={tab} />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
