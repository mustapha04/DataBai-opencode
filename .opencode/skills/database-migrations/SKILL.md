---
name: database-migrations
description: Database migration strategies covering schema evolution, versioning, rollback planning, zero-downtime migrations, and tools like Alembic, Prisma, Flyway
license: MIT
compatibility: opencode
---

## database-migrations

### Migration Principles
- **Versioned, ordered, immutable** — each migration has a unique ID and never changes after apply
- **Forward + rollback** — every migration should have a corresponding down-migration
- **Idempotent apply** — running twice produces the same result

### Zero-Downtime Migrations
| Phase | Schema Change | App Deployment |
|-------|--------------|----------------|
| Expand | Add new columns/tables, make old columns nullable | Deploy v2 (writes both, reads from compatible) |
| Migrate | Background job backfills data | — |
| Contract | Remove old columns, add NOT NULL constraints | Deploy v3 (reads/writes new only) |

### Tooling
| Tool | Language | Approach |
|------|----------|----------|
| Alembic | Python | Declarative + autogenerate from ORM models |
| Prisma | TypeScript/Node | Schema file → diff → migration |
| Flyway | JVM/any | SQL files in versioned directory |
| Liquibase | JVM/any | XML/YAML/JSON changelogs |
| golang-migrate | Go | SQL files + Go driver |

### Safety Practices
- Test migrations against a copy of production data
- Run migrations in transactions where possible
- Use `LOCK TABLE` carefully — prefer `CREATE INDEX CONCURRENTLY`
- Feature flags to decouple schema deploy from code roll-out
- Automated CI/CD pipeline that runs migrations before app deploy

### Common Pitfalls
- Long-running locks blocking reads/writes
- Adding NOT NULL columns without defaults
- Renaming columns without expansion-contraction
- Missing rollback migrations
