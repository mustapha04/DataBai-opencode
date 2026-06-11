---
name: task-planning
description: Use when breaking down complex tasks, writing implementation plans, or estimating effort. Covers task decomposition, dependency mapping, estimation techniques, and progress tracking.
license: MIT
compatibility: opencode
---

## Task Planning

### Decomposition
- Break work into smallest independently-valuable units (1-4 hours each)
- Each task should have a clear acceptance criteria (definition of done)
- Identify dependencies between tasks (blocked by, blocks)
- Group related tasks into milestones (each milestone = a shippable increment)

### Planning Steps
1. **Understand**: clarify requirements, constraints, and success criteria
2. **Explore**: identify possible approaches and trade-offs
3. **Decide**: choose the approach, document the rationale
4. **Decompose**: break into ordered, scoped tasks
5. **Sequence**: order tasks respecting dependencies and priorities

### Effort Estimation
- Use T-shirt sizes (XS/S/M/L/XL) for quick triage
- Use story points (1/2/3/5/8/13) for sprint planning
- Timebox research/exploration tasks (spikes) at 2-4 hours
- Add 20% buffer for unknowns and testing

### Task Template
```
## Task: <short name>
- **Effort**: S / M / L / XL
- **Dependencies**: #task-id, #pr-id
- **Acceptance Criteria**:
  - [ ] Criterion 1
  - [ ] Criterion 2
- **Notes**: context, edge cases, references
```

### Progress Tracking
- Track by completed tasks, not hours spent
- Update status: Not started → In progress → In review → Done
- Blockers should be escalated within 24 hours
- Review and re-prioritize weekly
