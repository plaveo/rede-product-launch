import { neon } from "@neondatabase/serverless"

// HTTP driver: no persistent connections, safe against connection exhaustion
// (the #1 launch killer). Uses the pooled DATABASE_URL.
export const sql = neon(process.env.DATABASE_URL!)
