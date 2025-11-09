import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyHelmet from "fastify-helmet";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { registerAuthPlugin } from "@plugins/auth";
import { registerPostgres } from "@plugins/postgres";
import { registerRedis } from "@plugins/redis";
import { registerStripe } from "@plugins/stripe";
import { registerRoutes } from "@routes/index";
import { config } from "@config/index";

export async function buildApp() {
  const app = Fastify({
    logger: {
      transport: config.LOG_PRETTY ? { target: "pino-pretty" } : undefined,
      level: config.LOG_LEVEL
    }
  });

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false
  });
  await app.register(fastifyCors, {
    origin: config.CORS_ORIGINS,
    credentials: true
  });
  await app.register(rateLimit, {
    global: true,
    max: config.RATE_LIMIT_MAX,
    timeWindow: config.RATE_LIMIT_WINDOW
  });

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Aural Forge API",
        version: "0.1.0"
      },
      servers: [
        { url: "https://api.auralforge.ai", description: "Production" },
        { url: "https://sandbox.auralforge.ai", description: "Sandbox" }
      ]
    }
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    staticCSP: true
  });

  await registerAuthPlugin(app);
  await registerPostgres(app);
  await registerRedis(app);
  await registerStripe(app);

  await registerRoutes(app);

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}
