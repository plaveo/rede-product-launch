import type { Metadata } from "next"
import Link from "next/link"
import { SurveyForm } from "@/components/rede/survey-form"

export const metadata: Metadata = {
  title: "REDE Stress Test — Your Feedback",
  description:
    "Tell us about your experience testing REDE. Your feedback directly shapes the platform that helps real estate professionals explain properties with confidence.",
  robots: { index: false, follow: false },
}

export default function SurveyPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.62 0.19 256 / 45%), transparent)" }}
      />

      <div className="relative mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to REDE
        </Link>

        <div className="mt-10">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            REDE Stress Test Program
          </p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
            How was your experience?
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            You tested REDE. Now tell us the truth. Every answer helps us make
            property information more accurate, organized, and evidence-based
            &mdash; so professionals present with greater confidence.
          </p>
        </div>

        <div className="mt-10">
          <SurveyForm />
        </div>
      </div>
    </main>
  )
}
