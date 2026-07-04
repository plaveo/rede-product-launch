'use client'

import { useState } from 'react'
import Image from 'next/image'
import { CAMPAIGN_POSTS, CAMPAIGN_CAPTIONS, type CampaignPost } from '@/lib/campaign-content'

const ANGLE_LABEL: Record<CampaignPost['angle'], string> = {
  proof: 'Proof',
  insight: 'Insight',
  philosophy: 'Philosophy',
  invite: 'Invite',
}

function CopyButton({ text, label = 'Copy caption' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border/70 bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:border-primary/60 hover:text-primary active:scale-95"
    >
      {copied ? 'Copied' : label}
    </button>
  )
}

function PostCard({ post }: { post: CampaignPost }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card rede-lift">
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={post.image || '/placeholder.svg'}
          alt={`REDE campaign post — ${post.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary backdrop-blur">
          {ANGLE_LABEL[post.angle]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <h3 className="font-display text-base font-semibold text-foreground">{post.title}</h3>
        <p className="flex-1 whitespace-pre-line text-[13px] leading-relaxed text-muted-foreground">
          {post.caption}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <CopyButton text={post.caption} />
          <a
            href={post.image}
            download
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Download image
          </a>
        </div>
      </div>
    </article>
  )
}

export function CampaignStudio() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-24 md:px-8">
      {/* Header */}
      <header className="max-w-2xl">
        <p className="font-brand text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
          Campaign Studio
        </p>
        <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
          Doubt to proof.
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Noong una, marami ang hindi naniwala — kasama ang boss. Ngayon, nakita na nila. This run
          turns that story into steady noise: ready-to-post visuals and captions built for brokers
          and sales teams. Copy the caption, download the image, post.
        </p>
      </header>

      {/* Caption bank */}
      <section className="mt-10 rounded-2xl border border-border/60 bg-card p-5" aria-labelledby="bank-title">
        <h2 id="bank-title" className="font-display text-lg font-semibold text-foreground">
          Quick caption bank
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          One-liners for when you just need copy fast.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {CAMPAIGN_CAPTIONS.map((c) => (
            <li
              key={c}
              className="flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-3"
            >
              <span className="text-[13px] leading-relaxed text-foreground">{c}</span>
              <CopyButton text={c} label="Copy" />
            </li>
          ))}
        </ul>
      </section>

      {/* Posts grid */}
      <section className="mt-12" aria-labelledby="posts-title">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="posts-title" className="font-display text-lg font-semibold text-foreground">
              Ready-to-post
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {CAMPAIGN_POSTS.length} posts · Facebook &amp; Instagram
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAMPAIGN_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  )
}
