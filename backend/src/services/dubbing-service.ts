import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";

export async function enqueueDubbingJob(
  app: FastifyInstance,
  payload: { workspaceId: string; videoUrl: string; targetLanguages: string[] }
) {
  const jobId = randomUUID();
  await app.redis.xAdd("dubbing_jobs", "*", {
    jobId,
    workspaceId: payload.workspaceId,
    videoUrl: payload.videoUrl,
    langs: payload.targetLanguages.join(",")
  });
  return { jobId, status: "queued" as const };
}
