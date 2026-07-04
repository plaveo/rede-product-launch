import { Reveal } from '../reveal'

export function ModuleHeading({
  module,
  eyebrow,
  title,
  intro,
}: {
  module: string
  eyebrow: string
  title: string
  intro?: string
}) {
  return (
    <Reveal className="max-w-3xl">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-rede text-[12px] font-semibold uppercase tracking-widest text-primary">
          Module {module}
        </span>
        <span className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </Reveal>
  )
}
