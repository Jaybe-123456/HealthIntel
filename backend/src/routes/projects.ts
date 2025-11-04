import type { FastifyInstance } from "fastify";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string().min(2),
  type: z.enum(["studio", "dubbing", "conversation", "music"]),
  templateId: z.string().optional()
});

export default async function projectRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    return reply.send({
      projects: [
        { id: "proj_01", name: "Weekly Podcast", type: "studio" },
        { id: "proj_02", name: "Product Dubbing", type: "dubbing" }
      ]
    });
  });

  app.post("/", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = projectSchema.parse(request.body);
    // TODO: persist project to Postgres
    return reply.status(201).send({ projectId: "proj_mock", ...payload });
  });
}
