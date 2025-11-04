import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { getJob, listJobs } from "@services/job-service";

export default async function jobRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const jobs = await listJobs(app, request.currentUser.workspaceId);
    return reply.send({ jobs });
  });

  app.get<{ Params: { jobId: string } }>("/:jobId", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const params = z.object({ jobId: z.string() }).parse(request.params);
    const job = await getJob(app, request.currentUser.workspaceId, params.jobId);
    return reply.send(job);
  });
}
