import type { Metadata } from 'next'
import { Nav } from '@/components/rede/nav'
import { Footer } from '@/components/rede/footer'
import { Reveal } from '@/components/rede/reveal'
import { BookHero } from '@/components/rede/book/book-hero'
import { BookContents } from '@/components/rede/book/book-contents'
import { BookJourney } from '@/components/rede/book/book-journey'
import { BookSection } from '@/components/rede/book/book-section'
import { bookMeta, sections } from '@/lib/book-content'

export const metadata: Metadata = {
  title: 'REDE Manual 01 — The REDE Philosophy | PEPWORLD',
  description:
    'The founder story, the origin of REDE, and the REDE Philosophy — by Plaveo Pineda. From the ₱5 Billion PEPWORLD journey to a new way of reading property.',
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />

      <BookHero />
      <BookContents />
      <BookJourney />

      {sections.map((section) => (
        <BookSection key={section.id} section={section} />
      ))}

      <section className="border-t border-border/50">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center md:px-8 md:py-20">
          <Reveal>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {bookMeta.note}
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
