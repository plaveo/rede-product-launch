import { Reveal } from './reveal'

const AUDIENCE = [
  ['Real Estate Salespersons', 'Walk into every client meeting with data-backed conviction.'],
  ['Licensed Brokers', 'Defend every price and every position with evidence.'],
  ['Property Advisors', 'Advise with a repeatable decision framework, not opinion.'],
  ['Real Estate Teams', 'One shared language, one system, for every decision.'],
]

export function BuiltFor() {
  return (
    <section className="relative border-y border-border/50 bg-card/30 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Built for Professionals
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Made for the people who decide.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map(([title, body], i) => (
            <Reveal
              key={title}
              delay={(i % 4) * 80}
              className="group flex flex-col justify-between rounded-3xl border border-border/60 bg-background/60 p-7 transition-colors hover:border-primary/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary">
                <span className="font-rede text-sm font-semibold">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="mt-10">
                <h3 className="font-rede text-lg font-semibold leading-snug text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
