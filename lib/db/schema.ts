import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core"

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  contact: text("contact").notNull(),
  role: text("role"),
  city: text("city"),
  interest: text("interest"),
  source: text("source").notNull().default("direct"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

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

export const stressTestSurvey = pgTable("stress_test_survey", {
  id: serial("id").primaryKey(),
  // 01 Profile
  name: text("name").notNull(),
  company: text("company"),
  role: text("role"),
  yearsExperience: text("years_experience"),
  email: text("email"),
  // 02 Current Workflow
  researchMethods: text("research_methods"),
  // 03 Pain Points
  biggestPain: text("biggest_pain"),
  // 04 First Impression (1-10)
  ratingEasy: integer("rating_easy"),
  ratingProfessional: integer("rating_professional"),
  ratingUseful: integer("rating_useful"),
  ratingFast: integer("rating_fast"),
  ratingTrustworthy: integer("rating_trustworthy"),
  // 05 Data
  dataTrust: text("data_trust"),
  dataTrustReason: text("data_trust_reason"),
  // 06 Assessment
  assessmentHelp: text("assessment_help"),
  // 07 Interpretation
  interpretationHelp: text("interpretation_help"),
  // 08 Confidence (1-10)
  confidenceGain: integer("confidence_gain"),
  // 09 Time Saved (minutes)
  timeNormal: integer("time_normal"),
  timeRede: integer("time_rede"),
  // 10 Missing Information
  missingInfo: text("missing_info"),
  // 11 Willingness to Use
  useIntent: text("use_intent"),
  // 12 Willingness to Pay
  payIntent: text("pay_intent"),
  payAmount: text("pay_amount"),
  // 13 Recommendation (1-10)
  recommendScore: integer("recommend_score"),
  // 14 Final Comment
  improveFirst: text("improve_first"),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})
