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
export const tokenStatusEnum = pgEnum("token_status", [
  "active",
  "in_progress",
  "completed",
  "cancelled",
]);

//********************Tables*********************/

export const userSchema = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default("Customer"),
  fname: varchar("fname", { length: 255 }).notNull(),
  lname: varchar("lname", { length: 255 }).notNull(),
  subscriptionId: uuid("subscription_id")
    .notNull()
    .references(() => planSchema.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
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
  slotName: varchar("slot_name", { length: 255 }).notNull(),
  isPaused: boolean("is_paused").notNull().default(false),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),

  capacity: integer("capacity").notNull(),
  bookedCount: integer("booked_count").notNull().default(0),
  currentTokenId: integer("current_token_id").notNull().default(0),
  completedCount: integer("completed_count").notNull().default(0),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const tokenSchema = pgTable("token", {
  id: uuid("id").defaultRandom().primaryKey(),
  slotId: uuid("slot_id")
    .notNull()
    .references(() => slotSchema.id, {
      onDelete: "cascade",
    }),

  customerId: uuid("customer_id")
    .notNull()
    .references(() => userSchema.id, {
      onDelete: "cascade",
    }),

  slotNumber: integer("slot_number").notNull(),
  status: tokenStatusEnum("status").notNull().default("active"),
  bookedAt: timestamp("booked_at").defaultNow().notNull(),

  startedServiceAt: timestamp("started_service_at"),
  endedServiceAt: timestamp("ended_service_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const planSchema = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  planName: varchar("plan_name", { length: 255 }).notNull(),
  maxActiveTokens: integer("max_active_tokens").notNull(),
  maxActiveServices: integer("max_active_services").notNull(),
  maxActiveSlots: integer("max_active_slots").notNull(),
});

//********************Relations*********************/

export const userRelations = relations(userSchema, ({ one, many }) => ({
  plan: one(planSchema, {
    fields: [userSchema.subscriptionId],
    references: [planSchema.id],
  }),

  services: many(serviceSchema),

  bookedTokens: many(tokenSchema),
}));

export const serviceRelations = relations(serviceSchema, ({ one, many }) => ({
  creator: one(userSchema, {
    fields: [serviceSchema.createdBy],
    references: [userSchema.id],
  }),

  slots: many(slotSchema),
}));

export const slotRelations = relations(slotSchema, ({ one, many }) => ({
  service: one(serviceSchema, {
    fields: [slotSchema.serviceId],
    references: [serviceSchema.id],
  }),

  tokens: many(tokenSchema),
}));

export const tokenRelations = relations(tokenSchema, ({ one }) => ({
  slot: one(slotSchema, {
    fields: [tokenSchema.slotId],
    references: [slotSchema.id],
  }),

  customer: one(userSchema, {
    fields: [tokenSchema.customerId],
    references: [userSchema.id],
  }),
}));
