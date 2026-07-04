import { Reveal } from './reveal'

const PROFILES = [
  ['Salespersons', 'Front-line agents who present and defend property decisions daily.'],
  ['Licensed Brokers', 'Professionals accountable for price, position, and advice.'],
  ['Property Advisors', 'Consultants who guide clients through complex choices.'],
  ['Investors', 'Buyers screening opportunities before committing capital.'],
  ['Property Owners', 'Owners who want to understand true, defensible value.'],
  ['Developers', 'Teams reading the market before they build.'],
  ['Real Estate Teams', 'Groups that need one shared decision language.'],
]

export function ParticipantProfile() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Participant Profile
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Who we&apos;re inviting.
        </h2>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          The cohort is built from practitioners who make real property decisions and can judge
          whether REDE earns its place in their work.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROFILES.map(([title, body], i) => (
          <Reveal
            key={title}
            delay={(i % 3) * 80}
            className={`group flex flex-col justify-between rounded-3xl border border-border/60 bg-card/40 p-7 transition-colors hover:border-primary/50 ${
              i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
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
    </section>
  )
}
