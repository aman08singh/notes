import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  bigserial,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  checked: boolean("checked").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
