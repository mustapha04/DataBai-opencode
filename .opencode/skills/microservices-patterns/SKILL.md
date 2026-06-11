---
name: microservices-patterns
description: Microservices patterns (service decomposition, API gateway, service mesh, circuit breaker, saga, CQRS, event sourcing, strangler fig, sidecar, ambassador)
license: MIT
compatibility: opencode
---

## microservices-patterns

### Service Decomposition

- **By subdomain** (Domain-Driven Design): bounded context per service
- **By business capability**: each service owns a business function
- **By volatile/change frequency**: separate stable and fast-changing logic
- **By team ownership**: one team, one or more services (Conway's Law)

### Communication Styles

| Style | Mechanism | Use Case |
|-------|-----------|----------|
| Synchronous | HTTP/gRPC | Request-response, real-time queries |
| Asynchronous | Message queues, events | Decoupled processing, eventual consistency |
| Streaming | Kafka, Pulsar | Event sourcing, real-time data pipelines |

### API Gateway

- Single entry point: routing, auth, rate limiting, TLS termination
- Request aggregation: compose responses from multiple services
- Protocol translation: external REST → internal gRPC
- Examples: Kong, Envoy, AWS API Gateway, Zuul

### Service Mesh

- Sidecar proxy (Envoy, Linkerd) per service instance
- Traffic management, observability, security (mTLS)
- Control plane: Istio, Consul, Kuma
- Zero-code changes for retry, timeout, circuit breaking

### Circuit Breaker

- Prevents cascading failures by failing fast
- States: Closed → Open → Half-Open → Closed/Open
- Libraries: Resilience4j, Hystrix, Istio outlier detection

### Saga Pattern

Long-running transaction spanning multiple services:

- **Choreography**: each service publishes events; others react
- **Orchestration**: a coordinator (saga manager) tells services what to do
- **Compensating transactions**: undo actions when a step fails

### CQRS (Command Query Responsibility Segregation)

- Separate read models (queries) from write models (commands)
- Query-optimized materialized views, denormalized for read paths
- Eventual consistency between write and read sides
- Common with Event Sourcing

### Event Sourcing

- Store state changes as an append-only event log
- Current state = fold over all events
- Enables audit trail, time travel, and rebuilding state
- Combine with CQRS for read projections

### Strangler Fig

- Incrementally replace monolithic functionality
- New features built as microservices alongside the monolith
- Route traffic to new services via proxy, then remove old code
- Continue until monolith is fully replaced

### Sidecar & Ambassador

- **Sidecar**: co-located helper (logging, monitoring, proxy) — deployed alongside the main container
- **Ambassador**: out-of-process proxy for service-to-service communication (e.g., Envoy)
- Both are deployment patterns for offloading cross-cutting concerns
