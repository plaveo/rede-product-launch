import { Reveal } from './reveal'

const DETAILS = [
  ['Stage', 'Stress Test Program'],
  ['Access', 'Invitation Only'],
  ['Cohort', 'Limited Participants'],
  ['Prepared by', 'PEPWORLD'],
]

const PILLARS = ['Property', 'Economy', 'People']

export function ProgramStatus() {
  return (
    <section className="relative overflow-hidden mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Program Status
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Live now — for a select few.
        </h2>
      </Reveal>

      <Reveal delay={120} className="mx-auto mt-16 max-w-3xl">
        <div className="rede-glass rede-edge-light rede-shadow relative overflow-hidden rounded-[28px] p-8 md:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-[90px]"
          />

          {/* live status header */}
          <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="rede-pulse absolute inline-flex h-full w-full rounded-full bg-primary" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-rede text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
                Accepting Invitations
              </span>
            </span>
            <span className="font-rede text-[12px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              v0.9 · Pre-launch
            </span>
          </div>

          {/* detail rows */}
          <dl className="relative mt-8 space-y-px overflow-hidden rounded-2xl border border-border/60">
            {DETAILS.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between bg-background/60 px-5 py-4"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="font-rede text-sm font-semibold text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* pillars signature */}
          <div className="relative mt-8 flex items-center justify-center gap-4">
            {PILLARS.map((pillar, i) => (
              <div key={pillar} className="flex items-center gap-4">
                <span className="font-rede text-sm font-semibold uppercase tracking-[0.28em] text-foreground">
                  {pillar}
                </span>
                {i < PILLARS.length - 1 && (
                  <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
