import 'fastify';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js'; // or the correct driver you're using

declare module 'fastify' {
  interface FastifyInstance {
    db: PostgresJsDatabase;
  }
}