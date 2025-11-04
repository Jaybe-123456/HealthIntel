import type { FastifyInstance } from "fastify";
import { config } from "@config/index";

export default async function webhookRoutes(app: FastifyInstance) {
  app.post("/stripe", async (request, reply) => {
    const signature = request.headers["stripe-signature"] as string | undefined;
    if (!signature) {
      return reply.status(400).send({ message: "Missing signature" });
    }
    // TODO: verify using stripe.webhooks.constructEvent
    app.log.info({ signature }, "Received Stripe webhook");
    return reply.status(200).send({ received: true });
  });

  app.post("/jobs", async (request, reply) => {
    const secret = request.headers["x-auralforge-secret"];
    if (secret !== config.WEBHOOK_SECRET) {
      return reply.status(401).send({ message: "Invalid signature" });
    }
    app.log.info({ body: request.body }, "Job webhook received");
    return reply.status(200).send({ received: true });
  });
}
