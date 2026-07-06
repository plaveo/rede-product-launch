import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { Pricing } from '@/components/rede/pricing'
import { Footer } from '@/components/rede/footer'

export const metadata: Metadata = {
  title: 'Pricing — REDE by PEPWORLD',
  description:
    'Three ways to work with the REDE decision engine: Starter (₱399), Professional (₱999), and Brokerage (₱9,999, 16 seats). One method — 30 signals, 5 lenses, 1 decision.',
}

export default function PricingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="pt-14">
        <Pricing />
      </div>
      <Footer />
    </main>
  )
}
