---
name: database-performance
description: Database performance monitoring and troubleshooting including slow query analysis, lock contention, deadlocks, connection saturation, I/O bottlenecks, and memory usage
license: MIT
compatibility: opencode
---

## database-performance

### Slow Query Analysis
- Enable slow query log or use `pg_stat_statements` / `sys.query_store`
- Identify top queries by: total time, frequency, I/O
- `EXPLAIN (ANALYZE, BUFFERS)` — check rows vs actual estimates
- Missing index? Wrong join order? Stale statistics?

### Lock Contention & Deadlocks
- Query `pg_locks` or `sys.dm_exec_requests` for blocked sessions
- `blocking_pids` in PostgreSQL, `blocked_by` in MySQL
- Deadlock causes: inconsistent lock order, missing indexes, long transactions
- Mitigation: keep transactions short, use `NOWAIT` / `SKIP LOCKED`, retry logic

### Connection Saturation
- Symptoms: connection timeouts, `too many clients` errors
- Monitor `max_connections` vs active connections
- Add connection pooling (PgBouncer, ProxySQL)
- Detect connection leaks with `pg_stat_activity` / `sys.dm_exec_sessions`

### I/O Bottlenecks
- Track: `pg_stat_bgwriter` checkpoints, disk `await` / `%util`
- Tablespace placement: separate data, WAL, temp on different volumes
- WAL saturation → increase `wal_buffers`, tune checkpoint intervals
- Autovacuum I/O → throttle with `autovacuum_vacuum_cost_limit`

### Memory Usage
- `shared_buffers` hit ratio < 99% → consider increasing
- `work_mem` spills to disk → increase per-operation memory
- OS page cache effectiveness → monitor `effective_cache_size`
- OOM killer risk → configure `vm.overcommit_memory` and database memory limits
