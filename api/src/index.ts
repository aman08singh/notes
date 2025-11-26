import Fastify from "fastify";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db";
import todoRoutes from "./routes/todos";

const start = async () => {
  //Initialize Server
  const server = Fastify({ logger: true });

  try {
    //Register Middleware and Plugins (MUST be awaited inside the async function)
    await server.register(cors, {
      origin: true,
    });

    // The dbPlugin will decorate the server instance with 'fastify.db'
    await server.register(dbPlugin);

    //Register Routes and Health Check
    server.get("/health", async () => ({
      ok: true,
    }));

    // Register routes
    await server.register(todoRoutes, { prefix: "/todos" });

    //Start Listening
    await server.listen({ port: 4000, host: "0.0.0.0" });
    server.log.info(`Server listening at ${server.server.address()}`);
    console.log("Server running");
  } catch (err) {
    // Log errors and exit process if startup fails
    console.error("Server failed to start:", err);
    if (server) {
      // Safely use the logger if initialization reached this point
      server.log.error(err);
    }
    process.exit(1);
  }
};

// Invoke the start function.
start();
