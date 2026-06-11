---
name: database-indexing
description: Database indexing strategies including B-tree, hash, GIN, GiST, bitmap, composite, partial, covering indexes, and EXPLAIN plan analysis
license: MIT
compatibility: opencode
---

## database-indexing

### Index Types
| Index Type | Use Case | Example |
|-----------|----------|---------|
| B-tree | General-purpose, equality + range queries | `CREATE INDEX ON users (email)` |
| Hash | Equality lookups only | `CREATE INDEX USING hash ON t (id)` |
| GIN | Array, JSONB, full-text search | `CREATE INDEX ON docs USING gin (tokens)` |
| GiST | Geometric, full-text, ranges | `CREATE INDEX ON places USING gist (location)` |
| BRIN | Large tables with natural ordering | `CREATE INDEX ON logs USING brin (created_at)` |
| Bitmap | Low-cardinality columns (Oracle) | Data warehouse star joins |

### Composite & Partial Indexes
- **Composite** — column order matters: put high-selectivity columns first
- **Partial** — index only a subset of rows: `WHERE status = 'active'`
- **Covering** — include additional columns to avoid heap lookups: `INCLUDE (col1, col2)`
- **Expression** — index on function result: `ON (LOWER(email))`

### EXPLAIN Plan Analysis
- Scan types: Seq Scan (bad on large tables), Index Scan, Index Only Scan, Bitmap Scan
- Look for: sequential scans on large tables, sort operations, nested loops vs hash joins
- `EXPLAIN (ANALYZE, BUFFERS)` for real execution stats
- Rows vs actual rows mismatch indicates stale statistics → run `ANALYZE`

### Index Maintenance
- Monitor bloat (`pg_stat_user_indexes`), rebuild with `REINDEX`
- Remove unused indexes (track with `pg_stat_user_indexes.idx_scan`)
- Balance: indexes speed reads but slow writes
- B-tree fillfactor tuning for high-update tables
