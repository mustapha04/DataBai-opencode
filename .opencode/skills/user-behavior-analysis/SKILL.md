---
name: user-behavior-analysis
description: User behavior analysis techniques for product insights and data-driven decisions
license: MIT
compatibility: opencode
---

## user-behavior-analysis

### Event Tracking
- Define a tracking plan before instrumenting events
- Standard event structure: `{ event, user_id, properties, timestamp, session_id }`
- Track key actions: signup, login, feature use, purchase, churn triggers
- Auto-capture page views, clicks, form submissions with SDK
- Avoid PII in event properties; use anonymized identifiers
- Version your event schemas (breaking changes should create new events)

### Session Recording
- Record user screen sessions (mouse movements, clicks, scrolls) for qualitative analysis
- Sample recordings (1-5% of users) to manage storage costs
- Mask sensitive fields (passwords, credit cards, PII) automatically
- Tag interesting sessions (conversion, error, rage clicks)
- Analyze replays to identify UX friction and bugs

### Heat Maps
- Click maps: where users click most frequently
- Scroll maps: how far users scroll down a page
- Move maps: mouse movement patterns (attention proxies)
- Device segmentation: desktop vs mobile heat maps differ
- A/B test variations with heat map overlay for comparison

### Funnel Analysis
- Define funnel steps (e.g., visit → signup → onboarding → first action → paid)
- Calculate conversion rate between each step and overall
- Identify drop-off points and investigate causes
- Segment funnels by traffic source, device, user cohort
- Time-based funnels: how long between steps

### Cohort Analysis
- Group users by shared characteristic (signup week, acquisition channel, plan)
- Track retention, engagement, and revenue per cohort over time
- Weekly/monthly cohort tables for recurring usage patterns
- Compare cohorts to measure impact of product changes
- Classic metrics: Day 1/7/30 retention, Weekly Active Users

### User Segmentation
| Segment Type | Example | Purpose |
|-------------|---------|---------|
| Demographic | Age, location, role | Personalization |
| Behavioral | Power users, dormant users | Engagement strategies |
| Acquisition | Organic, paid, referral | Channel optimization |
| Plan | Free, Pro, Enterprise | Feature adoption, churn |
| Technographic | Browser, device, OS | Technical decisions |

### Behavioral Cohorts
- Define user segments by actions taken (not just static attributes)
- Examples: "Users who completed onboarding", "Users who invited a teammate"
- Trigger automated campaigns based on behavioral events
- Score users by engagement (RFM: Recency, Frequency, Monetary)
- Use behavioral cohorts for personalized onboarding and retention flows

### Product Analytics Tools
| Tool | Strengths |
|------|-----------|
| Amplitude | Funnel, cohort, retention, user paths |
| Mixpanel | Event tracking, segmentation, A/B testing |
| Heap | Auto-capture, retroactive analysis |
| PostHog | Open-source, session recording, feature flags |
| Pendo | In-app guides, NPS, product analytics |
| FullStory | Session replay, heat maps, rage clicks |

### Privacy Compliance
- Obtain consent before tracking (cookie banners, opt-in)
- Anonymize IP addresses and user identifiers
- Support data deletion requests (GDPR right to erasure)
- Data retention policies: set TTL on raw event data
- Use privacy-safe analytics (Plausible, Fathom) as alternatives
- Document all tracking in a data inventory / ROPA
