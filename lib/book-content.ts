/**
 * REDE MANUAL 01 — book content model.
 *
 * Real, founder-written prose is stored in `body`. Chapters that have not been
 * written yet are marked `placeholder: true` and carry neutral scaffolding copy
 * that is meant to be replaced. Nothing here is invented biography — unwritten
 * chapters only describe what the chapter will cover.
 */

export type Chapter = {
  number: string
  title: string
  /** Optional secondary title, e.g. the Tagalog philosophy chapter titles. */
  subtitle?: string
  /** One-line summary shown in the table of contents. */
  summary: string
  /** Body paragraphs. Empty when the chapter is still a placeholder. */
  body: string[]
  placeholder?: boolean
}

export type BookSection = {
  id: string
  part: string
  title: string
  intro: string
  chapters: Chapter[]
}

export const bookMeta = {
  manual: 'REDE MANUAL 01',
  title: 'The REDE Philosophy',
  subtitle: 'Founder Story · Origin of REDE · The Philosophy',
  author: 'Plaveo Pineda',
  publisher: 'PEPWORLD',
  premise: [
    'Biography explains who the founder is.',
    'The origin story explains how REDE was formed.',
    'The philosophy explains what was discovered.',
  ],
  note: 'This is a living manuscript. Written chapters read as finished institutional prose; chapters still in progress show their intended scope and are clearly marked as drafts.',
}

export const journey = [
  'BS Psychology',
  'Toyota Sales',
  'SMDC',
  'Social Media Selling',
  'Pandemic Era',
  'PEPWORLD',
  'Training Thousands of OFWs',
  '₱5 Billion Sales Exposure',
  'Hundreds of Investor Conversations',
  'Questioning Traditional Property Selling',
  'Comparing Locations',
  'MOA vs ASEANA vs Marina',
  '2-Way Analysis',
  '3-Way Analysis',
  'RECP',
  'REDE',
]

export const sections: BookSection[] = [
  {
    id: 'founder',
    part: 'Section 01',
    title: 'The Founder',
    intro:
      'Before REDE, there was a journey. Years of selling, teaching, and listening to thousands of investors trying to make one of the most important financial decisions of their lives. This section is about who Plaveo Pineda is and where he came from.',
    chapters: [
      {
        number: '01',
        title: 'Biography of Plaveo Pineda',
        summary: 'From BS Psychology to real estate — the path that shaped a way of thinking.',
        placeholder: true,
        body: [],
      },
      {
        number: '02',
        title: 'PEPWORLD and the ₱5 Billion Journey',
        summary: 'How thousands of investor conversations became the environment where REDE was discovered.',
        body: [
          'One important part of the REDE story is PEPWORLD. REDE did not emerge from a single idea, a single project, or a single observation. It emerged from years of teaching, presenting, mentoring, and interacting with real investors through PEPWORLD.',
          'Between 2020 and 2025, PEPWORLD trained and educated thousands of Overseas Filipino Workers (OFWs), immigrants, and investors from Canada, the United States, the United Kingdom, and other international markets. During this period, the organization participated in more than ₱5 Billion worth of real estate sales and investment transactions conducted primarily through webinars, online consultations, digital presentations, and social media platforms.',
          'What made this experience valuable was not simply the volume of transactions. It was the volume of questions. Every presentation revealed how investors think. Every consultation exposed different fears, motivations, goals, and decision-making patterns. Some investors focused on capital appreciation. Others cared about rental income. Some were driven by retirement planning, while others were searching for financial security, lifestyle improvements, or opportunities for their families.',
          'Over time, these conversations created a much deeper understanding of investor behavior than what could be learned from sales alone.',
        ],
      },
      {
        number: '03',
        title: 'Teaching Thousands of OFWs and Immigrant Investors',
        summary: 'The pandemic years, 2020–2025, and the classroom that spanned continents.',
        placeholder: true,
        body: [],
      },
      {
        number: '04',
        title: 'The Questions That Changed Everything',
        summary: 'Why some investors buying similar properties experienced very different outcomes.',
        body: [
          'During the early years, most property presentations followed a familiar structure. Discussions focused on projects, pricing, promotions, developers, and financing options.',
          'While these topics were important, a recurring observation began to emerge. Investors purchasing similar properties often experienced different outcomes. Some investments performed exceptionally well. Others struggled to meet expectations. In many cases, the difference could not be explained by the property alone.',
          'This observation gradually shifted the focus from selling property to understanding performance. Instead of asking, “What property should someone buy?” a more important question began to emerge: “Why do some properties perform differently than others?”',
        ],
      },
      {
        number: '05',
        title: 'Why REDE Was Created',
        summary: 'The evolution from selling property to understanding the conditions surrounding it.',
        body: [
          'As the years progressed, the presentations themselves began to evolve. The discussion moved beyond property specifications and into broader subjects such as investor motivation, location dynamics, developer quality, historical growth patterns, rental demand, economic activity, infrastructure development, and market behavior.',
          'Without realizing it at the time, many of the concepts that would later become REDE were already being explored through these discussions. The focus was slowly shifting from the property itself toward the conditions surrounding the property. This was the beginning of ecosystem thinking.',
          'The creation of REDE cannot be separated from PEPWORLD. PEPWORLD provided the environment where thousands of investor conversations occurred. It provided exposure to real-world decisions, real-world outcomes, and real-world questions. The insights that eventually became REDE were not developed inside a laboratory or through theoretical research alone. They emerged from years of observation, education, communication, and direct interaction with investors trying to make important financial decisions.',
          'For this reason, PEPWORLD should not simply be described as a sales organization within the REDE story. It should be recognized as the environment where the observations that led to REDE were first discovered.',
        ],
      },
    ],
  },
  {
    id: 'origin',
    part: 'Section 02',
    title: 'Origin of REDE',
    intro:
      'How the philosophy became a method. This section traces the analytical tools and the location studies that turned scattered observation into a repeatable way of reading property.',
    chapters: [
      {
        number: '01',
        title: '2-Way Analysis',
        summary: 'The first structured way of comparing two properties beyond price alone.',
        placeholder: true,
        body: [],
      },
      {
        number: '02',
        title: '3-Way Analysis',
        summary: 'Adding a third dimension to move from comparison toward context.',
        placeholder: true,
        body: [],
      },
      {
        number: '03',
        title: 'RECP',
        summary: 'The framework that organized the observations into a discipline.',
        placeholder: true,
        body: [],
      },
      {
        number: '04',
        title: 'MOA vs ASEANA vs Marina',
        summary: 'Three Bay Area districts, three very different stories of performance.',
        placeholder: true,
        body: [],
      },
      {
        number: '05',
        title: 'The 57% Bay Area Vacancy Discovery',
        summary: 'The finding that proved the property alone could not explain the outcome.',
        placeholder: true,
        body: [],
      },
      {
        number: '06',
        title: 'Why Some Locations Win, Why Some Lose',
        summary: 'Reading the conditions surrounding a property, not just the property.',
        placeholder: true,
        body: [],
      },
      {
        number: '07',
        title: 'The Birth of REDE',
        summary: 'When the method finally had a name — the Real Estate Decision Engine.',
        placeholder: true,
        body: [],
      },
    ],
  },
  {
    id: 'philosophy',
    part: 'Section 03',
    title: 'The REDE Philosophy',
    intro:
      'What was discovered. Ten chapters on how to think about property — beginning with the questions, and ending with the discipline of observation before opinion.',
    chapters: [
      {
        number: '01',
        title: 'A Different Set of Questions',
        subtitle: 'Bakit Ako Nagsimulang Magtanong ng Ibang Tanong?',
        summary: 'Why the founder stopped asking what to buy and started asking why things perform.',
        placeholder: true,
        body: [],
      },
      {
        number: '02',
        title: 'The Biggest Mistake Most Buyers Make',
        subtitle: 'Ang Pinakamalaking Pagkakamali ng Maraming Property Buyer',
        summary: 'The single assumption that quietly undermines most property decisions.',
        placeholder: true,
        body: [],
      },
      {
        number: '03',
        title: 'Why Price Is Not Enough',
        subtitle: 'Bakit Hindi Sapat ang Presyo?',
        summary: 'Price is a number. Value is a relationship.',
        placeholder: true,
        body: [],
      },
      {
        number: '04',
        title: 'Why Location Is Not Enough',
        subtitle: 'Bakit Hindi Sapat ang Location?',
        summary: 'Location matters — but location alone still cannot explain performance.',
        placeholder: true,
        body: [],
      },
      {
        number: '05',
        title: 'The Property Is Not the Source',
        subtitle: 'Hindi Property ang Pinagmumulan',
        summary: 'Where value actually originates, and why it is rarely the building itself.',
        placeholder: true,
        body: [],
      },
      {
        number: '06',
        title: 'The City as a Living System',
        subtitle: 'Ang Lungsod Bilang Buhay na Sistema',
        summary: 'Reading a city as an ecosystem that grows, shifts, and responds.',
        placeholder: true,
        body: [],
      },
      {
        number: '07',
        title: 'Everything Is Connected',
        subtitle: 'Lahat ay Magkakaugnay',
        summary: 'Infrastructure, demand, economy, and behavior as one interdependent whole.',
        placeholder: true,
        body: [],
      },
      {
        number: '08',
        title: 'Relationships Over Objects',
        subtitle: 'Relationships Over Objects',
        summary: 'The central idea of REDE — value lives in relationships, not objects.',
        placeholder: true,
        body: [],
      },
      {
        number: '09',
        title: 'How Demand Is Formed',
        subtitle: 'Paano Nabubuo ang Demand?',
        summary: 'The forces that create real, durable demand for a place.',
        placeholder: true,
        body: [],
      },
      {
        number: '10',
        title: 'Observation Before Opinion',
        subtitle: 'Observation Before Opinion',
        summary: 'The discipline that holds the entire philosophy together.',
        placeholder: true,
        body: [],
      },
    ],
  },
]
