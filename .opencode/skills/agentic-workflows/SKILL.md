---
name: agentic-workflows
description: Design patterns for autonomous AI agent workflows including plan-then-execute, reflection, tool-use loops, and human-in-the-loop
license: MIT
compatibility: opencode
---

## agentic-workflows

### Core Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Plan-then-execute | Agent decomposes task, executes steps sequentially | Complex multi-step tasks |
| ReAct (Reason + Act) | Interleaved reasoning and tool calls | Tasks requiring dynamic decision-making |
| Reflection | Agent reviews its own output for quality | Code generation, writing, data analysis |
| Tool-use loop | Agent iteratively calls tools until completion | Web research, data retrieval |
| Human-in-the-loop | Agent pauses for human approval at key junctures | High-stakes decisions, content review |

### Orchestration

- **State machine**: Define states (init, planning, executing, verifying, done, error)
- **Step router**: LLM decides next step based on current state and tool outputs
- **Max iterations guard**: Hard limit on loop iterations to prevent runaway costs
- **Timeout per step**: Per-tool timeout for hanging calls

### Error Recovery

- **Retry with backoff**: Exponential backoff on transient tool failures
- **Fallback LLM**: Degrade to simpler model on provider errors
- **Checkpoint & resume**: Save intermediate state to resume after failure
- **Human escalation**: Route to human operator when confidence is low or retries exhausted
- **Dead-letter queue**: Log unprocessable items for manual review

### State Persistence

```
WorkflowState {
  id: string
  status: 'running' | 'paused' | 'completed' | 'failed'
  plan: Step[]
  completedSteps: StepResult[]
  context: Record<string, any>
  errors: ErrorLog[]
  metadata: { startedAt, updatedAt, model }
}
```

- Store state in PostgreSQL or Redis for durability
- Use event sourcing for audit trail and replay capability
- Serialize tool call history as LLM conversation context

### Monitoring

- Log every LLM call, tool invocation, and state transition
- Track token usage, latency, and cost per workflow
- Alert on repeated errors, excessive loops, or budget threshold exceeded
- Trace with OpenTelemetry for distributed debugging
