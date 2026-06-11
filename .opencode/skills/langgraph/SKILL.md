---
name: langgraph
description: LangGraph framework (state graphs, nodes, edges, conditional branching, checkpointing, human-in-the-loop, subgraphs, persistence, streaming, multi-agent orchestration)
license: MIT
compatibility: opencode
---

## langgraph

### State Graphs

Define state as a TypedDict or dataclass representing the full conversation/process state:

```python
class AgentState(TypedDict):
    messages: Sequence[BaseMessage]
    next_agent: str
    context: dict
```

### Nodes & Edges

- **Nodes**: functions that receive state and return state updates
- **Edges**: directional connections between nodes
- **Entry point**: first node(s) to execute
- **Finish**: terminal condition(s)

### Conditional Branching

Use `ConditionalEdge` to route based on state content:

```python
graph.add_conditional_edges(
    "router",
    lambda state: "tool_node" if state["messages"][-1].tool_calls else "respond",
    {"tool_node": "execute_tool", "respond": "final_output"}
)
```

### Checkpointing & Persistence

- `MemorySaver` for in-memory checkpointing
- `SqliteSaver`, `PostgresSaver` for durable persistence
- Checkpoints save full state at each step, enabling pause/resume
- Thread-level isolation per conversation session

### Human-in-the-Loop

- `interrupt_before` / `interrupt_after` on specific nodes
- Wait for human approval or input before continuing
- Resume with `graph.resume(state_update)` after interruption
- Use for approval flows, sensitive actions, ambiguous queries

### Subgraphs

- Compose graphs within graphs using `SubGraphNode`
- Isolate sub-state and sub-logic for complex workflows
- Parent graph passes context down; subgraph returns results up

### Streaming

- `stream_mode="values"`: full state after each node
- `stream_mode="updates"`: only state changes
- `stream_mode="messages"`: token-by-token LLM output
- Combine with LangChain callbacks for detailed tracing

### Multi-Agent Orchestration

- **Supervisor agent**: routes tasks to specialist sub-agents
- **Debate/consensus**: multiple agents propose answers, vote
- **Pipeline**: sequential handoff between agents
- **Marketplace**: agents bid on subtasks

### Best Practices

- Keep state minimal and serializable
- Define clear node contracts (state keys each node reads/writes)
- Use `Command` for dynamic edges within nodes
- Set `max_steps` to prevent infinite loops
- Test graphs with `graph.aget_state_history()` for debugging
