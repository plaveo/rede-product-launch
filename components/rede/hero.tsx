import Image from 'next/image'
import { Reveal } from './reveal'

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
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Property Decision Intelligence
          </span>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-7 flex items-baseline justify-center gap-1">
            <h1 className="font-rede text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
              REDE
            </h1>
            <span className="font-rede text-lg font-medium text-primary md:text-2xl">™</span>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Every property, explained with data.
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Professional property decision intelligence. Turn any property into a
            clear, defensible decision.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#join"
              className="inline-flex h-12 min-w-[240px] items-center justify-center rounded-full bg-primary px-8 text-[15px] font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Join the Stress Test Program
            </a>
            <a
              href="#what"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[15px] font-medium text-foreground transition-colors hover:bg-card"
            >
              See how it works
            </a>
          </div>
        </Reveal>
      </div>

      {/* cinematic product visual */}
      <Reveal delay={360} className="relative z-10 mt-14 w-full max-w-5xl px-5 md:mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-2xl shadow-primary/10">
          <Image
            src="/rede-hero.png"
            alt="REDE product visualization: a property dissolving into thousands of data signals converging into a single decision"
            width={1600}
            height={1000}
            priority
            className="h-auto w-full"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
          />
        </div>
      </Reveal>
    </section>
  )
}
