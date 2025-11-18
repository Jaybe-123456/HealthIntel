import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// -----------------------------------------------------
// ENV CHECK — helps catch invalid API key issues
// -----------------------------------------------------
console.log("🔍 Stripe Secret Key:", !!process.env.STRIPE_SECRET_KEY);
console.log("🔍 Supabase URL:", !!process.env.SUPABASE_URL);
console.log("🔍 Supabase Service Role Key:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log("🔍 Allowed Origin:", process.env.ALLOWED_ORIGIN || "Using regex");

// -----------------------------------------------------
// Initialize Fastify
// -----------------------------------------------------
const fastify = Fastify({
  logger: true,
});

// -----------------------------------------------------
// Stripe Client
// -----------------------------------------------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-11-15",
});

// -----------------------------------------------------
// Supabase Client — uses SERVICE ROLE KEY (Backend only)
// -----------------------------------------------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// -----------------------------------------------------
// Stripe requires RAW BODY parsing for webhooks
// -----------------------------------------------------
fastify.addContentTypeParser("*", { parseAs: "buffer" }, (req, body, done) => {
  done(null, body);
});

// -----------------------------------------------------
// CORS CONFIG — allows:
// 1. Your ALLOWED_ORIGIN env domain
// 2. Any Vercel deployment under your project
// -----------------------------------------------------
await fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedEnv = process.env.ALLOWED_ORIGIN;

    // Allow server-to-server requests
    if (!origin) return cb(null, true);

    // Priority 1 — explicit env domain
    if (allowedEnv && origin === allowedEnv) {
      return cb(null, true);
    }

    // Priority 2 — match any deployment of your Vercel project
    const vercelRegex = /^https:\/\/audio-artist-app-.*\.vercel\.app$/;

    if (vercelRegex.test(origin)) {
      return cb(null, true);
    }

    return cb(new Error("❌ CORS Blocked: " + origin));
  },
  credentials: true,
});

// -----------------------------------------------------
// ROOT ROUTE
// -----------------------------------------------------
fastify.get("/", async () => {
  return { message: "🚀 Backend running successfully!" };
});

// -----------------------------------------------------
// STATUS ROUTE
// -----------------------------------------------------
fastify.get("/api/status", async () => ({
  service: "AudioArtist Backend",
  status: "operational",
  timestamp: new Date().toISOString(),
}));

// -----------------------------------------------------
// EXAMPLE: Fetch Users (from Supabase)
// -----------------------------------------------------
fastify.get("/users", async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    fastify.log.error(error);
    throw new Error("Supabase Error: " + error.message);
  }

  return data;
});

// -----------------------------------------------------
// CREATE PAYMENT INTENT (Stripe)
// -----------------------------------------------------
fastify.post("/create-payment-intent", async (req, reply) => {
  const { amount, currency } = JSON.parse(req.body.toString());

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    reply.send({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    fastify.log.error(err);
    reply.status(500).send({ error: err.message });
  }
});

// -----------------------------------------------------
// STRIPE WEBHOOK
// -----------------------------------------------------
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

  if (event.type === "payment_intent.succeeded") {
    console.log("💰 Payment Success:", event.data.object.id);
  }

  reply.send({ received: true });
});

// -----------------------------------------------------
// START SERVER
// -----------------------------------------------------
const PORT = process.env.PORT || 3000;

fastify
  .listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`✅ Backend Live on ${PORT}`))
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
