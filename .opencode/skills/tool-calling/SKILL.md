---
name: tool-calling
description: Tool calling patterns for LLM integrations including schema, validation, and streaming
license: MIT
compatibility: opencode
---

## tool-calling

### Schema Definition
- Use JSON Schema or equivalent (OpenAPI, Function Calling API) to define tools
- Each tool requires: `name`, `description`, `parameters` (JSON Schema)
- Write clear, specific descriptions so the LLM knows when to call each tool
- Use `required` array for mandatory parameters
- Provide `enum` values, `pattern` regex, and `examples` for ambiguous params
- Limit parameter count to 5-7; use `additionalProperties: false`

### Parameter Validation
- Validate all parameters server-side before execution
- Type coercion: handle strings vs numbers vs booleans gracefully
- Sanity checks: range limits, string length, allowed values
- Return clear validation error messages for LLM to self-correct
- Log invalid calls for debugging tool selection issues

### Error Recovery
| Error Type | Recovery Strategy |
|------------|-------------------|
| Missing param | Return error with expected format; LLM will retry |
| Invalid value | Provide allowed values list in error message |
| Rate limited | Return retry-after; LLM will wait and retry |
| Timeout | Return timeout error; LLM can re-trigger |
| Unauthorized | Return auth error; LLM may ask user for permissions |
| Internal error | Return generic error; LLM may simplify the request |

### Streaming Responses
- Stream tool call deltas when available (Anthropic, OpenAI streaming)
- Render partial UI updates for progressive tool results
- Use streaming to reduce perceived latency for the user
- Handle mid-stream cancellation gracefully
- Buffer full result before final rendering if needed

### Multi-Turn Tool Use
- Track conversation state across multiple tool calls
- LLM may call tools sequentially to fulfill a complex request
- Pass previous tool results as context for the next call
- Prevent infinite loops: max tool call limits, cycle detection
- Allow user interruption between tool calls

### Parallel Tools
- Batch independent tool calls in a single turn
- Identify non-dependent tools (e.g., fetch user + fetch settings)
- Execute in parallel; collect all results before responding
- Handle partial failure: some succeed, some fail
- Aggregate results coherently for the LLM's final response

### Structured Output Parsing
- Parse LLM tool call arguments with schemas (Zod, Pydantic, io-ts)
- Handle optional fields with defaults
- Coerce types: "123" → 123, "true" → true
- Reject unknown fields; log them for schema updates
- Use discriminated unions for tools with different parameter shapes

### Tool Selection
- LLM routes to the most relevant tool based on description
- Provide tool choice modes: `auto`, `any`, `none`, or specific tool
- Prefer `auto` for general use; pin to a tool for constrained tasks
- Avoid too many tools (5-10 per prompt is a good range)
- Group related functionality into fewer, well-described tools
- Order tools by importance/frequency of use in the prompt
