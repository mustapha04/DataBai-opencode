---
name: saas-architecture
description: SaaS architecture patterns for multi-tenant systems, billing, and shared infrastructure
license: MIT
compatibility: opencode
---

## saas-architecture

### Multi-Tenancy Models
| Model | Isolation | Cost | Complexity | Best For |
|-------|-----------|------|------------|----------|
| **Isolated (Silo)** | Dedicated infra per tenant | High | Low | Enterprise, regulated |
| **Bridge (Hybrid)** | Isolated DB, shared app | Medium | Medium | Mid-market |
| **Pool** | Shared DB + app | Low | High | SMB, high-volume |

### Tenant Isolation
- **Row-level**: Add `tenant_id` to every table; enforce in queries
- **Schema-level**: One schema per tenant in shared DB
- **Database-level**: Separate DB per tenant (connection pooling required)
- **Key guardrails**: Never trust client-side tenant ID; derive from auth token
- **Middleware**: Inject tenant context from JWT/session into all DB queries

### Billing Integration
- Metered usage → usage records sent to Stripe/Metered billing API
- Subscription lifecycle: create → trial → active → past_due → canceled
- Webhook handlers must be idempotent (check `idempotency_key` dedup)
- Test billing flows in Stripe test mode before production

### Feature Flags
- Per-tenant flag overrides (plan-based + custom)
- Use a feature flag service (LaunchDarkly, Unleash, custom)
- Flags control UI, API access, and background jobs
- Remove flags after full rollout; avoid flag debt

### Rate Limiting
- Apply per-tenant, per-endpoint, per-user tiers
- Return `429 Too Many Requests` with `Retry-After` header
- Use token bucket or sliding window algorithm
- Store counters in Redis for low-latency checks

### Shared Infrastructure
- Centralized auth service (OAuth2/OIDC)
- Shared message queue for async jobs
- Read replicas for reporting/analytics queries
- Multi-tenant caching with tenant-prefixed keys

### Onboarding Flows
- Tenant creation → admin user → initial configuration
- Guided setup wizards with progress tracking
- Seed data (templates, defaults) per tenant
- Activation checklist before first bill

### Data Partitioning
- Partition large tables by `tenant_id` or `created_at`
- Use DB partitioning (PostgreSQL declarative partitioning)
- Archive cold tenant data to cheaper storage (S3 Glacier)
- Consider Citus (PostgreSQL sharding) for massive scale
