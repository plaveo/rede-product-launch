import { Reveal } from './reveal'

const FLOW = [
  ['Login', 'Get your invitation and step in.'],
  ['Explore the Platform', 'See REDE the way professionals will.'],
  ['Test Workflows', 'Run real decisions through the engine.'],
  ['Submit Feedback', 'Tell us what works and what does not.'],
  ['Report Bugs', 'Flag anything that breaks or feels off.'],
  ['Improve the Product', 'Shape the platform before launch.'],
]

export function Participants() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          What Participants Will Do
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          A simple, guided workflow.
        </h2>
      </Reveal>

      <ol className="mx-auto mt-16 max-w-2xl">
        {FLOW.map(([title, desc], i) => (
          <li key={title} className="relative flex gap-6 pb-10 last:pb-0">
            {/* connector line */}
            {i < FLOW.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[23px] top-12 h-full w-px bg-gradient-to-b from-primary/50 to-primary/5"
              />
            )}
            <Reveal
              delay={i * 70}
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10"
            >
              <span className="font-rede text-sm font-semibold text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
            </Reveal>
            <Reveal delay={i * 70 + 40} className="pt-1.5">
              <h3 className="font-rede text-xl font-semibold text-foreground md:text-2xl">
                {title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                {desc}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
