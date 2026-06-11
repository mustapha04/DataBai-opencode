---
name: event-driven-architecture
description: Event-driven architecture covering event sourcing, message brokers, event schema evolution, idempotency, exactly-once processing, and error handling
license: MIT
compatibility: opencode
---

## event-driven-architecture

### Core Concepts
- **Event** — a record of something that happened (fact, immutable)
- **Command** — an intent to do something (may be rejected)
- **Event Bus / Broker** — transport layer (Kafka, RabbitMQ, AWS EventBridge, Google Pub/Sub)

### Message Brokers
| Broker | Strengths | Best For |
|--------|-----------|----------|
| Kafka | High throughput, log-based, replay | Event streaming, data pipelines, event sourcing |
| RabbitMQ | Flexible routing, AMQP, queues | Task queues, RPC, complex routing |
| EventBridge | AWS-native, schema registry, filtering | Serverless event-driven apps |
| Google Pub/Sub | Global, exactly-once, pull/push | GCP-native, streaming |

### Event Sourcing
- State = sequence of events; current state is a projection
- Event store (append-only log) as source of truth
- Snapshots for performance on long streams
- Upcasting for event schema evolution

### Schema Evolution & Governance
- Schema registry (Avro, Protobuf, JSON Schema)
- Backward/forward compatibility rules
- Version AVN: new consumers read old events, old consumers skip unknown fields

### Idempotency & Exactly-Once Processing
| Guarantee | Mechanism | Cost |
|-----------|-----------|------|
| At-most-once | No retries | Data loss possible |
| At-least-once | Retries + dedup key | Duplicates possible |
| Exactly-once | Idempotent producer + transactional consumer | Highest overhead |

### Error Handling
- Dead-letter queues (DLQ) for poison messages
- Retry with exponential backoff + jitter
- Circuit breaker for downstream failures
- Idempotency keys on producer side
- Consumer offset management — commit after processing, not before
