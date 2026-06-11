---
name: backend-performance
description: Backend performance optimization covering response time, throughput, connection pooling, profiling, async processing, caching, and database query optimization
license: MIT
compatibility: opencode
---

## backend-performance

### Key Metrics

| Metric | Definition | Target |
|--------|------------|--------|
| P50 / P95 / P99 latency | Percentile response time | P99 < 500ms |
| Throughput (RPS) | Requests per second | Scales linearly with resources |
| Error rate | % of non-2xx responses | < 0.1% |
| CPU / Memory | Utilization per instance | CPU < 70%, Memory < 80% |
| GC pause time | Garbage collection duration (JVM/Node) | < 50ms |

### Profiling & Measurement

- **APM tools**: Datadog, New Relic, OpenTelemetry for distributed tracing
- **CPU profiling**: Flame graphs (pprof, perf) to find hot functions
- **Heap profiling**: Memory allocation hotspots, object retention leaks
- **Database profiling**: Slow query log, `EXPLAIN ANALYZE`, pg_stat_statements
- **Load testing**: k6, artillery, locust – ramp-up tests to find breaking point

### Database Query Optimization

- **Indexing**: Covering indexes, composite indexes (column order matters), partial indexes for filtered queries
- **N+1 prevention**: Batch loading (DataLoader in GraphQL), eager loading in ORMs
- **Query pagination**: Keyset pagination (`WHERE id > ? LIMIT 100`) over offset pagination for large datasets
- **Materialized views**: Pre-compute expensive aggregations
- **Read replicas**: Offload read queries, keep writes on primary

### Caching Layers

| Layer | Technology | TTL | Invalidation |
|-------|------------|-----|--------------|
| Application | Redis / Memcached | seconds–minutes | Cache-aside, write-through |
| CDN | CloudFront / Fastly | minutes–hours | Purge by path or tag |
| Browser | Cache-Control headers | hours–days | ETag, Last-Modified |
| Database | Query cache (limited) | short | Built-in or advisory |

### Async Processing

- **Message queues**: SQS, RabbitMQ, Redis streams for decoupling slow operations
- **Background jobs**: Sidekiq, Bull, Celery for CPU-heavy or I/O-bound tasks
- **Event-driven**: Publish events, process asynchronously, reduce synchronous latency
- **Debouncing**: Coalesce rapid events (e.g., save-after-typing) into single batch

### Connection Pooling

- **Database**: PgBouncer (PostgreSQL), ProxySQL (MySQL) – keep persistent connections
- **HTTP clients**: Keep-alive, connection pool per host, max concurrent per route
- **Redis**: Minimal pool (1–10 connections) – Redis is single-threaded
- **gRPC**: Long-lived multiplexed streams over HTTP/2
