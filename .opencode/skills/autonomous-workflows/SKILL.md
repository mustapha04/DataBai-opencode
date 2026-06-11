---
name: autonomous-workflows
description: Building fully autonomous multi-step workflows for AI agents with auto-retry, conditional branching, parallel execution, human handoff, and monitoring
license: MIT
compatibility: opencode
---

## autonomous-workflows

### Core Concepts

- **Workflow as DAG**: Each step is a node; edges define dependencies and execution order
- **Deterministic by default**: Same input + state = same output; non-deterministic steps (LLM calls) are explicitly marked
- **Idempotent steps**: Re-running a step produces the same result (use idempotency keys)

### Execution Patterns

| Pattern | Description |
|---------|-------------|
| Sequential | Linear chain, each step depends on previous |
| Parallel fan-out | Execute N independent steps concurrently, gather results |
| Conditional branch | LLM or rule decides which path to take |
| Map-reduce | Apply same step to list of items, then aggregate |
| Human handoff | Pause workflow, wait for manual input/approval, resume |
| Sub-workflow | Invoke another workflow as a step (composition) |

### Reliability Patterns

- **Auto-retry**: Retry transient failures with exponential backoff (3–5 attempts)
- **Dead letter queue**: Failed items routed to DLQ for manual inspection
- **Timeout per step**: Kill hung steps and mark as failed
- **Circuit breaker**: After N consecutive failures, pause workflow for cooldown
- **Checkpointing**: Persist state after each step for resumability

### Idempotency

```typescript
// Idempotency key pattern
POST /api/workflow/run
Idempotency-Key: uuid-v7
{
  "workflowId": "checkout",
  "input": { "orderId": "123" }
}
```

- Generate idempotency key per workflow execution
- Store completed key in DB with TTL; reject duplicates
- For steps: use composite key `(workflowId, stepName)` to skip already-completed steps

### State Persistence

```
WorkflowState {
  id: string
  status: 'pending' | 'running' | 'paused' | 'completed' | 'failed'
  currentStep: string
  completed: StepResult[]
  context: Record<string, any>  // shared state between steps
  errors: ErrorRecord[]
  idempotencyKeys: Set<string>
}
```

- Store in PostgreSQL (reliable) with Redis cache layer for hot reads
- Optimistic locking with version field to prevent concurrent updates

### Monitoring & Observability

- Log every state transition with workflowId, step, duration, status
- Emit metrics: step duration, retry count, error rate, queue depth
- Trace across steps with OpenTelemetry spans
- Dashboard for active workflows, failure rate, average completion time
- Alert on: workflow stuck > threshold, consecutive failures, budget exceeded
