import { Reveal } from '../reveal'
import { ModuleHeading } from './module-heading'

const STEPS = [
  {
    n: '1',
    title: 'Open your workspace',
    desc: 'Sign in and land on your dashboard. This is home base for every property you evaluate.',
    tip: 'Tip: pin the workspace to your home screen for one-tap access.',
  },
  {
    n: '2',
    title: 'Search a property',
    desc: 'Type an address, building, or project name — or drop a pin on the map. REDE finds the exact property.',
    tip: 'Tip: partial names work. Start typing and pick from the suggestions.',
  },
  {
    n: '3',
    title: 'Confirm the match',
    desc: 'Check the property name, address, and developer so you are evaluating the right unit.',
    tip: 'Tip: if two units look alike, use the project and floor to tell them apart.',
  },
  {
    n: '4',
    title: 'Run the analysis',
    desc: 'Tap analyze. REDE begins gathering signals and building your decision in seconds.',
    tip: 'Tip: you can queue several properties and review them one by one.',
  },
]

export function ModuleGettingStarted() {
  return (
    <section
      id="module-2"
      className="relative border-y border-border/50 bg-card/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ModuleHeading
          module="02"
          eyebrow="Getting started"
          title="Enter your first property."
          intro="Four simple steps take you from an empty workspace to a property ready for analysis."
        />

        <div className="mt-14 flex flex-col gap-4">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 80}
              className="rede-lift group flex items-start gap-5 rounded-3xl border border-border/60 bg-background/50 p-6 hover:border-primary/40 md:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 md:h-14 md:w-14">
                <span className="font-rede text-xl font-semibold text-primary md:text-2xl">
                  {s.n}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-rede text-lg font-semibold text-foreground md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.desc}
                </p>
                <p className="mt-3 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-[13px] leading-relaxed text-muted-foreground">
                  {s.tip}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
