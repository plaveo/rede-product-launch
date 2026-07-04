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

export function StressTestForm() {
  const [submitted, setSubmitted] = useState(false)
  const [role, setRole] = useState('Licensed Broker')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [agency, setAgency] = useState('')
  const [property, setProperty] = useState('')
  const [notes, setNotes] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="onboarding" className="mx-auto max-w-2xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-8 text-center md:p-12">
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
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              You&apos;re confirmed.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              Thank you, {name.split(' ')[0] || 'and welcome'}. Your details are in.
              We&apos;ll activate your access and send your private link shortly.
            </p>
            <p className="mt-8 font-rede text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
              Prepared by PEPWORLD · Property · Economy · People
            </p>
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <section id="onboarding" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Confirm your place
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Join the Stress Test Program.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            You were invited to help put REDE to work before launch. Complete your
            details below and we&apos;ll activate your access.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Invitation Only', 'Early Access', 'Limited Participants'].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[12px] font-medium text-primary"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t}
              </span>
            ))}
          </div>

          <dl className="mt-10 space-y-px overflow-hidden rounded-2xl border border-border/60">
            {[
              ['Stage', 'Stress Test Program'],
              ['Access', 'Invitation Only'],
              ['Purpose', 'Professional product validation'],
              ['Prepared by', 'PEPWORLD'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between bg-background/60 px-5 py-4"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="font-rede text-sm font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={submit}
            className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-6 md:p-8"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="st-name" className="mb-2 block text-[13px] font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="st-name"
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

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="st-email" className="mb-2 block text-[13px] font-medium text-foreground">
                    Work email
                  </label>
                  <input
                    id="st-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                  />
                </div>
                <div>
                  <label htmlFor="st-contact" className="mb-2 block text-[13px] font-medium text-foreground">
                    Contact number
                  </label>
                  <input
                    id="st-contact"
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="0917 000 0000"
                    className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="st-agency" className="mb-2 block text-[13px] font-medium text-foreground">
                  Agency or company
                </label>
                <input
                  id="st-agency"
                  type="text"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  placeholder="e.g. PEPWORLD Realty"
                  className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </div>

              <div>
                <label htmlFor="st-property" className="mb-2 block text-[13px] font-medium text-foreground">
                  A property you&apos;d like to test
                </label>
                <input
                  id="st-property"
                  type="text"
                  value={property}
                  onChange={(e) => setProperty(e.target.value)}
                  placeholder="Project or address in Metro Manila"
                  className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </div>

              <div>
                <label htmlFor="st-notes" className="mb-2 block text-[13px] font-medium text-foreground">
                  Anything we should know <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="st-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us how you plan to use REDE."
                  className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </div>

              <button
                type="submit"
                className="rede-lift inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90"
              >
                Confirm my place
              </button>
              <p className="text-center text-[12px] text-muted-foreground">
                Prepared by PEPWORLD · Property · Economy · People
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
