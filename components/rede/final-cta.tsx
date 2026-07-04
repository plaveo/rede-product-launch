import { Reveal } from './reveal'

export function FinalCta() {
  return (
    <section id="join" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]"
      />
      <div className="relative mx-auto max-w-3xl px-5 py-32 text-center md:py-48">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Stress Test Program · Invitation Only
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Join the REDE Stress Test Program.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            Every property, explained with data. Be one of the first to decide with
            REDE.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <a
            href="mailto:hello@pepworld.com?subject=REDE%20Stress%20Test%20Program"
            className="mt-10 inline-flex h-13 min-w-[260px] items-center justify-center rounded-full bg-primary px-9 py-4 text-[15px] font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:scale-[1.03] active:scale-95"
          >
            Request an invitation
          </a>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-10 font-rede text-[13px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Property · Economy · People
          </p>
        </Reveal>
      </div>
    </section>
  )
}
