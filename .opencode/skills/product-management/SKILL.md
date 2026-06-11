---
name: product-management
description: Technical product management covering requirements gathering, prioritization frameworks, roadmap planning, stakeholder communication, sprint planning, metrics definition, and A/B testing
license: MIT
compatibility: opencode
---

## product-management

### Requirements Gathering
- User stories with acceptance criteria (Given/When/Then)
- Epic breakdown into technical tasks
- Personas, user journey maps
- Stakeholder interviews, surveys, analytics review

### Prioritization Frameworks

| Framework | Decision Criteria |
|---|---|
| **RICE** | Reach × Impact × Confidence / Effort |
| **MoSCoW** | Must-have, Should-have, Could-have, Won't-have |
| **ICE** | Impact × Confidence × Ease |
| **Kano** | Basic vs Performance vs Delight features |

### Roadmap Planning
- Now / Next / Later horizon model
- Theme-based (not feature-based) roadmaps
- Quarterly OKRs linked to roadmap items
- Public vs internal roadmap distinction

### Stakeholder Communication
- Weekly written updates (what shipped, what's next, blockers)
- Demo cadence every 1-2 sprints
- Escalation path for blocked items
- Trade-off communication with data

### Sprint Planning
- Velocity-based capacity planning
- Story point estimation (Fibonacci or t-shirt sizes)
- Sprint goal aligned to OKR
- Retrospective action items tracked

### Metrics Definition
| Metric Type | Examples |
|---|---|
| Engagement | DAU/MAU, session duration |
| Retention | Day 1/7/30 retention, churn |
| Revenue | MRR/ARR, LTV, conversion |
| Quality | P95 latency, error rate, NPS |

### A/B Testing
- Hypothesis formulation (we believe X will cause Y)
- Statistical significance (p < 0.05), power calculation
- Minimum sample size before analysis
- Guardrail metrics to detect regressions
- Feature flags for gradual rollout
