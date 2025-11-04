import fastifyPlugin from "fastify-plugin";
import Stripe from "stripe";
import { config } from "@config/index";

declare module "fastify" {
  interface FastifyInstance {
    stripe: Stripe;
  }
}

export const registerStripe = fastifyPlugin(async (app) => {
  const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16"
  });

  app.decorate("stripe", stripe);
});
