/**
 * REDE Result engine (demo).
 *
 * Founder rule: keep the logic here in lib/rede, render thin.
 * This assembles ONE complete institutional REDE Result following the LOCKED flow:
 *   PROPERTY → 30 SIGNALS → 5 LENSES → 1 DECISION → REPORT
 *
 * Scores are directional estimates modeled from a deterministic sample —
 * NOT an appraisal. Honest gaps (value: null) are preserved on purpose:
 * an admitted gap is more trustworthy than an invented number.
 */

export type Band =
  | 'Very Strong'
  | 'Strong'
  | 'Favorable'
  | 'Moderate'
  | 'Weak'

export type Verdict = 'Proceed with confidence' | 'Proceed with caution' | 'Needs further review'

export type LensKey = 'People' | 'Economy' | 'Movement' | 'Infrastructure' | 'Connectivity'

export type Signal = {
  name: string
  /** Human-readable measured value. null = honest data gap. */
  value: string | null
  /** 0–100 directional score. null = gap (excluded from the lens average). */
  score: number | null
  /** One plain-language line: what this reading means. */
  note: string
}

export type Lens = {
  key: LensKey
  question: string
  score: number
  band: Band
  signals: Signal[]
}

export type Property = {
  name: string
  project: string
  developer: string
  type: string
  address: string
}

export type ReedResult = {
  property: Property
  lenses: Lens[]
  overall: number
  verdict: Verdict
  /** 0–100 — how complete the underlying data is (fewer gaps = higher). */
  confidence: number
  gapCount: number
  signalCount: number
  /** The strongest lens — what to lead with. */
  highlight: Lens
  /** The weakest lens — what to watch. */
  watch: Lens
  briefing: string[]
  watchOuts: string[]
}

/** Verdict tones (oklch) — shared with the landing decision section. */
export const TONES: Record<Verdict, string> = {
  'Proceed with confidence': 'oklch(0.7 0.14 150)',
  'Proceed with caution': 'oklch(0.78 0.14 85)',
  'Needs further review': 'oklch(0.6 0.16 25)',
}

export function bandFor(score: number): Band {
  if (score >= 85) return 'Very Strong'
  if (score >= 70) return 'Strong'
  if (score >= 55) return 'Favorable'
  if (score >= 40) return 'Moderate'
  return 'Weak'
}

export function verdictFor(score: number): Verdict {
  if (score >= 80) return 'Proceed with confidence'
  if (score >= 55) return 'Proceed with caution'
  return 'Needs further review'
}

/** Average of scored signals, ignoring gaps. */
function lensScore(signals: Signal[]): number {
  const scored = signals.filter((s) => s.score !== null) as (Signal & { score: number })[]
  if (scored.length === 0) return 0
  return Math.round(scored.reduce((a, s) => a + s.score, 0) / scored.length)
}

/** Raw 30-signal sample for Two Serendra, BGC — grouped by lens. */
const RAW: Record<LensKey, { question: string; signals: Signal[] }> = {
  People: {
    question: 'Is the human demand real and durable?',
    signals: [
      { name: 'Population Density', value: '21,400 / km²', score: 88, note: 'Dense, established residential catchment around BGC.' },
      { name: 'Population Growth', value: '+3.1% / yr', score: 82, note: 'Steady in-migration of professionals and families.' },
      { name: 'Median Age', value: '32 years', score: 84, note: 'Prime earning-age profile — durable buyer and tenant base.' },
      { name: 'Catchment Size', value: '480k within 5km', score: 86, note: 'Large, affluent catchment feeding sustained demand.' },
      { name: 'Buyer / Tenant Mix', value: 'End-user + expat lease', score: 80, note: 'Balanced mix reduces single-source demand risk.' },
      { name: 'Demand Durability', value: 'High', score: 85, note: 'Anchored by offices and international schools nearby.' },
    ],
  },
  Economy: {
    question: 'Does the money actually work?',
    signals: [
      { name: 'Price per sqm', value: '₱385,000', score: 48, note: 'Well above city median — priced at the top of the market.' },
      { name: 'Price Momentum', value: '+4.2% / yr', score: 66, note: 'Positive but decelerating from prior peaks.' },
      { name: 'BIR Zonal Anchor', value: '₱120,000', score: 60, note: 'Zonal value confirms a premium, not a mispricing.' },
      { name: 'Gross Yield', value: '4.1%', score: 52, note: 'Thin yield — this is a capital-preservation play, not cashflow.' },
      { name: 'Holding Costs', value: '₱78 / sqm / mo', score: 58, note: 'Premium dues; factor into any hold model.' },
      { name: 'Vacancy Level', value: null, score: null, note: 'No reliable building-level vacancy feed — verify before committing.' },
    ],
  },
  Movement: {
    question: 'How quickly does demand move here?',
    signals: [
      { name: 'Accessibility', value: 'High', score: 84, note: 'Direct arterial access via 32nd St and 5th Ave.' },
      { name: 'Human Flow', value: 'Very High', score: 88, note: 'Constant foot traffic from offices and retail.' },
      { name: 'Absorption', value: '92% (5 yr)', score: 86, note: 'Historically strong absorption in this cluster.' },
      { name: 'Demand Drivers', value: 'Offices + retail', score: 82, note: 'Multiple durable demand engines within walking distance.' },
      { name: 'Congestion', value: 'Moderate', score: 62, note: 'Peak-hour congestion is the main friction point.' },
      { name: 'Rental Pace', value: '~28 days', score: 80, note: 'Units lease quickly at market rate.' },
    ],
  },
  Infrastructure: {
    question: 'Is the built environment sound?',
    signals: [
      { name: 'Utilities', value: 'Full redundancy', score: 88, note: 'Reliable power, water, and fiber provisioning.' },
      { name: 'Build Quality', value: 'Premium', score: 90, note: 'High construction standard, well maintained.' },
      { name: 'Developer Record', value: 'Ayala Land', score: 92, note: 'Top-tier developer track record and turnover reliability.' },
      { name: 'Development Activity', value: 'Mature', score: 78, note: 'Established estate — limited new supply shock nearby.' },
      { name: 'Flood / Seismic', value: 'Low exposure', score: 80, note: 'Elevated ground; low flood risk for the district.' },
      { name: 'Future Projects', value: null, score: null, note: 'Pipeline of adjacent towers not fully confirmed — monitor supply.' },
    ],
  },
  Connectivity: {
    question: 'How well is it tied into the wider city?',
    signals: [
      { name: 'Transit Reach', value: 'BGC Bus + MRT feeder', score: 78, note: 'Good internal transit; rail link still improving.' },
      { name: 'Hub Proximity', value: '1.2 km to core', score: 86, note: 'Minutes from the central business core.' },
      { name: 'Demand Anchors', value: 'Offices, schools', score: 88, note: 'Surrounded by the anchors that create resale demand.' },
      { name: 'Walkability', value: 'Excellent', score: 90, note: 'Among the most walkable districts in Metro Manila.' },
      { name: 'Regional Links', value: 'C5 / EDSA access', score: 74, note: 'Solid regional road links despite EDSA load.' },
      { name: 'City Integration', value: 'High', score: 84, note: 'Fully integrated into the metro’s economic grid.' },
    ],
  },
}

export function buildResult(): ReedResult {
  const property: Property = {
    name: 'Two Serendra',
    project: 'Serendra',
    developer: 'Ayala Land',
    type: 'Residential Condominium',
    address: 'Bonifacio Global City, Taguig',
  }

  const order: LensKey[] = ['People', 'Economy', 'Movement', 'Infrastructure', 'Connectivity']
  const lenses: Lens[] = order.map((key) => {
    const { question, signals } = RAW[key]
    const score = lensScore(signals)
    return { key, question, score, band: bandFor(score), signals }
  })

  const overall = Math.round(lenses.reduce((a, l) => a + l.score, 0) / lenses.length)
  const verdict = verdictFor(overall)

  const signalCount = lenses.reduce((a, l) => a + l.signals.length, 0)
  const gapCount = lenses.reduce((a, l) => a + l.signals.filter((s) => s.score === null).length, 0)
  const confidence = Math.round(((signalCount - gapCount) / signalCount) * 100)

  const sorted = [...lenses].sort((a, b) => b.score - a.score)
  const highlight = sorted[0]
  const watch = sorted[sorted.length - 1]

  const briefing = [
    `${property.name} reads as a ${verdict.toLowerCase()} at an overall ${overall}/100 across all five lenses.`,
    `Its strongest reading is ${highlight.key} (${highlight.score}, ${highlight.band}) — lead the conversation here.`,
    `The math is carried by demand and location, not by yield: this is a capital-preservation position, not a cashflow play.`,
  ]

  const watchOuts = [
    `${watch.key} is the weakest lens (${watch.score}, ${watch.band}) — the price sits at the top of the market, so frame value on durability, not discount.`,
    `${gapCount} of ${signalCount} signals are honest gaps (vacancy and forward supply). Verify these before you commit a client.`,
    `Confidence is ${confidence}% — high, but not absolute. Present the position as evidence-based, and let the client decide.`,
  ]

  return {
    property,
    lenses,
    overall,
    verdict,
    confidence,
    gapCount,
    signalCount,
    highlight,
    watch,
    briefing,
    watchOuts,
  }
}
