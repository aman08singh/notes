import { defineConfig } from "drizzle-kit";
import 'dotenv/config';

console.log("From drizzle.config.ts, DATABASE_URL:", process.env.DATABASE_URL);

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
});