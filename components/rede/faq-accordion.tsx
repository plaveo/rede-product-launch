'use client'

import { useId, useState } from 'react'

type QA = { q: string; a: string }

export function FaqAccordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card/40">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-btn-${i}`
        const panelId = `${baseId}-panel-${i}`
        return (
          <div
            key={item.q}
            className={`border-border/60 ${i > 0 ? 'border-t' : ''}`}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-primary/5 md:px-7 md:py-6"
              >
                <span className="font-rede text-base font-semibold text-foreground md:text-lg">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70 text-primary transition-all duration-300 group-hover:border-primary/50 ${
                    isOpen ? 'rotate-45 bg-primary/10' : ''
                  }`}
                >
                  <span className="absolute h-[2px] w-3.5 rounded bg-current" />
                  <span className="absolute h-3.5 w-[2px] rounded bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 text-[15px] leading-relaxed text-muted-foreground md:px-7 md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
