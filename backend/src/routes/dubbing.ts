import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { enqueueDubbingJob } from "@services/dubbing-service";

const dubbingSchema = z.object({
  videoUrl: z.string().url(),
  targetLanguages: z.array(z.string().min(2)).min(1),
  subtitleUrl: z.string().url().optional()
});

export default async function dubbingRoutes(app: FastifyInstance) {
  app.post("/jobs", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = dubbingSchema.parse(request.body);
    const job = await enqueueDubbingJob(app, {
      workspaceId: request.currentUser.workspaceId,
      videoUrl: payload.videoUrl,
      targetLanguages: payload.targetLanguages
    });
    return reply.status(202).send(job);
  });
}
