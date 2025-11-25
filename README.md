Running migration command:

type api\migrations\create_todos.sql | docker exec -i simple-crud-tanstack-fastify-db-1 psql -U todo_user -d todo_db


In the schema.ts, use:

id: serial("id").primaryKey(), instead of id: bigInt("id").primaryKey()