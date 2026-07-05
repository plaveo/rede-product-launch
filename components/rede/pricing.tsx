import { Reveal } from './reveal'

type Tier = {
  name: string
  price: string
  period: string
  tagline: string
  seats: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
}

const tiers: Tier[] = [
  {
    name: 'Starter',
    price: '₱399',
    period: '/month',
    tagline: 'For the individual agent building a habit of evidence.',
    seats: '1 seat',
    features: [
      'Full property decision reports',
      'All 5 interpretation lenses',
      '30 signals per property',
      'Up to 20 reports / month',
      'Coverage map access',
    ],
    cta: 'Start with Starter',
    href: '/#program',
  },
  {
    name: 'Professional',
    price: '₱999',
    period: '/month',
    tagline: 'For the full-time professional who presents to close.',
    seats: '1 seat',
    features: [
      'Everything in Starter',
      'Unlimited property reports',
      'Priority signal refresh',
      'Downloadable PDF briefings',
      'Comparable & area analytics',
      'Client-ready presentation mode',
    ],
    cta: 'Go Professional',
    href: '/#program',
    featured: true,
  },
  {
    name: 'Brokerage',
    price: '₱9,999',
    period: '/month',
    tagline: 'For teams that decide together, at scale.',
    seats: '16 seats',
    features: [
      'Everything in Professional',
      '16 team seats included',
      'Shared team workspace',
      'Brokerage-wide report library',
      'Team activity overview',
      'Priority support',
    ],
    cta: 'Talk to us',
    href: '/#program',
  },
]

function Check() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
      aria-hidden
    >
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[150px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-[12px] font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Pricing
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-8 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Priced to prove value.
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              One decision engine, three ways to work. Start solo, go
              professional, or bring the whole brokerage.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:items-stretch">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="flex">
              <div
                className={`relative flex w-full flex-col rounded-3xl border p-8 backdrop-blur transition-colors ${
                  tier.featured
                    ? 'border-primary/60 bg-primary/[0.06] shadow-[0_0_60px_-15px] shadow-primary/30'
                    : 'border-border/70 bg-card/50'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground">
                    Most chosen
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {tier.name}
                  </h3>
                  <span className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {tier.seats}
                  </span>
                </div>

                <div className="mt-6 flex items-end gap-1">
                  <span className="font-display text-5xl font-semibold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  <span className="pb-1.5 text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                </div>

                <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {tier.tagline}
                </p>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                    >
                      <Check />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors ${
                    tier.featured
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-border/70 bg-card/40 text-foreground hover:bg-card/70'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-12 text-center text-[13px] leading-relaxed text-muted-foreground">
            All plans include the full REDE method — 30 signals, 5 lenses, 1
            decision. Prices in PHP, billed monthly. Cancel anytime.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
