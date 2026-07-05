"use server"

import { db } from "@/lib/db"
import { stressTestApplications } from "@/lib/db/schema"

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
  const fullName = String(formData.get("fullName") ?? "").trim()
  const role = String(formData.get("role") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const contact = String(formData.get("contact") ?? "").trim()
  const agency = String(formData.get("agency") ?? "").trim()
  const licenseNumber = String(formData.get("licenseNumber") ?? "").trim()
  const property = String(formData.get("property") ?? "").trim()
  const notes = String(formData.get("notes") ?? "").trim()

  if (!fullName || !role || !email || !contact) {
    return { ok: false, message: "Please complete the required fields." }
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return { ok: false, message: "Please select a valid role." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    await db.insert(stressTestApplications).values({
      fullName,
      role,
      email,
      contact,
      agency: agency || null,
      licenseNumber: licenseNumber || null,
      property: property || null,
      notes: notes || null,
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
