'use server'

import { db } from '@/lib/db'
import { stressTestApplications } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'rede_admin'

function expectedToken() {
  const secret = process.env.ADMIN_PASSWORD
  if (!secret) return null
  // Derive a stable, non-reversible token from the password.
  return createHmac('sha256', secret).update('rede-admin-session').digest('hex')
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ba.length !== bb.length) return false
  return timingSafeEqual(ba, bb)
}

export async function isAdmin() {
  const token = expectedToken()
  if (!token) return false
  const cookie = (await cookies()).get(COOKIE_NAME)?.value
  return !!cookie && safeEqual(cookie, token)
}

export async function adminLogin(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get('password') ?? '')
  const secret = process.env.ADMIN_PASSWORD

  if (!secret) {
    return { error: 'Admin password is not configured yet. Set ADMIN_PASSWORD in project settings.' }
  }
  if (!password || !safeEqual(password, secret)) {
    return { error: 'Incorrect password.' }
  }

  const token = expectedToken()!
  ;(await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  })
  revalidatePath('/stress-test/admin')
  return {}
}

export async function adminLogout() {
  ;(await cookies()).delete(COOKIE_NAME)
  revalidatePath('/stress-test/admin')
}

export async function getApplications() {
  if (!(await isAdmin())) throw new Error('Unauthorized')
  return db
    .select()
    .from(stressTestApplications)
    .orderBy(desc(stressTestApplications.createdAt))
}

export async function updateApplicationStatus(id: number, status: string) {
  if (!(await isAdmin())) throw new Error('Unauthorized')
  const allowed = ['pending', 'qualified', 'rejected']
  if (!allowed.includes(status)) throw new Error('Invalid status')
  await db
    .update(stressTestApplications)
    .set({ status })
    .where(eq(stressTestApplications.id, id))
  revalidatePath('/stress-test/admin')
}
