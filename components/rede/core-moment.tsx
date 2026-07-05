import { Reveal } from './reveal'

const BEFORE = [
  'Data scattered across a dozen tabs.',
  'Screenshots, PDFs, half-remembered numbers.',
  'Walking in hoping the client does not ask the hard question.',
]

const AFTER = [
  'Every number in one place, sourced and scored.',
  'A decision briefing ready to explain, not just show.',
  'You lead the meeting instead of surviving it.',
]

export function CoreMoment() {
  return (
    <section id="core" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            The Core
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            One click before every client meeting.
          </h2>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            In 2026, buyers are smart. They arrive with research, comparisons, and
            questions. Data is everywhere &mdash; but a system to turn it into a
            decision? None. That gap is where professionals lose confidence.
            REDE is that system.
          </p>
        </Reveal>

        {/* The one line that is the whole product */}
        <Reveal delay={80} className="mt-12">
          <div className="rounded-3xl border border-primary/30 bg-primary/[0.06] p-8 md:p-10">
            <p className="font-rede text-sm font-medium uppercase tracking-[0.2em] text-primary">
              The moment
            </p>
            <p className="mt-4 text-balance font-display text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              One click, and you walk in already prepared &mdash; the answers
              organized before the client asks.
            </p>
          </div>
        </Reveal>

        {/* Before / After the click */}
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-border/60 bg-card/40 p-8">
            <p className="font-rede text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Without a system
            </p>
            <ul className="mt-6 space-y-4">
              {BEFORE.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="rounded-3xl border border-primary/40 bg-primary/[0.04] p-8">
            <p className="font-rede text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              One click with REDE
            </p>
            <ul className="mt-6 space-y-4">
              {AFTER.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-foreground">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Confidence + origin credibility */}
        <Reveal delay={80} className="mt-14 max-w-3xl">
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            REDE does not decide for the client &mdash; it makes the professional
            certain. The same framework that taught a real estate professional to
            explain value with conviction, and convert &#8369;5&nbsp;billion in sales,
            is now one click away.
          </p>
          <p className="mt-6 font-display text-xl font-semibold text-foreground">
            The product is not the data. It is the confidence.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
