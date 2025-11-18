import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// -------------------------------------------------------------
// Fastify Initialization
// -------------------------------------------------------------
const fastify = Fastify({
  logger: true,
});

// -------------------------------------------------------------
// Environment Check
// -------------------------------------------------------------
console.log("🔍 Stripe Secret Key:", !!process.env.STRIPE_SECRET_KEY);
console.log("🔍 Supabase URL:", !!process.env.SUPABASE_URL);
console.log("🔍 Supabase Service Role Key:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log("🔍 Allowed Origin:", process.env.ALLOWED_ORIGIN);

// -------------------------------------------------------------
// Supabase — MUST use SERVICE ROLE KEY in backend
// -------------------------------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// -------------------------------------------------------------
// Stripe Setup
// -------------------------------------------------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// -------------------------------------------------------------
// Webhook raw body parser (Stripe requirement)
// -------------------------------------------------------------
fastify.addContentTypeParser("*", { parseAs: "buffer" }, (req, body, done) => {
  done(null, body);
});

// -------------------------------------------------------------
// CORS CONFIG — for Vercel + Local Testing
// -------------------------------------------------------------
await fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigin = process.env.ALLOWED_ORIGIN;

    if (!origin) return cb(null, true);

    // Priority: Explicit environment value
    if (allowedOrigin && origin === allowedOrigin) {
      return cb(null, true);
    }

    // Vercel wildcard matching
    const vercelPattern = /^https:\/\/audio-artist-app-.*\.vercel\.app$/;

    if (vercelPattern.test(origin)) {
      return cb(null, true);
    }

    return cb(new Error("❌ CORS blocked: " + origin));
  },
  credentials: true,
});

// -------------------------------------------------------------
// Routes
// -------------------------------------------------------------

fastify.get("/", async () => {
  return { message: "🚀 HealthIntel backend is operational" };
});

// Health check
fastify.get("/api/status", async () => ({
  status: "ok",
  version: "1.0",
  timestamp: new Date().toISOString(),
}));

// Example supabase route
fastify.get("/users", async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    fastify.log.error(error);
    throw new Error("Supabase error: " + error.message);
  }

  return data;
});

// -------------------------------------------------------------
// Create Payment Intent
// -------------------------------------------------------------
fastify.post("/create-payment-intent", async (req, reply) => {
  try {
    const body = JSON.parse(req.body.toString());
    const { amount, currency } = body;

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return { clientSecret: intent.client_secret };
  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: err.message });
  }
});

// -------------------------------------------------------------
// Stripe Webhook Endpoint
// -------------------------------------------------------------
fastify.post("/webhook", async (req, reply) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return reply.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payments
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;

    console.log("💰 Payment Success:", pi.id);

    await supabase
      .from("payments")
      .update({ status: "succeeded" })
      .eq("payment_intent_id", pi.id);
  }

  reply.send({ received: true });
});

// -------------------------------------------------------------
// Server (Render requires 0.0.0.0)
// -------------------------------------------------------------
const PORT = Number(process.env.PORT) || 10000;

fastify
  .listen({ port: PORT, host: "0.0.0.0" })
  .then((addr) => console.log(`✅ Backend running: ${addr}`))
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
