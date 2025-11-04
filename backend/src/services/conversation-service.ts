import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";

export async function createConversationSession(
  app: FastifyInstance,
  payload: { workspaceId: string; botId: string; locale: string }
) {
  const sessionId = randomUUID();
  await app.redis.hSet(`conversation:${sessionId}`, {
    workspaceId: payload.workspaceId,
    botId: payload.botId,
    locale: payload.locale,
    createdAt: Date.now().toString()
  });
  return { sessionId };
}

export async function listConversations(app: FastifyInstance, workspaceId: string) {
  app.log.debug({ workspaceId }, "List conversations");
  return [
    { id: "conv_01", botId: "support_voice", locale: "en-US", active: true },
    { id: "conv_02", botId: "sales_fr", locale: "fr-FR", active: false }
  ];
}
