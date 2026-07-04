import { Reveal } from './reveal'

const OBJECTIVES = [
  ['Validate the Workflow', 'Confirm the end-to-end path professionals take to reach a decision.'],
  ['Identify Issues', 'Surface friction, gaps, and edge cases before they reach the market.'],
  ['Validate 30 Signals & 5 Lenses', 'Verify the intelligence layer holds up against real property questions.'],
  ['Collect Feedback', 'Gather structured input from the people who will use REDE daily.'],
  ['Prepare for Launch', 'Refine the product into a confident, market-ready release.'],
]

export function ProgramObjectives() {
  return (
    <section className="relative border-y border-border/50 bg-card/30 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Program Objectives
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Five goals. One market-ready product.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map(([title, body], i) => (
            <Reveal
              key={title}
              delay={(i % 3) * 80}
              className={`group flex flex-col justify-between rounded-3xl border border-border/60 bg-background/60 p-7 transition-colors hover:border-primary/50 ${
                i === 3 ? 'lg:col-span-2' : ''
              }`}
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
