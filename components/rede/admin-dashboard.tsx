'use client'

import { useState, useTransition } from 'react'
import { updateApplicationStatus, adminLogout } from '@/app/actions/admin'

type Application = {
  id: number
  fullName: string
  role: string
  email: string
  contact: string
  agency: string | null
  licenseNumber: string | null
  property: string | null
  notes: string | null
  status: string
  createdAt: Date
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-500/15 text-amber-500',
  qualified: 'bg-emerald-500/15 text-emerald-500',
  rejected: 'bg-destructive/15 text-destructive',
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-2 font-rede text-3xl font-semibold text-foreground">{value}</p>
    </div>
  )
}

function ApplicationRow({ app }: { app: Application }) {
  const [pending, startTransition] = useTransition()
  const [status, setStatus] = useState(app.status)

  function change(next: string) {
    setStatus(next)
    startTransition(() => updateApplicationStatus(app.id, next))
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-rede text-lg font-semibold text-foreground">{app.fullName}</h3>
          <p className="text-sm text-primary">{app.role}</p>
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
          <dd className="text-foreground">{app.email}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted-foreground">Contact</dt>
          <dd className="text-foreground">{app.contact}</dd>
        </div>
        {app.agency ? (
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Agency</dt>
            <dd className="text-foreground">{app.agency}</dd>
          </div>
        ) : null}
        {app.licenseNumber ? (
          <div className="flex gap-2">
            <dt className="text-muted-foreground">License</dt>
            <dd className="text-foreground">{app.licenseNumber}</dd>
          </div>
        ) : null}
        {app.property ? (
          <div className="flex gap-2 sm:col-span-2">
            <dt className="text-muted-foreground">Property</dt>
            <dd className="text-foreground">{app.property}</dd>
          </div>
        ) : null}
        {app.notes ? (
          <div className="flex gap-2 sm:col-span-2">
            <dt className="text-muted-foreground">Notes</dt>
            <dd className="text-foreground">{app.notes}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {new Date(app.createdAt).toLocaleDateString('en-PH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
        <div className="ml-auto flex gap-2">
          {['pending', 'qualified', 'rejected'].map((s) => (
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

export function AdminDashboard({ applications }: { applications: Application[] }) {
  const total = applications.length
  const qualified = applications.filter((a) => a.status === 'qualified').length
  const pending = applications.filter((a) => a.status === 'pending').length
  const conversion = total > 0 ? Math.round((qualified / total) * 100) : 0

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-rede text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            REDE Admin
          </p>
          <h1 className="mt-2 font-rede text-3xl font-semibold tracking-tight text-foreground">
            Stress Test Applications
          </h1>
        </div>
        <form action={adminLogout}>
          <button
            type="submit"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Applications" value={String(total)} />
        <StatCard label="Qualified" value={String(qualified)} />
        <StatCard label="Pending" value={String(pending)} />
        <StatCard label="Conversion" value={`${conversion}%`} />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
            <p className="font-rede text-lg font-semibold text-foreground">No applications yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Share your <span className="text-primary">/stress-test</span> link to start
              receiving applications.
            </p>
          </div>
        ) : (
          applications.map((app) => <ApplicationRow key={app.id} app={app} />)
        )}
      </div>
    </main>
  )
}
