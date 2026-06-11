---
name: diagnose
description: Systematic diagnosis of software issues including problem isolation, hypothesis testing, log analysis, reproduction, root cause analysis, and debugging workflows
license: MIT
compatibility: opencode
---

## diagnose

### Diagnostic Process
1. **Reproduce** — get a reliable reproduction case
2. **Isolate** — narrow scope (which component, which input, which environment)
3. **Hypothesize** — list possible causes, rank by likelihood
4. **Test** — check each hypothesis with minimal experiment
5. **Confirm** — verify root cause with a targeted fix
6. **Prevent** — add tests, monitoring, or guards

### Investigation Heuristics
- **Bisect** — binary search through commits, inputs, or config changes
- **Rubber duck** — explain the problem aloud to reveal assumptions
- **Diff debugging** — compare working vs non-working state
- **Error first** — read the first error in the stack trace, not the last
- **Reduce** — strip away code until the bug disappears, then examine the removed piece

### Log Analysis
- Structured logs (JSON) with correlation IDs for distributed tracing
- Log levels: TRACE < DEBUG < INFO < WARN < ERROR < FATAL
- Centralized aggregation (ELK, Loki, DataDog)
- Metrics + logs + traces for full observability

### Root Cause Analysis
- **5 Whys** — iterative questioning to surface underlying cause
- **Fishbone (Ishikawa)** — categorize causes (people, process, tech, environment)
- **Post-mortem** — blameless retrospective with action items

### Debugging Workflows
- REPL / notebook for data exploration
- Debugger breakpoints, conditional breakpoints, watch expressions
- Network tab, performance profiler, memory heap snapshots
- Feature flags to toggle code paths in production
