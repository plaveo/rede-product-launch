import Image from 'next/image'
import { Reveal } from '../reveal'

export function TrainingHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center md:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/25 blur-[130px] md:h-[720px] md:w-[720px]"
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Client Training Manual
          </span>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-7 flex items-center justify-center">
            <Image
              src="/rede-mark.png"
              alt="REDE logo"
              width={288}
              height={288}
              priority
              className="h-20 w-20 md:h-28 md:w-28"
            />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <h1 className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
            Learn REDE, from data to decisions.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            A step-by-step training manual that teaches you how to turn any
            property into a clear, defensible decision using REDE.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#curriculum"
              className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-primary px-8 text-[15px] font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-95"
            >
              Start the training
            </a>
            <a
              href="#module-1"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[15px] font-medium text-foreground transition-colors hover:bg-card"
            >
              Jump to Module 1
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <dl className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4">
            {[
              ['6', 'Modules'],
              ['30', 'Signals'],
              ['5', 'Lenses'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-border/60 bg-card/40 p-4"
              >
                <dt className="font-display text-3xl font-semibold text-primary md:text-4xl">
                  {value}
                </dt>
                <dd className="mt-1 text-[12px] font-medium uppercase tracking-widest text-muted-foreground">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
