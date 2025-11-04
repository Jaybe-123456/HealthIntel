import fastifyPlugin from "fastify-plugin";
import jwt from "jsonwebtoken";
import { config } from "@config/index";

type SessionUser = {
  id: string;
  workspaceId: string;
  role: "owner" | "admin" | "editor" | "viewer";
};

declare module "fastify" {
  interface FastifyRequest {
    currentUser?: SessionUser;
  }
}

export const registerAuthPlugin = fastifyPlugin(async (app) => {
  app.decorateRequest("currentUser", null);

  app.addHook("preHandler", async (request) => {
    const publicRoutes = ["/health", "/docs", "/docs/json", "/auth/login", "/auth/register"];
    if (publicRoutes.some((route) => request.routerPath?.startsWith(route))) {
      return;
    }

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      request.log.debug("missing auth header");
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET) as SessionUser;
      request.currentUser = decoded;
    } catch (error) {
      request.log.warn({ err: error }, "invalid token");
    }
  });
});
