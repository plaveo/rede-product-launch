import { Reveal } from './reveal'

const CAPABILITIES = [
  {
    title: 'Market Conditions',
    desc: 'Read the state of the market around any property, instantly.',
    span: 'lg:col-span-2',
  },
  {
    title: 'Location Comparison',
    desc: 'Compare locations side by side on what actually matters.',
    span: '',
  },
  {
    title: 'Demand Analysis',
    desc: 'See where demand is building — and where it is fading.',
    span: '',
  },
  {
    title: 'Property Research',
    desc: 'Deep, structured research without the manual work.',
    span: '',
  },
  {
    title: 'Client Presentation',
    desc: 'Turn analysis into a presentation clients trust.',
    span: 'lg:col-span-2',
  },
  {
    title: 'Risk Identification',
    desc: 'Surface the risks before they become surprises.',
    span: '',
  },
  {
    title: 'Professional Recommendation',
    desc: 'One clear recommendation you can stand behind.',
    span: 'lg:col-span-3',
  },
]

export function Capabilities() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          What REDE Can Help You Do
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          One platform. Every decision.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((cap, i) => (
          <Reveal
            key={cap.title}
            delay={(i % 3) * 80}
            className={`group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-3xl border border-border/60 bg-card/50 p-7 transition-all hover:border-primary/50 hover:bg-card md:min-h-[240px] ${cap.span}`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <h3 className="relative font-rede text-xl font-semibold text-foreground md:text-2xl">
              {cap.title}
            </h3>
            <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              {cap.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
