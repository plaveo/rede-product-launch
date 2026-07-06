import Image from 'next/image'

type Variant = '4x5' | '1x1'

const SIZE: Record<Variant, { w: number; h: number }> = {
  '4x5': { w: 1080, h: 1350 },
  '1x1': { w: 1080, h: 1080 },
}

const LENSES = [
  { label: 'People', value: 76 },
  { label: 'Economy', value: 69 },
  { label: 'Movement', value: 83 },
  { label: 'Infrastructure', value: 74 },
  { label: 'Connectivity', value: 91 },
]

function ScoreRing({ score, size }: { score: number; size: number }) {
  const stroke = Math.round(size * 0.075)
  const r = size / 2 - stroke
  const c = 2 * Math.PI * r
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * score) / 100}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-semibold tracking-tight text-foreground" style={{ fontSize: size * 0.32 }}>
          {score}
        </span>
        <span
          className="font-medium uppercase tracking-widest text-muted-foreground"
          style={{ fontSize: size * 0.07 }}
        >
          Decision
        </span>
      </div>
    </div>
  )
}

/**
 * Fixed-pixel promo poster for Facebook / Meta feed + boosting.
 * 4x5 (1080x1350) is the recommended boost size; 1x1 (1080x1080) is universal.
 */
export function FbPoster({ variant }: { variant: Variant }) {
  const { w, h } = SIZE[variant]
  const tall = variant === '4x5'
  const pad = tall ? 88 : 72

  return (
    <div
      className="relative overflow-hidden bg-background text-foreground"
      style={{ width: w, height: h }}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 rounded-full"
        style={{
          width: 620,
          height: 620,
          background: 'radial-gradient(circle, color-mix(in oklch, var(--primary) 26%, transparent), transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-40 rounded-full"
        style={{
          width: 560,
          height: 560,
          background: 'radial-gradient(circle, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)',
        }}
      />

      <div className="relative flex h-full flex-col" style={{ padding: pad }}>
        {/* brand row */}
        <div className="flex items-center" style={{ gap: 18 }}>
          <Image src="/rede-mark.png" alt="REDE" width={64} height={64} style={{ width: 64, height: 64 }} />
          <div className="flex flex-col" style={{ gap: 4 }}>
            <span className="font-rede font-bold tracking-tight text-foreground" style={{ fontSize: 40, lineHeight: 1 }}>
              REDE
            </span>
            <span
              className="font-medium uppercase text-primary"
              style={{ fontSize: 15, letterSpacing: '0.22em' }}
            >
              From Data to Decisions
            </span>
          </div>
        </div>

        {/* headline block */}
        <div style={{ marginTop: tall ? 72 : 44 }}>
          <p
            className="font-rede font-semibold uppercase text-primary"
            style={{ fontSize: 22, letterSpacing: '0.24em' }}
          >
            Real Estate Decision Engine
          </p>
          <h1
            className="font-display font-semibold tracking-tight text-balance text-foreground"
            style={{ fontSize: tall ? 92 : 76, lineHeight: 1.02, marginTop: 28 }}
          >
            Every property,
            <br />
            explained with{' '}
            <span className="text-primary">evidence.</span>
          </h1>
          <p
            className="text-pretty text-muted-foreground"
            style={{ fontSize: tall ? 30 : 27, lineHeight: 1.5, marginTop: 32, maxWidth: w - pad * 2 }}
          >
            Turn any property into a clear, defensible decision — a single 0–100 score across 5 lenses,
            each backed by data.
          </p>
        </div>

        {/* proof card */}
        <div
          className="mt-auto rounded-3xl border border-border bg-card/70"
          style={{ padding: tall ? 44 : 36, backdropFilter: 'blur(6px)' }}
        >
          <div className="flex items-center" style={{ gap: tall ? 40 : 32 }}>
            <ScoreRing score={87} size={tall ? 200 : 168} />
            <div className="flex-1">
              <span
                className="inline-flex items-center rounded-full font-semibold"
                style={{
                  fontSize: 20,
                  padding: '8px 18px',
                  background: 'color-mix(in oklch, oklch(0.7 0.14 150) 16%, transparent)',
                  color: 'oklch(0.82 0.14 150)',
                }}
              >
                Strong Buy • 87 / 100
              </span>
              <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {LENSES.map((l) => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span className="text-foreground" style={{ fontSize: 19, width: 168 }}>
                      {l.label}
                    </span>
                    <div
                      className="overflow-hidden rounded-full bg-border"
                      style={{ height: 10, flex: 1 }}
                    >
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${l.value}%` }}
                      />
                    </div>
                    <span className="font-rede font-semibold text-muted-foreground" style={{ fontSize: 18, width: 40, textAlign: 'right' }}>
                      {l.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA bar */}
        <div
          className="flex items-center justify-between rounded-2xl bg-primary"
          style={{ marginTop: tall ? 40 : 28, padding: tall ? '30px 40px' : '24px 34px' }}
        >
          <span className="font-display font-semibold text-primary-foreground" style={{ fontSize: tall ? 34 : 29 }}>
            Join the REDE Pilot
          </span>
          <span className="font-rede font-medium text-primary-foreground/90" style={{ fontSize: tall ? 22 : 19 }}>
            rede-product-launch.vercel.app
          </span>
        </div>
      </div>
    </div>
  )
}
