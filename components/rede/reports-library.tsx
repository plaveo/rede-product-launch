import { Reveal } from './reveal'

const REPORTS = [
  { title: 'Decision Report', desc: 'The full verdict — score, reasoning and all thirty signals.', tag: 'Flagship', span: 'sm:col-span-2' },
  { title: 'Comparative Report', desc: 'Two or more properties, side by side on what matters.', tag: 'Compare', span: '' },
  { title: 'Market Snapshot', desc: 'The state of a location at a single moment.', tag: 'Market', span: '' },
  { title: 'Client Presentation', desc: 'A polished narrative built to win the room.', tag: 'Present', span: 'sm:col-span-2' },
  { title: 'Risk Brief', desc: 'Every flagged risk, ranked and explained.', tag: 'Risk', span: '' },
  { title: 'Investment Case', desc: 'Upside, downside and the recommendation.', tag: 'Invest', span: '' },
]

export function ReportsLibrary() {
  return (
    <section
      id="report-types"
      className="relative border-y border-border/50 bg-card/30 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Reports
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            One click. The right document.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every kind of professional report REDE can generate — each ready to
            export, present and stand behind.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((r, i) => (
            <Reveal
              key={r.title}
              delay={(i % 3) * 80}
              className={`rede-lift group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-background/50 p-6 transition-colors hover:border-primary/50 ${r.span}`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                    <path d="M14 3v6h5M9 13h6M9 17h4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="rounded-full border border-border/60 bg-card/60 px-2.5 py-1 font-rede text-[11px] font-medium text-muted-foreground">
                  {r.tag}
                </span>
              </div>
              <div className="relative">
                <h3 className="font-rede text-xl font-semibold text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
