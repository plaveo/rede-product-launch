import type { Metadata } from 'next'
import { buildResult } from '@/lib/rede/result'
import { ResultVerdict } from '@/components/rede/result/result-verdict'
import { ResultGuide } from '@/components/rede/result/result-guide'
import { ResultLenses } from '@/components/rede/result/result-lenses'
import { ResultSignals } from '@/components/rede/result/result-signals'
import { ResultBriefing } from '@/components/rede/result/result-briefing'

export const metadata: Metadata = {
  title: 'The REDE Result — Every property, explained with data',
  description:
    'A worked REDE Result: one professional verdict, five interpretation lenses, and thirty real signals — the evidence behind a property decision.',
}

export default function ResultPage() {
  const result = buildResult()

  return (
    <main className="min-h-screen bg-background">
      <ResultVerdict result={result} />
      <ResultGuide />
      <ResultLenses
        lenses={result.lenses}
        highlightKey={result.highlight.key}
        watchKey={result.watch.key}
      />
      <ResultSignals
        lenses={result.lenses}
        gapCount={result.gapCount}
        signalCount={result.signalCount}
      />
      <ResultBriefing result={result} />

      <footer className="mx-auto max-w-5xl px-5 pb-28 md:px-8">
        <div className="rounded-[28px] border border-border/60 bg-card/30 p-8 text-center md:p-12">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            One click before every client meeting
          </p>
          <h2 className="mt-4 text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            This is what REDE hands you.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Every property, read the same way — so your recommendation always rests
            on evidence, never on a hunch.
          </p>
          <a
            href="/#top"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground rede-lift"
          >
            Back to REDE
          </a>
        </div>
      </footer>
    </main>
  )
}
