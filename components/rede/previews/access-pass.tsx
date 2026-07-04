import Image from 'next/image'

export function AccessPass() {
  return (
    <div className="relative mx-auto w-full max-w-sm select-none">
      {/* stacked cards behind for depth */}
      <div
        aria-hidden
        className="absolute inset-x-6 -bottom-4 h-full rounded-[26px] border border-border/40 bg-card/30"
      />
      <div
        aria-hidden
        className="absolute inset-x-3 -bottom-2 h-full rounded-[26px] border border-border/50 bg-card/40"
      />

      {/* the pass */}
      <div className="rede-glass rede-edge-light rede-shadow relative overflow-hidden rounded-[26px] p-6">
        {/* sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-[60px]"
        />

        <div className="relative flex items-center justify-between">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2219-mJt2RjfvNDodJ2D7DCqVtlBLdSwFwR.jpeg"
            alt="REDE"
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl"
          />
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary rede-pulse" />
            Invitation
          </span>
        </div>

        <p className="relative mt-8 text-[11px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Early Access Pass
        </p>
        <p className="relative mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground">
          Stress Test Program
        </p>

        <div className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60">
          {[
            ['Cohort', 'Founding'],
            ['Seats', 'Limited'],
            ['Access', 'Full platform'],
            ['Prepared by', 'PEPWORLD'],
          ].map(([l, v]) => (
            <div key={l} className="bg-background/50 px-3.5 py-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</p>
              <p className="font-rede text-[13px] font-semibold text-foreground">{v}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-5 flex items-center justify-between">
          <span className="font-rede text-[11px] tracking-[0.2em] text-muted-foreground">
            REDE-0001 · PROPERTY · ECONOMY · PEOPLE
          </span>
        </div>
      </div>
    </div>
  )
}
