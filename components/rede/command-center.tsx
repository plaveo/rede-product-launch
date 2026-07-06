"use client"

import { useEffect, useState, useTransition, useCallback } from "react"
import { adminLogout } from "@/app/actions/admin"
import { updateApplicationStatus } from "@/app/actions/admin"
import { updateLeadStatus } from "@/app/actions/leads"
import { getHqData, type HqData } from "@/app/actions/hq"

type Tab = "applicants" | "leads" | "survey"

const APP_STATUS = ["pending", "qualified", "rejected"] as const
const LEAD_STATUS = ["new", "contacted", "qualified", "converted", "dropped"] as const

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-500",
  new: "bg-primary/15 text-primary",
  contacted: "bg-sky-500/15 text-sky-500",
  qualified: "bg-emerald-500/15 text-emerald-500",
  converted: "bg-emerald-500/15 text-emerald-500",
  rejected: "bg-destructive/15 text-destructive",
  dropped: "bg-muted text-muted-foreground",
}

function fmtDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
      <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 font-rede text-2xl font-semibold text-foreground sm:text-3xl">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  )
}

export function CommandCenter({ initial }: { initial: HqData }) {
  const [data, setData] = useState<HqData>(initial)
  const [tab, setTab] = useState<Tab>("applicants")
  const [refreshing, setRefreshing] = useState(false)
  const [, startTransition] = useTransition()

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      const fresh = await getHqData()
      if (fresh.ok) setData(fresh)
    } catch {
      // fail soft — keep showing last good data
    } finally {
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    const id = setInterval(refresh, 20000)
    return () => clearInterval(id)
  }, [refresh])

  const { applications, leads, surveys } = data
  const pendingApps = applications.filter((a) => a.status === "pending").length
  const qualifiedApps = applications.filter((a) => a.status === "qualified").length
  const newLeads = leads.filter((l) => l.status === "new").length
  const avgRecommend =
    surveys.length > 0
      ? (
          surveys.reduce((s, r) => s + (r.recommendScore ?? 0), 0) /
          surveys.filter((r) => r.recommendScore != null).length || 0
        ).toFixed(1)
      : "—"

  function setApp(id: number, status: string) {
    setData((d) => ({ ...d, applications: d.applications.map((a) => (a.id === id ? { ...a, status } : a)) }))
    startTransition(() => updateApplicationStatus(id, status))
  }
  function setLead(id: number, status: string) {
    setData((d) => ({ ...d, leads: d.leads.map((l) => (l.id === id ? { ...l, status } : l)) }))
    startTransition(() => updateLeadStatus(id, status))
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "applicants", label: "Applicants", count: applications.length },
    { key: "leads", label: "Leads", count: leads.length },
    { key: "survey", label: "Survey", count: surveys.length },
  ]

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-5 sm:py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="font-rede text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              REDE Command Center
            </p>
          </div>
          <h1 className="mt-2 font-rede text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Everything, one monitor
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Live · auto-refreshes every 20s{" "}
            {refreshing ? "· updating…" : `· updated ${new Date(data.fetchedAt).toLocaleTimeString("en-PH")}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refresh}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Refresh
          </button>
          <form action={adminLogout}>
            <button
              type="submit"
              className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Applicants" value={String(applications.length)} hint={`${pendingApps} pending`} />
        <StatCard label="Approved" value={String(qualifiedApps)} hint="qualified testers" />
        <StatCard label="Leads" value={String(leads.length)} hint={`${newLeads} new`} />
        <StatCard label="Survey NPS" value={avgRecommend} hint={`${surveys.length} responses`} />
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label} <span className="opacity-70">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6 flex flex-col gap-4">
        {tab === "applicants" && (
          applications.length === 0 ? (
            <Empty label="No applicants yet" hint="Share your /stress-test link to start receiving applications." />
          ) : (
            applications.map((app) => (
              <div key={app.id} className="rounded-2xl border border-border bg-card/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-rede text-lg font-semibold text-foreground">{app.fullName}</h3>
                    <p className="text-sm text-primary">{app.role}</p>
                  </div>
                  <StatusPill status={app.status} />
                </div>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <Field label="Email" value={app.email} />
                  <Field label="Contact" value={app.contact} />
                  {app.agency ? <Field label="Agency" value={app.agency} /> : null}
                  {app.licenseNumber ? <Field label="License" value={app.licenseNumber} /> : null}
                  {app.property ? <Field label="Property" value={app.property} wide /> : null}
                  {app.notes ? <Field label="Notes" value={app.notes} wide /> : null}
                </dl>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">{fmtDate(app.createdAt)}</span>
                  <div className="ml-auto flex gap-2">
                    {APP_STATUS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={app.status === s}
                        onClick={() => setApp(app.id, s)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium capitalize text-foreground transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-40"
                      >
                        {s === "qualified" ? "approve" : s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )
        )}

        {tab === "leads" && (
          leads.length === 0 ? (
            <Empty label="No leads yet" hint="Share your /leads link (or boost it on Facebook) to capture leads." />
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="rounded-2xl border border-border bg-card/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-rede text-lg font-semibold text-foreground">{lead.fullName}</h3>
                    <p className="text-sm text-primary">{lead.role || "—"}</p>
                  </div>
                  <StatusPill status={lead.status} />
                </div>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  <Field label="Email" value={lead.email} />
                  <Field label="Contact" value={lead.contact} />
                  {lead.city ? <Field label="City" value={lead.city} /> : null}
                  <Field label="Source" value={lead.source} />
                  {lead.interest ? <Field label="Interest" value={lead.interest} wide /> : null}
                </dl>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground">{fmtDate(lead.createdAt)}</span>
                  <div className="ml-auto flex flex-wrap gap-2">
                    {LEAD_STATUS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        disabled={lead.status === s}
                        onClick={() => setLead(lead.id, s)}
                        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium capitalize text-foreground transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-40"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )
        )}

        {tab === "survey" && (
          surveys.length === 0 ? (
            <Empty label="No survey responses yet" hint="Approved testers answer the survey at /survey after using REDE." />
          ) : (
            surveys.map((s) => (
              <div key={s.id} className="rounded-2xl border border-border bg-card/60 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-rede text-lg font-semibold text-foreground">{s.name}</h3>
                    <p className="text-sm text-primary">
                      {[s.role, s.company].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  {s.recommendScore != null ? (
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      Recommends {s.recommendScore}/10
                    </span>
                  ) : null}
                </div>
                <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                  {s.email ? <Field label="Email" value={s.email} /> : null}
                  {s.yearsExperience ? <Field label="Experience" value={s.yearsExperience} /> : null}
                  {s.confidenceGain != null ? <Field label="Confidence" value={`${s.confidenceGain}/10`} /> : null}
                  {s.payIntent ? <Field label="Would pay" value={s.payIntent} /> : null}
                  {s.biggestPain ? <Field label="Biggest pain" value={s.biggestPain} wide /> : null}
                  {s.improveFirst ? <Field label="Improve first" value={s.improveFirst} wide /> : null}
                </dl>
                <p className="mt-4 text-xs text-muted-foreground">{fmtDate(s.createdAt)}</p>
              </div>
            ))
          )
        )}
      </div>
    </main>
  )
}

function Field({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`flex gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  )
}

function Empty({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center">
      <p className="font-rede text-lg font-semibold text-foreground">{label}</p>
      <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
    </div>
  )
}
