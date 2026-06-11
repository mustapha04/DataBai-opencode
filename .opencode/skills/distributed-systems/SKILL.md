---
name: distributed-systems
description: Distributed systems patterns including consistency models, consensus algorithms, distributed transactions, event sourcing, CQRS, saga patterns, and CAP theorem
license: MIT
compatibility: opencode
---

## distributed-systems

### Consistency Models
| Model | Guarantee | Performance |
|-------|-----------|-------------|
| Strong | Read sees latest write | Highest latency |
| Eventual | Reads converge over time | Lowest latency |
| Causal | Related writes seen in order | Middle ground |
| Read-after-write | Client sees its own writes | Session-scoped |

### CAP Theorem
- **Consistency** — every read receives the most recent write
- **Availability** — every request gets a non-error response
- **Partition Tolerance** — system continues despite network splits
- In a partition, choose CP or AP; trade-offs are unavoidable

### Consensus Algorithms
- Raft (leader-elected, understandable) — etcd, Consul
- Paxos (foundational, complex) — Google Chubby, Spanner
- Zab — ZooKeeper
- Practical considerations: leader election, log replication, safety

### Distributed Transactions
| Pattern | Mechanism | When to Use |
|---------|-----------|-------------|
| 2PC | Coordinator + prepare/commit | Strong consistency, small scale |
| Saga | Choreography or orchestration | Long-running, compensating actions |
| TCC | Try-Confirm/Cancel | Resource reservation |
| Outbox | Write to local table + relay | Reliable message publication |

### Event Sourcing & CQRS
- Event sourcing: state = sequence of events; rebuild by replaying
- CQRS: separate write model (commands) from read model (queries)
- Projections transform event streams into read-optimized views

### Failure Modes
- Network: partition, latency spikes, packet loss
- Process: crash, OOM, deadlock, slow response
- Storage: disk full, corruption, throttled I/O
- Design for: retries with backoff, circuit breakers, bulkheads, timeouts
