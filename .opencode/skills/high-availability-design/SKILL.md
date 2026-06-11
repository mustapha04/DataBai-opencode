---
name: high-availability-design
description: High availability system design (redundancy, failover, health checks, load balancing, circuit breakers, rate limiting, graceful degradation, SLA/SLO definition, disaster recovery)
license: MIT
compatibility: opencode
---

## high-availability-design

### SLA / SLO / SLI

| Term | Definition |
|------|------------|
| SLI | Actual measured metric (e.g., request latency p99) |
| SLO | Target value for SLI (e.g., p99 latency < 200ms) |
| SLA | Contractual commitment to SLO (e.g., 99.9% uptime) |

### Availability Targets

| Uptime | Downtime/year | Downtime/month |
|--------|---------------|----------------|
| 99.9% (3 nines) | 8.76h | 43.8m |
| 99.99% (4 nines) | 52.56m | 4.38m |
| 99.999% (5 nines) | 5.26m | 25.9s |

### Redundancy Strategies

- **Compute**: multi-AZ deployment, auto-scaling groups, spot/fleet diversity
- **Data**: multi-AZ replication, read replicas, cross-region backups
- **DNS**: multiple A/AAAA records, geo-routing, health-based failover

### Health Checks

- **Liveness**: is the process alive? (simple ping)
- **Readiness**: is the process ready to serve traffic?
- **Startup**: slow-start check for initialization-heavy services
- Implement at every tier: load balancer → service → dependencies

### Load Balancing

- **Layer 4** (TCP): fast, session-aware, suitable for most services
- **Layer 7** (HTTP): content-based routing, SSL termination, sticky sessions
- **Global**: DNS-based (Route53, Cloudflare) or Anycast (GLB)

### Circuit Breaker

- Closed → Open (on failure threshold) → Half-Open (on timeout) → Closed/Open
- Fail fast rather than waiting on unresponsive dependencies
- Implement bulkheading (separate thread pools/connection pools per dependency)

### Rate Limiting

- Algorithms: token bucket, leaky bucket, sliding window, fixed window
- Apply at edge (reverse proxy), service, and user level
- Return `429 Too Many Requests` with `Retry-After` header

### Graceful Degradation

- Degrade non-critical features under load
- Return stale cached data when live data is unavailable
- Feature flags to disable expensive features dynamically

### Disaster Recovery

| Strategy | RPO | RTO | Cost |
|----------|-----|-----|------|
| Backup & restore | Hours | Hours | Low |
| Pilot light | Minutes | Tens of minutes | Medium |
| Warm standby | Seconds | Minutes | High |
| Multi-site active | Seconds | Seconds | Very high |

### Runbooks

- Document exact steps for every known failure scenario
- Test failover procedures regularly (game days, chaos engineering)
- Automate recovery where possible (auto-remediation)
