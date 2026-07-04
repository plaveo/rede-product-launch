import { Reveal } from './reveal'
import { FaqAccordion } from './faq-accordion'
import { FrameworkVisual } from './framework-visual'

const FUNDAMENTALS = [
  {
    q: 'What is REDE?',
    a: 'REDE is a professional property decision engine. It gathers 30 structured signals for any property, reads them through 5 interpretation lenses, and produces one clear, defensible recommendation.',
  },
  {
    q: 'Who is REDE for?',
    a: 'REDE is built for real estate professionals — salespersons, licensed brokers, property advisors, investors, owners, developers, and teams who make property decisions every day.',
  },
  {
    q: 'Is REDE a selling tool?',
    a: 'No. REDE is a decision-support tool, not a sales script. It helps you understand a property with data so your recommendations are grounded, consistent, and easy to defend.',
  },
  {
    q: 'Does REDE replace professional judgment?',
    a: 'Never. REDE structures the evidence and surfaces what matters — the professional judgment, and the final call, always remain yours.',
  },
]

const STRESS_TEST = [
  {
    q: 'What is the Stress Test Program?',
    a: 'An invitation-only early access program where selected professionals validate REDE in real workflows before public launch.',
  },
  {
    q: 'Do participants pay?',
    a: 'No. Participation is free. It is a collaboration — your feedback is the contribution that shapes the product.',
  },
  {
    q: 'What will participants test?',
    a: 'Real property decisions: the 30 signals, the 5 interpretation lenses, search, maps, analytics, and the professional report output.',
  },
  {
    q: 'How long is the program?',
    a: 'A focused four-week cycle: orientation and access, platform exploration, real-world scenario testing, then feedback and validation.',
  },
  {
    q: 'What feedback is needed?',
    a: 'Honest observations on clarity, accuracy, and usefulness — what works, what breaks, and what would make REDE more trustworthy in practice.',
  },
  {
    q: 'Can screenshots be shared?',
    a: 'During the program the platform is confidential. Please keep screenshots and findings within the program until public launch.',
  },
]

const REPORTING_FUTURE = [
  {
    q: 'Will REDE create reports?',
    a: 'Yes. REDE generates professional reports with an executive summary, signal breakdowns, charts, and a clear recommendation — ready to present to clients.',
  },
  {
    q: 'What happens after the stress test?',
    a: 'Findings are consolidated into product improvements, and validated workflows carry forward into the public launch of REDE.',
  },
  {
    q: 'Who created REDE?',
    a: 'REDE is created by PEPWORLD, the parent company building a connected ecosystem of professional property products.',
  },
  {
    q: 'What is PEPWORLD?',
    a: 'PEPWORLD is the company behind REDE, VALUE, and STAY — products built on one standard: Property, Economy, People.',
  },
  {
    q: 'Can REDE help with client presentations?',
    a: 'Yes. The structured signals, lenses, and professional reports are designed to make client conversations clearer and more persuasive.',
  },
  {
    q: 'Can beginners use REDE?',
    a: 'Yes. REDE guides you through a professional framework, so newer professionals can make confident, structured decisions from day one.',
  },
  {
    q: 'How can someone join?',
    a: 'The Stress Test Program is invitation only. Participants are selected and sent a private access link directly — there is no public sign-up.',
  },
]

const GROUPS = [
  { eyebrow: 'REDE Fundamentals', items: FUNDAMENTALS },
  { eyebrow: 'Stress Test Questions', items: STRESS_TEST },
  { eyebrow: 'Reporting & Future', items: REPORTING_FUTURE },
]

export function Faq() {
  return (
    <section
      id="faq"
      className="relative border-y border-border/50 bg-card/30 px-5 py-28 md:px-8 md:py-40"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="font-rede text-[13px] font-medium uppercase tracking-[0.25em] text-primary">
            Frequently Asked Questions
          </p>
          <h2 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-6xl">
            Everything you need to know.
          </h2>
        </Reveal>

        {/* Ch34 Fundamentals */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <p className="mb-5 font-rede text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {GROUPS[0].eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <FaqAccordion items={GROUPS[0].items} />
          </Reveal>
        </div>

        {/* Ch35 Stress Test */}
        <div className="mt-14 md:mt-16">
          <Reveal>
            <p className="mb-5 font-rede text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {GROUPS[1].eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <FaqAccordion items={GROUPS[1].items} />
          </Reveal>
        </div>
      </div>

      {/* Ch36 Framework visual — full width within a wider container */}
      <div className="mx-auto max-w-5xl">
        <FrameworkVisual />
      </div>

      {/* Ch37 Reporting & Future */}
      <div className="mx-auto max-w-3xl">
        <div className="mt-14 md:mt-16">
          <Reveal>
            <p className="mb-5 font-rede text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {GROUPS[2].eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <FaqAccordion items={GROUPS[2].items} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
