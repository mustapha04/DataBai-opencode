---
name: domain-driven-design
description: Domain-Driven Design covering ubiquitous language, bounded contexts, aggregates, entities, value objects, domain events, repositories, and tactical patterns
license: MIT
compatibility: opencode
---

## domain-driven-design

### Strategic Design
- **Ubiquitous Language** — shared vocabulary between domain experts and developers
- **Bounded Context** — explicit boundary where a model applies
- **Context Map** — relationships between bounded contexts (partnership, shared kernel, anti-corruption layer, etc.)
- **Core / Supporting / Generic Domains** — prioritize investment where competitive advantage lies

### Tactical Patterns
| Pattern | Identity | Mutability | Example |
|---------|----------|------------|---------|
| Entity | Has ID, changes over time | Mutable | User, Order |
| Value Object | No identity, defined by attributes | Immutable | Money, Address |
| Aggregate | Cluster of entities with a root | Consistency boundary | Order with line items |
| Domain Event | Something that happened | Immutable fact | OrderPlaced |
| Repository | Collection-like access to aggregates | — | OrderRepository |

### Building Blocks
- **Domain Services** — stateless operations that don't fit on an entity/value object
- **Application Services** — orchestration, transaction management, security
- **Domain Events** — publish when aggregate state changes; subscribers react
- **Factories** — encapsulate complex creation logic

### Implementation Guidance
- Keep infrastructure concerns outside the domain (dependency inversion)
- Persistence ignorance — repositories return domain objects
- Test domain logic with unit tests; integration tests for repositories
- Anti-corruption layer when integrating with legacy systems
- Event storming for collaborative domain exploration
