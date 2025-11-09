import fastifyPlugin from "fastify-plugin";
import { createClient } from "redis";
import { config } from "@config/index";

declare module "fastify" {
  interface FastifyInstance {
    redis: ReturnType<typeof createClient>;
  }
}

export const registerRedis = fastifyPlugin(async (app) => {
  const client = createClient({ url: config.REDIS_URL });
  client.on("error", (err) => app.log.error({ err }, "Redis error"));
  await client.connect();

  app.decorate("redis", client);
  app.addHook("onClose", async () => {
    await client.disconnect();
  });
});
