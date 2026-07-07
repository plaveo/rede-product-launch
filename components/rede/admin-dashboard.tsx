"use client"

import { useState, useTransition } from "react"
import { setApplicationStatus, logout } from "@/app/actions/stress-admin"

export type Application = {
  id: number
  full_name: string
  email: string
  contact: string
  role: string
  status: string
  created_at: string
}

const FILTERS = ["pending", "approved", "rejected", "all"] as const
type Filter = (typeof FILTERS)[number]

const STATUS_STYLE: Record<string, string> = {
  pending: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  approved: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  rejected: "border-red-400/40 bg-red-400/10 text-red-300",
}

export function AdminDashboard({ applications }: { applications: Application[] }) {
  const [filter, setFilter] = useState<Filter>("pending")
  const [pendingId, setPendingId] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [, startTransition] = useTransition()

  const counts = {
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    all: applications.length,
  }

  const rows = applications.filter((a) => (filter === "all" ? true : a.status === filter))

  function update(id: number, status: string) {
    setPendingId(id)
    startTransition(async () => {
      await setApplicationStatus(id, status)
      setPendingId(null)
    })
  }

  function copyEmail(id: number, email: string) {
    navigator.clipboard?.writeText(email)
    setCopiedId(id)
    setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            REDE Stress Test
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Applications
          </h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full border border-border/60 px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>

      {/* filters */}
      <div className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-2 text-[13px] font-medium capitalize transition-all ${
              filter === f
                ? "border-primary/50 bg-primary/15 text-primary"
                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {f} <span className="ml-1 opacity-60">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* list */}
      <div className="mt-6 space-y-3">
        {rows.length === 0 && (
          <div className="rede-glass rede-edge-light rounded-2xl p-10 text-center text-muted-foreground">
            No {filter === "all" ? "" : filter} applications yet.
          </div>
        )}

        {rows.map((a) => (
          <div
            key={a.id}
            className="rede-glass rede-edge-light rounded-2xl p-5 md:flex md:items-center md:justify-between md:gap-6"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="font-display text-[16px] font-semibold text-foreground">{a.full_name}</p>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${
                    STATUS_STYLE[a.status] ?? "border-border/60 text-muted-foreground"
                  }`}
                >
                  {a.status}
                </span>
                <span className="rounded-full border border-border/50 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {a.role}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
                <button
                  onClick={() => copyEmail(a.id, a.email)}
                  className="transition-colors hover:text-foreground"
                  title="Copy email"
                >
                  {copiedId === a.id ? "Copied!" : a.email}
                </button>
                <span>{a.contact}</span>
                <span className="opacity-60">
                  {new Date(a.created_at).toLocaleDateString("en-PH", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="mt-4 flex shrink-0 gap-2 md:mt-0">
              {a.status !== "approved" && (
                <button
                  onClick={() => update(a.id, "approved")}
                  disabled={pendingId === a.id}
                  className="rounded-lg bg-emerald-500/90 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
                >
                  {pendingId === a.id ? "…" : "Approve"}
                </button>
              )}
              {a.status !== "rejected" && (
                <button
                  onClick={() => update(a.id, "rejected")}
                  disabled={pendingId === a.id}
                  className="rounded-lg border border-border/60 px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
                >
                  Reject
                </button>
              )}
              {a.status !== "pending" && (
                <button
                  onClick={() => update(a.id, "pending")}
                  disabled={pendingId === a.id}
                  className="rounded-lg border border-border/60 px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-60"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
