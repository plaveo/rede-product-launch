import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'REDE — Facebook Boost Kit',
  description: 'Ready-to-post, boost-sized REDE creatives for Facebook and Instagram.',
}

const ASSETS = [
  {
    src: '/marketing/rede-fb-4x5.png',
    file: 'rede-fb-4x5.png',
    ratio: '4 : 5',
    size: '1080 × 1350',
    tag: 'Recommended for boosting',
    note: 'Takes the most space in the mobile feed — best performance for Meta ads.',
    frame: 'aspect-[4/5]',
  },
  {
    src: '/marketing/rede-fb-1x1.png',
    file: 'rede-fb-1x1.png',
    ratio: '1 : 1',
    size: '1080 × 1080',
    tag: 'Universal square',
    note: 'Safe across every placement — feed, profile, and Instagram grid.',
    frame: 'aspect-square',
  },
]

export default function FbKitPage() {
  return (
    <main className="min-h-dvh bg-background px-5 py-14 md:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <p className="font-rede text-[12px] font-medium uppercase tracking-[0.25em] text-primary">
            Facebook Boost Kit
          </p>
          <h1 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Post-ready REDE creatives
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Sized for Meta feed and boosting. Download, upload to Facebook, and boost — walang edit na kailangan.
          </p>
        </header>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {ASSETS.map((a) => (
            <div
              key={a.file}
              className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card"
            >
              <div className={`relative ${a.frame} w-full bg-background`}>
                <Image
                  src={a.src || '/placeholder.svg'}
                  alt={`REDE Facebook creative ${a.ratio}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/15 px-2.5 py-1 font-rede text-[12px] font-semibold text-primary">
                    {a.ratio}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{a.size}</span>
                </div>
                <p className="mt-3 text-[13px] font-semibold text-foreground">{a.tag}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{a.note}</p>
                <a
                  href={a.src}
                  download={a.file}
                  className="mt-4 flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-[14px] font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download PNG
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* video option */}
        <div className="mt-10 rounded-2xl border border-border/70 bg-card p-6 text-center">
          <p className="font-rede text-[12px] font-medium uppercase tracking-[0.2em] text-primary">
            Want a video ad?
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-foreground">
            Screen-record the live demo
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
            Open the auto-playing walkthrough, screen-record it in portrait, and upload the clip as a boostable
            video. It runs itself — walang narration na kailangan.
          </p>
          <Link
            href="/demo"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/40 px-6 text-[14px] font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Open the demo
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <p className="mt-8 text-center text-[12px] leading-relaxed text-muted-foreground">
          Tip: sa Facebook boosting, i-set ang objective sa &ldquo;Get more leads&rdquo; at ituro ang link sa{' '}
          <span className="text-foreground">rede-product-launch.vercel.app/stress-test</span>.
        </p>
      </div>
    </main>
  )
}
