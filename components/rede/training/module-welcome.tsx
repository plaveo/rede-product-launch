import { Reveal } from '../reveal'
import { ModuleHeading } from './module-heading'

const POINTS = [
  {
    k: 'What REDE is',
    v: 'REDE is a property decision intelligence tool. It reads any property through structured data and gives you one clear recommendation.',
  },
  {
    k: 'Who it is for',
    v: 'Brokers, appraisers, developers, and investors who need fast, defensible property decisions backed by evidence.',
  },
  {
    k: 'The core idea',
    v: 'Instead of guessing, you evaluate every property the same disciplined way — data first, decision second.',
  },
]

export function ModuleWelcome() {
  return (
    <section
      id="module-1"
      className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <ModuleHeading
        module="01"
        eyebrow="Welcome to REDE"
        title="Start here."
        intro="Before you evaluate a single property, understand what REDE does and why it works the way it does."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {POINTS.map((p, i) => (
          <Reveal
            key={p.k}
            delay={i * 90}
            className="rede-lift rounded-3xl border border-border/60 bg-card/40 p-6 md:p-7"
          >
            <h3 className="font-rede text-lg font-semibold text-foreground">
              {p.k}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
              {p.v}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={280} className="mt-6">
        <div className="rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8">
          <p className="font-rede text-[12px] font-semibold uppercase tracking-widest text-primary">
            Key takeaway
          </p>
          <p className="mt-2 text-pretty text-base leading-relaxed text-foreground md:text-lg">
            REDE does not replace your judgment — it gives your judgment a
            consistent, data-backed foundation. Every property, explained with
            data.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
