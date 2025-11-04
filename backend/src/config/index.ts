import "dotenv/config";

const toNumber = (value: string | undefined, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const config = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: toNumber(process.env.PORT, 4000),
  LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
  LOG_PRETTY: process.env.LOG_PRETTY === "true" || process.env.NODE_ENV !== "production",
  CORS_ORIGINS: (process.env.CORS_ORIGINS ?? "http://localhost:3000").split(","),
  JWT_SECRET: process.env.JWT_SECRET ?? "dev-secret-change-me",
  SESSION_TTL: toNumber(process.env.SESSION_TTL, 60 * 60 * 24),
  POSTGRES_URL:
    process.env.POSTGRES_URL ?? "postgresql://auralforge:auralforge@localhost:5432/auralforge",
  REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6379",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder",
  RATE_LIMIT_MAX: toNumber(process.env.RATE_LIMIT_MAX, 100),
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW ?? "1 minute",
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET ?? "whsec_dev",
  STORAGE_BUCKET: process.env.STORAGE_BUCKET ?? "auralforge-dev",
  ENABLE_HIPAA_MODE: process.env.ENABLE_HIPAA_MODE === "true"
} as const;

export type AppConfig = typeof config;
