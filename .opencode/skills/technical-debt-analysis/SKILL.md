---
name: technical-debt-analysis
description: Use when identifying, quantifying, or prioritizing technical debt. Covers debt categorization, measurement techniques, remediation planning, and communication with stakeholders.
license: MIT
compatibility: opencode
---

## Technical Debt Analysis

### Debt Categories
| Category | Examples | Interest |
|---|---|---|
| **Code debt** | Duplicated code, dead code, complex conditionals | Lower development speed, higher bug rate |
| **Architecture debt** | Missing abstractions, circular deps, god classes | Hard to change, hard to test |
| **Test debt** | Missing tests, flaky tests, long test runs | Regression risk, slow feedback |
| **Infrastructure debt** | Manual deploys, no monitoring, outdated OS | Operational risk, incident response time |
| **Knowledge debt** | Undocumented decisions, bus factor | Onboarding time, incorrect changes |
| **Dependency debt** | Outdated packages, vulnerable libraries | Security risk, compatibility issues |

### Identification Methods
- **Static analysis**: linter rules, complexity metrics (cyclomatic, cognitive)
- **Coverage gaps**: untested code paths, uncovered branches
- **Churn hotspots**: files changed most often (git history analysis)
- **Bug density**: files with most bug fixes per line of code
- **Violation density**: files with most lint/type errors
- **Developer feedback**: surveys, pain points from the team

### Measurement
- **Debt ratio**: estimated remediation time / total development time
- **Interest per sprint**: extra hours spent due to debt / total sprint hours
- **Hotspot score**: (churn frequency × bug count) / coverage
- **Trend**: are these metrics getting better or worse sprint over sprint?

### Prioritization Framework
```
Risk Matrix:
High impact + High frequency → Fix immediately (P0)
High impact + Low frequency  → Plan this sprint (P1)
Low impact + High frequency  → Schedule next sprint (P2)
Low impact + Low frequency   → Backlog (P3)
```

### Remediation Strategies
- **Boy Scout Rule**: leave code cleaner than you found it (small, continuous)
- **Debt sprints**: allocate dedicated time (e.g., every 3rd sprint is debt sprint)
- **Bubble-up**: allow teams to flag debt during regular work
- **Thresholds**: block PRs if certain debt metrics get worse (lint violations, coverage drop)

### Communicating to Stakeholders
- Frame in business terms: "This debt adds 2 days to every feature delivery"
- Show trend lines: debt is growing → will slow us down
- Propose ROI: "Investing 3 days to fix this will save 1 day per sprint going forward"
- Visualize: debt heatmap, burndown of remediation items
