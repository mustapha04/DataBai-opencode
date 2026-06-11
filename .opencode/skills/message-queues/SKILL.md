---
name: message-queues
description: Message queue systems (RabbitMQ, SQS, Kafka) patterns (pub/sub, work queues, routing, topics, dead letter queues, retry, backpressure, idempotent consumers, ordering guarantees)
license: MIT
compatibility: opencode
---

## message-queues

### Queue Types & Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Work Queue | Competing consumers process from a single queue | Task distribution |
| Pub/Sub | One message → multiple subscribers (fanout) | Event broadcasting |
| Routing | Message routed by routing key to matching queues | Selective consumption |
| Topics | Pattern-matched routing (wildcards) | Multi-dimensional routing |
| RPC | Request/reply over queues | Sync-style over async transport |

### Platform Comparison

| Feature | RabbitMQ | SQS | Kafka |
|---------|----------|-----|-------|
| Delivery | At-least-once, exactly-once (with dedup) | At-least-once | At-least-once, exactly-once |
| Ordering | Per-queue | Per-message-group (FIFO) | Per-partition |
| Throughput | Moderate | High | Very high |
| Retention | Until acked | Configurable (up to 14 days) | Configurable (days/weeks) |
| Consumer model | Push | Pull (long polling) | Pull (offset-based) |

### Dead Letter Queues (DLQ)

- Messages that fail processing after max retries → DLQ
- Store original message + failure reason + retry count
- Monitor DLQ depth and alert on growth
- Replay tool for reprocessing after bug fix

### Retry Strategies

- **Exponential backoff**: 1s, 2s, 4s, 8s, ... with jitter
- **Retry queues**: dedicated queue per retry delay (RabbitMQ DLX)
- **Visibility timeout** (SQS): extend timeout for in-flight processing
- **Max retries**: 3-5 attempts before DLQ

### Backpressure

- Consumer prefetch limit (RabbitMQ QoS)
- SQS max in-flight messages per consumer
- Kafka consumer `max.poll.records`
- Monitor consumer lag and alert on divergence
- Scale consumers (horizontal) when lag grows

### Idempotent Consumers

- Deduplication: message ID + idempotency key in DB (unique constraint)
- Use idempotency token in the message body
- Implement upsert logic instead of insert-then-catch
- Ensure processing is safe to retry at least once

### Ordering Guarantees

- RabbitMQ: single queue = FIFO (with single consumer)
- SQS: FIFO queue + message group ID
- Kafka: partition key → ordered within partition
- Avoid mixing ordering and parallel processing without careful design

### Monitoring

| Metric | What it tells you |
|--------|-------------------|
| Queue depth | Backlog size |
| Consumer lag | Processing speed vs. production speed |
| Ack rate | Consumer throughput |
| Retry count | Failure rate |
| DLQ depth | Unprocessable messages |
