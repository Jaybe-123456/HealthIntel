import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { createUsageRecord, listInvoices } from "@services/billing-service";

const usageSchema = z.object({
  subscriptionItemId: z.string(),
  quantity: z.number().int().positive()
});

export default async function billingRoutes(app: FastifyInstance) {
  app.get("/invoices", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    // TODO: map workspace -> Stripe customer via Postgres
    const invoices = await listInvoices(app, "cus_mock");
    return reply.send({ invoices });
  });

  app.post("/usage", async (request, reply) => {
    if (!request.currentUser) {
      return reply.status(401).send({ message: "Unauthorized" });
    }
    const payload = usageSchema.parse(request.body);
    const record = await createUsageRecord(app, payload);
    return reply.status(202).send({ usage: record });
  });
}
