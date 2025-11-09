## Audio AI Studio SaaS Architecture

### High-Level Overview
- **Clients**: Web app (Next.js), public marketing site, embedded webchat, and SDK consumers (JS, Python).
- **APIs**: RESTful services (Fastify) exposing authentication, project, media generation, dubbing, conversational AI, billing, and admin endpoints with OpenAPI spec and rate limiting.
- **Workers**: Background job processors for TTS/STT inference, dubbing, transcription, music generation, and batch exports running on AWS ECS/EKS with autoscaling GPU pools.
- **Data Stores**: PostgreSQL (RDS) as the system of record, Redis (Elasticache) for caching/queues, S3 for media assets, OpenSearch/ELK for logs, Prometheus/Grafana for metrics.
- **Infra**: Terraform-managed AWS environment (VPC, subnets, EKS, RDS, S3, CloudFront, Route53, ALB, IAM, KMS, WAF).
- **Observability & Security**: Datadog or ELK, centralized logging, metrics via Prometheus, tracing with OpenTelemetry; encryption at rest/in transit, audit logs, content moderation, rate limiting.

### Service Boundary
- **Gateway Service**: Terminates TLS, handles OAuth2/OIDC flows, forwards traffic to backend API, enforces rate limits and WAF rules.
- **Core API Service**: Fastify app providing REST endpoints for auth, RBAC, projects, studio assets, job orchestration, usage accounting, billing, and admin tooling.
- **Inference Orchestrator**: SQS/SNS triggered job dispatcher that routes media generation requests to GPU-backed inference pods (SageMaker endpoints or TorchServe deployments).
- **Media Processor**: Worker service using FFmpeg for audio/video muxing, mixing, normalization, and exports (mp3/wav/pcm, mp4 with embedded audio, SRT/VTT generation).
- **Dubbing Pipeline**: Coordinates transcription, translation, lip-sync alignment, and voice dubbing. Integrates with subtitle import/export and leverages voice cloning assets per segment.
- **Conversational AI Service**: Persistent session store (Redis/Postgres) with voice/chat interface, integrates with vector store for long-term memory, streams responses via WebRTC/WebSockets.
- **Billing Service**: Integrates with Stripe for subscription, usage metering, invoices, coupons, trials, and enterprise PO-based invoicing; synchronizes with credits ledger.
- **Admin Console**: Backend endpoints for seat management, audit logs, compliance toggles, SCIM provisioning, and quota controls; surfaced in web UI for authorized roles.

### Authentication & Authorization
- OAuth2 (Google, GitHub, Apple) plus email/password and magic links managed via Auth0/Cognito or custom identity service with TOTP/WebAuthn MFA.
- Role-based access control (Owner, Admin, Editor, Viewer) enforced at API level; seat management tracked per workspace. SCIM/SAML for enterprise SSO.
- API keys scoped per project, JWT access tokens for web, signed URLs for S3 uploads/downloads.
- Audit logging for critical actions (voice clone creation, data export, billing changes); HIPAA-ready logging pipeline for enterprise tenants.

### Data Model Highlights
- **Workspaces & Seats**: Multi-tenant isolation by workspace; seats hold role assignments and usage quotas. Paginated usage logs per seat and workspace.
- **Projects**: Hold studio timelines, tracks, assets, and version history; link to jobs (TTS/STT/Dubbing/Music) and exports.
- **Voices**: System voices catalog, user cloned voices (starter/pro); metadata for language, timbre, SSML capabilities, compliance flags.
- **Jobs**: Async processing entities with state machine (queued -> running -> completed/failed), webhooks on completion, credit consumption tracking.
- **Billing**: Subscription records, invoices, payment methods, usage meters, coupons, overage charges, credit ledger.

### Background Job Flow
1. API receives request (e.g., TTS) and validates quotas, deducts provisional credits.
2. Job enqueued in Redis-backed queue; inference orchestrator assigns GPU worker.
3. Worker performs inference (SageMaker endpoint or container) and stores output to S3.
4. Media processor performs post-processing (normalization, mixing) and updates job state.
5. Webhooks/notifications emitted; credits reconciled, usage logs written.

### Compliance & Security
- Data encryption at rest (KMS) and in transit (TLS 1.2+), signed URLs for media.
- Content moderation pipeline with automated filters and human review for flagged content.
- Tenant-aware data retention policies; tools for data export/deletion upon request.
- HIPAA BAA mode toggles stricter retention, audit, and access controls.
- Rate limiting per API key/user, request throttling, and circuit breakers for inference dependencies.

### DevOps & CI/CD
- GitHub Actions pipeline: lint, test, build, Docker image publish, Terraform plan/apply gated by review.
- Terraform modules for shared infrastructure; per-environment workspaces (dev/stage/prod).
- Automated dependency scanning (Dependabot), SAST/DAST integrations, container image scanning.
- Blue/green or canary deploys via Argo Rollouts on EKS; automated rollback on health check failure.

### Local Development
- Docker Compose for Postgres, Redis, and MinIO (S3-compatible) services.
- `scripts/install-deps.sh` bootstraps frontend/backend dependencies.
- `.env.example` files for both frontend and backend; `make dev` to run combined stack.

