import Image from 'next/image'
import { Reveal } from './reveal'

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

          <dl className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border/60">
            {[
              ['Stage', 'Stress Test Program'],
              ['Access', 'Invitation Only'],
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
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/50 shadow-2xl shadow-primary/10">
            <Image
              src="/rede-program.png"
              alt="An invitation-only access token for the REDE Stress Test Program"
              width={1200}
              height={1200}
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
