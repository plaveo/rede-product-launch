import { Reveal } from './reveal'

const STEPS = [
  { value: '1', label: 'Property', desc: 'You start with any property.' },
  { value: '30', label: 'Signals', desc: 'REDE gathers 30 structured signals.' },
  { value: '5', label: 'Interpretation Lenses', desc: 'Five lenses turn signals into meaning.' },
  { value: '1', label: 'Professional Decision', desc: 'One clear, defensible recommendation.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          How REDE Works
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          From property to decision.
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col items-stretch gap-4 md:mt-20">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center">
            <Reveal
              delay={i * 90}
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-6 md:p-8"
            >
              <div className="flex items-center gap-6">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 md:h-20 md:w-20">
                  <span className="font-rede text-2xl font-semibold text-primary md:text-3xl">
                    {step.value}
                  </span>
                </div>
                <div>
                  <h3 className="font-rede text-lg font-semibold text-foreground md:text-2xl">
                    {step.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>

            {i < STEPS.length - 1 && (
              <Reveal delay={i * 90 + 45} aria-hidden>
                <div className="my-1 h-10 w-px bg-gradient-to-b from-primary/60 to-primary/10" />
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
