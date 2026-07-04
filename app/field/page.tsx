import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { FieldKit } from '@/components/campaign/field-kit'

export const metadata: Metadata = {
  title: 'REDE — Field Kit',
  description:
    'On-ground field work kit for REDE: scripts for mall agent booths and realty offices, a printable leave-behind, QR to rede.ph, and a field tracker.',
}

export default function FieldPage() {
  return (
    <main className="min-h-dvh bg-background">
      <Nav />
      <FieldKit />
    </main>
  )
}
