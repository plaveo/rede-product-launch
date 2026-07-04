import { Reveal } from './reveal'

const PRODUCTS = [
  { name: 'REDE', tone: 'var(--primary)', desc: 'Property decision intelligence.', active: true },
  { name: 'VALUE', tone: 'oklch(0.75 0.01 260)', desc: 'Professional property valuation.', active: false },
  { name: 'STAY', tone: 'oklch(0.72 0.1 190)', desc: 'Hospitality & bookings.', active: false },
]

export function Pepworld() {
  return (
    <section
      id="pepworld"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            A PEPWORLD Product
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Built by PEPWORLD.
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            REDE is one of three products from PEPWORLD, built to the same
            standard around a single belief — Property, Economy, People.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 90}
              className={`relative overflow-hidden rounded-3xl border p-8 transition-colors ${
                p.active
                  ? 'border-primary/50 bg-background'
                  : 'border-border/60 bg-background/40'
              }`}
            >
              {p.active && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-[80px]"
                />
              )}
              <div className="relative flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: p.tone }} />
                <span className="font-rede text-2xl font-semibold text-foreground">{p.name}</span>
                {p.active && (
                  <span className="ml-auto rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    You are here
                  </span>
                )}
              </div>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <p className="font-rede text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Property • Economy • People
          </p>
        </Reveal>
      </div>
    </section>
  )
}
