import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { Footer } from '@/components/rede/footer'
import { CampaignStudio } from '@/components/campaign/campaign-studio'

export const metadata: Metadata = {
  title: 'REDE™ Campaign Studio — Doubt to Proof',
  description:
    'Awareness campaign assets for REDE. Ready-to-post visuals and captions for brokers and sales teams on Facebook and Instagram.',
  robots: { index: false, follow: false },
}

export default function CampaignPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <CampaignStudio />
      <Footer />
    </main>
  )
}
