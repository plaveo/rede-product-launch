# Stress Test & Survey System

How REDE validates itself before launch. A small group of real estate
professionals use the product, then answer one focused question:
**will you use REDE — and will you pay for it?**

> Don't ask "Do you like REDE?" Ask "Will you use REDE?" — KEV 2.0, founder principle

---

## Overview

The **Stress Test Program** is not a test for the participants — it is a test of
REDE itself. A limited group of licensed brokers, salespersons, appraisers, and
property sellers put the platform under real pressure, then report what works and
what is missing.

The goal is not to prove REDE is good. It is to discover **why someone would use
it every day** and **what prevents them from paying for it**. Those two answers
are the most valuable data from the first users.

---

## The three systems

| # | System | Path | Access | Purpose |
|---|--------|------|--------|---------|
| 01 | Application | `/stress-test` | Public | Recruitment page. Professionals apply to join — name, role, license, agency, contact. |
| 02 | Survey | `/survey` | Public | The 14-section KEV 2.0 survey. Usage intent, trust, confidence, time saved, willingness to pay. |
| 03 | Founder Dashboard | `/survey/admin` | Password | Aggregates every response into the 10 metrics that matter. |
| — | Application Admin | `/stress-test/admin` | Password | Review and qualify applicants. |

Live domain: `https://rede-product-launch.vercel.app`

Admin pages are protected by the `ADMIN_PASSWORD` environment variable.

---

## KEV 2.0 Survey — 14 sections

1. **Profile** — Name, company, role, years in real estate
2. **Current Workflow** — How they research a property today (Google, Facebook, Developer, Government, Multiple websites, Other)
3. **Pain Points** — Biggest problem when presenting properties (Finding / Verifying / Explaining / Comparing / Building client trust)
4. **First Impression** — Rate 1–10: easy to understand, professional, useful, fast, trustworthy
5. **Data** — Do you trust the information shown? (Yes / Partially / No) + why
6. **Assessment** — Do the scores and analysis help you understand the property? (Yes / Partially / No)
7. **Interpretation** — Did the explanations help you present better? (Yes / Partially / No)
8. **Confidence** — How much more confident are you when presenting? (1–10)
9. **Time Saved** — Minutes normally vs. minutes using REDE
10. **Missing Information** — What do you wish REDE included? (open answer)
11. **Willingness to Use** — Would you use REDE daily? (Yes / Maybe / No)
12. **Willingness to Pay** — Would you pay? If yes: ₱299 / ₱499 / ₱999 / ₱1,499 / Other
13. **Recommendation** — Would you recommend REDE to another broker/agent? (1–10)
14. **Final Comment** — If you were the founder, what would you improve first? (open answer)

---

## Founder metrics — track only these

Don't focus on 100 metrics. The dashboard surfaces the ten that drive the
decision. The first two are the most important.

1. **Willingness to Pay** — the single most important signal *(priority)*
2. **Daily Use Intent** — would they use it every day *(priority)*
3. **Recommendation Score** — net advocacy (1–10)
4. **Confidence Gain** — how much more confident when presenting
5. **Trust Score** — do they trust the data
6. **Ease of Use** — is it easy to understand
7. **Time Saved** — minutes saved per property
8. **Top Price Point** — the price most are willing to pay
9. **Biggest Pain Point** — the problem to solve first
10. **Most Requested Feature** — what to build next

---

## How to read the data

Open the Founder Dashboard and read top to bottom. Start with **Willingness to
Pay** and **Daily Use Intent** — if these are strong, REDE has a business. If
not, the reasons are in the open-text answers below.

1. Read the two priority metrics first. High pay + high daily use = validated.
2. Cross-check with Confidence Gain and Time Saved — these explain the value.
3. Read Biggest Pain Point and Most Requested Feature to decide what to build next.
4. Scan the individual comments (section 14) for the sharpest, most specific feedback.

---

## Technical notes

- **Framework:** Next.js (App Router)
- **Database:** Neon Postgres via Drizzle ORM
- **Tables:** `stress_test_applications`, `stress_test_survey`
- **Server actions:** `app/actions/stress-test.ts` (application submit), `app/actions/survey.ts` (survey submit), `app/actions/admin.ts` (auth + fetch)
- **Key components:** `components/rede/stress-test-form.tsx`, `components/rede/survey-form.tsx`, `components/rede/founder-dashboard.tsx`, `components/rede/admin-dashboard.tsx`
- **Docs page:** `app/docs/page.tsx` + `components/rede/docs.tsx`
- **Deploy:** merge to `main` → Vercel auto-deploys to production.
