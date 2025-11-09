import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";

export type VoiceCloneRequest = {
  workspaceId: string;
  displayName: string;
  consentUrl: string;
  tier: "starter" | "creator" | "enterprise";
  sampleUrls: string[];
};

export async function enqueueVoiceClone(app: FastifyInstance, payload: VoiceCloneRequest) {
  const cloneId = randomUUID();
  await app.redis.hSet(`voice_clone:${cloneId}`, {
    workspaceId: payload.workspaceId,
    displayName: payload.displayName,
    tier: payload.tier,
    status: "review"
  });

  await app.redis.xAdd("voice_clone_jobs", "*", {
    cloneId,
    workspaceId: payload.workspaceId,
    tier: payload.tier
  });

  return { cloneId, status: "in_review" as const };
}
