import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";

export async function enqueueMusicJob(
  app: FastifyInstance,
  payload: { workspaceId: string; prompt: string; mood: string }
) {
  const jobId = randomUUID();
  await app.redis.xAdd("music_jobs", "*", {
    jobId,
    workspaceId: payload.workspaceId,
    prompt: payload.prompt,
    mood: payload.mood
  });
  return { jobId, status: "queued" as const };
}
