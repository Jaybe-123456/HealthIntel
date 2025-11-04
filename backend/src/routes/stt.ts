import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { queueTranscriptionJob } from "@services/stt-service";

const sttSchema = z.object({
  mediaUrl: z.string().url(),
  enableDiarization: z.boolean().optional(),
  enablePunctuation: z.boolean().default(true)
});

export default async function sttRoutes(app: FastifyInstance) {
  app.post("/transcribe", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }

    const payload = sttSchema.parse(request.body);
    const job = await queueTranscriptionJob(app, {
      workspaceId: request.currentUser.workspaceId,
      mediaUrl: payload.mediaUrl,
      enableDiarization: payload.enableDiarization
    });

    return reply.status(202).send(job);
  });
}
