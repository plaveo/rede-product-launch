import { Reveal } from './reveal'

const NODES = [
  { value: '30', label: 'Signals', desc: 'Structured data points gathered for every property.' },
  { value: '5', label: 'Interpretation Lenses', desc: 'Signals are read through five professional lenses.' },
  { value: '1', label: 'Professional Decision', desc: 'One clear, defensible recommendation.' },
]

export function FrameworkVisual() {
  return (
    <Reveal className="mt-14 md:mt-20">
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/50 p-6 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 top-[-30%] h-64 bg-primary/12 blur-[120px]"
        />
        <p className="relative text-center font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          The REDE Framework
        </p>
        <h3 className="relative mt-4 text-balance text-center font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          How thirty signals become one decision.
        </h3>

        <div className="relative mt-10 flex flex-col items-center gap-4 md:flex-row md:items-stretch md:justify-center md:gap-0">
          {NODES.map((node, i) => (
            <div key={node.label} className="flex w-full flex-col items-center md:flex-row md:items-stretch">
              <div className="flex w-full max-w-xs flex-1 flex-col items-center rounded-2xl border border-border/60 bg-card/50 p-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 font-rede text-2xl font-semibold text-primary">
                  {node.value}
                </span>
                <h4 className="mt-4 font-rede text-base font-semibold text-foreground">
                  {node.label}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{node.desc}</p>
              </div>
              {i < NODES.length - 1 && (
                <div
                  aria-hidden
                  className="flex items-center justify-center py-2 text-primary md:px-4 md:py-0"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="rotate-90 md:rotate-0"
                  >
                    <path
                      d="M5 12h14m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
