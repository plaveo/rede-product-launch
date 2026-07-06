import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export const dynamic = "force-dynamic"

// Lightweight liveness probe: confirms the DB answers a trivial query.
// Used for uptime monitoring during launch. Fails soft with 503.
export async function GET() {
  const started = Date.now()
  try {
    await pool.query("SELECT 1")
    return NextResponse.json({
      ok: true,
      db: "up",
      ms: Date.now() - started,
      at: new Date().toISOString(),
    })
  } catch (err) {
    console.log("[v0] health check failed:", err instanceof Error ? err.message : err)
    return NextResponse.json(
      { ok: false, db: "down", ms: Date.now() - started, at: new Date().toISOString() },
      { status: 503 },
    )
  }
}
