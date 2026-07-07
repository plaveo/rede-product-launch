import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { ApplyForm } from "@/components/rede/apply-form"

export const metadata: Metadata = {
  title: "REDE Stress Test Program — Request an Invitation",
  description:
    "Apply to the invitation-only REDE Stress Test Program. Help shape the platform that gives real estate professionals accurate, evidence-based property information.",
}

const STEPS = [
  ["Apply", "Send your details. It takes under a minute."],
  ["Get reviewed", "Every request is reviewed personally by PEPWORLD."],
  ["Receive access", "Approved testers get a private link to REDE."],
]

export default function StressTestPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* ambient blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.62 0.19 256 / 45%), transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to REDE
        </Link>

        <div className="mt-12 grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* left — the story */}
          <div>
            <div className="flex flex-wrap gap-2">
              {["Invitation Only", "Early Access", "Product Validation"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-[12px] font-medium text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
                  {t}
                </span>
              ))}
            </div>

            <p className="mt-8 font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
              REDE Stress Test Program
            </p>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.06] tracking-tight text-foreground md:text-6xl">
              Help shape a platform built on confidence.
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              REDE gives real estate professionals accurate, organized,
              evidence-based property information &mdash; so every property is
              explained with confidence. We&apos;re inviting a small group of
              professionals to test it before launch.
            </p>

            <div className="mt-10 space-y-5">
              {STEPS.map(([title, desc], i) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-rede text-[13px] font-semibold text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-foreground">{title}</p>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* right — the form */}
          <div className="lg:pt-4">
            <Suspense
              fallback={
                <div className="rede-glass rede-edge-light rede-shadow h-[520px] rounded-[28px]" />
              }
            >
              <ApplyForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
