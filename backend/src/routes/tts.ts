import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { queueTtsJob } from "@services/tts-service";

const ttsSchema = z.object({
  voiceId: z.string(),
  text: z.string().min(1),
  language: z.string().optional(),
  format: z.enum(["mp3", "wav", "pcm"]).default("mp3"),
  voiceSettings: z.record(z.any()).optional()
});

export default async function ttsRoutes(app: FastifyInstance) {
  app.post("/synthesize", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = ttsSchema.parse(request.body);
    const job = await queueTtsJob(app, {
      workspaceId: request.currentUser.workspaceId,
      voiceId: payload.voiceId,
      text: payload.text,
      language: payload.language,
      format: payload.format,
      voiceSettings: payload.voiceSettings
    });

    return reply.status(202).send(job);
  });

  app.get("/voices", async (_, reply) => {
    return reply.send({
      voices: [
        { id: "voice_studio_helena", locale: "en-US", label: "Helena", tier: "premium" },
        { id: "voice_nova_miguel", locale: "es-ES", label: "Miguel", tier: "starter" }
      ]
    });
  });
}
