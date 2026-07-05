"use server"

import { db } from "@/lib/db"
import { stressTestSurvey } from "@/lib/db/schema"
import { capRequired, capStr, isBot, LIMITS, rateLimit } from "@/lib/security"

export type SurveyState = {
  ok: boolean
  message: string
} | null

/** Parse an integer and clamp it to a sane bound (ratings/minutes). */
function toInt(value: FormDataEntryValue | null, max = 100000): number | null {
  const n = Number.parseInt(String(value ?? "").trim(), 10)
  if (!Number.isFinite(n)) return null
  return Math.min(Math.max(n, 0), max)
}

export async function submitStressTestSurvey(
  _prev: SurveyState,
  formData: FormData,
): Promise<SurveyState> {
  // Bot guard — silently accept.
  if (isBot(formData)) {
    return { ok: true, message: "Salamat! Your feedback has been recorded. This directly shapes REDE." }
  }

  // Rate limit per IP.
  const { ok: allowed } = await rateLimit("survey", { max: 5, windowMs: 60_000 })
  if (!allowed) {
    return { ok: false, message: "Too many attempts. Please wait a minute and try again." }
  }

  const name = capRequired(formData.get("name"))

  if (!name) {
    return { ok: false, message: "Please enter your name to submit the survey." }
  }

  // Support multiple checkbox values for research methods (capped)
  const researchMethods = formData
    .getAll("researchMethods")
    .map(String)
    .filter(Boolean)
    .join(", ")
    .slice(0, LIMITS.medium)

  try {
    await db.insert(stressTestSurvey).values({
      name,
      company: capStr(formData.get("company")),
      role: capStr(formData.get("role")),
      yearsExperience: capStr(formData.get("yearsExperience")),
      email: capStr(formData.get("email")),
      researchMethods: researchMethods || null,
      biggestPain: capStr(formData.get("biggestPain"), LIMITS.medium),
      ratingEasy: toInt(formData.get("ratingEasy"), 10),
      ratingProfessional: toInt(formData.get("ratingProfessional"), 10),
      ratingUseful: toInt(formData.get("ratingUseful"), 10),
      ratingFast: toInt(formData.get("ratingFast"), 10),
      ratingTrustworthy: toInt(formData.get("ratingTrustworthy"), 10),
      dataTrust: capStr(formData.get("dataTrust")),
      dataTrustReason: capStr(formData.get("dataTrustReason"), LIMITS.long),
      assessmentHelp: capStr(formData.get("assessmentHelp")),
      interpretationHelp: capStr(formData.get("interpretationHelp")),
      confidenceGain: toInt(formData.get("confidenceGain"), 10),
      timeNormal: toInt(formData.get("timeNormal"), 10080),
      timeRede: toInt(formData.get("timeRede"), 10080),
      missingInfo: capStr(formData.get("missingInfo"), LIMITS.long),
      useIntent: capStr(formData.get("useIntent")),
      payIntent: capStr(formData.get("payIntent")),
      payAmount: capStr(formData.get("payAmount")),
      recommendScore: toInt(formData.get("recommendScore"), 10),
      improveFirst: capStr(formData.get("improveFirst"), LIMITS.long),
    })
    return {
      ok: true,
      message: "Salamat! Your feedback has been recorded. This directly shapes REDE.",
    }
  } catch (error) {
    console.log("[v0] survey submit error:", error)
    return { ok: false, message: "Something went wrong. Please try again." }
  }
}
