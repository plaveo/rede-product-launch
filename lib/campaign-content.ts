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
    stat: '6',
    statLabel: 'STEP DECISION FRAMEWORK',
    statNote: 'Setting · Framing · Revenue · Capacity · Comparison · Assessment.',
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
