"use server"

import { db } from "@/lib/db"
import { leads, stressTestApplications, stressTestSurvey } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { isAdmin } from "@/app/actions/admin"

export type HqData = {
  ok: boolean
  applications: (typeof stressTestApplications.$inferSelect)[]
  leads: (typeof leads.$inferSelect)[]
  surveys: (typeof stressTestSurvey.$inferSelect)[]
  fetchedAt: string
}

// Single fetch for the whole command center. Fails soft per section so one
// bad query never blanks the entire monitor.
export async function getHqData(): Promise<HqData> {
  if (!(await isAdmin())) {
    return { ok: false, applications: [], leads: [], surveys: [], fetchedAt: new Date().toISOString() }
  }

  const [apps, leadRows, surveyRows] = await Promise.all([
    db.select().from(stressTestApplications).orderBy(desc(stressTestApplications.createdAt)).catch((e) => {
      console.log("[v0] hq applications error:", e)
      return []
    }),
    db.select().from(leads).orderBy(desc(leads.createdAt)).catch((e) => {
      console.log("[v0] hq leads error:", e)
      return []
    }),
    db.select().from(stressTestSurvey).orderBy(desc(stressTestSurvey.createdAt)).catch((e) => {
      console.log("[v0] hq surveys error:", e)
      return []
    }),
  ])

  return {
    ok: true,
    applications: apps,
    leads: leadRows,
    surveys: surveyRows,
    fetchedAt: new Date().toISOString(),
  }
}
