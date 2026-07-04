import { Reveal } from '@/components/rede/reveal'
import type { BookSection as BookSectionType, Chapter } from '@/lib/book-content'

function ChapterBlock({
  chapter,
  sectionId,
}: {
  chapter: Chapter
  sectionId: string
}) {
  return (
    <article
      id={`${sectionId}-${chapter.number}`}
      className="scroll-mt-24 border-t border-border/50 pt-10 first:border-t-0 first:pt-0"
    >
      <Reveal>
        <div className="flex items-baseline gap-3">
          <span className="font-rede text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Chapter {chapter.number}
          </span>
          {chapter.placeholder && (
            <span className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Draft
            </span>
          )}
        </div>

        <h3 className="font-display mt-3 text-2xl font-semibold leading-tight text-foreground md:text-3xl">
          {chapter.title}
        </h3>

        {chapter.subtitle && chapter.subtitle !== chapter.title && (
          <p className="mt-2 text-base italic text-muted-foreground">{chapter.subtitle}</p>
        )}
      </Reveal>

      <div className="mt-6 space-y-5">
        {chapter.body.length > 0 ? (
          chapter.body.map((paragraph, i) => (
            <Reveal key={i} delay={i * 40}>
              <p className="text-pretty text-[17px] leading-[1.7] text-foreground/85">{paragraph}</p>
            </Reveal>
          ))
        ) : (
          <Reveal>
            <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 p-6">
              <p className="text-sm font-medium text-foreground">This chapter is being written.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{chapter.summary}</p>
            </div>
          </Reveal>
        )}
      </div>
    </article>
  )
}

export function BookSection({ section }: { section: BookSectionType }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-20 border-t border-border/50"
    >
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <p className="font-rede text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            {section.part}
          </p>
          <h2
            id={`${section.id}-heading`}
            className="font-display mt-4 text-3xl font-semibold text-foreground md:text-5xl"
          >
            {section.title}
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {section.intro}
          </p>
        </Reveal>

        <div className="mt-14 space-y-14">
          {section.chapters.map((chapter) => (
            <ChapterBlock key={chapter.number} chapter={chapter} sectionId={section.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
