import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { enqueueMusicJob } from "@services/music-service";

const musicSchema = z.object({
  prompt: z.string().min(5),
  mood: z.string().default("cinematic")
});

export default async function musicRoutes(app: FastifyInstance) {
  app.post("/generate", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = musicSchema.parse(request.body);
    const job = await enqueueMusicJob(app, {
      workspaceId: request.currentUser.workspaceId,
      prompt: payload.prompt,
      mood: payload.mood
    });
    return reply.status(202).send(job);
  });
}
