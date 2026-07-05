import { Reveal } from './reveal'
import { Parallax } from './parallax'
import { DecisionDashboard } from './previews/decision-dashboard'

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden pt-28 md:pt-36"
    >
      {/* ambient blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px] md:h-[720px] md:w-[720px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            From Data to Decision
          </span>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 flex items-center justify-center">
            <span className="font-display text-6xl font-semibold tracking-tight text-foreground md:text-8xl">
              REDE
            </span>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Every property, explained with data.
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            From data to decision. One click before every client meeting turns any
            property into a clear, defensible position.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex items-center justify-center">
            <a
              href="#what"
              className="inline-flex h-12 min-w-[240px] items-center justify-center rounded-full bg-primary px-8 text-[15px] font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-95"
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>

      {/* the software is the hero — live decision workspace */}
      <Reveal delay={360} className="relative z-10 mt-14 w-full max-w-5xl px-5 md:mt-20">
        <Parallax scaleFrom={0.96} lift={20}>
          <div className="rede-glass rede-edge-light rede-shadow rede-grid-bg relative overflow-hidden rounded-[28px]">
            <DecisionDashboard />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-t from-background/40 via-transparent to-transparent"
            />
          </div>
        </Parallax>
        {/* reflection */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto mt-2 h-24 w-[88%] rounded-b-[40px] bg-primary/10 opacity-60 blur-2xl"
        />
      </Reveal>
    </section>
  )
}
