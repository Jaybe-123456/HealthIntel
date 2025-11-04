import type { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "@config/index";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  workspaceName: z.string().min(2)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export default async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (request, reply) => {
    const payload = registerSchema.parse(request.body);
    const hashed = await bcrypt.hash(payload.password, 10);

    // TODO: persist to Postgres
    request.log.info({ email: payload.email }, "Registering user");

    return reply.status(201).send({
      userId: "usr_mock",
      workspaceId: "ws_mock",
      hashedPassword: hashed
    });
  });

  app.post("/login", async (request, reply) => {
    const payload = loginSchema.parse(request.body);
    // TODO: validate user credentials from Postgres
    const token = jwt.sign(
      {
        id: "usr_mock",
        workspaceId: "ws_mock",
        role: "admin"
      },
      config.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return reply.send({ token });
  });
}
