'use client'

import { useState } from 'react'
import { Reveal } from './reveal'

type Segment = {
  key: string
  label: string
  audience: string
  question: string
  headline: string
  body: string
  outcomes: string[]
}

const SEGMENTS: Segment[] = [
  {
    key: 'agents',
    label: 'Agents & Brokers',
    audience: 'For the people who present and close',
    question: '"Why should I trust this price?"',
    headline: 'Walk in with evidence, not adjectives.',
    body: 'Brochures and amenities cannot answer the questions that close a deal. REDE gives you a decision report — 30 signals, 5 lenses, one clear read — so you present with conviction and defend every number.',
    outcomes: [
      'Win listings with data-backed confidence',
      'Defend price and position on the spot',
      'Client-ready briefings in minutes',
    ],
  },
  {
    key: 'sellers',
    label: 'Sellers & Owners',
    audience: 'For the people who set the price',
    question: '"What is my property really worth?"',
    headline: 'Price with proof, not with hope.',
    body: 'Overpricing stalls a sale; underpricing leaves money behind. REDE reads your property the way the market does — so you set a number you can stand behind and explain to any buyer.',
    outcomes: [
      'Understand true, defensible value',
      'See how your property scores across five lenses',
      'Enter negotiations from a position of evidence',
    ],
  },
  {
    key: 'builders',
    label: 'Builders & Developers',
    audience: 'For the people who commit capital to the ground',
    question: '"Is this the right place to build?"',
    headline: 'Read the market before you break ground.',
    body: 'Every project is a bet on people, demand and timing. REDE turns location intelligence into a structured decision — so you commit where the signals hold, and pass where they do not.',
    outcomes: [
      'Screen sites before capital is committed',
      'Test demand, absorption and connectivity',
      'Support the go / no-go with evidence',
    ],
  },
  {
    key: 'businesses',
    label: 'Businesses',
    audience: 'For the people choosing where to operate',
    question: '"Where should we locate?"',
    headline: 'Choose a location on logic, not on a hunch.',
    body: 'A branch, an office, a store — the address decides the outcome. REDE scores any location across people, economy, movement, infrastructure and connectivity, so your site selection is a decision you can justify to the board.',
    outcomes: [
      'Compare locations on one shared scale',
      'Justify site selection with structured data',
      'Reduce the risk of the wrong address',
    ],
  },
  {
    key: 'investors',
    label: 'Investors',
    audience: 'For the people who screen before they buy',
    question: '"Does the math actually work?"',
    headline: 'Screen the deal before you commit.',
    body: 'Yield, momentum, holding cost and demand rarely sit in one place. REDE assembles them into a single read — so you filter opportunities fast and only look closely at the ones that hold.',
    outcomes: [
      'Screen opportunities before committing capital',
      'See yield, momentum and holding costs together',
      'Move faster on the deals that qualify',
    ],
  },
]

export function Segments() {
  const [active, setActive] = useState(0)
  const current = SEGMENTS[active]

  return (
    <section
      id="segments"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            One engine, every decision
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Whatever you decide, decide it with evidence.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            REDE is not a listing site. It is a decision engine — and the
            question it answers changes with who is asking. Choose where you
            stand.
          </p>
        </Reveal>

        {/* Tab selector */}
        <Reveal delay={80}>
          <div
            role="tablist"
            aria-label="Audience segments"
            className="mt-14 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SEGMENTS.map((seg, i) => (
              <button
                key={seg.key}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === i
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border/70 bg-background/60 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {seg.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Detail panel */}
        <div
          key={current.key}
          className="mt-8 grid gap-8 rounded-[28px] border border-border/60 bg-background/70 p-8 md:grid-cols-2 md:p-12"
        >
          <div className="relative flex flex-col justify-between">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-primary/20 blur-[80px]"
            />
            <div className="relative">
              <p className="font-rede text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {current.audience}
              </p>
              <p className="mt-6 font-rede text-2xl font-medium leading-snug text-muted-foreground">
                {current.question}
              </p>
              <h3 className="mt-4 text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                {current.headline}
              </h3>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              {current.body}
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {current.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden
                  >
                    <path
                      d="M4 10.5l3.5 3.5L16 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
