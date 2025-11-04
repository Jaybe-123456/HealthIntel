import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";

type TtsRequest = {
  workspaceId: string;
  voiceId: string;
  text: string;
  language?: string;
  format?: "mp3" | "wav" | "pcm";
  voiceSettings?: Record<string, unknown>;
};

export async function queueTtsJob(app: FastifyInstance, payload: TtsRequest) {
  const jobId = randomUUID();
  await app.redis.xAdd("tts_jobs", "*", {
    jobId,
    workspaceId: payload.workspaceId,
    voiceId: payload.voiceId,
    format: payload.format ?? "mp3"
  });

  app.log.debug({ jobId }, "Queued TTS job");
  return { jobId, status: "queued" as const };
}
