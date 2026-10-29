import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Public lead submissions. Store only the contact fields explicitly requested by the form. */
export const leadSubmissions = mysqlTable("leadSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  contactName: varchar("contactName", { length: 80 }).notNull(),
  companyName: varchar("companyName", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 24 }).notNull(),
  email: varchar("email", { length: 320 }),
  interest: varchar("interest", { length: 160 }).notNull(),
  message: text("message"),
  privacyConsentAt: timestamp("privacyConsentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LeadSubmission = typeof leadSubmissions.$inferSelect;
export type InsertLeadSubmission = typeof leadSubmissions.$inferInsert;
