import type { ReedResult } from '@/lib/rede/result'

export function ResultBriefing({ result }: { result: ReedResult }) {
  const { briefing, watchOuts } = result

  return (
    <section className="mx-auto max-w-5xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
        The Decision Briefing
      </p>
      <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        What to say. What to watch.
      </h2>
      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
        The short version — what to lead with, and what to raise before the client
        asks.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {/* highlight */}
        <div className="rede-glass rede-edge-light rounded-[24px] p-6 md:p-7">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: 'oklch(0.7 0.14 150)' }}
            />
            <h3 className="font-rede text-base font-semibold text-foreground">
              Highlight this
            </h3>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {briefing.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: 'oklch(0.7 0.14 150)' }}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* watch */}
        <div className="rede-glass rede-edge-light rounded-[24px] p-6 md:p-7">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: 'oklch(0.78 0.14 85)' }}
            />
            <h3 className="font-rede text-base font-semibold text-foreground">
              Watch out for
            </h3>
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {watchOuts.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: 'oklch(0.78 0.14 85)' }}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* one-line close */}
      <p className="mt-6 text-pretty text-sm leading-relaxed text-muted-foreground">
        Present the evidence. <span className="text-foreground">The client decides.</span>
      </p>
    </section>
  )
}
