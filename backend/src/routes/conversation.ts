import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createConversationSession, listConversations } from "@services/conversation-service";

const createSchema = z.object({
  botId: z.string(),
  locale: z.string().default("en-US")
});

export default async function conversationRoutes(app: FastifyInstance) {
  app.get("/sessions", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const sessions = await listConversations(app, request.currentUser.workspaceId);
    return reply.send({ sessions });
  });

  app.post("/sessions", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = createSchema.parse(request.body);
    const session = await createConversationSession(app, {
      workspaceId: request.currentUser.workspaceId,
      botId: payload.botId,
      locale: payload.locale
    });
    return reply.status(201).send(session);
  });
}
