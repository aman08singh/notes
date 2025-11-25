import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  checked: boolean("checked").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
