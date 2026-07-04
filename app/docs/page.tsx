import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { Docs } from '@/components/rede/docs'
import { Footer } from '@/components/rede/footer'

export const metadata: Metadata = {
  title: 'Documentation — Stress Test & Survey System — REDE',
  description:
    'How the REDE Stress Test Program works: the application, the KEV 2.0 survey, and the founder dashboard that tracks the 10 metrics that matter.',
}

export default function DocsPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="pt-14">
        <Docs />
      </div>
      <Footer />
    </main>
  )
}
