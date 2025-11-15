import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// -------------------------------
// Initialize Fastify
// -------------------------------
const fastify = Fastify({
  logger: true,
});

// -------------------------------
// Supabase Client
// -------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// -------------------------------
// Stripe Client
// -------------------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-11-15",
});

// -------------------------------
// Webhook Raw Body Parser (required by Stripe)
// -------------------------------
fastify.addContentTypeParser("*", { parseAs: "buffer" }, function (req, body, done) {
  done(null, body);
});

// -------------------------------
// CORS CONFIG
// Priority:
// 1. If ALLOWED_ORIGIN env exists -> use it
// 2. Otherwise, allow your Vercel pattern regex
// -------------------------------
await fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedEnv = process.env.ALLOWED_ORIGIN;

    // Allow server-to-server
    if (!origin) return cb(null, true);

    // Priority 1: ENV variable origin
    if (allowedEnv && origin === allowedEnv) {
      return cb(null, true);
    }

    // Priority 2: Regex for any Vercel deploy under your project
    const vercelRegex = /^https:\/\/audio-artist-app-.*\.vercel\.app$/;

    if (vercelRegex.test(origin)) {
      return cb(null, true);
    }

    return cb(new Error("❌ Not allowed by CORS: " + origin));
  },
  credentials: true,
});

// -------------------------------
// ROOT ROUTE
// -------------------------------
fastify.get("/", async () => {
  return { message: "🚀 HealthIntel backend is live and running smoothly!" };
});

// -------------------------------
// STATUS API
// -------------------------------
fastify.get("/api/status", async () => {
  return {
    service: "HealthIntel",
    status: "operational",
    timestamp: new Date().toISOString(),
  };
});

// -------------------------------
// Example Supabase Route
// -------------------------------
fastify.get("/users", async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) {
    fastify.log.error(error);
    throw new Error("Supabase error: " + error.message);
  }
  return data;
});

// -------------------------------
// Stripe Payment Intent
// -------------------------------
fastify.post("/create-payment-intent", async (req, reply) => {
  const { amount, currency } = JSON.parse(req.body.toString());

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    reply.send({ clientSecret: paymentIntent.client_secret });

  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: err.message });
  }
});

// -------------------------------
// Stripe Webhook Route
// -------------------------------
fastify.post("/webhook", async (req, reply) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return reply.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle Stripe Events
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    console.log("💰 Payment succeeded:", paymentIntent.id);
  }

  reply.send({ received: true });
});

// -------------------------------
// SERVER START
// -------------------------------
const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => {
    console.log(`✅ Fastify backend operational on port ${PORT}`);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
