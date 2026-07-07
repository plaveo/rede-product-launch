"use client"

import { useActionState } from "react"
import { submitSurvey, type SurveyState } from "@/app/actions/survey"

const initialState: SurveyState = { ok: false, message: "" }

const inputClass =
  "h-12 w-full rounded-xl border border-border/60 bg-background/60 px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
const areaClass =
  "min-h-[96px] w-full rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rede-glass rede-edge-light rede-shadow rounded-[24px] p-6 md:p-8">
      <p className="font-rede text-[12px] font-medium uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-[13px] font-medium text-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

/** 1–5 rating chips */
function Rating({ name, low, high }: { name: string; low: string; high: string }) {
  return (
    <div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="flex h-11 flex-1 cursor-pointer items-center justify-center rounded-xl border border-border/60 bg-background/40 text-[15px] font-semibold text-muted-foreground transition-all hover:border-border has-[:checked]:border-primary/50 has-[:checked]:bg-primary/15 has-[:checked]:text-primary"
          >
            <input type="radio" name={name} value={n} className="sr-only" />
            {n}
          </label>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  )
}

function Choices({ name, options }: { name: string; options: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o}
          className="cursor-pointer rounded-full border border-border/60 bg-background/40 px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-all hover:border-border has-[:checked]:border-primary/50 has-[:checked]:bg-primary/15 has-[:checked]:text-primary"
        >
          <input type="radio" name={name} value={o} className="sr-only" />
          {o}
        </label>
      ))}
    </div>
  )
}

export function SurveyForm() {
  const [state, formAction, pending] = useActionState(submitSurvey, initialState)

  if (state.ok) {
    return (
      <div className="rede-glass rede-edge-light rede-shadow mx-auto max-w-lg rounded-[28px] p-8 text-center md:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">Feedback received</h2>
        <p className="mx-auto mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">{state.message}</p>
        <p className="mt-8 text-[12px] text-muted-foreground">
          Prepared by PEPWORLD &middot; Property &middot; Economy &middot; People
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <Section eyebrow="01" title="About you">
        <Field label="Full name" htmlFor="name">
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Juan Dela Cruz" className={inputClass} />
          {state.errors?.name && <p className="mt-1.5 text-[12px] text-red-400">{state.errors.name}</p>}
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company / brokerage" htmlFor="company">
            <input id="company" name="company" type="text" placeholder="Optional" className={inputClass} />
          </Field>
          <Field label="Role" htmlFor="role">
            <input id="role" name="role" type="text" placeholder="e.g. Licensed Broker" className={inputClass} />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Years in real estate" htmlFor="years_experience">
            <input id="years_experience" name="years_experience" type="text" placeholder="e.g. 5 years" className={inputClass} />
          </Field>
          <Field label="Email" htmlFor="email">
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section eyebrow="02" title="Your process today">
        <Field label="How do you research property information now?" htmlFor="research_methods">
          <textarea id="research_methods" name="research_methods" placeholder="Websites, government portals, maps, personal experience…" className={areaClass} />
        </Field>
        <Field label="What is your biggest pain when preparing to present a property?" htmlFor="biggest_pain">
          <textarea id="biggest_pain" name="biggest_pain" placeholder="Scattered data, verifying prices, answering 'why this location'…" className={areaClass} />
        </Field>
      </Section>

      <Section eyebrow="03" title="Rate your experience with REDE">
        <Field label="Easy to use">
          <Rating name="rating_easy" low="Hard" high="Effortless" />
        </Field>
        <Field label="Feels professional">
          <Rating name="rating_professional" low="Not really" high="Very much" />
        </Field>
        <Field label="Useful for presenting a property">
          <Rating name="rating_useful" low="Not useful" high="Essential" />
        </Field>
        <Field label="Fast to get an answer">
          <Rating name="rating_fast" low="Slow" high="Instant" />
        </Field>
        <Field label="Trustworthy information">
          <Rating name="rating_trustworthy" low="Doubtful" high="Fully trust" />
        </Field>
      </Section>

      <Section eyebrow="04" title="Trust in the data">
        <Field label="Do you trust the property information REDE presented?">
          <Choices name="data_trust" options={["Yes", "Somewhat", "Not yet"]} />
        </Field>
        <Field label="Why? What would increase your trust?" htmlFor="data_trust_reason">
          <textarea id="data_trust_reason" name="data_trust_reason" placeholder="Sources, recency, accuracy…" className={areaClass} />
        </Field>
      </Section>

      <Section eyebrow="05" title="Confidence & value">
        <Field label="Did the scores/assessments help you understand the property?">
          <Choices name="assessment_help" options={["Yes", "Somewhat", "No"]} />
        </Field>
        <Field label="Did the interpretation (the lenses) help you explain it to a client?">
          <Choices name="interpretation_help" options={["Yes", "Somewhat", "No"]} />
        </Field>
        <Field label="How much more confident would you feel presenting with REDE?">
          <Rating name="confidence_gain" low="No change" high="Much more" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Minutes to research normally" htmlFor="time_normal">
            <input id="time_normal" name="time_normal" type="number" inputMode="numeric" min={0} placeholder="e.g. 60" className={inputClass} />
          </Field>
          <Field label="Minutes using REDE" htmlFor="time_rede">
            <input id="time_rede" name="time_rede" type="number" inputMode="numeric" min={0} placeholder="e.g. 5" className={inputClass} />
          </Field>
        </div>
      </Section>

      <Section eyebrow="06" title="Gaps & intent">
        <Field label="What information was missing or that you still needed?" htmlFor="missing_info">
          <textarea id="missing_info" name="missing_info" placeholder="Tell us what would make REDE complete for you." className={areaClass} />
        </Field>
        <Field label="Would you use REDE in your real work?">
          <Choices name="use_intent" options={["Definitely", "Probably", "Maybe", "No"]} />
        </Field>
        <Field label="Would you pay for REDE?">
          <Choices name="pay_intent" options={["Yes", "Maybe", "No"]} />
        </Field>
        <Field label="If yes, what feels fair per month?" htmlFor="pay_amount">
          <input id="pay_amount" name="pay_amount" type="text" placeholder="Optional — a range is fine" className={inputClass} />
        </Field>
        <Field label="How likely are you to recommend REDE to a colleague? (0–10)">
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 11 }, (_, n) => (
              <label
                key={n}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-background/40 text-[14px] font-semibold text-muted-foreground transition-all hover:border-border has-[:checked]:border-primary/50 has-[:checked]:bg-primary/15 has-[:checked]:text-primary"
              >
                <input type="radio" name="recommend_score" value={n} className="sr-only" />
                {n}
              </label>
            ))}
          </div>
        </Field>
        <Field label="If we could improve one thing first, what should it be?" htmlFor="improve_first">
          <textarea id="improve_first" name="improve_first" placeholder="Your single most important improvement." className={areaClass} />
        </Field>
      </Section>

      {!state.ok && state.message && <p className="text-[13px] text-red-400">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rede-lift inline-flex h-13 w-full items-center justify-center rounded-2xl bg-primary px-9 py-4 font-rede text-[15px] font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Submitting…" : "Submit feedback"}
      </button>
      <p className="text-center text-[12px] text-muted-foreground">
        Only your name is required. Everything else helps us build REDE better.
      </p>
    </form>
  )
}
