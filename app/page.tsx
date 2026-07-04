import { Nav } from '@/components/rede/nav'
import { Hero } from '@/components/rede/hero'
import { WhatIsRede } from '@/components/rede/what-is-rede'
import { BuiltFor } from '@/components/rede/built-for'
import { HowItWorks } from '@/components/rede/how-it-works'
import { Lenses } from '@/components/rede/lenses'
import { Capabilities } from '@/components/rede/capabilities'
import { StressTest } from '@/components/rede/stress-test'
import { Participants } from '@/components/rede/participants'
import { WhyJoin } from '@/components/rede/why-join'
import { FinalCta } from '@/components/rede/final-cta'
import { Footer } from '@/components/rede/footer'

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <WhatIsRede />
      <BuiltFor />
      <HowItWorks />
      <Lenses />
      <Capabilities />
      <StressTest />
      <Participants />
      <WhyJoin />
      <FinalCta />
      <Footer />
    </main>
  )
}
