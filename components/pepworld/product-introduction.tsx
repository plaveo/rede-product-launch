'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Reveal } from '@/components/rede/reveal'

export function ProductIntroduction() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offsets, setOffsets] = useState({ left: 0, center: 0, right: 0 })

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
      
      // Subtle parallax: cards move slightly at different speeds
      setOffsets({
        left: progress * 8,
        center: progress * 12,
        right: progress * 8,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative overflow-hidden px-4 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Section Label */}
        <Reveal delay={0}>
          <div className="mb-6 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary/70">
              The Company
            </p>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={40}>
          <h2 className="font-display mb-8 text-center text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Three platforms.
            <br />
            One ecosystem.
          </h2>
        </Reveal>

        {/* Body Copy */}
        <Reveal delay={80}>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="mb-4 text-lg text-muted-foreground md:text-xl">
              PEPWORLD develops professional software platforms that help real estate professionals organize information, interpret market conditions, and make better decisions.
            </p>
            <p className="text-lg text-muted-foreground md:text-xl">
              Every platform is built on one engineering standard, one design system, and one shared data philosophy.
            </p>
          </div>
        </Reveal>

        {/* Products Container */}
        <div
          ref={containerRef}
          className="grid gap-8 md:grid-cols-3 lg:gap-12"
        >
          {/* REDE Card */}
          <Reveal delay={120}>
            <div
              className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5 p-8 transition-all duration-700 hover:border-primary/40 md:p-10"
              style={{
                transform: `translateY(${-offsets.left}px)`,
                opacity: 0.8 + (offsets.left / 100),
              }}
            >
              {/* Product Visual */}
              <div className="relative mb-8 h-64 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent md:h-72">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="REDE platform"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover opacity-70"
                  />
                </div>
                {/* Blue accent glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>

              {/* Product Info */}
              <div className="relative z-10">
                <h3 className="font-rede mb-2 text-2xl font-semibold text-primary md:text-3xl">
                  REDE
                </h3>
                <p className="text-base text-muted-foreground md:text-lg">
                  Decision Intelligence
                </p>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </div>
          </Reveal>

          {/* VALUE Card */}
          <Reveal delay={160}>
            <div
              className="group relative overflow-hidden rounded-2xl border border-foreground/20 bg-gradient-to-br from-background via-background to-foreground/5 p-8 transition-all duration-700 hover:border-foreground/40 md:p-10"
              style={{
                transform: `translateY(${-offsets.center}px)`,
                opacity: 0.9 + (offsets.center / 120),
              }}
            >
              {/* Product Visual */}
              <div className="relative mb-8 h-64 overflow-hidden rounded-lg bg-gradient-to-br from-foreground/10 via-foreground/5 to-transparent md:h-72">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="VALUE platform"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover opacity-70"
                  />
                </div>
                {/* Neutral accent glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
              </div>

              {/* Product Info */}
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-semibold text-foreground md:text-3xl">
                  VALUE
                </h3>
                <p className="text-base text-muted-foreground md:text-lg">
                  Professional Valuation
                </p>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
            </div>
          </Reveal>

          {/* STAY Card */}
          <Reveal delay={200}>
            <div
              className="group relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-background via-background to-cyan-400/5 p-8 transition-all duration-700 hover:border-cyan-400/40 md:p-10"
              style={{
                transform: `translateY(${-offsets.right}px)`,
                opacity: 0.8 + (offsets.right / 100),
              }}
            >
              {/* Product Visual */}
              <div className="relative mb-8 h-64 overflow-hidden rounded-lg bg-gradient-to-br from-cyan-400/10 via-cyan-400/5 to-transparent md:h-72">
                <div className="flex items-center justify-center h-full">
                  <Image
                    src="/placeholder.svg?height=400&width=400"
                    alt="STAY platform"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover opacity-70"
                  />
                </div>
                {/* Teal accent glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent" />
              </div>

              {/* Product Info */}
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-semibold text-cyan-400 md:text-3xl">
                  STAY
                </h3>
                <p className="text-base text-muted-foreground md:text-lg">
                  Hospitality Operations
                </p>
              </div>

              {/* Hover indicator */}
              <div className="absolute bottom-0 right-0 h-1 w-0 bg-cyan-400 transition-all duration-500 group-hover:w-full" />
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal delay={240}>
          <div className="mt-16 flex justify-center md:mt-20">
            <button className="group relative overflow-hidden rounded-lg border border-primary/40 bg-primary/10 px-8 py-4 font-sans text-lg font-semibold text-primary transition-all duration-500 hover:border-primary/60 hover:bg-primary/20 md:px-10 md:py-5 md:text-xl">
              <span className="relative z-10">Explore the Platforms</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
