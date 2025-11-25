import fp from 'fastify-plugin';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export default fp(async (fastify, opts) => {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || 'todo_user',
    password: process.env.DB_PASS || 'todo_pass',
    database: process.env.DB_NAME || 'todo_db',
  });
  const db = drizzle(pool);
  fastify.decorate('db', db);
});
