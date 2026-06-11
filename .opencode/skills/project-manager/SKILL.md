---
name: project-manager
description: Use when managing software projects, tracking progress, coordinating teams, or reporting status. Covers agile ceremonies, stakeholder communication, risk management, and delivery tracking.
license: MIT
compatibility: opencode
---

## Project Management

### Agile Ceremonies
- **Standup** (daily, 15min): what I did yesterday, what I'll do today, blockers
- **Sprint planning** (biweekly, 2h): commit to work for the sprint, define sprint goal
- **Review/demo** (end of sprint, 1h): show completed work to stakeholders
- **Retrospective** (end of sprint, 1h): what went well, what to improve, action items

### Stakeholder Communication
- Status reports weekly: progress, risks, decisions needed
- Use RAG status: Green (on track), Amber (at risk, has mitigation), Red (blocked, needs help)
- Escalate blockers immediately, don't wait for the next status meeting
- Tailor detail level: execs want outcomes, teams want context

### Risk Management
| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Staff unavailable | Medium | High | Cross-train, document knowledge |
| Scope creep | High | Medium | Change control process, prioritize |
| Technical debt | Medium | Medium | Allocate 20% time for refactoring |

### Delivery Tracking
- Burndown charts for sprint progress (ideal vs actual remaining work)
- Cycle time: time from "started" to "done" (target: < 3 days per task)
- Lead time: time from "requested" to "delivered" (target: < 2 weeks per feature)
- Velocity: average story points completed per sprint (use for forecasting)

### Decision Log
- Record decisions with: date, context, options considered, rationale, outcomes
- Revisit decisions periodically (especially architecture and tech choices)

### Communication Principles
- Over-communicate on changes that affect others
- Document async first, meet sync only when needed (Loom/Doc > meeting)
- Keep a single source of truth for project status, requirements, timeline
