---
name: growth-engineering
description: Growth engineering (experimentation infrastructure, feature flags, A/B testing, analytics instrumentation, funnel optimization, personalization, viral loops measurement)
license: MIT
compatibility: opencode
---

## growth-engineering

### Experimentation Infrastructure

- **Feature Flags**: server-side (LaunchDarkly, Unleash) and client-side flags with gradual rollouts
- **Assignment**: deterministic user bucketing, sticky assignments, consistent across sessions
- **Statistical Validity**: sample size calculation, minimum detectable effect, sequential testing
- **Guardrails**: monitor for negative impact on core metrics during experiments

### A/B Testing

| Component | Approach |
|-----------|----------|
| Randomization | Hash user ID to variant, stratified by segments |
| Metrics | Primary, secondary, and guardrail metrics |
| Analysis | Frequentist or Bayesian, with SRM checks |
| Duration | Minimum 1 full business cycle (usually 1-2 weeks) |

### Analytics Instrumentation

- **Track every meaningful user action**: clicks, page views, form submissions, API calls
- **Canonical event schema**: `{ event, user_id, session_id, timestamp, properties, context }`
- **Identify users**: consistent user identity across devices (logged-in ID, anonymous ID merge)
- **Raw data warehouse**: stream events to Snowflake/BigQuery/Redshift for flexible analysis

### Funnel Optimization

- Define funnel steps with clear entry/exit criteria
- Measure step-by-step conversion and drop-off
- Identify friction points (slow load, confusing UI, errors)
- Implement counterfactual analysis with holdout groups

### Personalization

- **Content**: personalized recommendations based on behavior
- **UI**: tailored onboarding, feature discovery, messaging
- **Pricing**: segment-based pricing experiments
- **Models**: collaborative filtering, bandit algorithms, sequence models

### Viral Loops

- Measure K-factor (invites sent × conversion rate per invite)
- Track sharing funnel: exposure → share → recipient click → recipient conversion
- Optimize share prompts (timing, placement, incentive)
- Monitor for loop saturation and spam risk

### Tooling

- Feature flag platforms: LaunchDarkly, Flagsmith, custom
- Analytics: Segment, Mixpanel, Amplitude, RudderStack
- Experimentation: Statsig, Eppo, Google Optimize, custom
- Data warehouse: Snowflake, BigQuery, ClickHouse
