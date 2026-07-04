'use client'

import { useState } from 'react'
import { Reveal } from './reveal'

const ROLES = [
  'Salesperson',
  'Licensed Broker',
  'Property Advisor',
  'Owner',
  'Investor',
  'Developer',
]

export function JoinRede() {
  const [role, setRole] = useState('Licensed Broker')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('REDE Stress Test Program — Request to Join')
    const body = encodeURIComponent(
      `Name: ${name}\nRole: ${role}\nEmail: ${email}\n\nI'd like to join the REDE Stress Test Program.`,
    )
    window.location.href = `mailto:hello@pepworld.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="join" className="relative mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Join REDE
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Request your invitation.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            The Stress Test Program is invitation only. Tell us who you are and
            we&apos;ll reach out with access as new places open.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Invitation Only', 'Early Access', 'Limited Places'].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[12px] font-medium text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={submit}
            className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-6 md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="join-name" className="mb-2 block text-[13px] font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="join-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Juan Dela Cruz"
                  className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </div>

              <div>
                <span className="mb-2 block text-[13px] font-medium text-foreground">Your role</span>
                <div className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all ${
                        role === r
                          ? 'border-primary/50 bg-primary/15 text-primary'
                          : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="join-email" className="mb-2 block text-[13px] font-medium text-foreground">
                  Work email
                </label>
                <input
                  id="join-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </div>

              <button
                type="submit"
                className="rede-lift inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
              >
                Request Invitation
              </button>
              <p className="text-center text-[12px] text-muted-foreground">
                Prepared by PEPWORLD • Property • Economy • People
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
