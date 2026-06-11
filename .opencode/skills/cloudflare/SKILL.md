---
name: cloudflare
description: Cloudflare services including CDN, DNS, Workers, R2, D1, KV, Durable Objects, Pages, and Turnstile with setup, configuration, serverless deployment, caching rules, and security
license: MIT
compatibility: opencode
---

## cloudflare

### Core Services

| Service | Purpose |
|---------|---------|
| CDN / Proxy | Global reverse proxy caching static/dynamic content |
| DNS | Authoritative DNS with proxied (orange-cloud) or unproxied records |
| Workers | Serverless JavaScript/Wasm functions at edge (100+ locations) |
| R2 | S3-compatible object storage – no egress fees |
| D1 | Serverless SQLite database (relational) |
| KV | Global key-value store for config, sessions, feature flags |
| Durable Objects | Stateful, single-writer entities for coordination (WebSocket, real-time) |
| Pages | Static site hosting + Functions (backend logic) |
| Turnstile | Privacy-first CAPTCHA alternative |
| Queues | Message queue service for async processing |
| AI | Run ML models via Workers (text, image, translation) |

### Workers

- **Runtime**: Service Workers API (FetchEvent, Cache API, Encoding API)
- **Wrangler**: CLI tool for dev, deploy, secrets management
- **Limits**: 128 MB memory, 50ms CPU (paid: 30s), 1 MB per request
- **KV + Workers Bindings**: Access KV without extra HTTP calls
- **Scheduled Workers (Crons)**: Trigger on schedule (up to per-minute)
- **D1 binding**: Query SQLite from Workers for persistent data

### Caching Rules

| Rule Type | Configuration |
|-----------|---------------|
| Edge Cache TTL | `Cache-Control: max-age=3600` or Page Rule override |
| Cache Everything | Page Rule: Cache Level = Cache Everything (static content) |
| Bypass Cache | `cf-cache-status: BYPASS` for dynamic paths |
| Purge | Single URL (instant), by tag, host, or entire zone |
| Tiered Cache | Origin -> Tier 1 POP -> Tier 2 POP -> Edge (reduces origin load) |

### Security

- **WAF**: Managed rules (OWASP, Cloudflare), custom rules (IP, rate, country blocks)
- **DDoS protection**: Always-on L3/L4 mitigation; L7 for proxied traffic
- **Bot Management**: ML-based bot detection, challenge/block actions
- **SSL/TLS**: Full, Full (strict), Flexible modes; Always Use HTTPS
- **Authenticated Origin Pulls**: Ensure request came from Cloudflare
- **Custom rules**: Rate limiting, IP access rules, Firewall Rules (new WAF)

### Deployment

```bash
# Pages
npx wrangler pages deploy ./dist --project-name=my-site

# Workers
npx wrangler deploy --name my-worker --route api.example.com/*

# D1
npx wrangler d1 create my-database
npx wrangler d1 execute my-database --file=./schema.sql
```

### Key Patterns

- **Static site + API**: Pages for frontend, Workers for API routes on same domain
- **R2 public bucket**: Serve assets directly or via Workers for signed URLs
- **Durable Object for real-time**: One DO per room/entity for multiplayer, live cursors
- **Turnstile**: Simple widget drop-in, no backend verification needed (verified by CF)
- **KV for config**: Feature flags, redirects, A/B test assignments (sub-second reads)
