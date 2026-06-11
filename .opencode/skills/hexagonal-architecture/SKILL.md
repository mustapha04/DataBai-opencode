---
name: hexagonal-architecture
description: Hexagonal Architecture (Ports & Adapters) pattern (core domain isolation, port interfaces, adapter implementations, dependency injection, testing strategies, implementation examples)
license: MIT
compatibility: opencode
---

## hexagonal-architecture

### Core Concept

Hexagonal Architecture (Ports & Adapters) isolates the core domain from external concerns (databases, APIs, UIs) through port interfaces and adapter implementations.

### Structure

```
domain/
  ports/          # interfaces (contracts)
    inbound/      # driven (application services, use cases)
    outbound/     # driving (repositories, external APIs)
  model/          # domain entities, value objects
  service/        # domain services, business logic

infrastructure/
  adapters/
    inbound/      # controllers, CLI handlers, message consumers
    outbound/     # DB repositories, HTTP clients, file I/O

application/
  usecase/        # orchestration of domain logic
  dto/            # data transfer objects
  config/         # DI container, wiring
```

### Port Interfaces

- **Inbound ports**: what the application exposes to the outside (e.g., `CreateOrderUseCase`)
- **Outbound ports**: what the application needs from the outside (e.g., `OrderRepository`, `PaymentGateway`)

### Adapter Implementations

- **Inbound adapters**: REST controllers, GraphQL resolvers, gRPC handlers, CLI commands, queue consumers
- **Outbound adapters**: JPA/Hibernate repositories, REST clients, S3 file stores, in-memory stores (for tests)

### Dependency Injection

- Wire ports to adapters at the composition root
- Use constructor injection; avoid service locator
- Framework choices: Spring, Dagger, Google Guice, manual DI

### Testing Strategies

| Layer | Test Type | Focus |
|-------|-----------|-------|
| Domain model | Unit tests | Business rules, invariants |
| Use cases | Unit + integration | Orchestration, port mocking |
| Adapters | Integration | Real DB, real HTTP (testcontainers) |
| End-to-end | E2E | Full system validation |

### Rules of Thumb

- Domain has zero external dependencies
- Adapters depend on ports, not on each other
- Inbound adapters call inbound ports; outbound ports are implemented by outbound adapters
- The domain never imports infrastructure code
- Use mocks/fakes of ports for fast unit tests
