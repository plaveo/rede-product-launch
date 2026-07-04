import { Reveal } from './reveal'

const BENEFITS = [
  ['Early Access', 'Use REDE before anyone else — while it is still being built.'],
  ['Direct Product Influence', 'Your feedback goes straight into the roadmap.'],
  ['Professional Decision Framework', 'Adopt a repeatable way to decide, for good.'],
  ['Help Shape the Platform', 'Leave your mark on the future of REDE.'],
]

export function WhyJoin() {
  return (
    <section className="relative border-y border-border/50 bg-card/30 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Why Join?
          </p>
          <h2 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Get in early. Shape what&apos;s next.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(([title, body], i) => (
            <Reveal
              key={title}
              delay={(i % 2) * 90}
              className="group relative overflow-hidden rounded-3xl border border-border/60 bg-background/60 p-8 transition-colors hover:border-primary/50 md:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10 blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <h3 className="relative font-rede text-2xl font-semibold text-foreground">
                {title}
              </h3>
              <p className="relative mt-3 text-base leading-relaxed text-muted-foreground">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
