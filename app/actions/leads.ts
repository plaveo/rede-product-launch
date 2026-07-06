"use server"

import { db } from "@/lib/db"
import { leads } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/app/actions/admin"

export type LeadState = {
  ok: boolean
  message: string
} | null

const ROLES = [
  "Broker",
  "Salesperson",
  "Appraiser",
  "Investor",
  "Property Seller",
  "Property Buyer",
  "Developer",
  "Other",
]

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const fullName = String(formData.get("fullName") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const contact = String(formData.get("contact") ?? "").trim()
  const role = String(formData.get("role") ?? "").trim()
  const city = String(formData.get("city") ?? "").trim()
  const interest = String(formData.get("interest") ?? "").trim()
  const source = String(formData.get("source") ?? "direct").trim() || "direct"

  if (!fullName || !email || !contact) {
    return { ok: false, message: "Please complete your name, email, and contact number." }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." }
  }

  try {
    await db.insert(leads).values({
      fullName,
      email,
      contact,
      role: role || null,
      city: city || null,
      interest: interest || null,
      source: source.slice(0, 60),
    })
    return {
      ok: true,
      message: "You're on the list. We'll reach out with REDE updates and your next steps.",
    }
  } catch (error) {
    console.log("[v0] lead submit error:", error)
    return { ok: false, message: "Something went wrong. Please try again." }
  }
}

export { ROLES as LEAD_ROLES }

export async function getLeads() {
  if (!(await isAdmin())) throw new Error("Unauthorized")
  return db.select().from(leads).orderBy(desc(leads.createdAt))
}

export async function updateLeadStatus(id: number, status: string) {
  if (!(await isAdmin())) throw new Error("Unauthorized")
  const allowed = ["new", "contacted", "qualified", "converted", "dropped"]
  if (!allowed.includes(status)) throw new Error("Invalid status")
  await db.update(leads).set({ status }).where(eq(leads.id, id))
  revalidatePath("/leads/admin")
}
