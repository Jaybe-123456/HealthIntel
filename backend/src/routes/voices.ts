import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { enqueueVoiceClone } from "@services/voice-cloning-service";

const cloneSchema = z.object({
  displayName: z.string().min(2),
  consentUrl: z.string().url(),
  tier: z.enum(["starter", "creator", "enterprise"]).default("starter"),
  sampleUrls: z.array(z.string().url()).min(1)
});

export default async function voiceRoutes(app: FastifyInstance) {
  app.get("/catalog", async (_, reply) => {
    return reply.send({
      voices: [
        { id: "voice_studio_helena", language: "en-US", tier: "starter" },
        { id: "voice_creator_camille", language: "fr-FR", tier: "creator" },
        { id: "voice_pro_mateo", language: "es-LA", tier: "pro" }
      ]
    });
  });

  app.post("/clone", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = cloneSchema.parse(request.body);
    const result = await enqueueVoiceClone(app, {
      workspaceId: request.currentUser.workspaceId,
      displayName: payload.displayName,
      consentUrl: payload.consentUrl,
      tier: payload.tier,
      sampleUrls: payload.sampleUrls
    });

    return reply.status(202).send(result);
  });
}
