import { Reveal } from '@/components/rede/reveal'
import { journey } from '@/lib/book-content'

export function BookJourney() {
  return (
    <section aria-labelledby="journey-heading" className="border-t border-border/50 bg-card/20">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="font-rede text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            The Path to REDE
          </p>
          <h2
            id="journey-heading"
            className="font-display mt-4 text-2xl font-semibold text-foreground md:text-3xl"
          >
            Sixteen steps, one direction
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
            The story happened before REDE. Each step added a question, and the questions eventually
            became a method.
          </p>
        </Reveal>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2">
          {journey.map((step, i) => (
            <Reveal key={step} delay={i * 30} as="li">
              <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-background/40 px-4 py-3">
                <span className="font-rede flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-foreground/90">{step}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
