# This project is currently in development. Please do not follow the readme.

Running migration command:

type api\migrations\create_todos.sql | docker exec -i simple-crud-tanstack-fastify-db-1 psql -U todo_user -d todo_db


In the schema.ts, use:

id: serial("id").primaryKey(), instead of id: bigInt("id").primaryKey()


#Docker
docker exec -i simple-crud-tanstack-fastify-db-1 psql -U todo_user -d todo_db -f /api/migrations/create_todos.sql

docker exec -it simple-crud-tanstack-fastify-db-1 psql -U todo_user -d tdocker exec -i $(docker ps -q -f "ancestor=postgres:15") psql -U todo_user -d todo_db -c api\migrations\create_todos.sql