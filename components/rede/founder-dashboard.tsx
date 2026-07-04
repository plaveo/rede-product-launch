'use client'

import { adminLogout } from '@/app/actions/admin'

type Survey = {
  id: number
  name: string
  company: string | null
  role: string | null
  yearsExperience: string | null
  email: string | null
  researchMethods: string | null
  biggestPain: string | null
  ratingEasy: number | null
  ratingProfessional: number | null
  ratingUseful: number | null
  ratingFast: number | null
  ratingTrustworthy: number | null
  dataTrust: string | null
  dataTrustReason: string | null
  assessmentHelp: string | null
  interpretationHelp: string | null
  confidenceGain: number | null
  timeNormal: number | null
  timeRede: number | null
  missingInfo: string | null
  useIntent: string | null
  payIntent: string | null
  payAmount: string | null
  recommendScore: number | null
  improveFirst: string | null
  createdAt: Date
}

function avg(nums: (number | null)[]): number | null {
  const valid = nums.filter((n): n is number => typeof n === 'number')
  if (valid.length === 0) return null
  return valid.reduce((a, b) => a + b, 0) / valid.length
}

function topOf(values: (string | null)[]): { label: string; count: number } | null {
  const counts = new Map<string, number>()
  values.forEach((v) => {
    if (!v) return
    // split multi-values (research methods stored comma-separated)
    v.split(',').map((s) => s.trim()).filter(Boolean).forEach((item) => {
      counts.set(item, (counts.get(item) ?? 0) + 1)
    })
  })
  let best: { label: string; count: number } | null = null
  counts.forEach((count, label) => {
    if (!best || count > best.count) best = { label, count }
  })
  return best
}

function pct(values: (string | null)[], match: string): number {
  const answered = values.filter(Boolean).length
  if (answered === 0) return 0
  const hits = values.filter((v) => v === match).length
  return Math.round((hits / answered) * 100)
}

function MetricCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? 'border-primary/40 bg-primary/10' : 'border-border bg-card/60'
      }`}
    >
      <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-rede text-3xl font-semibold text-foreground">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export function FounderDashboard({ surveys }: { surveys: Survey[] }) {
  const n = surveys.length

  // Core metrics
  const trustScore = avg(surveys.map((s) => s.ratingTrustworthy))
  const easeOfUse = avg(surveys.map((s) => s.ratingEasy))
  const confidence = avg(surveys.map((s) => s.confidenceGain))
  const recommend = avg(surveys.map((s) => s.recommendScore))

  // Time saved (avg minutes saved)
  const timeSavedVals = surveys
    .map((s) =>
      typeof s.timeNormal === 'number' && typeof s.timeRede === 'number'
        ? s.timeNormal - s.timeRede
        : null,
    )
    .filter((v): v is number => typeof v === 'number')
  const timeSaved = timeSavedVals.length
    ? Math.round(timeSavedVals.reduce((a, b) => a + b, 0) / timeSavedVals.length)
    : null

  // Intent
  const dailyUseYes = pct(surveys.map((s) => s.useIntent), 'Yes')
  const payYes = pct(surveys.map((s) => s.payIntent), 'Yes')

  // Qualitative
  const mostRequested = topOf(surveys.map((s) => s.missingInfo))
  const biggestPain = topOf(surveys.map((s) => s.biggestPain))
  const mostLoved = topOf(surveys.map((s) => s.improveFirst)) // fallback signal
  const topPayAmount = topOf(surveys.map((s) => s.payAmount))

  const fmt = (v: number | null, suffix = '') =>
    v === null ? '—' : `${Math.round(v * 10) / 10}${suffix}`

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-rede text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Founder Dashboard
          </p>
          <h1 className="mt-2 font-rede text-3xl font-semibold tracking-tight text-foreground">
            Stress Test Survey
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {n} {n === 1 ? 'response' : 'responses'} · Track only what matters: will they use it, will they pay.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/stress-test/admin"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            Applications
          </a>
          <form action={adminLogout}>
            <button
              type="submit"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {n === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
          <p className="font-rede text-lg font-semibold text-foreground">No survey responses yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your <span className="text-primary">/survey</span> link to start collecting feedback.
          </p>
        </div>
      ) : (
        <>
          {/* The 10 key metrics */}
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Willingness to Pay" value={`${payYes}%`} sub="answered “Yes”" accent />
            <MetricCard label="Daily Use Intent" value={`${dailyUseYes}%`} sub="answered “Yes”" accent />
            <MetricCard label="Recommendation" value={fmt(recommend, '/10')} sub="avg score" />
            <MetricCard label="Confidence Gain" value={fmt(confidence, '/10')} sub="avg score" />
            <MetricCard label="Trust Score" value={fmt(trustScore, '/10')} sub="avg trustworthy" />
            <MetricCard label="Ease of Use" value={fmt(easeOfUse, '/10')} sub="avg easy" />
            <MetricCard
              label="Time Saved"
              value={timeSaved === null ? '—' : `${timeSaved}m`}
              sub="avg per property"
            />
            <MetricCard
              label="Top Price Point"
              value={topPayAmount?.label ?? '—'}
              sub={topPayAmount ? `${topPayAmount.count} chose this` : undefined}
            />
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            <MetricCard
              label="Biggest Pain Point"
              value={biggestPain?.label ?? '—'}
              sub={biggestPain ? `${biggestPain.count} mentions` : undefined}
            />
            <MetricCard
              label="Most Requested Feature"
              value={mostRequested?.label ?? '—'}
              sub={mostRequested ? `${mostRequested.count} mentions` : undefined}
            />
            <MetricCard
              label="Most Suggested Improvement"
              value={mostLoved?.label ?? '—'}
              sub={mostLoved ? `${mostLoved.count} mentions` : undefined}
            />
          </div>

          {/* Individual responses */}
          <h2 className="mt-12 font-rede text-xl font-semibold text-foreground">Responses</h2>
          <div className="mt-4 flex flex-col gap-4">
            {surveys.map((s) => (
              <ResponseCard key={s.id} s={s} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}

function Line({ label, value }: { label: string; value: string | number | null }) {
  if (value === null || value === '' || value === undefined) return null
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{String(value)}</dd>
    </div>
  )
}

function ResponseCard({ s }: { s: Survey }) {
  const timeSaved =
    typeof s.timeNormal === 'number' && typeof s.timeRede === 'number'
      ? `${s.timeNormal - s.timeRede}m saved (${s.timeNormal}m → ${s.timeRede}m)`
      : null

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-rede text-lg font-semibold text-foreground">{s.name}</h3>
          <p className="text-sm text-primary">
            {[s.role, s.company, s.yearsExperience].filter(Boolean).join(' · ') || 'No profile details'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {s.useIntent && (
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              Use: {s.useIntent}
            </span>
          )}
          {s.payIntent && (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-500">
              Pay: {s.payIntent}
              {s.payAmount ? ` · ${s.payAmount}` : ''}
            </span>
          )}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <Line label="Email" value={s.email} />
        <Line label="Researches via" value={s.researchMethods} />
        <Line label="Biggest pain" value={s.biggestPain} />
        <Line
          label="Ratings"
          value={
            [
              s.ratingEasy != null ? `Easy ${s.ratingEasy}` : null,
              s.ratingProfessional != null ? `Pro ${s.ratingProfessional}` : null,
              s.ratingUseful != null ? `Useful ${s.ratingUseful}` : null,
              s.ratingFast != null ? `Fast ${s.ratingFast}` : null,
              s.ratingTrustworthy != null ? `Trust ${s.ratingTrustworthy}` : null,
            ]
              .filter(Boolean)
              .join(' · ') || null
          }
        />
        <Line label="Trusts data" value={s.dataTrust} />
        <Line label="Trust reason" value={s.dataTrustReason} />
        <Line label="Assessment helps" value={s.assessmentHelp} />
        <Line label="Interpretation helps" value={s.interpretationHelp} />
        <Line label="Confidence" value={s.confidenceGain != null ? `${s.confidenceGain}/10` : null} />
        <Line label="Recommend" value={s.recommendScore != null ? `${s.recommendScore}/10` : null} />
        <Line label="Time" value={timeSaved} />
        <Line label="Missing info" value={s.missingInfo} />
        <Line label="Would improve" value={s.improveFirst} />
      </dl>

      <p className="mt-4 text-xs text-muted-foreground">
        {new Date(s.createdAt).toLocaleDateString('en-PH', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>
    </div>
  )
}
