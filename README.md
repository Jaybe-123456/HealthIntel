# Aural Forge – Audio AI Studio SaaS

A monorepo that scaffolds a production-grade audio AI platform inspired by ElevenLabs. It combines an ultra-realistic TTS/STT engine, voice cloning workflows, dubbing studio, conversational AI, and music generation with Stripe-backed billing, RBAC, and enterprise compliance controls.

## Repository Layout

- `frontend/` – Next.js 14 + Tailwind marketing site, dashboard, studio, onboarding, pricing, admin console, and API docs UI
- `backend/` – Fastify + TypeScript API for auth, RBAC, jobs, billing, webhooks, and media orchestration
- `packages/js-sdk/` – Official JavaScript SDK for programmatic access
- `packages/python-sdk/` – Python SDK scaffold (installable via `pip install -e`)
- `infrastructure/terraform/` – Terraform modules for AWS VPC, EKS, RDS, and environment wiring
- `docs/` – Architecture overview
- `config/openapi.yaml` – Starter OpenAPI spec for REST endpoints
- `scripts/install-deps.sh` – Bootstraps npm/pip dependencies
- `docker-compose.yml` – Local dev services (Postgres, Redis, MinIO)

## Getting Started

```
# install dependencies (Node workspaces + optional Python SDK)
./scripts/install-deps.sh

# start backing services
docker compose up -d

# run backend API (port 4000)
npm run dev --workspace backend

# run frontend (port 3000)
npm run dev --workspace frontend
```

Or use the bundled `Makefile` targets:

```
make install
make docker-up
make dev    # concurrent frontend/backend
```

### Environment Variables

- Copy `frontend/.env.example` → `frontend/.env.local`
- Copy `backend/.env.example` → `backend/.env`

Adjust API URLs, Stripe keys, and storage buckets as needed.

## Core Capabilities

- **Text-to-Speech (TTS)** – Multi-lingual voices, SSML controls, async job queue backed by Redis streams
- **Speech-to-Text (STT)** – High accuracy transcription with diarization toggle
- **Voice Cloning** – Starter & professional clone workflows with consent tracking
- **Dubbing Studio** – Video localization pipeline, subtitle import/export, lip-sync-ready jobs
- **Conversational AI** – Session orchestration, vector-friendly storage, and webhook automation
- **Music & SFX** – Prompt-based music generation queue
- **Usage & Billing** – Stripe subscriptions, metered usage records, invoice retrieval, credit tracking
- **Admin & Compliance** – Seat management, audit logs, HIPAA/BAA toggles, webhook verifications
- **SDKs** – Typed JS/TS client plus lightweight Python HTTP wrapper

## Infrastructure

Terraform modules provision:

- VPC with public/private subnets and security groups
- EKS cluster with system + GPU node groups (autoscaling inference workers)
- PostgreSQL RDS with encrypted storage
- Pluggable backend for S3, CloudFront, Route53, Prometheus/Grafana, and Datadog/ELK integrations (extend modules as needed)

## CI/CD & Operations

- GitHub Actions (add under `.github/workflows/`) to run lint/test/build, publish Docker images, and apply Terraform
- Observability hooks for Prometheus metrics, structured logging (Pino), and webhooks for job lifecycle events
- Security best-practices baked in: rate limiting, JWT auth, RBAC seat roles, signed webhooks, encrypted storage, HIPAA mode toggle

## Next Steps

1. Implement persistence layers (Postgres schemas, Prisma/Drizzle/Knex, etc.)
2. Integrate real inference endpoints via SageMaker or TorchServe
3. Flesh out conversational AI memory with vector DB support
4. Expand OpenAPI spec and auto-generate SDK clients
5. Harden webhook signature validation and Stripe event handling

This scaffold accelerates building a full-stack Audio AI studio for creators, agencies, and enterprises—customize features, extend services, and deploy on AWS.

