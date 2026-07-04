import { Nav } from '@/components/rede/nav'
import { Hero } from '@/components/rede/hero'
import { WhatIsRede } from '@/components/rede/what-is-rede'
import { BuiltFor } from '@/components/rede/built-for'
import { HowItWorks } from '@/components/rede/how-it-works'
import { Signals } from '@/components/rede/signals'
import { Lenses } from '@/components/rede/lenses'
import { ProfessionalDecision } from '@/components/rede/professional-decision'
import { ProductExperience } from '@/components/rede/product-experience'
import { ProfessionalReports } from '@/components/rede/professional-reports'
import { Capabilities } from '@/components/rede/capabilities'
import { StressTest } from '@/components/rede/stress-test'
import { Participants } from '@/components/rede/participants'
import { ProgramPurpose } from '@/components/rede/program-purpose'
import { ProgramObjectives } from '@/components/rede/program-objectives'
import { ParticipantProfile } from '@/components/rede/participant-profile'
import { ProgramFlow } from '@/components/rede/program-flow'
import { ParticipantResponsibilities } from '@/components/rede/participant-responsibilities'
import { JoinRede } from '@/components/rede/join-rede'
import { InteractiveDashboard } from '@/components/rede/interactive-dashboard'
import { PropertySearch } from '@/components/rede/property-search'
import { PropertyMap } from '@/components/rede/property-map'
import { Analytics } from '@/components/rede/analytics'
import { ReportsLibrary } from '@/components/rede/reports-library'
import { WhyJoin } from '@/components/rede/why-join'
import { WhyRede } from '@/components/rede/why-rede'
import { Pepworld } from '@/components/rede/pepworld'
import { Faq } from '@/components/rede/faq'
import { ProgramStatus } from '@/components/rede/program-status'
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
      {/* Ch28–32 — program deep dive */}
      <ProgramPurpose />
      <ProgramObjectives />
      <ParticipantProfile />
      <ProgramFlow />
      <ParticipantResponsibilities />
      <JoinRede />
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
      {/* Ch33–37 — frequently asked questions */}
      <Faq />
      <ProgramStatus />
      <FinalCta />
      <Footer />
    </main>
  )
}
