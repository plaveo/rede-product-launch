import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { SellerPlaybook } from '@/components/rede/seller-playbook'

export const metadata: Metadata = {
  title: 'REDE — Seller Playbook',
  description:
    'The REDE Seller Playbook for real estate professionals: how to use REDE, and how the data is computed — 30 signals → 9 sub-layers → 5 lenses → 1 decision.',
}

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <Nav />
      <SellerPlaybook />
    </main>
  )
}
