import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { StressTest } from '@/components/rede/stress-test'
import { StressTestForm } from '@/components/rede/stress-test-form'
import { Footer } from '@/components/rede/footer'

export const metadata: Metadata = {
  title: 'Stress Test Program — REDE',
  description:
    'Apply to the REDE Stress Test Program. A limited group of licensed brokers, salespersons, appraisers, and property sellers to validate REDE before launch.',
}

export default function StressTestPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="pt-14">
        <StressTest />
        <StressTestForm />
      </div>
      <Footer />
    </main>
  )
}
