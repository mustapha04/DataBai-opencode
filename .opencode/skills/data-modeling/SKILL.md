---
name: data-modeling
description: Data modeling techniques covering ERD, normalization, dimensional modeling, NoSQL document design, and graph modeling
license: MIT
compatibility: opencode
---

## data-modeling

### Conceptual, Logical, Physical
- **Conceptual** — business entities and relationships (high-level)
- **Logical** — attributes, keys, constraints (technology-agnostic)
- **Physical** — tables, indexes, partitions, data types (implementation-specific)

### Relational Modeling
| Technique | Purpose | Trade-off |
|-----------|---------|-----------|
| Normalization (3NF) | Eliminate redundancy | More joins, slower reads |
| Denormalization | Reduce joins for read-heavy workloads | Data duplication, update anomalies |
| Star Schema | Fact + dimension tables for analytics | Query simplicity, ETL complexity |
| Snowflake Schema | Normalized dimensions | Saves space, harder to query |

### NoSQL Document Design
- Model for access patterns, not relationships
- Embedding vs. referencing — embedding for one-to-few, referencing for one-to-many/many-to-many
- Avoid unbounded arrays; use pagination or subcollections

### Graph Modeling
- Nodes = entities, edges = relationships
- Labeled property graph model for rich traversals
- Adjacency lists, adjacency matrices for different query patterns

### Patterns
- **Slowly Changing Dimensions (SCD)** — Type 1 (overwrite), Type 2 (history), Type 3 (previous value)
- **Polymorphic Associations** — use when one table references multiple target types
- **Inheritance Mapping** — single-table, class-table, concrete-table
