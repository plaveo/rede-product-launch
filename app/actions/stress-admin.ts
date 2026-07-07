"use server"

import { cookies } from "next/headers"
import { createHash } from "node:crypto"
import { revalidatePath } from "next/cache"
import { sql } from "@/lib/db"

const COOKIE = "stress_admin"

/** Non-guessable token derived from the admin password (httpOnly cookie value). */
function sessionToken() {
  const secret = process.env.ADMIN_PASSWORD ?? ""
  return createHash("sha256").update(`rede-stress::${secret}`).digest("hex")
}

export async function isAdmin() {
  const store = await cookies()
  return store.get(COOKIE)?.value === sessionToken()
}

export type LoginState = { ok: boolean; message: string }

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "")
  const expected = process.env.ADMIN_PASSWORD ?? ""

  if (!expected) {
    return { ok: false, message: "Admin access is not configured." }
  }
  if (password !== expected) {
    return { ok: false, message: "Incorrect password." }
  }

  const store = await cookies()
  store.set(COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  })
  return { ok: true, message: "" }
}

export async function logout() {
  const store = await cookies()
  store.delete(COOKIE)
  revalidatePath("/stress-test/admin")
}

/** status: 'approved' | 'rejected' | 'pending' */
export async function setApplicationStatus(id: number, status: string) {
  if (!(await isAdmin())) return { ok: false, message: "Not authorized." }
  const allowed = ["pending", "approved", "rejected"]
  if (!allowed.includes(status)) return { ok: false, message: "Invalid status." }

  try {
    await sql`
      UPDATE stress_test_applications SET status = ${status} WHERE id = ${id}
    `
    revalidatePath("/stress-test/admin")
    return { ok: true, message: "Updated." }
  } catch (err) {
    console.log("[v0] setApplicationStatus error:", (err as Error).message)
    return { ok: false, message: "Could not update. Try again." }
  }
}
