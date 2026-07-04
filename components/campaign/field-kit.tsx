'use client'

import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import {
  FIELD_SCRIPTS,
  FIELD_PITCH,
  LEAVE_BEHIND_POINTS,
  FIELD_TRACKER_FIELDS,
  REDE_LINK,
  type FieldScript,
} from '@/lib/campaign-content'

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary active:scale-95 print:hidden"
    >
      {copied ? 'Copied' : label}
    </button>
  )
}

function ScriptCard({ script }: { script: FieldScript }) {
  const fullText = [
    `${script.modeLabel} — ${script.place}`,
    script.goal,
    '',
    ...script.steps.map((s) => `${s.label}: ${s.line}`),
    '',
    'Sagot sa tanong:',
    ...script.objections.map((o) => `${o.q} → ${o.a}`),
  ].join('\n')

  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card p-5 md:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-brand text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
            {script.modeLabel}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground">{script.place}</h3>
        </div>
        <CopyButton text={fullText} label="Copy script" />
      </header>

      <p className="text-pretty text-[13px] leading-relaxed text-muted-foreground">{script.goal}</p>

      <ol className="flex flex-col gap-3">
        {script.steps.map((s, i) => (
          <li key={s.label} className="flex gap-3">
            <span
              aria-hidden
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[12px] font-semibold text-primary"
            >
              {i + 1}
            </span>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-foreground/70">
                {s.label}
              </p>
              <p className="mt-0.5 text-[14px] leading-relaxed text-foreground">{s.line}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-border/50 bg-background/40 p-4">
        <p className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
          Sagot sa tanong
        </p>
        <dl className="mt-2 flex flex-col gap-3">
          {script.objections.map((o) => (
            <div key={o.q}>
              <dt className="text-[13px] font-medium text-foreground">{o.q}</dt>
              <dd className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{o.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

export function FieldKit() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-24 md:px-8">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="font-brand text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
          Field Kit
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
          On the ground.
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Dalawang mode para sa field work: subukan ang REDE live sa mga mall booth, at mag-ikot sa
          realty offices bilang marketing. Awareness muna — walang hard sell. Dalhin ang script, ang
          leave-behind, at ang QR.
        </p>
      </header>

      {/* Scripts */}
      <section className="mt-10" aria-labelledby="scripts-title">
        <h2 id="scripts-title" className="font-display text-lg font-semibold text-foreground">
          Field scripts
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Eksaktong linya — opener, demo flow, at sagot sa tanong.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {FIELD_SCRIPTS.map((s) => (
            <ScriptCard key={s.id} script={s} />
          ))}
        </div>
      </section>

      {/* Leave-behind + QR */}
      <section className="mt-12" aria-labelledby="leave-title">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 id="leave-title" className="font-display text-lg font-semibold text-foreground">
              Leave-behind
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Iwan ito sa realty offices. I-print o i-screenshot.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95 print:hidden"
          >
            Print
          </button>
        </div>

        {/* Printable card */}
        <div
          id="leave-behind-card"
          className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card"
        >
          <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
            <div className="p-6 md:p-8">
              <p className="font-brand text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                REDE · From data to decisions
              </p>
              <h3 className="mt-2 text-balance font-display text-2xl font-bold leading-tight text-foreground">
                The analytic assessment engine for property decisions.
              </h3>
              <p className="mt-3 text-pretty text-[13px] leading-relaxed text-muted-foreground">
                {FIELD_PITCH}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {LEAVE_BEHIND_POINTS.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 border-t border-border/60 bg-background/40 p-6 md:border-l md:border-t-0 md:p-8">
              <div className="rounded-xl bg-white p-3">
                <QRCodeCanvas value={REDE_LINK} size={148} level="M" marginSize={0} />
              </div>
              <p className="text-center text-[13px] font-medium text-foreground">Scan to try REDE</p>
              <p className="text-center text-[12px] text-muted-foreground">rede.ph</p>
            </div>
          </div>
        </div>
      </section>

      {/* Field tracker */}
      <section className="mt-12 print:hidden" aria-labelledby="tracker-title">
        <h2 id="tracker-title" className="font-display text-lg font-semibold text-foreground">
          Field tracker
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Itala ang bawat stop para may datos ka sa run.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border/60 bg-card">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border/60">
                {FIELD_TRACKER_FIELDS.map((f) => (
                  <th
                    key={f}
                    className="whitespace-nowrap px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, r) => (
                <tr key={r} className="border-b border-border/40 last:border-b-0">
                  {FIELD_TRACKER_FIELDS.map((f) => (
                    <td key={f} className="px-4 py-4">
                      <span className="block h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
