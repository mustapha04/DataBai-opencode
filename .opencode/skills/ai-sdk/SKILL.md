---
name: ai-sdk
description: Using AI SDKs (Vercel AI SDK, LangChain) covering streaming, tool calling, structured output, provider abstraction, and error handling
license: MIT
compatibility: opencode
---

## ai-sdk

### Provider Abstraction

- Use a unified interface (`generateText`, `streamText`, `generateObject`) to switch between OpenAI, Anthropic, Google, open-source models
- Configure provider via environment variables or runtime resolution
- Support fallback chains: primary → secondary → tertiary provider

### Streaming

- **Text streaming**: Chunk-by-chunk response for real-time UX
- **Tool call streaming**: Emit tool_call deltas as they arrive
- **Combined stream**: Interleave text deltas and tool calls in a single stream
- Client-side rendering: accumulate buffer, update UI per chunk
- Abort controller for cancellation mid-stream

### Tool Calling

```typescript
const tools = {
  getWeather: tool({
    description: 'Get weather for a location',
    parameters: z.object({ location: z.string() }),
    execute: async ({ location }) => weatherApi.fetch(location),
  }),
}
```

- Define tools with Zod/JSON Schema for parameter validation
- LLM decides when to invoke tools; SDK handles cycling
- Max sequential tool calls guard to prevent infinite loops
- Expose errors back to LLM for self-correction

### Structured Output

- `generateObject` / `streamObject` for typed JSON responses
- Constrain output schema with Zod validation
- Use for data extraction, classification, form filling
- Retry with validation feedback on schema mismatch

### Error Handling

| Error Type | Strategy |
|------------|----------|
| Rate limit | Exponential backoff + queue |
| Token limit | Truncate context, summarize earlier messages |
| Invalid tool args | Return error message to LLM for self-correction |
| Provider outage | Failover to next provider in chain |
| Content filter | Rephrase input, reduce sensitivity |

### Best Practices

- Set `maxTokens` and `temperature` per use case
- Log prompt + completion pairs for debugging
- Monitor cost via token usage callbacks
- Cache identical prompts with semantic caching (embedding similarity)
