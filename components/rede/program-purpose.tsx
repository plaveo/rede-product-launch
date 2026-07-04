import { Reveal } from './reveal'

export function ProgramPurpose() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Purpose of the Program
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Before launch, REDE meets the professionals it was built for.
        </h2>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          The REDE Pilot Program is product-market validation. A closed, invitation-only cohort
          pressure-tests the platform against real decisions, so the version we launch is proven,
          not assumed.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          ['Invitation Only', 'A deliberately small, hand-selected cohort of practitioners.'],
          ['Real Decisions', 'Tested against live property questions, not demos.'],
          ['Proof Before Launch', 'We validate the product before it reaches the market.'],
        ].map(([title, body], i) => (
          <Reveal
            key={title}
            delay={i * 80}
            className="rounded-3xl border border-border/60 bg-card/40 p-7"
          >
            <h3 className="font-rede text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
