'use client'

import { useMemo, useState, useTransition } from 'react'
import { updateLeadStatus } from '@/app/actions/leads'
import { adminLogout } from '@/app/actions/admin'

type Lead = {
  id: number
  fullName: string
  email: string
  contact: string
  role: string | null
  city: string | null
  interest: string | null
  source: string
  status: string
  notes: string | null
  createdAt: Date
}

const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'dropped'] as const

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-primary/15 text-primary',
  contacted: 'bg-amber-500/15 text-amber-500',
  qualified: 'bg-sky-500/15 text-sky-500',
  converted: 'bg-emerald-500/15 text-emerald-500',
  dropped: 'bg-destructive/15 text-destructive',
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-rede text-3xl font-semibold text-foreground">{value}</p>
    </div>
  )
}

function LeadRow({ lead }: { lead: Lead }) {
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState(lead.status)

  function change(next: string) {
    setStatus(next)
    startTransition(() => updateLeadStatus(lead.id, next))
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-rede text-lg font-semibold text-foreground">{lead.fullName}</h3>
          <p className="text-sm text-primary">{lead.role ?? 'Lead'}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            STATUS_STYLES[status] ?? 'bg-muted text-muted-foreground'
          }`}
        >
          {status}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="text-muted-foreground">Email</dt>
          <dd className="text-foreground break-all">{lead.email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted-foreground">Contact</dt>
          <dd className="text-foreground">{lead.contact}</dd>
        </div>
        {lead.city ? (
          <div className="flex gap-2">
            <dt className="text-muted-foreground">City</dt>
            <dd className="text-foreground">{lead.city}</dd>
          </div>
        ) : null}
        {lead.interest ? (
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Interest</dt>
            <dd className="text-foreground">{lead.interest}</dd>
          </div>
        ) : null}
        <div className="flex gap-2">
          <dt className="text-muted-foreground">Source</dt>
          <dd className="text-foreground">{lead.source}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {new Date(lead.createdAt).toLocaleDateString('en-PH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              disabled={pending || status === s}
              onClick={() => change(s)}
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium capitalize text-foreground transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-40"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LeadsDashboard({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState<string>('all')

  const counts = useMemo(() => {
    const total = leads.length
    const converted = leads.filter((l) => l.status === 'converted').length
    const qualified = leads.filter((l) => l.status === 'qualified').length
    const newLeads = leads.filter((l) => l.status === 'new').length
    const rate = total > 0 ? Math.round((converted / total) * 100) : 0
    return { total, converted, qualified, newLeads, rate }
  }, [leads])

  const visible = useMemo(
    () => (filter === 'all' ? leads : leads.filter((l) => l.status === filter)),
    [leads, filter],
  )

  function exportCsv() {
    const header = [
      'Name',
      'Email',
      'Contact',
      'Role',
      'City',
      'Interest',
      'Source',
      'Status',
      'Created',
    ]
    const rows = leads.map((l) => [
      l.fullName,
      l.email,
      l.contact,
      l.role ?? '',
      l.city ?? '',
      l.interest ?? '',
      l.source,
      l.status,
      new Date(l.createdAt).toISOString(),
    ])
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rede-leads-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-rede text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            REDE Admin
          </p>
          <h1 className="mt-2 font-rede text-3xl font-semibold tracking-tight text-foreground">
            Leads
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Export CSV
          </button>
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

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total Leads" value={String(counts.total)} />
        <StatCard label="New" value={String(counts.newLeads)} />
        <StatCard label="Qualified" value={String(counts.qualified)} />
        <StatCard label="Converted" value={`${counts.converted} · ${counts.rate}%`} />
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {['all', ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === s
                ? 'border-primary/50 bg-primary/15 text-primary'
                : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
            <p className="font-rede text-lg font-semibold text-foreground">No leads yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your <span className="text-primary">/leads</span> link or boost the FB
              creative to start capturing leads.
            </p>
          </div>
        ) : (
          visible.map((lead) => <LeadRow key={lead.id} lead={lead} />)
        )}
      </div>
    </main>
  )
}
