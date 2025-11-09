import fastifyPlugin from "fastify-plugin";
import { Pool } from "pg";
import { config } from "@config/index";

declare module "fastify" {
  interface FastifyInstance {
    pg: Pool;
  }
}

export const registerPostgres = fastifyPlugin(async (app) => {
  const pool = new Pool({ connectionString: config.POSTGRES_URL });

  app.decorate("pg", pool);
  app.addHook("onClose", async () => {
    await pool.end();
  });
});
