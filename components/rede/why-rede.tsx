import { Reveal } from './reveal'

const REASONS = [
  {
    stat: '30',
    unit: 'signals',
    title: 'Nothing overlooked',
    desc: 'REDE weighs thirty data points on every property — consistently, every time.',
  },
  {
    stat: '5',
    unit: 'lenses',
    title: 'The way experts think',
    desc: 'Signals are read through five professional lenses, not a single black-box score.',
  },
  {
    stat: '1',
    unit: 'decision',
    title: 'A clear answer',
    desc: 'Everything resolves into one professional verdict you can defend and present.',
  },
  {
    stat: '∞',
    unit: 'properties',
    title: 'Repeatable at scale',
    desc: 'The same rigor for one property or an entire portfolio.',
  },
]

export function WhyRede() {
  return (
    <section id="why-rede" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Why REDE
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Judgment, made systematic.
        </h2>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          REDE doesn&apos;t replace professional judgment. It gives it structure,
          speed and consistency.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r, i) => (
          <Reveal
            key={r.title}
            delay={(i % 4) * 80}
            className="rede-lift group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-7 transition-colors hover:border-primary/50"
          >
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-5xl font-semibold tracking-tight text-primary">
                {r.stat}
              </span>
              <span className="font-rede text-[13px] font-medium text-muted-foreground">
                {r.unit}
              </span>
            </div>
            <h3 className="mt-4 font-rede text-lg font-semibold text-foreground">{r.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
