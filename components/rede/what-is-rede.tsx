import { Reveal } from './reveal'
import { Parallax } from './parallax'
import { ResearchPreview } from './previews/research-preview'

export function WhatIsRede() {
  return (
    <section id="what" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          What is REDE?
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          A decision engine for real estate.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          REDE reads a property the way a seasoned professional would — then
          explains the decision in plain, defensible language.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-16 md:mt-20">
        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 top-[-20%] h-64 bg-primary/15 blur-[120px]"
          />
          <Parallax scaleFrom={0.95} lift={22}>
            <div className="rede-glass rede-edge-light rede-shadow rede-grid-bg relative overflow-hidden rounded-[28px]">
              <ResearchPreview />
            </div>
          </Parallax>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
        {[
          ['Reads the property', 'Every relevant signal, gathered and structured automatically.'],
          ['Interprets the data', 'Five professional lenses turn raw signals into meaning.'],
          ['Explains the decision', 'One clear, defensible recommendation you can present.'],
        ].map(([title, body], i) => (
          <Reveal key={title} delay={i * 90} className="text-center sm:text-left">
            <h3 className="font-rede text-base font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
