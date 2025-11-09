import type { FastifyInstance } from "fastify";
import { listAuditLogs, listWorkspaceSeats } from "@services/admin-service";

export default async function adminRoutes(app: FastifyInstance) {
  app.get("/seats", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const seats = await listWorkspaceSeats(app, request.currentUser.workspaceId);
    return reply.send({ seats });
  });

  app.get("/audit", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const logs = await listAuditLogs(app, request.currentUser.workspaceId);
    return reply.send({ logs });
  });
}
