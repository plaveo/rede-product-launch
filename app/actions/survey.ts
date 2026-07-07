"use server"

import { sql } from "@/lib/db"

export type SurveyState = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

function str(fd: FormData, key: string) {
  const v = String(fd.get(key) ?? "").trim()
  return v === "" ? null : v
}

function num(fd: FormData, key: string) {
  const v = fd.get(key)
  if (v === null || String(v).trim() === "") return null
  const n = Number(v)
  return Number.isFinite(n) ? Math.trunc(n) : null
}

export async function submitSurvey(
  _prev: SurveyState,
  fd: FormData,
): Promise<SurveyState> {
  const name = str(fd, "name")
  if (!name) {
    return { ok: false, message: "Please enter your name.", errors: { name: "Required." } }
  }

  try {
    await sql`
      INSERT INTO stress_test_survey (
        name, company, role, years_experience, email,
        research_methods, biggest_pain,
        rating_easy, rating_professional, rating_useful, rating_fast, rating_trustworthy,
        data_trust, data_trust_reason,
        assessment_help, interpretation_help, confidence_gain,
        time_normal, time_rede,
        missing_info, use_intent, pay_intent, pay_amount, recommend_score, improve_first,
        status
      ) VALUES (
        ${name}, ${str(fd, "company")}, ${str(fd, "role")}, ${str(fd, "years_experience")}, ${str(fd, "email")},
        ${str(fd, "research_methods")}, ${str(fd, "biggest_pain")},
        ${num(fd, "rating_easy")}, ${num(fd, "rating_professional")}, ${num(fd, "rating_useful")}, ${num(fd, "rating_fast")}, ${num(fd, "rating_trustworthy")},
        ${str(fd, "data_trust")}, ${str(fd, "data_trust_reason")},
        ${str(fd, "assessment_help")}, ${str(fd, "interpretation_help")}, ${num(fd, "confidence_gain")},
        ${num(fd, "time_normal")}, ${num(fd, "time_rede")},
        ${str(fd, "missing_info")}, ${str(fd, "use_intent")}, ${str(fd, "pay_intent")}, ${str(fd, "pay_amount")}, ${num(fd, "recommend_score")}, ${str(fd, "improve_first")},
        'new'
      )
    `
    return { ok: true, message: "Thank you. Your feedback shapes REDE directly." }
  } catch (err) {
    console.log("[v0] submitSurvey error:", (err as Error).message)
    return { ok: false, message: "Something went wrong on our end. Please try again." }
  }
}
