import { Reveal } from './reveal'
import { Search, Layers, Gauge, FileText } from 'lucide-react'

const STAGES = [
  {
    icon: Search,
    step: 'Step 1',
    title: 'Enter a property',
    desc: 'Search any building, unit, or address. REDE instantly pulls the property into your workspace and begins reading it.',
    you: 'You type an address or pick from the map.',
    rede: 'REDE locates the property and loads its profile.',
  },
  {
    icon: Layers,
    step: 'Step 2',
    title: 'REDE gathers 30 signals',
    desc: 'Behind the scenes, REDE collects thirty structured signals — title integrity, market trend, flood exposure, rental yield, and more.',
    you: 'You wait a few seconds while data assembles.',
    rede: 'REDE reads 30 signals across 5 categories.',
  },
  {
    icon: Gauge,
    step: 'Step 3',
    title: 'Five lenses interpret the data',
    desc: 'The signals pass through five interpretation lenses that turn raw data into meaning — the way a seasoned professional would weigh them.',
    you: 'You review each lens and its score.',
    rede: 'REDE scores Foundation, Connectivity, Market, Risk, and Positioning.',
  },
  {
    icon: FileText,
    step: 'Step 4',
    title: 'Get one clear decision',
    desc: 'Everything resolves into a single decision score and a defensible recommendation you can act on or export as a professional report.',
    you: 'You act on the recommendation or export a report.',
    rede: 'REDE delivers one clear, defensible decision.',
  },
]

export function WorkflowGuide() {
  return (
    <section
      id="guide"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Using REDE
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            How it works, step by step.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            A simple walkthrough of what happens each time you evaluate a
            property — what you do, and what REDE does for you.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col gap-4 md:mt-20">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon
            return (
              <Reveal
                key={stage.title}
                delay={i * 90}
                className="rede-lift group overflow-hidden rounded-3xl border border-border/60 bg-background/50 p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 md:p-8"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 transition-transform duration-500 group-hover:scale-105 md:h-16 md:w-16">
                    <Icon className="h-6 w-6 text-primary md:h-7 md:w-7" strokeWidth={1.75} />
                  </div>

                  <div className="flex-1">
                    <p className="font-rede text-[12px] font-semibold uppercase tracking-widest text-primary">
                      {stage.step}
                    </p>
                    <h3 className="mt-1 font-rede text-xl font-semibold text-foreground md:text-2xl">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {stage.desc}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-border/50 bg-card/40 p-4">
                        <p className="font-rede text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                          You
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                          {stage.you}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                        <p className="font-rede text-[11px] font-semibold uppercase tracking-widest text-primary">
                          REDE
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                          {stage.rede}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
