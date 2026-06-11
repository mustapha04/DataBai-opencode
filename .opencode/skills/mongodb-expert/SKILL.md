---
name: mongodb-expert
description: MongoDB expertise (document design, indexes, aggregation pipeline, replica sets, sharding, transactions, schema validation, performance tuning, security, backup/restore, Atlas features)
license: MIT
compatibility: opencode
---

## mongodb-expert

### Document Design

- Embed related data that is accessed together (embedding vs. referencing)
- Prefer embedding for one-to-few relationships
- Reference for one-to-many / many-to-many with large or independent sub-documents
- Design schema for query patterns, not for storage normalization
- Use arrays judiciously; unbounded arrays cause performance issues

### Indexes

| Index Type | Use Case |
|------------|----------|
| Single field | Simple equality/sort queries |
| Compound | Multi-field queries, sort + filter |
| Multikey | Array field queries |
| Text | Full-text search on string content |
| Geospatial | Location-based queries |
| TTL | Auto-expire documents |
| Sparse | Only index documents with the field |
| Partial | Index subset of documents |

- Ensure all queries are covered by indexes (use `explain("executionStats")`)
- Monitor `totalKeysExamined` vs. `totalDocsExamined`
- Keep Working Set < RAM for in-memory performance

### Aggregation Pipeline

```
$match → $sort → $group → $project → $lookup → $unwind → $bucket
```

- Push `$match` and `$sort` as early as possible
- Use `$lookup` sparingly (can be expensive)
- `$facet` for multi-faceted aggregations
- `$merge` for materialized views and ETL pipelines

### Replica Sets

- Minimum 3 members: Primary + 2 Secondaries (or Secondary + Arbiter)
- Automatic failover: Primary unavailable → election → new Primary
- Read preferences: primary, primaryPreferred, secondary, secondaryPreferred, nearest
- Write concern: `{ w: "majority" }` for durability
- Oplog size: configure for adequate window (typically 10% of disk)

### Sharding

- Shard key: cardinality, frequency, monotonic change → choose for even distribution
- Hashed sharding for monotonically changing keys
- Zone sharding for geographic data distribution
- `jumbo` chunks indicate poor shard key selection
- Balancer: auto-migrates chunks; schedule during low traffic

### Transactions

- Multi-document ACID transactions (replica sets 4.0+, sharded clusters 4.2+)
- Keep transaction duration short (seconds, not minutes)
- Use retry logic for transient transaction errors
- Prefer atomic updates over transactions when possible

### Schema Validation

- `$jsonSchema` validator at collection level
- Validate on insert and update with `validationAction: "error"`
- Use `validationLevel: "strict"` (default) or `"moderate"`

### Security

- Authentication: SCRAM, x.509, LDAP, AWS IAM
- Authorization: role-based access control (built-in + custom roles)
- Encryption: TLS in transit, encryption at rest, Client-Side Field Level Encryption (CSFLE)
- Audit log for sensitive operations

### Backup & Restore

- `mongodump`/`mongorestore`: logical backup (slower, cross-version)
- File system snapshots: fast, physical backup (with journaling)
- Atlas: continuous backups with point-in-time recovery (PITR)
- Oplog-based incremental backups for minimal data loss

### Atlas Features

- Auto-scaling: compute, storage, and serverless instances
- Atlas Search: Lucene-based full-text search
- Atlas Data Lake: query across S3, Atlas, and HTTP
- Online Archive: auto-archive cold data to S3
- Atlas Charts: dashboard and visualization
