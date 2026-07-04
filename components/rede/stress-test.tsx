import { Reveal } from './reveal'
import { Parallax } from './parallax'
import { AccessPass } from './previews/access-pass'

export function StressTest() {
  return (
    <section
      id="program"
      className="relative overflow-hidden border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Stress Test Program
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Early access, by invitation.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Be among the first professionals to put REDE to work — and help shape
            the platform before it launches.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {['Invitation Only', 'Early Access', 'Limited Participants'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[12px] font-medium text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {tag}
              </span>
            ))}
          </div>

          <dl className="mt-8 space-y-px overflow-hidden rounded-2xl border border-border/60">
            {[
              ['Stage', 'Stress Test Program'],
              ['Access', 'Invitation Only'],
              ['Purpose', 'Professional product validation'],
              ['Prepared by', 'PEPWORLD'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between bg-background/60 px-5 py-4"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="font-rede text-sm font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-90 rounded-full bg-primary/20 blur-[110px]"
          />
          <Parallax scaleFrom={0.92} lift={24} className="relative">
            <div className="rede-float">
              <AccessPass />
            </div>
          </Parallax>
        </Reveal>
      </div>
    </section>
  )
}
