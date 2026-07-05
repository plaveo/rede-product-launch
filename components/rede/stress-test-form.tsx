'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Reveal } from './reveal'
import { submitStressTestApplication, type StressTestState } from '@/app/actions/stress-test'

const ROLES = [
  'Licensed Broker',
  'Licensed Salesperson',
  'Licensed Appraiser',
  'Property Seller',
]

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rede-lift inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? 'Submitting…' : 'Submit application'}
    </button>
  )
}

export function StressTestForm() {
  const [state, formAction] = useActionState<StressTestState, FormData>(
    submitStressTestApplication,
    null,
  )
  const [role, setRole] = useState('Licensed Broker')

  if (state?.ok) {
    return (
      <section id="apply" className="mx-auto max-w-2xl px-5 py-24 md:px-8 md:py-32">
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
              Application received.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
              {state.message}
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
    <section id="apply" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Registration open
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Apply to the Stress Test Program.
          </h2>
          <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
            We&apos;re inviting a limited group of real estate professionals to put
            REDE to work before launch. Submit your details and our team will
            review and reach out with your next steps.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Limited Slots', 'Early Access', 'Professional Validation'].map((t) => (
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
              ['Who can join', 'Brokers · Salespersons · Appraisers · Sellers'],
              ['Purpose', 'Professional product validation'],
              ['Prepared by', 'PEPWORLD'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 bg-background/60 px-5 py-4"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="text-right font-rede text-sm font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <form
            action={formAction}
            className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-6 md:p-8"
          >
            <input type="hidden" name="role" value={role} />
            {/* Honeypot — hidden from users, catches bots. Do not remove. */}
            <div aria-hidden className="hidden">
              <label htmlFor="st-company-website">Company website</label>
              <input
                id="st-company-website"
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="space-y-5">
              <div>
                <label htmlFor="st-name" className="mb-2 block text-[13px] font-medium text-foreground">
                  Full name
                </label>
                <input
                  id="st-name"
                  name="fullName"
                  type="text"
                  required
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
                    Email
                  </label>
                  <input
                    id="st-email"
                    name="email"
                    type="email"
                    required
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
                    name="contact"
                    type="tel"
                    required
                    placeholder="0917 000 0000"
                    className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="st-agency" className="mb-2 block text-[13px] font-medium text-foreground">
                    Agency or company <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    id="st-agency"
                    name="agency"
                    type="text"
                    placeholder="e.g. PEPWORLD Realty"
                    className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                  />
                </div>
                <div>
                  <label htmlFor="st-license" className="mb-2 block text-[13px] font-medium text-foreground">
                    PRC / License no. <span className="text-muted-foreground">(if any)</span>
                  </label>
                  <input
                    id="st-license"
                    name="licenseNumber"
                    type="text"
                    placeholder="e.g. 0012345"
                    className="h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="st-property" className="mb-2 block text-[13px] font-medium text-foreground">
                  A property you&apos;d like to test <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="st-property"
                  name="property"
                  type="text"
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
                  name="notes"
                  rows={3}
                  placeholder="Tell us how you plan to use REDE."
                  className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </div>

              {state && !state.ok && (
                <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {state.message}
                </p>
              )}

              <SubmitButton />
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
