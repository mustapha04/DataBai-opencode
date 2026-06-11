---
name: prompt-engineering
description: Prompt engineering for LLMs including chain-of-thought, few-shot, system prompts, prompt chaining, structured output, temperature tuning, prompt versioning, testing, and security guardrails
license: MIT
compatibility: opencode
---

## prompt-engineering

### System Prompts
- Role, tone, constraints defined upfront
- Delimit instruction blocks with `---` or XML tags
- Include formatting rules and output schema
- Explicitly state what the model must NOT do

### Few-Shot & In-Context Learning
- 3-5 high-quality examples covering edge cases
- Label each example clearly (Input → Output)
- Balance positive and negative examples
- Keep examples representative of real usage

### Chain-of-Thought (CoT)
```
Step 1: Understand the problem
Step 2: Break it into sub-problems
Step 3: Solve each sub-problem
Step 4: Combine into final answer
```
- Zero-shot CoT: "Let's think step by step"
- Few-shot CoT: Show reasoning steps in examples

### Prompt Chaining
- Decompose complex tasks into sequential prompts
- Each step passes output as next step's input
- Map-Reduce for multi-document summarization
- Conditional branching based on intermediate results

### Structured Output
- JSON mode with explicit schema
- XML tags for clear parsing markers
- Markdown tables for comparison tasks
- Enums for constrained classification

### Temperature Tuning
| Task | Temperature |
|---|---|
| Code generation | 0.0 — 0.2 |
| Classification | 0.0 — 0.3 |
| Creative writing | 0.7 — 1.0 |
| Brainstorming | 0.8 — 1.2 |

### Prompt Versioning
- Semantic versioning for prompts
- Git-track prompt files alongside code
- A/B test prompt variants in production
- Changelog for prompt changes

### Testing
- Unit tests: expected outputs for known inputs
- Edge case suite: empty input, adversarial, ambiguous
- Evaluation harness with scoring rubric
- Regression test against prompt changes

### Security & Guardrails
- Prompt injection detection
- Output validation (deny list, regex)
- Rate limiting per user/API key
- PII redaction pre/post prompt
- Human-in-the-loop for high-risk actions
