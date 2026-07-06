import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { LeadForm } from '@/components/rede/lead-form'
import { Footer } from '@/components/rede/footer'

export const metadata: Metadata = {
  title: 'Join the REDE List — Early Access',
  description:
    'Be first to use REDE — the Real Estate Decision Engine by PEPWORLD. Leave your details for early access, the guided demo, and your pilot invitation.',
}

export default function LeadsPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="pt-14">
        <LeadForm />
      </div>
      <Footer />
    </main>
  )
}
