'use client'

import { useActionState } from 'react'
import { adminLogin } from '@/app/actions/admin'

export function AdminLogin() {
  const [state, formAction, pending] = useActionState(adminLogin, null)

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5">
      <div className="rounded-2xl border border-border bg-card/60 p-8">
        <p className="font-rede text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          REDE Admin
        </p>
        <h1 className="mt-2 font-rede text-2xl font-semibold tracking-tight text-foreground">
          Stress Test Applications
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Enter the admin password to view and manage applications.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-3">
          <label htmlFor="admin-password" className="sr-only">
            Admin password
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoFocus
            placeholder="Admin password"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition-colors focus:border-primary"
          />
          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="rede-lift h-12 rounded-xl bg-primary px-6 font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {pending ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
