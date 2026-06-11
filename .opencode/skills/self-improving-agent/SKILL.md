---
name: self-improving-agent
description: Use when designing autonomous agents that learn from feedback, improve their own prompts, or iterate on their outputs. Covers feedback loops, iterative refinement, quality scoring, and self-correction patterns.
license: MIT
compatibility: opencode
---

## Self-Improving Agent

### Core Loop
1. **Execute** — produce an output (code, text, analysis)
2. **Evaluate** — score the output against criteria (correctness, style, completeness)
3. **Learn** — extract patterns from successes and failures
4. **Adapt** — update prompts, rules, or approach based on learnings
5. **Repeat** — use the improved approach for the next execution

### Feedback Mechanisms
- **Explicit feedback**: user corrections, ratings, thumbs up/down
- **Implicit feedback**: test pass/fail, build success/failure, lint errors
- **Self-evaluation**: agent reviews its own output before presenting it
- **Peer review**: multiple agent runs compared, best result selected

### Iterative Refinement
```
1. Generate initial solution
2. Run automated checks (tests, lint, typecheck)
3. If failures: analyze → fix → go to 2
4. Present solution with confidence score
```

### Quality Scoring
- Pass/fail for automated checks (must pass)
- Confidence score (1-5) for subjective quality
- Score rubric defined upfront before generation
- Track score trends over time to measure improvement

### Self-Correction Patterns
- **Repetition**: if the same error occurs twice, update the prompt/system message
- **Overconfidence**: if the agent is wrong on high-confidence outputs, penalize confidence
- **Style drift**: if outputs deviate from style guide, reinforce style rules in the prompt
- **Knowledge gaps**: if certain topics consistently fail, add reference docs or rules

### Knowledge Base
- Maintain a growing KB of learnings, patterns, and anti-patterns
- KB entries: problem → attempted solution → outcome → recommendation
- Reference KB in system prompts for context
- Prune outdated entries periodically
