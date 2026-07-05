const STEPS = [
  {
    count: '30',
    label: 'Analytic Assets',
    title: 'Signals',
    body: 'Thirty independent readings on a property. Each one is an analytic asset with two layers: a computation (the raw numbers and math) and an interpretation (a plain-language reading of what it means).',
    tone: 'oklch(0.62 0.19 264)',
  },
  {
    count: '5',
    label: 'Interpretation Lenses',
    title: 'Lenses',
    body: 'The thirty assets organize into five lenses — People, Economy, Movement, Infrastructure, Connectivity. Each lens turns its signals into one score and one assessment band.',
    tone: 'oklch(0.7 0.14 150)',
  },
  {
    count: '1',
    label: 'Guided Decision',
    title: 'Decision',
    body: 'The five lenses resolve into one position — a verdict with a confidence level and the reasons behind it. REDE recommends; the client decides.',
    tone: 'oklch(0.72 0.13 230)',
  },
]

export function ResultGuide() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <div className="rounded-[28px] border border-border/60 bg-card/30 p-6 md:p-10">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          How to read this
        </p>
        <h2 className="mt-4 text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          There is a method behind the score.
        </h2>
        <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          REDE reads every property the same way. Thirty analytic assets, computed
          and interpreted, flow into five lenses, and resolve into one decision.
          Nothing is a hunch — every layer traces back to the one below it.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-border/60 bg-background/50 p-5">
                <div className="flex items-baseline gap-2">
                  <span
                    className="font-display text-3xl font-semibold tabular-nums"
                    style={{ color: step.tone }}
                  >
                    {step.count}
                  </span>
                  <span className="font-rede text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {step.label}
                  </span>
                </div>
                <h3 className="mt-3 font-rede text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
              {i < STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-lg text-muted-foreground/50 md:block"
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
