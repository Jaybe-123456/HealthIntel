import Fastify from "fastify";
import fastifyCors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});

// Allowed origins
const allowedOrigins = [
  "https://audio-artist-app-k4r1-h4d6m3igd-jaybe-123456.vercel.app"
];

// Register CORS with dynamic origin checking
await fastify.register(fastifyCors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      // Allow request
      cb(null, true);
      return;
    }
    // Reject others
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true // if you need cookies/auth headers
});

// Root route
fastify.get("/", async (request, reply) => {
  return { message: "🚀 HealthIntel backend is live and running smoothly!" };
});

// Example API route
fastify.get("/api/status", async (request, reply) => {
  return {
    service: "HealthIntel",
    status: "operational",
    timestamp: new Date().toISOString(),
  };
});

// Server start
const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => {
    console.log(`✅ HealthIntel Fastify backend running on port ${PORT}`);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
