'use client'

import { useRef, useState } from 'react'
import { Reveal } from './reveal'

const LENSES = [
  {
    index: '01',
    title: 'People',
    band: 'Who lives here',
    desc: 'Population density, growth, age profile and the buyer or tenant mix — whether the human demand is real and durable.',
  },
  {
    index: '02',
    title: 'Economy',
    band: 'Does the money work',
    desc: 'Price per sqm against benchmark, price momentum, achievable yield and holding costs — whether the math actually holds.',
  },
  {
    index: '03',
    title: 'Movement',
    band: 'How demand flows',
    desc: 'Accessibility, human flow, absorption and rental pace — how quickly people and demand move through the area.',
  },
  {
    index: '04',
    title: 'Infrastructure',
    band: 'Is it sound',
    desc: 'Utilities, development quality, developer track record and environmental exposure — whether the built environment holds up.',
  },
  {
    index: '05',
    title: 'Connectivity',
    band: 'Linked to the city',
    desc: 'Transit reach, proximity to major hubs and demand anchors — how well the property is tied into the wider city.',
  },
]

export function Lenses() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const scrollTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[i] as HTMLElement
    if (card) track.scrollTo({ left: card.offsetLeft - 20, behavior: 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1
    setActive(Math.round(track.scrollLeft / (cardWidth + 20)))
  }

  return (
    <section id="lenses" className="relative border-y border-border/50 bg-card/30 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            The Five Interpretation Lenses
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Five ways to read one property.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every signal is interpreted through five professional lenses — the way
            an expert would look at it, made systematic. Each lens returns a
            0–100 score and a plain-language band (Favorable, Strong, Very Strong)
            — directional estimates, not an appraisal.
          </p>
        </Reveal>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {LENSES.map((lens, i) => (
          <article
            key={lens.title}
            className="group relative flex min-h-[380px] w-[82vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[28px] border border-border/60 bg-background/70 p-8 sm:w-[420px] md:min-h-[440px] md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/20 blur-[80px] transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="relative">
              <span className="font-rede text-6xl font-semibold text-primary/30 md:text-7xl">
                {lens.index}
              </span>
            </div>
            <div className="relative">
              <p className="mb-2 font-rede text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                {lens.band}
              </p>
              <h3 className="font-rede text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                {lens.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {lens.desc}
              </p>
            </div>
          </article>
        ))}
        <div aria-hidden className="w-2 shrink-0 md:w-6" />
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-center gap-2 px-5">
        {LENSES.map((lens, i) => (
          <button
            key={lens.title}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Go to lens ${lens.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === i ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/40'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
