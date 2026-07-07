"use server"

import { sql } from "@/lib/db"

export type ApplyState = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const fullName = String(formData.get("full_name") ?? "").trim()
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
  const contact = String(formData.get("contact") ?? "").trim()
  const role = String(formData.get("role") ?? "").trim()

  // Short form only: name, email, contact, role.
  const errors: Record<string, string> = {}
  if (!fullName) errors.full_name = "Please enter your name."
  if (!email || !isEmail(email)) errors.email = "Please enter a valid email."
  if (!contact) errors.contact = "Please enter a contact number."
  if (!role) errors.role = "Please select your role."

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Please review the highlighted fields.", errors }
  }

  try {
    // Prevent obvious duplicates by email (keep the first pending request).
    const existing = await sql`
      SELECT id FROM stress_test_applications WHERE email = ${email} LIMIT 1
    `
    if (existing.length > 0) {
      return {
        ok: true,
        message: "You're already on the list. We'll be in touch with your invitation.",
      }
    }

    await sql`
      INSERT INTO stress_test_applications (full_name, email, contact, role, status)
      VALUES (${fullName}, ${email}, ${contact}, ${role}, 'pending')
    `

    return {
      ok: true,
      message: "Request received. Your invitation will follow after review.",
    }
  } catch (err) {
    console.log("[v0] submitApplication error:", (err as Error).message)
    return {
      ok: false,
      message: "Something went wrong on our end. Please try again in a moment.",
    }
  }
}
