'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

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
        <a href="/" className="flex flex-1 items-center gap-2" aria-label="REDE home">
          <Image
            src="/rede-mark.png"
            alt="REDE logo"
            width={40}
            height={40}
            priority
            className="h-9 w-9"
          />
          <span className="font-rede text-base font-semibold tracking-tight text-foreground">
            REDE
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {[
            ['Overview', '/#what'],
            ['How it works', '/#how'],
            ['Lenses', '/#lenses'],
            ['Program', '/#program'],
            ['The Book', '/book'],
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

        <div className="flex-1" />
      </nav>
    </header>
  )
}
