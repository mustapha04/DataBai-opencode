---
name: function-calling
description: Function/tool calling for LLMs (defining schemas, parameter validation, error handling, streaming, multi-turn calls, parallel function calls, chain-of-thought with tools)
license: MIT
compatibility: opencode
---

## function-calling

### Schema Definition

Define tools with JSON Schema:

```json
{
  "type": "function",
  "function": {
    "name": "search_docs",
    "description": "Search documentation for a query",
    "parameters": {
      "type": "object",
      "properties": {
        "query": { "type": "string" },
        "limit": { "type": "integer", "default": 5 }
      },
      "required": ["query"]
    }
  }
}
```

### Best Practices

- **Descriptions**: give the model clear, detailed descriptions for each parameter
- **Enums**: use `enum` for constrained values to reduce hallucination
- **Required fields**: mark only truly required fields; let the model skip optional ones
- **Naming**: use snake_case for function names (common LLM convention)

### Execution Flow

1. Send user prompt + tool definitions to LLM
2. LLM returns `tool_calls` (may be multiple, may be parallel)
3. Execute each tool call with validated parameters
4. Return results as `tool` role messages
5. LLM produces final response (or makes further tool calls)

### Error Handling

- Return structured error messages from tools (not thrown exceptions)
- Include `"isError": true` in tool response to signal failure
- Let the model self-correct by describing the error in the response content

### Multi-Turn & Parallel Calls

- Models may issue multiple tool calls in a single response
- Execute independent calls concurrently; sequence dependent calls
- Use a `tool_choice` of `"auto"` to let the model decide, or `"required"` to force tool use

### Chain-of-Thought with Tools

- The model may reason in text before/after tool calls
- Preserve the full conversation history including all reasoning tokens
- For streaming: interleave text deltas and tool call deltas

### Security

- Validate all parameters server-side (LLMs can produce invalid values)
- Never expose credentials or internal-only tools
- Implement per-user rate limiting on tool execution
- Log all tool invocations for audit
