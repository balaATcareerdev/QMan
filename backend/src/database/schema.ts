import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["Client", "Customer"]);

export const serviceStatusEnum = pgEnum("service_status", [
  "active",
  "upcoming",
  "expired",
]);

export const userSchema = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("Customer"),
  fname: varchar("fname", { length: 255 }).notNull(),
  lname: varchar("lname", { length: 255 }).notNull(),
});

export const serviceSchema = pgTable("service", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceName: varchar("service_name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  isPaused: boolean("is_paused").notNull().default(false),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => userSchema.id, {
      onDelete: "cascade",
    }),
});

export const slotSchema = pgTable("slot", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => serviceSchema.id, {
      onDelete: "cascade",
    }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  serviceName: varchar("service_name", { length: 255 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  capacity: integer("capacity").notNull(),
  bookedCount: integer("booked_count").notNull().default(0),
  currentToken: integer("current_token").notNull().default(0),
  avgTime: integer("avg_time").notNull().default(0),
  completedCount: integer("completed_count").notNull().default(0),
});

export const serviceRelations = relations(serviceSchema, ({ many }) => ({
  slots: many(slotSchema),
}));

export const slotRelations = relations(slotSchema, ({ one }) => ({
  service: one(serviceSchema, {
    fields: [slotSchema.serviceId],
    references: [serviceSchema.id],
  }),
}));
