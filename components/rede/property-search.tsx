import { Reveal } from './reveal'
import { Parallax } from './parallax'
import { ResearchPreview } from './previews/research-preview'

const POINTS = [
  ['Search anything', 'Property, project, building, developer or city.'],
  ['Instant scoring', 'Every result arrives already interpreted.'],
  ['Zero manual work', 'Deep research without the spreadsheet grind.'],
]

export function PropertySearch() {
  return (
    <section id="search" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="max-w-3xl">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Property Search
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Search is where it starts.
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          You don&apos;t browse REDE — you search it. Type a property and get
          structured, scored intelligence back in seconds.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-14">
        <Parallax scaleFrom={0.96} lift={18}>
          <div className="rede-glass rede-edge-light rede-shadow rede-grid-bg overflow-hidden rounded-[28px]">
            <ResearchPreview />
          </div>
        </Parallax>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {POINTS.map(([t, d], i) => (
          <Reveal
            key={t}
            delay={i * 90}
            className="rounded-2xl border border-border/60 bg-card/50 p-6"
          >
            <h3 className="font-rede text-lg font-semibold text-foreground">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
