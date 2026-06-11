---
name: multi-agent-systems
description: Multi-agent AI system design including agent communication, coordination, delegation, task distribution, conflict resolution, shared memory, orchestration patterns, and evaluation
license: MIT
compatibility: opencode
---

## multi-agent-systems

### Communication Patterns
- **Direct messaging** — Point-to-point agent channels
- **Broadcast** — Publish/subscribe via message bus
- **Blackboard** — Shared knowledge base agents read/write to

### Coordination Strategies
| Strategy | Use Case |
|---|---|
| Hierarchical | Manager delegates to worker agents |
| Peer-to-peer | Agents negotiate and collaborate |
| Consensus | Voting-based decision making |

### Delegation & Task Distribution
- Role-based assignment
- Capability matching
- Load-balanced round-robin
- Priority queues with preemption

### Conflict Resolution
- Version vectors for shared state
- Locking primitives (optimistic/pessimistic)
- Mediator agent pattern
- Rollback with compensation transactions

### Shared Memory
- Centralized vector store
- Distributed cache (Redis)
- Ephemeral conversation buffers
- Persistent knowledge graphs

### Orchestration Patterns
- **Sequential** — Chain of responsibility
- **Fan-out/Fan-in** — Parallel processing, aggregate results
- **Map-Reduce** — Distribute work, reduce outputs
- **ReAct loop** — Observe-think-act cycles per agent

### Evaluation
- Task completion rate
- Round efficiency (messages per goal)
- Conflict frequency
- Output coherence scoring
- Human preference ranking

### Tooling
- LangGraph, CrewAI, AutoGen, Semantic Kernel
- Message brokers (RabbitMQ, NATS)
- Observability (OpenTelemetry traces)
