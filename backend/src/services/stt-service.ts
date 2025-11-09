import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";

export async function queueTranscriptionJob(
  app: FastifyInstance,
  payload: { workspaceId: string; mediaUrl: string; enableDiarization?: boolean }
) {
  const jobId = randomUUID();
  await app.redis.xAdd("stt_jobs", "*", {
    jobId,
    workspaceId: payload.workspaceId,
    mediaUrl: payload.mediaUrl,
    diarization: payload.enableDiarization ? "1" : "0"
  });
  app.log.debug({ jobId }, "Queued STT job");
  return { jobId, status: "queued" as const };
}
