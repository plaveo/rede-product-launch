import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// Single shared pool for the whole app (never create a Pool per query).
// Hardened per go-live rules: capped size + timeouts so a traffic spike
// can't exhaust Neon connections (the #1 launch killer).
const globalForDb = globalThis as unknown as { redePool?: Pool }

export const pool =
  globalForDb.redePool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10, // stay well under Neon's pooled limit
    idleTimeoutMillis: 30_000, // release idle clients
    connectionTimeoutMillis: 10_000, // fail fast instead of hanging
  })

if (process.env.NODE_ENV !== "production") {
  globalForDb.redePool = pool
}

export const db = drizzle(pool, { schema })
