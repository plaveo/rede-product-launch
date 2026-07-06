'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Menu,
  X,
  LayoutDashboard,
  Database,
  ClipboardList,
  QrCode,
  Megaphone,
  MapPin,
  PlayCircle,
  Users,
  UserPlus,
} from 'lucide-react'

const MENU_LINKS: [string, string][] = [
  ['Overview', '/#what'],
  ['How it works', '/#how'],
  ['Lenses', '/#lenses'],
  ['Program', '/#program'],
  ['Pricing', '/pricing'],
  ['Docs', '/docs'],
  ['The Book', '/book'],
]

const FOUNDER_LINKS: { label: string; href: string; desc: string; icon: typeof Menu }[] = [
  {
    label: 'Leads Dashboard',
    href: '/leads/admin',
    desc: 'Captured leads & pipeline',
    icon: Users,
  },
  {
    label: 'Stress Test Dashboard',
    href: '/stress-test/admin',
    desc: 'Applicants who registered',
    icon: LayoutDashboard,
  },
  {
    label: 'Survey Database',
    href: '/survey/admin',
    desc: 'Tester feedback & responses',
    icon: Database,
  },
  {
    label: 'Apply Form',
    href: '/stress-test',
    desc: 'The public registration page',
    icon: ClipboardList,
  },
]

const TOOL_LINKS: { label: string; href: string; icon: typeof Menu }[] = [
  { label: 'Join the List', href: '/leads', icon: UserPlus },
  { label: 'Guided Demo', href: '/demo', icon: PlayCircle },
  { label: 'QR Codes', href: '/qr', icon: QrCode },
  { label: 'FB Boost Kit', href: '/fb', icon: Megaphone },
  { label: 'Field Kit', href: '/field', icon: MapPin },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="/"
          className="flex flex-1 items-center gap-3"
          aria-label="REDE home"
        >
          <Image
            src="/rede-logo.png"
            alt="REDE"
            width={36}
            height={36}
            priority
            className="h-9 w-9 rounded-full"
          />
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            From Data to Decisions
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {MENU_LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/40 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
        </div>
      </nav>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto border-l border-border/60 bg-background shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-14 items-center justify-between border-b border-border/60 px-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Menu
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <X className="h-[18px] w-[18px]" />
            </button>
          </div>

          <div className="flex flex-col gap-8 px-5 py-7">
            {/* Marketing */}
            <div className="flex flex-col gap-1">
              {MENU_LINKS.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-card"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Founder / Internal */}
            <div className="flex flex-col gap-2">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Founder
              </p>
              {FOUNDER_LINKS.map(({ label, href, desc, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/40 px-3 py-3 transition-colors hover:border-primary/50"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[14px] font-semibold text-foreground">
                      {label}
                    </span>
                    <span className="text-[12px] text-muted-foreground">{desc}</span>
                  </span>
                </Link>
              ))}
            </div>

            {/* Tools */}
            <div className="flex flex-col gap-2">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Tools
              </p>
              <div className="grid grid-cols-2 gap-2">
                {TOOL_LINKS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl border border-border/50 px-3 py-3 text-[13px] font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/stress-test"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Join the Pilot
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
