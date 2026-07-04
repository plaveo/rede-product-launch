import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { SurveyForm } from '@/components/rede/survey-form'
import { Footer } from '@/components/rede/footer'

export const metadata: Metadata = {
  title: 'REDE Stress Test Survey',
  description:
    'Help shape REDE. Share how you research properties today, your first impression of REDE, and whether you would use and pay for it.',
}

export default function SurveyPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="pt-14">
        <SurveyForm />
      </div>
      <Footer />
    </main>
  )
}
