import type { FastifyInstance } from "fastify";
import authRoutes from "@routes/auth";
import ttsRoutes from "@routes/tts";
import sttRoutes from "@routes/stt";
import voiceRoutes from "@routes/voices";
import jobRoutes from "@routes/jobs";
import billingRoutes from "@routes/billing";
import projectRoutes from "@routes/projects";
import dubbingRoutes from "@routes/dubbing";
import conversationRoutes from "@routes/conversation";
import musicRoutes from "@routes/music";
import adminRoutes from "@routes/admin";
import webhookRoutes from "@routes/webhooks";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(ttsRoutes, { prefix: "/v1/tts" });
  await app.register(sttRoutes, { prefix: "/v1/stt" });
  await app.register(voiceRoutes, { prefix: "/v1/voices" });
  await app.register(jobRoutes, { prefix: "/v1/jobs" });
  await app.register(billingRoutes, { prefix: "/v1/billing" });
  await app.register(projectRoutes, { prefix: "/v1/projects" });
  await app.register(dubbingRoutes, { prefix: "/v1/dubbing" });
  await app.register(conversationRoutes, { prefix: "/v1/conversation" });
  await app.register(musicRoutes, { prefix: "/v1/music" });
  await app.register(adminRoutes, { prefix: "/v1/admin" });
  await app.register(webhookRoutes, { prefix: "/webhooks" });
}
