---
name: system-design
description: System design methodology for distributed systems and large-scale applications
license: MIT
compatibility: opencode
---

## system-design

### Requirements Gathering
- **Functional**: Core features, user actions, data flows
- **Non-functional**: Latency, throughput, availability, durability, consistency
- **Constraints**: Budget, team size, timeline, regulatory
- **Scale**: DAU, MAU, read/write ratio, data volume, growth rate

### Capacity Estimation
| Metric | Approach |
|--------|----------|
| Traffic | DAU × requests per user per day / seconds per day |
| Storage | Avg record size × number of records × replication factor |
| Bandwidth | Request size × request rate × (read ratio) |
| Memory | Cache hit ratio × hot data size |
| Connections | Concurrent users × avg connections per user |

### Data Model
- Define entities, relationships (1:1, 1:N, M:N)
- Choose DB type: relational, document, key-value, graph, time-series
- Design schema with access patterns in mind (query-first design)
- Plan for denormalization, indexing, partitioning, sharding
- Consider data lifecycle: TTL, archival, deletion

### API Design
- RESTful or GraphQL based on client needs
- Consistent naming (plural nouns for resources, `/v1/`)
- Pagination, filtering, sorting on list endpoints
- Versioning (URL path or header-based)
- Error responses: structured with codes, messages, and details
- Rate limiting with clear headers

### Component Architecture
- Layered: client → CDN → load balancer → API gateway → services → DB
- Microservices vs monolith vs modular monolith
- Service boundaries: bounded contexts, domain-driven design
- Communication: sync (HTTP/gRPC) vs async (message queue/event bus)
- Stateful vs stateless components

### Trade-off Analysis
| Trade-off | Consideration |
|-----------|---------------|
| Consistency vs Availability | CAP theorem; CP vs AP systems |
| Read vs Write optimization | Denormalization, CQRS |
| Latency vs Throughput | Batching, caching, async processing |
| Strong vs Eventual Consistency | User experience vs correctness |
| Monolith vs Microservices | Complexity vs deploy independence |

### Scalability
- Stateless services for horizontal scaling
- Database read replicas, sharding, connection pooling
- Caching at every layer (CDN, in-memory, application)
- Async processing for non-critical paths
- Auto-scaling policies based on metrics

### Fault Tolerance
- Redundancy: multi-AZ, multi-region deployment
- Health checks and circuit breakers
- Retry with exponential backoff and jitter
- Bulkheads: isolate failure domains
- Graceful degradation: degrade features, not the whole system

### Diagrams
- **System architecture**: boxes and arrows (draw.io, Excalidraw, Mermaid)
- **Data flow**: direction, protocols, data format
- **Sequence diagrams**: request lifecycle end-to-end
- **Component diagram**: services, DBs, caches, queues
- **Deployment diagram**: cloud resources, networking, load balancers

### Interview Prep
- Timebox: 5 min requirements, 5 min estimation, 15 min design, 5 min trade-offs
- Drive the discussion: ask clarifying questions, make assumptions explicit
- Know the fundamentals: CAP, Paxos/Raft, consistent hashing, gossip protocol
- Practice with common problems: URL shortener, chat system, news feed, rate limiter, key-value store
- Explain trade-offs verbally: "I'd choose X over Y because Z"
