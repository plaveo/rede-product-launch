import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav } from '@/components/rede/nav'
import { DemoWalkthrough } from '@/components/rede/demo-walkthrough'
import { Footer } from '@/components/rede/footer'

export const metadata: Metadata = {
  title: 'How REDE Works — Guided Demo',
  description:
    'A 60-second guided walkthrough of REDE: search any property, read the 0–100 decision score, see the 5 lenses, and decide with confidence. From data to decisions.',
}

export default function DemoPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="pt-14">
        {/* header */}
        <section className="mx-auto max-w-3xl px-5 pt-16 text-center md:px-8 md:pt-24">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Guided Demo
          </p>
          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            See how REDE works.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[16px] leading-relaxed text-muted-foreground md:text-lg">
            A short, self-running walkthrough — from any property to a clear,
            defensible decision. Press play, or step through it yourself.
          </p>
        </section>

        <DemoWalkthrough />

        {/* CTA */}
        <section className="mx-auto max-w-2xl px-5 pb-28 text-center md:px-8">
          <div className="rounded-3xl border border-border/60 bg-card/50 p-8 md:p-10">
            <h2 className="text-balance font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Want to try it on your own listings?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Join the REDE Stress Test Program — a limited group of professionals
              validating REDE before public launch.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/stress-test"
                className="flex h-12 w-full items-center justify-center rounded-full bg-primary px-7 text-[15px] font-semibold text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
              >
                Join the Pilot
              </Link>
              <Link
                href="/"
                className="flex h-12 w-full items-center justify-center rounded-full border border-border/70 px-7 text-[15px] font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary sm:w-auto"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
