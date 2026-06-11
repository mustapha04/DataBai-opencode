---
name: postgresql-table-design
description: PostgreSQL table design covering data types, constraints, normalization, inheritance, partitioning strategies, generated columns, enum vs reference tables, and schema design patterns
license: MIT
compatibility: opencode
---

## postgresql-table-design

### Data Types

| Category | Recommended Types |
|---|---|
| Numeric | `integer`, `bigint`, `numeric(p,s)` for money |
| Text | `text` (no `varchar(n)` unless constraint needed) |
| Binary | `bytea` |
| Temporal | `timestamptz`, `date`, `interval` |
| JSON | `jsonb` (preferred over `json`) |
| Array | Native arrays for ordered lists |
| UUID | `uuid` with `gen_random_uuid()` default |
| Network | `inet`, `cidr` |

### Constraints
- `NOT NULL` — enforce required columns
- `CHECK` — domain validation (`CHECK (price > 0)`)
- `UNIQUE` — business key uniqueness
- `FOREIGN KEY` — referential integrity with `ON DELETE CASCADE/SET NULL`
- `EXCLUDE` — complex constraints (overlapping dateranges)

### Normalization
- 1NF: Atomic columns, no repeating groups
- 2NF: No partial dependencies on composite keys
- 3NF: No transitive dependencies
- Denormalize only after proving need (read performance, reporting)

### Partitioning Strategies
| Strategy | When | Syntax |
|---|---|---|
| Range | Time-series, date ranges | `PARTITION BY RANGE (created_at)` |
| List | Categorical (region, status) | `PARTITION BY LIST (status)` |
| Hash | Even distribution, no natural key | `PARTITION BY HASH (id)` |

### Generated Columns
- `STORED` — computed on write, stored physically
- `VIRTUAL` — computed on read (PG 17+)
- Indexable when stored

### Enum vs Reference Tables
| Approach | Use Case |
|---|---|
| `CREATE TYPE` | Small, fixed set, rarely changes |
| Reference table | Dynamic, needs metadata, PK refs |
| Reference table + FK | When values need description or ordering |

### Schema Design Patterns
- **Single table inheritance** — nullable columns, check constraints
- **Class table inheritance** — parent + child tables, FK from child
- **EAV (Entity-Attribute-Value)** — only when schema is truly dynamic
- **Ltree / Closure table** — hierarchical / tree data
- **Time-series** — partitioned by time, BRIN indexes
