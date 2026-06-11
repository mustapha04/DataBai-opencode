---
name: scalability-engineering
description: Scalability engineering patterns for growing systems
license: MIT
compatibility: opencode
---

## scalability-engineering

### Vertical vs Horizontal Scaling
| Strategy | Description | When to Use |
|----------|-------------|-------------|
| **Vertical** | Increase single node resources (CPU, RAM, disk) | Quick wins, legacy apps, stateful services |
| **Horizontal** | Add more nodes behind a load balancer | Stateless services, microservices, cloud-native |

### Load Balancing
- **Algorithms**: Round-robin, least connections, IP hash, consistent hashing
- **Health checks**: TCP/HTTP probes with configurable intervals
- **Session affinity** (sticky sessions) only when necessary; prefer stateless design
- **Global load balancing**: DNS-based (Route53, Cloudflare) for multi-region

### Caching Tiers
| Tier | Technology | Use Case |
|------|------------|----------|
| Browser | `Cache-Control`, `ETag` headers | Static assets |
| CDN | CloudFront, Cloudflare, Fastly | Images, videos, static content |
| In-memory | Redis, Memcached | Session data, API responses, rate limits |
| Application | Local LRU cache, Caffeine | Hot data, reference data |
| Database | Query cache, materialized views | Expensive queries |

### Database Scaling
- **Read replicas**: Offload SELECT queries; async replication lag must be tolerable
- **Sharding**: Partition data across databases by key (user_id, region, tenant)
- **Connection pooling**: PgBouncer, RDS Proxy to manage connections
- **Denormalization**: Pre-join hot paths to avoid joins at read time
- **CQRS**: Separate read/write models for high-throughput systems

### CDN
- Cache static assets at edge (immutable content, long TTL)
- API caching at edge for GET endpoints (short TTL, purge on write)
- Geo-distribution reduces latency for global users
- Shield/POP layers reduce origin load

### Async Processing
- Decouple synchronous work with message queues (SQS, RabbitMQ, Kafka)
- Background jobs for: email, report generation, webhook delivery, image processing
- Use job queues with retry, dead-letter, and scheduling capabilities
- Prefer event-driven architecture over polling where possible

### Stateless Design
- Store session data in external cache (Redis), not application memory
- No local disk writes (use S3/blob storage)
- Any instance can handle any request → true horizontal scaling
- Use sticky sessions only as last resort

### Auto-Scaling
- Define CPU/memory/request-based scaling policies
- Set min/max instance counts to control cost
- Use predictive scaling for known traffic patterns (e.g., business hours)
- Implement graceful shutdown (drain connections before termination)
- Load test to determine scaling thresholds (k6, Locust, Artillery)
