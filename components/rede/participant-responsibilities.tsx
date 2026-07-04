import { Reveal } from './reveal'

const RESPONSIBILITIES = [
  ['Test Honestly', 'Use REDE as you would in real work, and judge it on real terms.'],
  ['Report Bugs', 'Flag anything that breaks, stalls, or behaves unexpectedly.'],
  ['Share Observations', 'Tell us what feels right, what feels off, and why.'],
  ['Respect Confidentiality', 'Keep pre-launch product details within the cohort.'],
  ['Provide Constructive Feedback', 'Offer specific, actionable input that improves the product.'],
]

export function ParticipantResponsibilities() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="max-w-3xl">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Participant Responsibilities
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          What we ask of every participant.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESPONSIBILITIES.map(([title, body], i) => (
          <Reveal
            key={title}
            delay={(i % 3) * 80}
            className={`group flex flex-col justify-between rounded-3xl border border-border/60 bg-card/40 p-7 transition-colors hover:border-primary/50 ${
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
    </section>
  )
}
