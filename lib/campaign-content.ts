// REDE Campaign Studio — content + brand system for social posts.
// Follows the official PEPWORLD Brand Guide (Montserrat + Inter, navy/slate/gold).

export const BRAND = {
  navy: '#0B1D35', // dominant (60%)
  slate: '#3B557A', // secondary (30%)
  gold: '#C8AA6E', // accent (10%)
  teal: '#0D6E7A',
  lightBlue: '#A6C8E5',
  white: '#FFFFFF',
  gray: '#6B7280',
} as const

export type ThemeId = 'navy' | 'slate' | 'light' | 'gold'

export interface Theme {
  id: ThemeId
  name: string
  bg: string
  fg: string
  sub: string
  accent: string
  accentFg: string
}

// Accent stays gold-forward per the 60-30-10 brand ratio.
export const THEMES: Theme[] = [
  {
    id: 'navy',
    name: 'Deep Navy',
    bg: BRAND.navy,
    fg: BRAND.white,
    sub: BRAND.lightBlue,
    accent: BRAND.gold,
    accentFg: BRAND.navy,
  },
  {
    id: 'slate',
    name: 'Slate Blue',
    bg: BRAND.slate,
    fg: BRAND.white,
    sub: '#D6E2F1',
    accent: BRAND.gold,
    accentFg: BRAND.navy,
  },
  {
    id: 'light',
    name: 'Clean White',
    bg: BRAND.white,
    fg: BRAND.navy,
    sub: BRAND.gray,
    accent: BRAND.teal,
    accentFg: BRAND.white,
  },
  {
    id: 'gold',
    name: 'Premium Gold',
    bg: BRAND.gold,
    fg: BRAND.navy,
    sub: '#5A4A28',
    accent: BRAND.navy,
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
  { id: 'quote', name: 'Quote Card', blurb: 'A bold statement in the founder’s voice.' },
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

// Ready-made REDE content ideas — every line is on-message with the founder
// philosophy: facts -> confidence -> better decisions. Shuffle for fresh posts.
export interface Idea extends Partial<PostState> {
  template: TemplateId
}

export const IDEAS: Idea[] = [
  {
    template: 'insight',
    eyebrow: 'PROPERTY INTELLIGENCE',
    headline: 'The problem was never selling. It was information.',
    body: 'Property data is scattered across portals, maps, and reports. REDE brings it into one clear, defensible view — so professionals present with confidence.',
    ctaLabel: 'Meet REDE',
  },
  {
    template: 'insight',
    eyebrow: 'WHY REDE',
    headline: 'Confidence comes from facts.',
    body: 'Better information means better communication. Clearer communication means clients understand the property — and make better decisions.',
    ctaLabel: 'See how it works',
  },
  {
    template: 'quote',
    quote: 'The decision always belongs to the client. Our job is to explain the property so well that the choice becomes obvious.',
    attribution: 'REDE — Real Estate Decision Engine',
  },
  {
    template: 'quote',
    quote: 'We don’t replace the agent. We give the agent evidence.',
    attribution: 'PEPWORLD · REDE',
  },
  {
    template: 'data',
    stat: '30',
    statLabel: 'DECISION SIGNALS PER PROPERTY',
    statNote: 'Location, value, risk, and more — organized in one view.',
    eyebrow: 'INSIDE REDE',
  },
  {
    template: 'data',
    stat: '5',
    statLabel: 'INTERPRETATION LENSES',
    statNote: 'Read any property through the lens that matters to your client.',
    eyebrow: 'INSIDE REDE',
  },
  {
    template: 'announce',
    eyebrow: 'NOW IN EARLY ACCESS',
    headline: 'Explain every property with data.',
    body: 'REDE is professional property decision intelligence by PEPWORLD. Join the professionals presenting with confidence.',
    ctaLabel: 'Request access',
  },
]

export const DEFAULT_POST: PostState = {
  template: 'insight',
  themeId: 'navy',
  eyebrow: 'PROPERTY INTELLIGENCE',
  headline: 'The problem was never selling. It was information.',
  body: 'Property data is scattered across portals, maps, and reports. REDE brings it into one clear, defensible view — so professionals present with confidence.',
  stat: '30',
  statLabel: 'DECISION SIGNALS PER PROPERTY',
  statNote: 'Location, value, risk, and more — organized in one view.',
  quote:
    'The decision always belongs to the client. Our job is to explain the property so well that the choice becomes obvious.',
  attribution: 'REDE — Real Estate Decision Engine',
  ctaLabel: 'Meet REDE',
}

// Caption ideas for the actual social post copy (paste into IG/LinkedIn/FB).
export const CAPTIONS: string[] = [
  'Real estate professionals: your confidence starts with your information. REDE organizes every property fact into one clear, defensible view. #REDE #PEPWORLD #RealEstate',
  'You’re not selling a property. You’re explaining it. REDE gives you the evidence to explain it well. #PropertyIntelligence #REDE',
  'Facts → confidence → clearer communication → better client decisions. That’s the REDE belief chain. #REDE #PEPWORLD',
  'The decision belongs to your client. Your job is to make it clear. REDE helps you get there. #RealEstate #REDE',
  '30 signals. 5 lenses. 1 confident presentation. This is REDE. #PropertyDecisions #PEPWORLD',
]
