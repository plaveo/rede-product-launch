// REDE Campaign Studio — content + brand system for social posts.
// Uses REDE's OWN identity from the live Facebook page:
// electric blue -> purple -> cyan gradients on deep navy/black.
// "REAL ESTATE DECISION ENGINE" · "Built for Smart Property Investors"

export const BRAND = {
  ink: '#050A16', // deepest navy/black canvas
  navy: '#0A1426', // panel navy
  blue: '#2F6BFF', // REDE electric blue (the "ENGINE" blue)
  royal: '#1E4FE0', // deeper blue
  purple: '#7B3FE4', // logo purple facet
  violet: '#9B5CF6', // lighter purple
  cyan: '#22D3EE', // bright cyan highlight
  sky: '#7FB2FF', // soft blue for subtext
  white: '#FFFFFF',
  gray: '#8A97AD',
} as const

export type ThemeId = 'electric' | 'glow' | 'engine' | 'light'

export interface Theme {
  id: ThemeId
  name: string
  bg: string // full CSS background (may be a gradient)
  fg: string
  sub: string
  accent: string // gradient string for accent chips/CTA
  accentSolid: string
  accentFg: string
}

export const THEMES: Theme[] = [
  {
    id: 'electric',
    name: 'Electric Blue',
    bg: `radial-gradient(120% 120% at 15% 0%, ${BRAND.royal}33 0%, ${BRAND.ink} 55%), linear-gradient(160deg, ${BRAND.navy} 0%, ${BRAND.ink} 100%)`,
    fg: BRAND.white,
    sub: BRAND.sky,
    accent: `linear-gradient(135deg, ${BRAND.purple}, ${BRAND.blue} 55%, ${BRAND.cyan})`,
    accentSolid: BRAND.blue,
    accentFg: BRAND.white,
  },
  {
    id: 'glow',
    name: 'Halftone Glow',
    bg: `radial-gradient(90% 90% at 50% 45%, ${BRAND.royal}55 0%, ${BRAND.navy} 45%, ${BRAND.ink} 100%)`,
    fg: BRAND.white,
    sub: BRAND.sky,
    accent: `linear-gradient(135deg, ${BRAND.cyan}, ${BRAND.blue})`,
    accentSolid: BRAND.cyan,
    accentFg: BRAND.ink,
  },
  {
    id: 'engine',
    name: 'Engine Dark',
    bg: `linear-gradient(180deg, #000000 0%, ${BRAND.ink} 100%)`,
    fg: BRAND.white,
    sub: BRAND.gray,
    accent: `linear-gradient(135deg, ${BRAND.blue}, ${BRAND.cyan})`,
    accentSolid: BRAND.blue,
    accentFg: BRAND.white,
  },
  {
    id: 'light',
    name: 'Clean Light',
    bg: `linear-gradient(160deg, #FFFFFF 0%, #EEF3FF 100%)`,
    fg: BRAND.ink,
    sub: '#5A6B85',
    accent: `linear-gradient(135deg, ${BRAND.purple}, ${BRAND.blue})`,
    accentSolid: BRAND.blue,
    accentFg: BRAND.white,
  },
]

export type TemplateId = 'insight' | 'quote' | 'data' | 'announce'

export interface Template {
  id: TemplateId
  name: string
  blurb: string
}

export const TEMPLATES: Template[] = [
  { id: 'insight', name: 'Insight Post', blurb: 'Educate. A sharp idea about property decisions.' },
  { id: 'quote', name: 'Quote Card', blurb: 'A bold statement in the REDE voice.' },
  { id: 'data', name: 'Data Highlight', blurb: 'One big number that stops the scroll.' },
  { id: 'announce', name: 'Announcement', blurb: 'Launch, milestone, or invitation.' },
]

export interface PostState {
  template: TemplateId
  themeId: ThemeId
  eyebrow: string
  headline: string
  body: string
  stat: string
  statLabel: string
  statNote: string
  quote: string
  attribution: string
  ctaLabel: string
}

// Ready-made REDE content ideas — on-message with the founder philosophy:
// facts -> confidence -> better decisions. Written in the live page's voice.
export interface Idea extends Partial<PostState> {
  template: TemplateId
}

export const IDEAS: Idea[] = [
  {
    template: 'insight',
    eyebrow: 'REAL ESTATE DECISION ENGINE',
    headline: 'A “good deal” can still be a bad decision if it doesn’t fit you.',
    body: 'Price is only one lens. REDE reads the property through the lenses that actually matter to your client — so the decision fits the person, not just the peso.',
    ctaLabel: 'What is REDE?',
  },
  {
    template: 'insight',
    eyebrow: 'BUILT FOR SMART PROPERTY INVESTORS',
    headline: 'The problem was never selling. It was information.',
    body: 'Property data is scattered across portals, maps, and reports. REDE brings it into one clear, defensible view — so you present with confidence.',
    ctaLabel: 'Meet REDE',
  },
  {
    template: 'quote',
    quote: 'The decision always belongs to your client. Our job is to explain the property so well that the choice becomes obvious.',
    attribution: 'REDE — Real Estate Decision Engine',
  },
  {
    template: 'quote',
    quote: 'We don’t replace the agent. We give the agent evidence.',
    attribution: 'REDE · PEPWORLD',
  },
  {
    template: 'data',
    stat: '5',
    statLabel: 'LENSES OF VIEW',
    statNote: 'Read any property through the lens that matters — and reach 1 clear decision.',
    eyebrow: 'INSIDE REDE',
  },
  {
    template: 'data',
    stat: '30',
    statLabel: 'SIGNALS PER PROPERTY',
    statNote: 'People · Economy · Movement · Infrastructure · Connectivity — read into 1 clear decision.',
    eyebrow: 'THE REDE SYSTEM',
  },
  {
    template: 'announce',
    eyebrow: 'GET YOUR PROPERTY DECISION REPORT',
    headline: 'Turn data into better decisions in real estate.',
    body: 'REDE is professional property decision intelligence by PEPWORLD. Join the professionals presenting with confidence.',
    ctaLabel: 'Message us',
  },
]

export const DEFAULT_POST: PostState = {
  template: 'insight',
  themeId: 'electric',
  eyebrow: 'REAL ESTATE DECISION ENGINE',
  headline: 'A “good deal” can still be a bad decision if it doesn’t fit you.',
  body: 'Price is only one lens. REDE reads the property through the lenses that actually matter to your client — so the decision fits the person, not just the peso.',
  stat: '5',
  statLabel: 'LENSES OF VIEW',
  statNote: 'Read any property through the lens that matters — and reach 1 clear decision.',
  quote:
    'The decision always belongs to your client. Our job is to explain the property so well that the choice becomes obvious.',
  attribution: 'REDE — Real Estate Decision Engine',
  ctaLabel: 'What is REDE?',
}

// Caption ideas for the actual social post copy (paste into FB/IG/LinkedIn).
export const CAPTIONS: string[] = [
  'A “good deal” can still be a bad decision if it doesn’t fit you. REDE reads every property through the lenses that matter. 🔵 #REDE #PEPWORLD #RealEstate',
  'The problem was never selling. It was information. REDE puts every property fact into one clear, defensible view. #RealEstateDecisionEngine',
  'Built for smart property investors. Turn data into better decisions in real estate. #REDE #PEPWORLD',
  '5 Lenses of View → 1 Clear Decision. That’s the REDE way. #PropertyDecisions #REDE',
  'We don’t replace the agent. We give the agent evidence. Get your Property Decision Report today. #REDE #PEPWORLD',
]

// ── CAMPAIGN RUN ──────────────────────────────────────────────────────────
// The awareness angle for the first run, aimed at brokers & sales teams:
// "Doubt → Proof." Many didn't believe at first. Now they've seen it.

export interface CampaignPost {
  id: string
  image: string // path in /public/marketing
  title: string // internal label for the studio
  angle: 'proof' | 'insight' | 'philosophy' | 'invite'
  caption: string // ready-to-paste social copy
}

// Ordered posting sequence for the run. The proof/story posts open the run,
// the insight + philosophy posts sustain the "ingay," the invite closes soft.
export const CAMPAIGN_POSTS: CampaignPost[] = [
  {
    id: 'confidence',
    image: '/marketing/rede-fb-01-confidence.png',
    title: 'Confidence',
    angle: 'proof',
    caption:
      'Noong una, marami ang hindi naniwala. Ngayon, nakita na nila.\n\nREDE turns scattered property data into one clear, defensible view — so you present with confidence, not guesswork.\n\n#REDE #PEPWORLD #RealEstate #PropertyDecisions',
  },
  {
    id: 'problem',
    image: '/marketing/rede-fb-02-problem.png',
    title: 'The Problem',
    angle: 'insight',
    caption:
      'The problem was never selling. It was information.\n\nProperty facts are scattered across portals, maps, and reports. REDE brings them into one place — 30 signals, 5 lenses, 1 decision.\n\n#RealEstateDecisionEngine #REDE',
  },
  {
    id: 'philosophy',
    image: '/marketing/rede-fb-03-philosophy.png',
    title: 'Philosophy',
    angle: 'philosophy',
    caption:
      'We don’t replace the agent. We give the agent evidence.\n\nThe decision always belongs to your client. Our job is to explain the property so well that the choice becomes obvious.\n\n#REDE #PEPWORLD',
  },
  {
    id: 'founder',
    image: '/marketing/rede-fb-04-founder.png',
    title: 'Founder',
    angle: 'proof',
    caption:
      'Built from the ground — real market work, not theory.\n\nREDE is the analytic assessment engine: Computation (the numbers) + Assessment (the meaning), across 5 lenses, into 1 decision.\n\n#REDE #PEPWORLD #RealEstate',
  },
  {
    id: 'promise',
    image: '/marketing/rede-fb-05-promise.png',
    title: 'The Promise',
    angle: 'invite',
    caption:
      'Turn data into better decisions in real estate.\n\nREDE is professional property decision intelligence by PEPWORLD. Message us to see a live property read.\n\n#REDE #PEPWORLD #PropertyDecisions',
  },
  {
    id: 'value-drivers',
    image: '/marketing/info-01-value-drivers.png',
    title: 'Value Drivers',
    angle: 'insight',
    caption:
      'What really moves a property’s value? People, Economy, Movement, Infrastructure, Connectivity.\n\nREDE scores all five — so nothing important gets missed.\n\n#REDE #RealEstate #PropertyValue',
  },
  {
    id: 'organize',
    image: '/marketing/info-02-organize.png',
    title: 'Organize',
    angle: 'insight',
    caption:
      'Scattered data can’t build confidence. Organized data can.\n\nREDE gathers every fact about a property into one clear read you can defend in front of any client.\n\n#REDE #PEPWORLD',
  },
  {
    id: 'clarity',
    image: '/marketing/info-03-clarity.png',
    title: 'Clarity',
    angle: 'philosophy',
    caption:
      'Clarity is the product. The numbers are just the start.\n\nREDE wraps raw data in plain-language assessment — so the meaning is obvious, not buried.\n\n#REDE #RealEstateDecisionEngine',
  },
  {
    id: 'zonal',
    image: '/marketing/info-04-zonal.png',
    title: 'Zonal Value',
    angle: 'insight',
    caption:
      'BIR zonal value is one anchor — not the whole story.\n\nREDE reads price against real market signals, so you know what a property is actually worth to your client.\n\n#REDE #PropertyValue #RealEstate',
  },
]

// Short caption bank for the run — quick paste when you just need copy.
export const CAMPAIGN_CAPTIONS: string[] = [
  'Noong una, hindi sila naniwala. Ngayon, nakita na nila. #REDE #PEPWORLD',
  'The problem was never selling. It was information. #RealEstateDecisionEngine',
  'We don’t replace the agent. We give the agent evidence. #REDE',
  '30 signals. 5 lenses. 1 clear decision. That’s REDE. #PropertyDecisions',
  'Turn data into better decisions in real estate. #REDE #PEPWORLD',
]
