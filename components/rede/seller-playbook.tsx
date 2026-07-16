'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { QRCodeCanvas } from 'qrcode.react'
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Layers,
  Compass,
  Gauge,
  ScrollText,
  Database,
  Network,
  Filter,
  ShieldCheck,
  MessageSquareQuote,
  Sparkles,
  Building2,
  MapPin,
  FileText,
  Share2,
} from 'lucide-react'

const REDE_LINK = 'https://rede.ph'

/* ---------- small building blocks ---------- */

function Overline({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
      {children}
    </p>
  )
}

function FlowPill({
  label,
  sub,
  tone = 'muted',
}: {
  label: string
  sub?: string
  tone?: 'muted' | 'primary'
}) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
        tone === 'primary'
          ? 'border-primary/50 bg-primary/12'
          : 'border-border/60 bg-card/50'
      }`}
    >
      <span className="text-[14px] font-semibold text-foreground">{label}</span>
      {sub ? (
        <span className="text-[11px] font-medium text-muted-foreground">{sub}</span>
      ) : null}
    </div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center py-1.5" aria-hidden="true">
      <div className="h-4 w-px bg-border" />
    </div>
  )
}

/* ---------- the pages ---------- */

type PageDef = {
  section: string
  icon: React.ComponentType<{ className?: string }>
  render: () => React.ReactNode
}

const LENSES = [
  ['People', 'Sino ang gumagalaw dito — flow, density, demand.'],
  ['Economy', 'Cashflow, halaga, hanapbuhay sa paligid.'],
  ['Movement', 'Transport, daanan, gaano kadaling marating.'],
  ['Infrastructure', 'Buildings, grid, pasilidad, kaligtasan.'],
  ['Connectivity', 'Ugnayan sa mas malaking network at global grid.'],
]

const SIGNAL_SAMPLE = [
  'Core', 'Ground', 'Ecosystem', 'Economy', 'Cashflow', 'Grid',
  'Circulation', 'Density', 'Finance', 'Logistics', 'Aviation Flow', 'Bank Node',
  'Human Flow', 'Transport', 'Tourism', 'Real Estate', 'Movement', 'Pressure',
  'Demand', 'Supply', 'Competition', 'Value', 'Risk', 'Opportunity',
  'Growth', 'Decision',
]

const SUBLAYERS = [
  'Micro', 'Macro', 'People', 'Economy', 'Market',
  'Property', 'Movement', 'Risk', 'Decision',
]

const PAGES: PageDef[] = [
  /* 01 — Cover */
  {
    section: 'Seller Playbook',
    icon: Sparkles,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Image
          src="/rede-logo.png"
          alt="REDE"
          width={76}
          height={76}
          priority
          className="h-19 w-19 rounded-full"
        />
        <div className="mt-6">
          <Overline>PEPWORLD · For Real Estate Professionals</Overline>
        </div>
        <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.05] text-foreground">
          The REDE Seller Playbook
        </h1>
        <p className="mt-4 max-w-sm text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Paano gamitin ang REDE para ipaliwanag ang kahit anong property nang
          may kumpiyansa — at kung paano kinukcompute ang bawat numero.
        </p>
        <p className="mt-8 text-[12px] font-medium text-muted-foreground">
          I-swipe para simulan &rarr;
        </p>
      </div>
    ),
  },

  /* 02 — What is REDE */
  {
    section: 'Ano ang REDE',
    icon: Compass,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Ang Pundasyon</Overline>
        <h2 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-foreground">
          REDE ay tumutulong sa iyo, hindi pumapalit sa iyo.
        </h2>
        <p className="mt-5 text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Hindi listing site ang REDE at hindi ito nagdedesisyon para sa kliyente.
          Ang problema na sinasagot nito ay <span className="text-foreground">impormasyon</span>:
          kalat-kalat ang datos ng property sa iba&apos;t ibang pinagkukunan.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          {[
            ['Facts', 'Maayos at nakabatay sa ebidensya'],
            ['Confidence', 'Kaya mong ipaliwanag nang tama'],
            ['Better decisions', 'Naiintindihan ng kliyente — sila ang pumipili'],
          ].map(([t, s]) => (
            <div key={t} className="rounded-2xl border border-border/60 bg-card/50 px-4 py-3">
              <p className="text-[14px] font-semibold text-foreground">{t}</p>
              <p className="text-[12px] text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 03 — The Method overview */
  {
    section: 'Ang Metodo',
    icon: Layers,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Isang Daloy, Walang Hula</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Paano nabubuo ang desisyon
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          Bawat property ay dumadaan sa parehong daloy. Ito ang sasabihin mo sa
          kliyente kapag tinanong &quot;bakit ganito?&quot;
        </p>
        <div className="mt-6">
          <FlowPill label="Property" sub="ang sinusuri" tone="primary" />
          <Connector />
          <FlowPill label="30 Signals" sub="observe" />
          <Connector />
          <FlowPill label="9 Sub-Layers" sub="refine" />
          <Connector />
          <FlowPill label="5 Lenses" sub="interpret" />
          <Connector />
          <FlowPill label="1 Decision" sub="verdict" tone="primary" />
        </div>
      </div>
    ),
  },

  /* 04 — How data is gathered (nodes) */
  {
    section: 'Hakbang 1 · Datos',
    icon: Database,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Saan Galing ang Datos</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Node-connected na datos
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          Bago pa may property data, naka-mapa na ang buong Pilipinas bilang{' '}
          <span className="text-foreground">daanan</span> — bawat hakbang nito ay
          isang <span className="text-foreground">node</span> (address sa pathway).
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {['Region', 'Province', 'City', 'Barangay', 'Building', 'Unit'].map((n, i, a) => (
            <span key={n} className="flex items-center gap-1.5">
              <span className="rounded-lg border border-border/60 bg-card/50 px-2.5 py-1.5 text-[12px] font-medium text-foreground">
                {n}
              </span>
              {i < a.length - 1 ? (
                <span className="text-muted-foreground" aria-hidden="true">›</span>
              ) : null}
            </span>
          ))}
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
          Ang search ay hindi &quot;naghahalughog&quot; — nilalakad nito ang
          naka-mapa nang daanan. Ang datos ay live: OSM, transport, human flow,
          at ang REDE node network.
        </p>
      </div>
    ),
  },

  /* 05 — 30 signals */
  {
    section: 'Hakbang 2 · Signals',
    icon: Network,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Ang 30 Signals</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          30 na engine na sumusuri sa property
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          Ang bawat signal ay isang nakapangalang engine — may sariling
          computation (datos + matematika) at interpretation (score + salita).
        </p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {SIGNAL_SAMPLE.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-border/50 bg-card/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              {s}
            </span>
          ))}
          <span className="rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            + more
          </span>
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
          Magkakakonekta silang lahat bilang isang network — hindi hiwa-hiwalay
          na bucket.
        </p>
      </div>
    ),
  },

  /* 06 — Downfall mechanic */
  {
    section: 'Hakbang 2 · Downfall',
    icon: Filter,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Ang Downfall — Ubod ng REDE</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Selective, node-driven
        </h2>
        <div className="mt-5 flex flex-col gap-3">
          {[
            ['Observed by all 30', 'Sinusuri ng lahat ng 30 signals ang property.'],
            ['Downfalls selectively', 'Nag-iiskor lang ito sa signals na ginagawang relevant ng node nito.'],
            ['Node decides', 'Walang aviation node? Walang downfall sa Aviation — pero konektado pa rin.'],
            ['Honest gaps', 'Walang datos = aminadong gap, HINDI imbentong numero.'],
          ].map(([t, s]) => (
            <div key={t} className="flex gap-3">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <div>
                <p className="text-[14px] font-semibold text-foreground">{t}</p>
                <p className="text-[12.5px] leading-relaxed text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 07 — 9 sub-layers */
  {
    section: 'Hakbang 3 · Sub-Layers',
    icon: Layers,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Ang 9 Sub-Layers</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Inaayos ang signals bago mag-lenses
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          Pagkatapos ng downfall, dumadaan ang signals sa 9 sub-layers na
          nag-aayos at nagre-refine bago sila mag-roll-up sa 5 lenses.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {SUBLAYERS.map((s, i) => (
            <div
              key={s}
              className="rounded-xl border border-border/60 bg-card/50 px-2 py-3 text-center"
            >
              <p className="text-[10px] font-semibold text-muted-foreground">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-0.5 text-[12.5px] font-semibold text-foreground">{s}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 08 — 5 lenses */
  {
    section: 'Hakbang 4 · Lenses',
    icon: Compass,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Ang 5 Interpretation Lenses</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Nagiging kahulugan ang datos
        </h2>
        <div className="mt-5 flex flex-col gap-2.5">
          {LENSES.map(([t, s]) => (
            <div key={t} className="rounded-2xl border border-border/60 bg-card/50 px-4 py-3">
              <p className="text-[14px] font-semibold text-foreground">{t}</p>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{s}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] text-muted-foreground">
          Bawat lens = 0–100 score + assessment band (Favorable, Strong, Very Strong…).
        </p>
      </div>
    ),
  },

  /* 09 — 1 decision */
  {
    section: 'Hakbang 5 · Decision',
    icon: Gauge,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Ang 1 Guided Decision</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Isang malinaw na rekomendasyon
        </h2>
        <div className="mt-6 rounded-3xl border border-primary/40 bg-primary/10 p-6 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">
            REDE Score
          </p>
          <p className="mt-2 font-display text-5xl font-semibold text-foreground">76<span className="text-2xl text-muted-foreground">/100</span></p>
          <p className="mt-2 text-[13px] font-semibold text-foreground">Strong · Favorable</p>
        </div>
        <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">
          Ang verdict ay may confidence level at nakabatay sa lahat ng nasa taas.
          Tandaan: <span className="text-foreground">REDE recommends, the client decides.</span>
        </p>
      </div>
    ),
  },

  /* 10 — The basis (defensible) */
  {
    section: 'Ang Basehan',
    icon: ShieldCheck,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Bakit Depensable</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Walang hand-typed na numero
        </h2>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
          Bawat numerong nakikita mo ay <span className="text-foreground">kinompute</span> mula
          sa totoong reading, dumaan sa fixed formula. Kaya kapag tinanong ka ng
          kliyente, may fact at basis kang isasagot.
        </p>
        <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 p-4">
          <p className="text-center text-[12.5px] font-medium leading-relaxed text-muted-foreground">
            raw reading <span className="text-primary">→</span> benchmark curve{' '}
            <span className="text-primary">→</span> signal score{' '}
            <span className="text-primary">→</span> lens average{' '}
            <span className="text-primary">→</span>{' '}
            <span className="text-foreground">overall decision</span>
          </p>
        </div>
        <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
          Deterministic (parehong input = parehong score) at may honest gaps —
          mas mabuti ang aminadong kakulangan kaysa imbentong numero.
        </p>
      </div>
    ),
  },

  /* 11 — How to use in-app */
  {
    section: 'Paano Gamitin',
    icon: Search,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Sa Loob ng App</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Anim na hakbang, isang minuto
        </h2>
        <div className="mt-5 flex flex-col gap-2.5">
          {[
            [Search, 'Hanapin ang property', 'I-type ang building o lugar sa Search.'],
            [Building2, 'Buksan ang report', 'Piliin ang property para sa Decision Workspace.'],
            [Gauge, 'Tingnan ang REDE score', 'Overview: score, band, at local context.'],
            [Compass, 'Basahin ang 5 lenses', 'Analysis tab: People, Economy, Movement, atbp.'],
            [MapPin, 'Suriin ang Nearby', 'Malls, hospitals, transit, human flow.'],
            [FileText, 'I-export / i-share', 'PDF o CSV para sa client meeting.'],
          ].map(([Icon, t, s], i) => {
            const IconC = Icon as React.ComponentType<{ className?: string }>
            return (
              <div key={t as string} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/50 px-3.5 py-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <IconC className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-foreground">{i + 1}. {t as string}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{s as string}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    ),
  },

  /* 12 — Talking script */
  {
    section: 'Talking Script',
    icon: MessageSquareQuote,
    render: () => (
      <div className="flex h-full flex-col justify-center">
        <Overline>Sa Harap ng Kliyente</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          Ano ang sasabihin mo
        </h2>
        <div className="mt-5 flex flex-col gap-3">
          {[
            '&quot;Bago tayo magdesisyon, tingnan natin ang datos ng property na ito.&quot;',
            '&quot;Ang REDE score ay 76 — Strong. Ito ang mga dahilan…&quot;',
            '&quot;Malakas ang Movement at People dito; ang babantayan natin ay Supply.&quot;',
            '&quot;Lahat ng numerong ito ay may pinagmulan — hindi hula.&quot;',
            '&quot;Nasa iyo pa rin ang desisyon. Nandito ako para linawin ito.&quot;',
          ].map((line, i) => (
            <div key={i} className="rounded-2xl border border-border/60 bg-card/50 px-4 py-3">
              <p
                className="text-[13.5px] leading-relaxed text-foreground"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            </div>
          ))}
        </div>
      </div>
    ),
  },

  /* 13 — Try it now (QR) */
  {
    section: 'Subukan Ngayon',
    icon: Share2,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Overline>May Major Update Na</Overline>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-foreground">
          I-scan at subukan sa rede.ph
        </h2>
        <div className="mt-6 rounded-3xl bg-white p-4 shadow-lg">
          <QRCodeCanvas value={REDE_LINK} size={168} level="M" marginSize={0} />
        </div>
        <a
          href={REDE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[14px] font-semibold text-primary-foreground"
        >
          Buksan ang rede.ph
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-5 max-w-xs text-[12.5px] leading-relaxed text-muted-foreground">
          Habang nagtuturo, i-scan ito ng mga agent para masubukan agad ang
          live na REDE sa kanilang phone.
        </p>
      </div>
    ),
  },

  /* 14 — Close */
  {
    section: 'Tandaan',
    icon: ScrollText,
    render: () => (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <Image
          src="/rede-logo.png"
          alt="REDE"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
        />
        <h2 className="mt-6 text-balance font-display text-3xl font-semibold leading-tight text-foreground">
          Confidence built on trustworthy information.
        </h2>
        <p className="mt-4 max-w-sm text-pretty text-[14px] leading-relaxed text-muted-foreground">
          Ang REDE ay tool para makapag-explain ka nang may kumpiyansa. Ang teknolohiya,
          datos, at AI ay paraan lang — ang desisyon ay sa kliyente pa rin.
        </p>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          REDE · PEPWORLD
        </p>
      </div>
    ),
  },
]

/* ---------- the playbook shell ---------- */

export function SellerPlaybook() {
  const [page, setPage] = useState(0)
  const total = PAGES.length
  const touchStartX = useRef<number | null>(null)

  const go = useCallback(
    (next: number) => {
      setPage((p) => Math.min(total - 1, Math.max(0, next ?? p)))
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(page + 1)
      if (e.key === 'ArrowLeft') go(page - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, go])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 44) {
      if (dx < 0) go(page + 1)
      else go(page - 1)
    }
    touchStartX.current = null
  }

  const Icon = PAGES[page].icon

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pb-6 pt-20">
      {/* progress */}
      <div className="flex items-center gap-1.5" aria-hidden="true">
        {PAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= page ? 'bg-primary' : 'bg-border'
            }`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* header row */}
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
          <Icon className="h-4 w-4 text-primary" />
          {PAGES[page].section}
        </span>
        <span className="tnum text-[12px] font-semibold text-muted-foreground">
          {String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* page body */}
      <div
        className="rede-reveal mt-2 flex-1"
        key={page}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {PAGES[page].render()}
      </div>

      {/* controls */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={() => go(page - 1)}
          disabled={page === 0}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-card/50 text-foreground transition-colors disabled:opacity-30"
          aria-label="Previous page"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {page < total - 1 ? (
          <button
            onClick={() => go(page + 1)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-[14px] font-semibold text-primary-foreground"
          >
            Susunod
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <a
            href={REDE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-[14px] font-semibold text-primary-foreground"
          >
            Buksan ang rede.ph
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  )
}
