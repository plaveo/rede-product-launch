import { Reveal } from '../reveal'
import { CheckCircle2 } from 'lucide-react'

const RECAP = [
  'What REDE is and why data leads to better decisions',
  'How to enter a property and run an analysis',
  'How to read the 30 signals and 5 lenses',
  'How to turn a report into a defensible recommendation',
]

export function TrainingComplete() {
  return (
    <section
      id="complete"
      className="relative mx-auto max-w-4xl px-5 py-28 text-center md:px-8 md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]"
      />

      <Reveal className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[12px] font-medium text-primary">
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
          Training complete
        </span>
        <h2 className="mx-auto mt-7 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          You are ready to evaluate any property.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          You now know the full REDE workflow — from data to decisions. Open your
          workspace and put it into practice.
        </p>
      </Reveal>

      <Reveal delay={120} className="relative mx-auto mt-12 max-w-lg">
        <ul className="flex flex-col gap-3 text-left">
          {RECAP.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card/40 p-4"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                strokeWidth={1.75}
              />
              <span className="text-sm leading-relaxed text-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={220} className="relative mt-10">
        <a
          href="#top"
          className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-full bg-primary px-8 text-[15px] font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-95"
        >
          Back to top
        </a>
      </Reveal>
    </section>
  )
}
