import type { FastifyInstance } from "fastify";

export async function listWorkspaceSeats(app: FastifyInstance, workspaceId: string) {
  app.log.debug({ workspaceId }, "List seats");
  return [
    { id: "seat_01", email: "owner@example.com", role: "owner" },
    { id: "seat_02", email: "editor@example.com", role: "editor" }
  ];
}

export async function listAuditLogs(app: FastifyInstance, workspaceId: string) {
  app.log.debug({ workspaceId }, "List audit logs");
  return [
    {
      id: "audit_01",
      event: "voice.clone.requested",
      actor: "owner@example.com",
      createdAt: new Date().toISOString()
    }
  ];
}
