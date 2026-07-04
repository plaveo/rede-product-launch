import { Reveal } from '../reveal'
import { BookOpen, MousePointerClick, Layers, Gauge, FileText, CheckCircle2 } from 'lucide-react'

const MODULES = [
  {
    icon: BookOpen,
    n: '01',
    href: '#module-1',
    title: 'Welcome to REDE',
    desc: 'What REDE is, who it is for, and the idea behind turning data into decisions.',
    time: '3 min',
  },
  {
    icon: MousePointerClick,
    n: '02',
    href: '#module-2',
    title: 'Getting started',
    desc: 'Open your workspace and enter your first property in a few taps.',
    time: '4 min',
  },
  {
    icon: Layers,
    n: '03',
    href: '#module-3',
    title: 'Understanding the 30 signals',
    desc: 'What each signal means and how REDE reads a property systematically.',
    time: '6 min',
  },
  {
    icon: Gauge,
    n: '04',
    href: '#module-4',
    title: 'The five interpretation lenses',
    desc: 'How raw signals become professional meaning across five lenses.',
    time: '6 min',
  },
  {
    icon: FileText,
    n: '05',
    href: '#module-5',
    title: 'Reading your report',
    desc: 'Navigate the decision score, lens breakdown, and supporting evidence.',
    time: '5 min',
  },
  {
    icon: CheckCircle2,
    n: '06',
    href: '#module-6',
    title: 'Making the decision',
    desc: 'Turn the report into a confident, defensible recommendation you can act on.',
    time: '4 min',
  },
]

export function Curriculum() {
  return (
    <section
      id="curriculum"
      className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32"
    >
      <Reveal className="max-w-3xl">
        <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
          Curriculum
        </p>
        <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
          Six modules to mastery.
        </h2>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Work through the modules in order, or jump to the topic you need. Each
          module builds on the last.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {MODULES.map((m, i) => {
          const Icon = m.icon
          return (
            <Reveal key={m.n} delay={i * 70}>
              <a
                href={m.href}
                className="rede-lift group flex h-full items-start gap-5 rounded-3xl border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 md:p-7"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/40 bg-primary/10 transition-transform duration-500 group-hover:scale-105">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-rede text-[12px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Module {m.n}
                    </span>
                    <span className="rounded-full border border-border/60 bg-background/60 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {m.time}
                    </span>
                  </div>
                  <h3 className="mt-2 font-rede text-lg font-semibold text-foreground md:text-xl">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {m.desc}
                  </p>
                </div>
              </a>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
