import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const stressTestApplications = pgTable("stress_test_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  email: text("email").notNull(),
  contact: text("contact").notNull(),
  agency: text("agency"),
  licenseNumber: text("license_number"),
  property: text("property"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
