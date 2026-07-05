"use server"

import { db } from "@/lib/db"
import { stressTestApplications } from "@/lib/db/schema"
import { capRequired, capStr, isBot, isValidEmail, LIMITS, rateLimit } from "@/lib/security"

export type StressTestState = {
  ok: boolean
  message: string
} | null

const ALLOWED_ROLES = [
  "Licensed Broker",
  "Licensed Salesperson",
  "Licensed Appraiser",
  "Property Seller",
]

export async function submitStressTestApplication(
  _prev: StressTestState,
  formData: FormData,
): Promise<StressTestState> {
  // Bot guard — silently accept so bots don't learn they were caught.
  if (isBot(formData)) {
    return { ok: true, message: "Application received. Our team will review and reach out with your next steps." }
  }

  // Rate limit per IP.
  const { ok: allowed } = await rateLimit("stress-test", { max: 5, windowMs: 60_000 })
  if (!allowed) {
    return { ok: false, message: "Too many attempts. Please wait a minute and try again." }
  }

  const fullName = capRequired(formData.get("fullName"))
  const role = capRequired(formData.get("role"))
  const email = capRequired(formData.get("email"))
  const contact = capRequired(formData.get("contact"))
  const agency = capStr(formData.get("agency"))
  const licenseNumber = capStr(formData.get("licenseNumber"))
  const property = capStr(formData.get("property"), LIMITS.medium)
  const notes = capStr(formData.get("notes"), LIMITS.long)

  if (!fullName || !role || !email || !contact) {
    return { ok: false, message: "Please complete the required fields." }
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return { ok: false, message: "Please select a valid role." }
  }
  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    await db.insert(stressTestApplications).values({
      fullName,
      role,
      email,
      contact,
      agency,
      licenseNumber,
      property,
      notes,
    })
    return {
      ok: true,
      message: "Application received. Our team will review and reach out with your next steps.",
    }
  } catch (error) {
    console.log("[v0] stress test submit error:", error)
    return { ok: false, message: "Something went wrong. Please try again." }
  }
}
