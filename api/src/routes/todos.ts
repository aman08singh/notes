import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { todos } from '../db/schema';
import { asc, eq } from 'drizzle-orm';

const todoBody = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  checked: z.boolean().optional(),
});

const todosRoutes: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get('/', async (request, reply) => {
    const db = fastify.db;
    const res = await db
    .select()
    .from(todos)
    .orderBy(asc(todos.id));
  return res;
  });

  fastify.get('/:id', async (request, reply) => {
    const id = Number((request.params as any).id);
    const db = fastify.db;
    const item = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
    return item[0] ?? reply.code(404).send({ error: 'Not found' });
  });

  fastify.post('/', async (request, reply) => {
    const parsed = todoBody.parse(request.body);
    const db = fastify.db;
    const res = await db.insert(todos).values({
      title: parsed.title,
      description: parsed.description,
      checked: parsed.checked ?? false,
    }).returning();
    return res[0];
  });

  fastify.put('/:id', async (request, reply) => {
    const id = Number((request.params as any).id);
    const parsed = todoBody.parse(request.body);
    const db = fastify.db;
    const res = await db.update(todos).set({ ...parsed }).where(eq(todos.id, id)).returning();
    return res[0];
  });

  fastify.delete('/:id', async (request, reply) => {
    const id = Number((request.params as any).id);
    const db = fastify.db;
    await db.delete(todos).where(eq(todos.id, id));
    return { ok: true };
  });
};

export default todosRoutes;
