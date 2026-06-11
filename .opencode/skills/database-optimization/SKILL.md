---
name: database-optimization
description: Database optimization techniques including query tuning, connection pooling, read replicas, partitioning, sharding, materialized views, and configuration tuning
license: MIT
compatibility: opencode
---

## database-optimization

### Query Tuning
- `EXPLAIN (ANALYZE, BUFFERS)` — identify full scans, nested loops, sort/hash operations
- Rewrite subqueries as JOINs or CTEs where selectivity improves
- Use `EXISTS` instead of `IN` for correlated subqueries
- Avoid `SELECT *` — fetch only needed columns
- Index-only scans via covering indexes

### Connection Pooling
- PgBouncer, Pgpool-II, HAProxy, or built-in app pools
- Transaction-level pooling for highest throughput
- Right-size pool: `(core_count * 2 + disk_count)` as starting point
- Monitor `idle_in_transaction` and `active` connections

### Read Replicas
- Offload reporting, analytics, read-heavy workloads
- Replication lag awareness — use `synchronous_commit` where consistency matters
- Connection routing: proxy or app-level read/write split

### Partitioning & Sharding
| Strategy | Mechanism | Use Case |
|----------|-----------|----------|
| Range Partitioning | By date, ID range | Time-series data |
| List Partitioning | By discrete value (region, status) | Multi-tenant |
| Hash Partitioning | By hash of key | Even distribution |
| Sharding | Across databases | Horizontal scale-out |

### Materialized Views
- Pre-computed snapshots for expensive aggregations
- Refresh strategies: `REFRESH MATERIALIZED VIEW CONCURRENTLY`
- Use for dashboards, reporting, summary tables

### Configuration Tuning
- `shared_buffers` — 25% of RAM
- `work_mem` — per-operation sort memory
- `maintenance_work_mem` — for VACUUM, CREATE INDEX
- `effective_cache_size` — OS-level file cache estimate
- `random_page_cost` — adjust for SSD vs HDD
- Regular `VACUUM` / `ANALYZE` cadence
