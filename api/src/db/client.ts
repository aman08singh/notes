import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import "dotenv/config";

console.log("From db/client.ts, DATABASE_URL:", process.env.DATABASE_URL);

// Drizzle DB instance type for clean export
export type DbInstance = NodePgDatabase<typeof schema>;

// DATABASE CHECK
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set in environment variables. Cannot connect to PostgreSQL."
  );
}

// Pool creation
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle client with schema registered
export const db: DbInstance = drizzle(pool, { schema });
