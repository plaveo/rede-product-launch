import { Reveal } from './reveal'

const WEEKS = [
  ['Week 1', 'Orientation & Access', 'Onboarding, invitations activated, and a guided first look at REDE.'],
  ['Week 2', 'Platform Exploration', 'Participants explore every surface at their own pace.'],
  ['Week 3', 'Real-world Scenario Testing', 'Run live property decisions through the full engine.'],
  ['Week 4', 'Feedback & Validation', 'Structured feedback, findings, and readiness sign-off.'],
]

export function ProgramFlow() {
  return (
    <section className="relative border-y border-border/50 bg-card/30 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Program Flow
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Four weeks, start to validation.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* horizontal progress line (desktop) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-primary/10 via-primary/50 to-primary/10 lg:block"
          />
          <ol className="grid gap-4 lg:grid-cols-4">
            {WEEKS.map(([week, title, desc], i) => (
              <li key={week} className="relative">
                <Reveal delay={i * 90} className="flex h-full flex-col">
                  <div className="relative z-10 flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-background font-rede text-sm font-semibold text-primary">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-rede text-sm font-medium uppercase tracking-[0.18em] text-primary">
                      {week}
                    </span>
                  </div>
                  <div className="mt-6 flex-1 rounded-3xl border border-border/60 bg-background/60 p-7">
                    <h3 className="font-rede text-lg font-semibold leading-snug text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
