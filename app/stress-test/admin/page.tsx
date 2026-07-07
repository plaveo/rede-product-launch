import type { Metadata } from "next"
import Link from "next/link"
import { sql } from "@/lib/db"
import { isAdmin } from "@/app/actions/stress-admin"
import { AdminLogin } from "@/components/rede/admin-login"
import { AdminDashboard, type Application } from "@/components/rede/admin-dashboard"

export const metadata: Metadata = {
  title: "REDE Stress Test — Admin",
  robots: { index: false, follow: false },
}

// Always read fresh from Neon.
export const dynamic = "force-dynamic"

async function getApplications(): Promise<Application[]> {
  try {
    const rows = await sql`
      SELECT id, full_name, email, contact, role, status, created_at
      FROM stress_test_applications
      ORDER BY created_at DESC
    `
    return rows as Application[]
  } catch (err) {
    console.log("[v0] getApplications error:", (err as Error).message)
    return []
  }
}

export default async function AdminPage() {
  const authed = await isAdmin()

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, oklch(0.62 0.19 256 / 45%), transparent)" }}
      />

      <div className="relative mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to REDE
        </Link>

        {authed ? (
          <div className="mt-10">
            <AdminDashboard applications={await getApplications()} />
          </div>
        ) : (
          <AdminLogin />
        )}
      </div>
    </main>
  )
}
