"use server"

import { db } from "@/lib/db"
import { stressTestSurvey } from "@/lib/db/schema"

export type SurveyState = {
  ok: boolean
  message: string
} | null

function toInt(value: FormDataEntryValue | null): number | null {
  const n = Number.parseInt(String(value ?? "").trim(), 10)
  return Number.isFinite(n) ? n : null
}

function toStr(value: FormDataEntryValue | null): string | null {
  const s = String(value ?? "").trim()
  return s ? s : null
}

export async function submitStressTestSurvey(
  _prev: SurveyState,
  formData: FormData,
): Promise<SurveyState> {
  const name = String(formData.get("name") ?? "").trim()

  if (!name) {
    return { ok: false, message: "Please enter your name to submit the survey." }
  }

  // Support multiple checkbox values for research methods
  const researchMethods = formData.getAll("researchMethods").map(String).filter(Boolean).join(", ")

  try {
    await db.insert(stressTestSurvey).values({
      name,
      company: toStr(formData.get("company")),
      role: toStr(formData.get("role")),
      yearsExperience: toStr(formData.get("yearsExperience")),
      email: toStr(formData.get("email")),
      researchMethods: researchMethods || null,
      biggestPain: toStr(formData.get("biggestPain")),
      ratingEasy: toInt(formData.get("ratingEasy")),
      ratingProfessional: toInt(formData.get("ratingProfessional")),
      ratingUseful: toInt(formData.get("ratingUseful")),
      ratingFast: toInt(formData.get("ratingFast")),
      ratingTrustworthy: toInt(formData.get("ratingTrustworthy")),
      dataTrust: toStr(formData.get("dataTrust")),
      dataTrustReason: toStr(formData.get("dataTrustReason")),
      assessmentHelp: toStr(formData.get("assessmentHelp")),
      interpretationHelp: toStr(formData.get("interpretationHelp")),
      confidenceGain: toInt(formData.get("confidenceGain")),
      timeNormal: toInt(formData.get("timeNormal")),
      timeRede: toInt(formData.get("timeRede")),
      missingInfo: toStr(formData.get("missingInfo")),
      useIntent: toStr(formData.get("useIntent")),
      payIntent: toStr(formData.get("payIntent")),
      payAmount: toStr(formData.get("payAmount")),
      recommendScore: toInt(formData.get("recommendScore")),
      improveFirst: toStr(formData.get("improveFirst")),
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
