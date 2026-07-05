import { Nav } from '@/components/rede/nav'
import { Hero } from '@/components/rede/hero'
import { WhatIsRede } from '@/components/rede/what-is-rede'
import { BuiltFor } from '@/components/rede/built-for'
import { CoreMoment } from '@/components/rede/core-moment'
import { HowItWorks } from '@/components/rede/how-it-works'
import { Signals } from '@/components/rede/signals'
import { Lenses } from '@/components/rede/lenses'
import { ProfessionalDecision } from '@/components/rede/professional-decision'
import { ProductExperience } from '@/components/rede/product-experience'
import { ProfessionalReports } from '@/components/rede/professional-reports'
import { Capabilities } from '@/components/rede/capabilities'
import { StressTest } from '@/components/rede/stress-test'
import { Participants } from '@/components/rede/participants'
import { InteractiveDashboard } from '@/components/rede/interactive-dashboard'
import { PropertySearch } from '@/components/rede/property-search'
import { PropertyMap } from '@/components/rede/property-map'
import { Analytics } from '@/components/rede/analytics'
import { ReportsLibrary } from '@/components/rede/reports-library'
import { WhyJoin } from '@/components/rede/why-join'
import { WhyRede } from '@/components/rede/why-rede'
import { Pepworld } from '@/components/rede/pepworld'
import { FinalCta } from '@/components/rede/final-cta'
import { Footer } from '@/components/rede/footer'

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <WhatIsRede />
      <BuiltFor />
      <CoreMoment />
      <HowItWorks />
      {/* Ch18–22 — the intelligence */}
      <Signals />
      <Lenses />
      <ProfessionalDecision />
      <ProductExperience />
      <ProfessionalReports />
      <Capabilities />
      {/* Ch23–24 — the program */}
      <StressTest />
      <Participants />
      {/* Ch25–29 — the product surfaces */}
      <InteractiveDashboard />
      <PropertySearch />
      <PropertyMap />
      <Analytics />
      <ReportsLibrary />
      {/* Ch30–32 — the close */}
      <WhyJoin />
      <WhyRede />
      <Pepworld />
      <FinalCta />
      <Footer />
    </main>
  )
}
