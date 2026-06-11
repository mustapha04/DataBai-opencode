---
name: architecture-review
description: Use when reviewing software architecture decisions, proposing architectural changes, or documenting system design. Covers architectural patterns, trade-off analysis, and review checklists.
license: MIT
compatibility: opencode
---

## Architecture Review

### Review Scope
- **Structural**: module boundaries, layering, dependency direction
- **Behavioral**: data flow, state management, async/sync boundaries
- **Quality attributes**: performance, scalability, security, maintainability, testability
- **Technology fit**: is the chosen framework/DB/cache appropriate for the problem?

### Architectural Patterns
- **Layered** (presentation → application → domain → infrastructure): clear separation, leaky abstractions risk
- **Hexagonal/Ports & Adapters**: domain isolated from infrastructure, great testability, more boilerplate
- **CQRS**: separate read/write models, useful for complex domains, adds complexity
- **Event-driven**: decoupled services, eventual consistency, harder to trace flows
- **Microservices**: independent deployability, distributed complexity, operational overhead
- **Modular monolith**: same codebase, module boundaries enforced by tooling, simpler ops

### Trade-off Analysis
| Aspect | Option A | Option B |
|---|---|---|
| Complexity | Low | Medium |
| Scalability | Vertical | Horizontal |
| Time to market | Fast | Slow |
| Maintenance | Harder | Easier |

### Review Checklist
- [ ] Module dependencies point inward (no circular deps)
- [ ] Layering is enforced (presentation doesn't touch data layer directly)
- [ ] Error handling is consistent across layers
- [ ] Data flows are visible and auditable
- [ ] State mutations are controlled and predictable
- [ ] External integrations are behind interfaces (testable, swappable)
- [ ] Configuration is externalized (env vars, config files, not hardcoded)
- [ ] Security boundaries are clear (auth happens at the right layer)
- [ ] Performance constraints are documented (expected latency, throughput)

### Architecture Decision Records (ADR)
```
# ADR-001: Use PostgreSQL for Primary Storage
- **Status**: Accepted
- **Context**: Need relational data with strong consistency...
- **Decision**: Use PostgreSQL over MongoDB because...
- **Consequences**: Requires schema migrations, enables complex joins
```
