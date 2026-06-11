---
name: clean-architecture
description: Clean Architecture principles covering dependency inversion, use cases, entities, interfaces, repositories, layer separation, boundaries, testing, and implementation patterns
license: MIT
compatibility: opencode
---

## clean-architecture

### Layered Structure

```
┌──────────────────────────────┐
│   Infrastructure / Frameworks │  Outer layer – DB, HTTP, UI
├──────────────────────────────┤
│         Interface Adapters    │  Controllers, presenters, gateways
├──────────────────────────────┤
│          Application / Use Cases│  Business logic orchestration
├──────────────────────────────┤
│            Domain / Entities  │  Inner layer – enterprise rules
└──────────────────────────────┘
```

**Dependency Rule**: Source code dependencies can only point inwards. Nothing in an inner circle can know about something in an outer circle.

### Dependency Inversion

- High-level modules (use cases) define interfaces; low-level modules (DB, API) implement them
- Use **dependency injection** to provide implementations at runtime
- No concrete dependency on frameworks, databases, or external services

### Components

| Layer | Contains | Depends On |
|-------|----------|------------|
| Domain Entities | Business objects, value objects, domain events | Nothing |
| Use Cases | Application-specific business rules | Entities |
| Interface Adapters | Controllers, presenters, repositories (interfaces) | Use Cases |
| Infrastructure | Database impl, HTTP clients, message queues | Interface Adapters |

### Implementation Patterns

```typescript
// Domain Entity
class Order {
  constructor(public items: OrderItem[], public status: OrderStatus) {}
  addItem(item: OrderItem): void { /* business logic */ }
}

// Use Case Interface (inward)
interface OrderRepository {
  save(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
}

// Use Case
class CreateOrderUseCase {
  constructor(private repo: OrderRepository) {}
  async execute(input: CreateOrderInput): Promise<Order> {
    const order = new Order(input.items, 'pending');
    await this.repo.save(order);
    return order;
  }
}

// Infrastructure (outward)
class PostgresOrderRepository implements OrderRepository {
  async save(order: Order): Promise<void> {
    await db.query('INSERT INTO orders ...', [order]);
  }
}
```

### Testing

- **Unit test** use cases and entities with mocked repositories (no DB, no HTTP)
- **Integration test** infrastructure adapters with real DB/API
- **Boundary tests**: Replace one infrastructure piece (e.g., Postgres → SQLite) without changing use cases
- Test doubles implement repository interfaces – no need for mocking framework

### When to Apply

- **Use Clean Architecture** when: Business logic is complex, multiple delivery mechanisms (web, mobile, API), long-lived project
- **Skip** when: Simple CRUD app, prototype, team unfamiliar with patterns (overhead > benefit)
