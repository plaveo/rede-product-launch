'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Reveal } from './reveal'
import { submitStressTestSurvey, type SurveyState } from '@/app/actions/survey'

/* ---------- small building blocks ---------- */

function SectionCard({
  step,
  title,
  hint,
  children,
}: {
  step: string
  title: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="rede-glass rede-edge-light rede-shadow rounded-[24px] p-6 md:p-8">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-rede text-[13px] font-semibold tabular-nums text-primary">{step}</span>
        <h3 className="text-balance font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {title}
        </h3>
      </div>
      {hint && <p className="mb-5 text-pretty text-sm leading-relaxed text-muted-foreground">{hint}</p>}
      {children}
    </div>
  )
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string
  htmlFor?: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-foreground">
        {label} {optional && <span className="text-muted-foreground">(optional)</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  'h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60'

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputClass} />
}

/* Single-choice pill group (uses a hidden input for form submission) */
function ChoiceGroup({
  name,
  options,
  columns,
}: {
  name: string
  options: string[]
  columns?: boolean
}) {
  const [value, setValue] = useState('')
  return (
    <div>
      <input type="hidden" name={name} value={value} />
      <div className={columns ? 'grid gap-2 sm:grid-cols-2' : 'flex flex-wrap gap-2'}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setValue(opt)}
            className={`rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-all ${
              value === opt
                ? 'border-primary/50 bg-primary/15 text-primary'
                : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

/* Multi-select checkboxes (submits multiple values under the same name) */
function MultiChoice({ name, options }: { name: string; options: string[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (opt: string) =>
    setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]))
  return (
    <div>
      {selected.map((s) => (
        <input key={s} type="hidden" name={name} value={s} />
      ))}
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const on = selected.includes(opt)
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-[14px] font-medium transition-all ${
                on
                  ? 'border-primary/50 bg-primary/15 text-primary'
                  : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  on ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                }`}
              >
                {on && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                )}
              </span>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* 1-10 rating scale */
function RatingScale({ name, lowLabel, highLabel }: { name: string; lowLabel?: string; highLabel?: string }) {
  const [value, setValue] = useState<number | null>(null)
  return (
    <div>
      <input type="hidden" name={name} value={value ?? ''} />
      <div className="flex flex-wrap gap-1.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setValue(n)}
            aria-label={`${n} out of 10`}
            className={`h-11 w-11 rounded-xl border text-[15px] font-semibold tabular-nums transition-all ${
              value === n
                ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                : 'border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      {(lowLabel || highLabel) && (
        <div className="mt-2 flex justify-between text-[12px] text-muted-foreground">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  )
}

/* Labeled row for a group of 1-10 ratings */
function RatingRow({ label, name }: { label: string; name: string }) {
  const [value, setValue] = useState<number | null>(null)
  return (
    <div className="flex flex-col gap-2 border-b border-border/50 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <input type="hidden" name={name} value={value ?? ''} />
      <span className="text-[14px] font-medium text-foreground">{label}</span>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setValue(n)}
            aria-label={`${label}: ${n} out of 10`}
            className={`h-8 w-8 rounded-lg border text-[13px] font-semibold tabular-nums transition-all ${
              value === n
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rede-lift inline-flex h-13 w-full items-center justify-center rounded-xl bg-primary px-6 py-4 font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? 'Submitting…' : 'Submit survey'}
    </button>
  )
}

/* ---------- main form ---------- */

export function SurveyForm() {
  const [state, formAction] = useActionState<SurveyState, FormData>(submitStressTestSurvey, null)
  const [payIntent, setPayIntent] = useState('')

  if (state?.ok) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <div className="rede-glass rede-edge-light rede-shadow rounded-[28px] p-8 text-center md:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden>
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 className="mt-6 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Salamat sa feedback.
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
    <section id="survey" className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          REDE Stress Test Survey
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
          Will you use REDE?
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Hindi namin tatanungin kung gusto mo ang REDE. Ang tanong: gagamitin mo ba
          ito araw-araw, at bakit? Ang bawat sagot mo ang direktang humuhubog sa REDE.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <form action={formAction} className="mt-12 space-y-6">
          {/* 01 Profile */}
          <SectionCard step="01" title="Profile">
            <div className="space-y-5">
              <Field label="Name" htmlFor="sv-name">
                <TextInput id="sv-name" name="name" type="text" required placeholder="Juan Dela Cruz" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company" htmlFor="sv-company" optional>
                  <TextInput id="sv-company" name="company" type="text" placeholder="Agency / brokerage" />
                </Field>
                <Field label="Role" htmlFor="sv-role" optional>
                  <TextInput id="sv-role" name="role" type="text" placeholder="Broker, Agent, Appraiser…" />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Years in Real Estate" htmlFor="sv-years" optional>
                  <TextInput id="sv-years" name="yearsExperience" type="text" placeholder="e.g. 5 years" />
                </Field>
                <Field label="Email" htmlFor="sv-email" optional>
                  <TextInput id="sv-email" name="email" type="email" placeholder="you@company.com" />
                </Field>
              </div>
            </div>
          </SectionCard>

          {/* 02 Current Workflow */}
          <SectionCard step="02" title="Current Workflow" hint="How do you currently research a property? (Piliin lahat ng ginagamit mo.)">
            <MultiChoice
              name="researchMethods"
              options={['Google', 'Facebook', 'Developer', 'Government', 'Multiple websites', 'Other']}
            />
          </SectionCard>

          {/* 03 Pain Points */}
          <SectionCard step="03" title="Pain Points" hint="What is your biggest problem when presenting properties?">
            <ChoiceGroup
              name="biggestPain"
              columns
              options={[
                'Finding information',
                'Verifying information',
                'Explaining information',
                'Comparing projects',
                'Building client trust',
                'Other',
              ]}
            />
          </SectionCard>

          {/* 04 First Impression */}
          <SectionCard step="04" title="First Impression" hint="After using REDE, rate each from 1–10.">
            <div>
              <RatingRow label="Easy to understand" name="ratingEasy" />
              <RatingRow label="Professional" name="ratingProfessional" />
              <RatingRow label="Useful" name="ratingUseful" />
              <RatingRow label="Fast" name="ratingFast" />
              <RatingRow label="Trustworthy" name="ratingTrustworthy" />
            </div>
          </SectionCard>

          {/* 05 Data */}
          <SectionCard step="05" title="Data" hint="Do you trust the information shown?">
            <div className="space-y-5">
              <ChoiceGroup name="dataTrust" options={['Yes', 'Partially', 'No']} />
              <Field label="Why?" htmlFor="sv-trust-why" optional>
                <textarea
                  id="sv-trust-why"
                  name="dataTrustReason"
                  rows={3}
                  placeholder="Share your reason."
                  className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
                />
              </Field>
            </div>
          </SectionCard>

          {/* 06 Assessment */}
          <SectionCard step="06" title="Assessment" hint="Do the scores and analysis help you understand the property?">
            <ChoiceGroup name="assessmentHelp" options={['Yes', 'Partially', 'No']} />
          </SectionCard>

          {/* 07 Interpretation */}
          <SectionCard step="07" title="Interpretation" hint="Did the explanations help you present the property better?">
            <ChoiceGroup name="interpretationHelp" options={['Yes', 'Partially', 'No']} />
          </SectionCard>

          {/* 08 Confidence */}
          <SectionCard step="08" title="Confidence" hint="After using REDE, how much more confident are you when presenting a property? (1–10)">
            <RatingScale name="confidenceGain" lowLabel="Not at all" highLabel="Very confident" />
          </SectionCard>

          {/* 09 Time Saved */}
          <SectionCard step="09" title="Time Saved" hint="Roughly how many minutes to research one property?">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Normally I spend (minutes)" htmlFor="sv-time-normal">
                <TextInput id="sv-time-normal" name="timeNormal" type="number" min={0} inputMode="numeric" placeholder="e.g. 60" />
              </Field>
              <Field label="Using REDE (minutes)" htmlFor="sv-time-rede">
                <TextInput id="sv-time-rede" name="timeRede" type="number" min={0} inputMode="numeric" placeholder="e.g. 10" />
              </Field>
            </div>
          </SectionCard>

          {/* 10 Missing Information */}
          <SectionCard step="10" title="Missing Information" hint="What information do you wish REDE included?">
            <textarea
              name="missingInfo"
              rows={3}
              placeholder="Open answer."
              className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
          </SectionCard>

          {/* 11 Willingness to Use */}
          <SectionCard step="11" title="Willingness to Use" hint="Would you use REDE in your daily work?">
            <ChoiceGroup name="useIntent" options={['Yes', 'Maybe', 'No']} />
          </SectionCard>

          {/* 12 Willingness to Pay */}
          <SectionCard step="12" title="Willingness to Pay" hint="Would you pay for REDE?">
            <div className="space-y-5">
              <div>
                <input type="hidden" name="payIntent" value={payIntent} />
                <div className="flex flex-wrap gap-2">
                  {['Yes', 'Maybe', 'No'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPayIntent(opt)}
                      className={`rounded-xl border px-4 py-3 text-[14px] font-medium transition-all ${
                        payIntent === opt
                          ? 'border-primary/50 bg-primary/15 text-primary'
                          : 'border-border/60 bg-background/40 text-muted-foreground hover:border-border'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {payIntent === 'Yes' && (
                <Field label="If yes, how much per month?" htmlFor="sv-pay-amount">
                  <ChoiceGroup
                    name="payAmount"
                    options={['₱299', '₱499', '₱999', '₱1,499', 'Other']}
                  />
                </Field>
              )}
            </div>
          </SectionCard>

          {/* 13 Recommendation */}
          <SectionCard step="13" title="Recommendation" hint="Would you recommend REDE to another broker or agent? (1–10)">
            <RatingScale name="recommendScore" lowLabel="Not likely" highLabel="Very likely" />
          </SectionCard>

          {/* 14 Final Comment */}
          <SectionCard step="14" title="Final Comment" hint="If you were the founder, what is the first thing you would improve?">
            <textarea
              name="improveFirst"
              rows={4}
              placeholder="Open answer."
              className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
          </SectionCard>

          {state && !state.ok && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {state.message}
            </p>
          )}

          <div className="pt-2">
            <SubmitButton />
            <p className="mt-4 text-center text-[12px] text-muted-foreground">
              Prepared by PEPWORLD · Property · Economy · People
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
