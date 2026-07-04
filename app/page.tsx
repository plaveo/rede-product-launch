import { Nav } from '@/components/rede/nav'
import { TrainingHero } from '@/components/rede/training/training-hero'
import { Curriculum } from '@/components/rede/training/curriculum'
import { ModuleWelcome } from '@/components/rede/training/module-welcome'
import { WhatIsRede } from '@/components/rede/what-is-rede'
import { BuiltFor } from '@/components/rede/built-for'
import { ModuleGettingStarted } from '@/components/rede/training/module-getting-started'
import { Signals } from '@/components/rede/signals'
import { Lenses } from '@/components/rede/lenses'
import { WorkflowGuide } from '@/components/rede/workflow-guide'
import { ModuleReport } from '@/components/rede/training/module-report'
import { ModuleDecision } from '@/components/rede/training/module-decision'
import { Faq } from '@/components/rede/faq'
import { TrainingComplete } from '@/components/rede/training/training-complete'
import { Footer } from '@/components/rede/footer'

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <TrainingHero />
      <Curriculum />

      {/* Module 1 — orientation */}
      <ModuleWelcome />

      {/* Module 1 — the core concept */}
      <WhatIsRede />

      {/* Who this training is for */}
      <BuiltFor />

      {/* Module 2 — first property */}
      <ModuleGettingStarted />

      {/* Module 3 — the 30 signals */}
      <div id="module-3">
        <Signals />
      </div>

      {/* Module 4 — the five lenses */}
      <div id="module-4">
        <Lenses />
      </div>

      {/* The full workflow, recapped */}
      <WorkflowGuide />

      {/* Module 5 — reading the report */}
      <ModuleReport />

      {/* Module 6 — making the decision */}
      <ModuleDecision />

      {/* Reference appendix */}
      <Faq />

      <TrainingComplete />
      <Footer />
    </main>
  )
}
