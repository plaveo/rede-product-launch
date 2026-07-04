import { Reveal } from '../reveal'
import { ModuleHeading } from './module-heading'
import { CheckCircle2 } from 'lucide-react'

const CHECKLIST = [
  'Read the decision score for the headline verdict.',
  'Check which lenses are strong and which are weak.',
  'Open the weak lenses and read the underlying signals.',
  'Decide whether the risks are acceptable for your goal.',
  'Write your recommendation in one clear sentence.',
  'Export the report so your decision is documented.',
]

export function ModuleDecision() {
  return (
    <section
      id="module-6"
      className="relative border-y border-border/50 bg-card/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ModuleHeading
          module="06"
          eyebrow="Making the decision"
          title="From report to recommendation."
          intro="The report gives you evidence. This module turns that evidence into a confident, defensible call."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <Reveal className="rounded-3xl border border-border/60 bg-background/50 p-6 md:p-8">
            <p className="font-rede text-[12px] font-semibold uppercase tracking-widest text-primary">
              Decision checklist
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                    strokeWidth={1.75}
                  />
                  <span className="text-sm leading-relaxed text-foreground md:text-base">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            className="flex flex-col justify-center rounded-3xl border border-primary/30 bg-primary/5 p-6 md:p-8"
          >
            <p className="font-rede text-[12px] font-semibold uppercase tracking-widest text-primary">
              The golden rule
            </p>
            <p className="mt-3 text-pretty font-display text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              If you can explain the decision with the data, you can defend it
              with anyone.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              A good REDE decision is never a guess. It is a recommendation you
              can walk a client, partner, or committee through, signal by signal.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
