"use client"

import { useActionState } from "react"
import { login, type LoginState } from "@/app/actions/stress-admin"

const initialState: LoginState = { ok: false, message: "" }

export function AdminLogin() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <div className="mx-auto mt-16 max-w-md">
      <p className="text-center font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
        REDE Stress Test
      </p>
      <h1 className="mt-4 text-center font-display text-3xl font-semibold tracking-tight text-foreground">
        Founder access
      </h1>
      <p className="mx-auto mt-3 max-w-sm text-center text-pretty leading-relaxed text-muted-foreground">
        This gate reviews and approves testers. Enter the admin password to continue.
      </p>

      <form action={formAction} className="rede-glass rede-edge-light rede-shadow mt-8 rounded-[24px] p-6 md:p-8">
        <label htmlFor="password" className="mb-2 block text-[13px] font-medium text-foreground">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
        />
        {!state.ok && state.message && (
          <p className="mt-2 text-[13px] text-red-400">{state.message}</p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rede-lift mt-5 inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  )
}
