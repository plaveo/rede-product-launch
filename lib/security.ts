import { headers } from "next/headers"

/**
 * Length caps for stored fields. Prevents oversized payloads from
 * bloating the database or being used as a storage-abuse vector.
 */
export const LIMITS = {
  short: 120, // names, roles, emails, contacts, single-line answers
  medium: 300, // company, property, pay amount, etc.
  long: 2000, // free-text / textarea answers
} as const

/**
 * Trim a value and hard-cap its length. Returns null when empty so
 * optional DB columns stay clean.
 */
export function capStr(
  value: FormDataEntryValue | null,
  max: number = LIMITS.short,
): string | null {
  const s = String(value ?? "").trim()
  if (!s) return null
  return s.slice(0, max)
}

/**
 * Required version of capStr — returns "" when empty so callers can
 * run their own "required" check.
 */
export function capRequired(
  value: FormDataEntryValue | null,
  max: number = LIMITS.short,
): string {
  return String(value ?? "").trim().slice(0, max)
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= LIMITS.short
}

/**
 * Honeypot bot guard. Add a hidden, visually-removed input named
 * "company_website" to the form. Real users never fill it; bots do.
 * Returns true when the submission looks like a bot.
 */
export function isBot(formData: FormData): boolean {
  const trap = String(formData.get("company_website") ?? "").trim()
  return trap.length > 0
}

/**
 * Best-effort in-memory rate limiter (sliding window) keyed by IP.
 * Note: in serverless each instance keeps its own map, so this is a
 * first line of defense, not a hard guarantee. For durable limits,
 * back this with Upstash Redis.
 */
const hits = new Map<string, number[]>()

export async function rateLimit(
  scope: string,
  { max = 5, windowMs = 60_000 }: { max?: number; windowMs?: number } = {},
): Promise<{ ok: boolean }> {
  let ip = "unknown"
  try {
    const h = await headers()
    ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      "unknown"
  } catch {
    // headers() unavailable — fail open
    return { ok: true }
  }

  const key = `${scope}:${ip}`
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)

  if (recent.length >= max) {
    hits.set(key, recent)
    return { ok: false }
  }

  recent.push(now)
  hits.set(key, recent)

  // opportunistic cleanup to bound memory
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= windowMs)) hits.delete(k)
    }
  }

  return { ok: true }
}
