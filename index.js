import Fastify from "fastify";  
import fastifyCors from "@fastify/cors";  
  
const fastify = Fastify({  
  logger: true,  
});  
  
// Register CORS with dynamic regex for Vercel deploys
await fastify.register(fastifyCors, {  
  origin: (origin, cb) => {  
    // Allow requests with no origin (server-to-server) or any audio-artist-app-* Vercel URL
    if (!origin || /^https:\/\/audio-artist-app-.*\.vercel\.app$/.test(origin)) {  
      cb(null, true);  
      return;  
    }  
    cb(new Error("Not allowed by CORS"));  
  },  
  credentials: true, // needed if frontend sends cookies/auth headers
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
