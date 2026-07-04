import { Reveal } from '../reveal'
import { ModuleHeading } from './module-heading'

const PARTS = [
  {
    label: 'Decision score',
    what: 'A single number that summarizes the property.',
    how: 'Read it first for the headline, then dig into the lenses to understand why.',
  },
  {
    label: 'Lens breakdown',
    what: 'Five scores, one per interpretation lens.',
    how: 'Spot the strong and weak lenses to see where the property wins or is at risk.',
  },
  {
    label: 'Signal evidence',
    what: 'The raw data points behind each lens.',
    how: 'Open a lens to see the exact signals that moved the score up or down.',
  },
  {
    label: 'Recommendation',
    what: 'A plain-language verdict you can defend.',
    how: 'Use it directly with clients, or export the full report as a PDF.',
  },
]

export function ModuleReport() {
  return (
    <section
      id="module-5"
      className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <ModuleHeading
        module="05"
        eyebrow="Reading your report"
        title="Understand every section."
        intro="Your report is built to be read top to bottom — headline first, evidence underneath. Here is what each part means."
      />

      <div className="mt-14 overflow-hidden rounded-[28px] border border-border/60">
        {PARTS.map((p, i) => (
          <Reveal
            key={p.label}
            delay={i * 70}
            className={`grid gap-3 bg-card/40 p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-8 ${
              i < PARTS.length - 1 ? 'border-b border-border/50' : ''
            }`}
          >
            <h3 className="font-rede text-lg font-semibold text-foreground md:text-xl">
              {p.label}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="font-rede text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  What it is
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  {p.what}
                </p>
              </div>
              <div>
                <p className="font-rede text-[11px] font-semibold uppercase tracking-widest text-primary">
                  How to use it
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                  {p.how}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
