---
name: postgresql-optimization
description: PostgreSQL deep optimization covering EXPLAIN ANALYZE, index strategies, vacuum tuning, autovacuum, work_mem, effective_cache_size, parallel queries, partitioning, and connection pooling
license: MIT
compatibility: opencode
---

## postgresql-optimization

### EXPLAIN ANALYZE
- Read plan bottom-up, right-to-left (join order)
- Look for: sequential scans on large tables, high row estimates vs actual, nested loops with many inner iterations
- `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)` for detailed analysis

### Index Strategies

| Index Type | Use Case |
|---|---|
| B-tree | Equality + range queries, default |
| Hash | Equality-only (rarely best) |
| GiST | Full-text, geometry, range types |
| GIN | Arrays, JSONB, full-text search |
| BRIN | Large tables with natural ordering |
| Partial | `WHERE` clause subset of rows |
| Covering | `INCLUDE` non-key columns |

- Multi-column: most selective column first
- Avoid over-indexing — write amplification cost

### Vacuum & Autovacuum
- `autovacuum_vacuum_scale_factor` — reduce for large tables
- `autovacuum_analyze_scale_factor` — tune for query planner freshness
- Monitor `pg_stat_user_tables.n_dead_tup`
- `VACUUM FREEZE` to prevent transaction ID wraparound

### Memory Parameters
| Parameter | Recommendation |
|---|---|
| `shared_buffers` | 25% of RAM |
| `effective_cache_size` | 75% of RAM |
| `work_mem` | Start at 4-16MB, per operation |
| `maintenance_work_mem` | 64-256MB for VACUUM/INDEX |
| `wal_buffers` | 16-64MB |

### Parallel Queries
- `max_parallel_workers_per_gather` — up to 2-4 per query
- `parallel_tuple_cost` / `parallel_setup_cost` — lower for faster parallel scans
- Enables parallel seq scan, join, and aggregation

### Partitioning
- Range, List, Hash partitioning
- Partition pruning for query performance
- Attach/detach partitions without downtime
- Index each partition separately

### Connection Pooling
- **PgBouncer** — Transaction pooling (recommended), session pooling, statement pooling
- **PgCat** — Rust-based, supports sharding
- Pool size formula: `(cores * 2) + effective_spindle_count`
- Avoid connection storms — queue in pool

### Query Optimization
- `ANALYZE` regularly for fresh statistics
- `pg_stat_statements` for identifying expensive queries
- Rewrite subqueries as joins or CTEs when beneficial
- Use `LATERAL` joins for limit-per-group patterns
