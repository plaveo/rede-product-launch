import { Reveal } from './reveal'
import { Parallax } from './parallax'
import { DecisionDashboard } from './previews/decision-dashboard'

const POINTS = [
  ['Decision score', 'One number that summarizes thirty signals.'],
  ['Live interpretation', 'Every lens updates as the data moves.'],
  ['Act instantly', 'Go from insight to recommendation in one view.'],
]

export function InteractiveDashboard() {
  return (
    <section
      id="dashboard"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            The Interactive Dashboard
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Your decision cockpit.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Everything REDE knows about a property, resolved into a single,
            living workspace built for professionals who decide for a living.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <Parallax scaleFrom={0.96} lift={18}>
            <div className="rede-glass rede-edge-light rede-shadow rede-grid-bg overflow-hidden rounded-[28px]">
              <DecisionDashboard />
            </div>
          </Parallax>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {POINTS.map(([t, d], i) => (
            <Reveal
              key={t}
              delay={i * 90}
              className="rounded-2xl border border-border/60 bg-background/50 p-6"
            >
              <h3 className="font-rede text-lg font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
