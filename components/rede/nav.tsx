'use client'

import { useEffect, useState } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="font-rede text-lg font-semibold tracking-tight text-foreground">
            REDE
          </span>
          <span className="font-rede text-[10px] font-medium text-primary">™</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {[
            ['Overview', '#what'],
            ['How it works', '#how'],
            ['Lenses', '#lenses'],
            ['Program', '#program'],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#join"
          className="rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
        >
          Request access
        </a>
      </nav>
    </header>
  )
}
