"use client"

import { useActionState } from "react"
import { useSearchParams } from "next/navigation"
import { submitApplication, type ApplyState } from "@/app/actions/stress-test"

const ROLES = [
  "Salesperson",
  "Licensed Broker",
  "Property Advisor",
  "Owner",
  "Investor",
  "Developer",
  "Real Estate Team",
]

const initialState: ApplyState = { ok: false, message: "" }

export function ApplyForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState)
  const params = useSearchParams()
  const prefillName = params.get("name") ?? ""
  const prefillEmail = params.get("email") ?? ""
  const prefillRole = params.get("role")

  if (state.ok) {
    return (
      <div className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-8 text-center md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
          Request received
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">
          {state.message}
        </p>
        <p className="mt-8 text-[12px] text-muted-foreground">
          Prepared by PEPWORLD &middot; Property &middot; Economy &middot; People
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-6 md:p-8"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="full_name" className="mb-2 block text-[13px] font-medium text-foreground">
            Full name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            defaultValue={prefillName}
            placeholder="Juan Dela Cruz"
            className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
          />
          {state.errors?.full_name && (
            <p className="mt-1.5 text-[12px] text-red-400">{state.errors.full_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[13px] font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={prefillEmail}
            placeholder="you@company.com"
            className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
          />
          {state.errors?.email && (
            <p className="mt-1.5 text-[12px] text-red-400">{state.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact" className="mb-2 block text-[13px] font-medium text-foreground">
            Contact number
          </label>
          <input
            id="contact"
            name="contact"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="09XX XXX XXXX"
            className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
          />
          {state.errors?.contact && (
            <p className="mt-1.5 text-[12px] text-red-400">{state.errors.contact}</p>
          )}
        </div>

        <div>
          <span className="mb-2 block text-[13px] font-medium text-foreground">Your role</span>
          <div className="flex flex-wrap gap-2">
            {ROLES.map((r, i) => (
              <label
                key={r}
                className="cursor-pointer rounded-full border border-border/60 bg-background/40 px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:border-border has-[:checked]:border-primary/50 has-[:checked]:bg-primary/15 has-[:checked]:text-primary"
              >
                <input
                  type="radio"
                  name="role"
                  value={r}
                  defaultChecked={prefillRole ? prefillRole === r : i === 1}
                  className="sr-only"
                />
                {r}
              </label>
            ))}
          </div>
          {state.errors?.role && (
            <p className="mt-1.5 text-[12px] text-red-400">{state.errors.role}</p>
          )}
        </div>

        {!state.ok && state.message && (
          <p className="text-[13px] text-red-400">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="rede-lift inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Submitting…" : "Request Invitation"}
        </button>
        <p className="text-center text-[12px] text-muted-foreground">
          Invitation only &middot; We review every request personally.
        </p>
      </div>
    </form>
  )
}
