import fp from 'fastify-plugin';
import { pool, db, DbInstance } from '../db/client'; // Import the client core

// Fastify interface
declare module 'fastify' {
  interface FastifyInstance {
    db: DbInstance;
  }
}

// Register the Plugin
export default fp(async (fastify) => {
  // Decorate the Fastify instance for access in routes (Dependency Injection)
  fastify.decorate('db', db);

  // Add a hook to gracefully close the pool when Fastify shuts down
  fastify.addHook('onClose', async (server) => {
    await pool.end();
    server.log.info('PostgreSQL connection pool gracefully closed.');
  });
  
  fastify.log.info('Drizzle ORM client attached to Fastify instance.');
});