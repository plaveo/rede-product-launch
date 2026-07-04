import { Reveal } from '@/components/rede/reveal'
import { sections } from '@/lib/book-content'

export function BookContents() {
  return (
    <section
      aria-labelledby="contents-heading"
      className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20"
    >
      <Reveal>
        <h2
          id="contents-heading"
          className="font-display text-2xl font-semibold text-foreground md:text-3xl"
        >
          Contents
        </h2>
      </Reveal>

      <div className="mt-10 space-y-10">
        {sections.map((section, i) => (
          <Reveal key={section.id} delay={i * 60}>
            <div>
              <a href={`#${section.id}`} className="group flex items-baseline gap-3">
                <span className="font-rede text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                  {section.part}
                </span>
                <span className="font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                  {section.title}
                </span>
              </a>

              <ol className="mt-4 divide-y divide-border/50 border-t border-border/50">
                {section.chapters.map((chapter) => (
                  <li key={chapter.number}>
                    <a
                      href={`#${section.id}-${chapter.number}`}
                      className="flex items-center gap-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="font-rede w-6 shrink-0 text-xs font-medium text-muted-foreground">
                        {chapter.number}
                      </span>
                      <span className="flex-1">{chapter.title}</span>
                      {chapter.placeholder && (
                        <span className="shrink-0 rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Draft
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
