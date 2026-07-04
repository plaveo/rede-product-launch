import { Reveal } from '@/components/rede/reveal'
import { bookMeta } from '@/lib/book-content'

export function BookHero() {
  return (
    <header className="relative overflow-hidden">
      <div className="rede-grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-primary/10 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-5 pb-16 pt-32 text-center md:px-8 md:pb-24 md:pt-40">
        <Reveal>
          <p className="font-rede text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            {bookMeta.manual}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-display mt-6 text-balance text-4xl font-semibold leading-[1.05] text-foreground md:text-6xl">
            {bookMeta.title}
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {bookMeta.subtitle}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>By {bookMeta.author}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/50" aria-hidden />
            <span>{bookMeta.publisher}</span>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mx-auto mt-12 max-w-xl space-y-3 rounded-2xl border border-border/60 bg-card/40 p-6 text-left">
            {bookMeta.premise.map((line) => (
              <p key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                <span>{line}</span>
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </header>
  )
}
