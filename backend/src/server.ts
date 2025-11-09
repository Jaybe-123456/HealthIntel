import { buildApp } from "./app";
import { config } from "@config/index";

async function start() {
  const app = await buildApp();
  try {
    await app.listen({ port: config.PORT, host: "0.0.0.0" });
    app.log.info(`🚀 API listening on port ${config.PORT}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

void start();
