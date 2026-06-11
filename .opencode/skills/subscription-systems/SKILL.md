---
name: subscription-systems
description: Subscription system design including billing, metering, plans, and revenue management
license: MIT
compatibility: opencode
---

## subscription-systems

### Billing Models
| Model | Description | Example |
|-------|-------------|---------|
| Flat-rate | Fixed price per period | Netflix, Spotify |
| Per-seat | Price per active user | Slack, Notion |
| Tiered | Different feature/usage levels | GitHub, Intercom |
| Usage-based | Pay per consumption unit | AWS, Stripe, Twilio |
| Hybrid | Base + overage / metered add-ons | Linear, Vercel |

### Metered Billing
- Track usage events in real-time (API calls, storage, compute)
- Batch usage records and send to billing provider periodically
- Use usage metering APIs (Stripe, Chargebee, Metronome)
- Handle race conditions: idempotent usage reporting
- Audit trail: store raw usage logs for dispute resolution
- Set hard caps or soft warnings before overage charges

### Tier Management
- Define feature matrix per tier (free, pro, enterprise)
- Limit throttling: rate limits, storage caps, user counts
- Allow add-on modules (premium features, extra seats)
- Grandfather existing customers on plan changes
- Document tier boundaries clearly in pricing page

### Proration
- Calculate credit for unused time on old plan
- Charge immediately for new plan (invoice prorated amount)
- Options: `bill-immediately` vs `prorate-on-next-invoice`
- Handle upgrades, downgrades, and mid-cycle cancellations
- Show proration details to users for transparency

### Dunning
- Automated retry on failed payment (3-5 attempts with increasing intervals)
- Notify customer via email/in-app before retries
- Provide update payment method link in dunning emails
- After max retries: downgrade to read-only/free tier or suspend
- Stripe's built-in dunning handles most cases; custom for complex needs

### Trial Management
- Define trial length (7, 14, 30 days — common)
- Free trials without payment method (higher conversion) vs with (lower churn)
- Trial → paid conversion: send reminders before trial ends
- Prevent abuse: limits per email/device/payment method
- Allow trial extension for enterprise sales cycles

### Plan Changes
- Upgrades: immediate activation with prorated charge
- Downgrades: immediate or end-of-billing-cycle
- Handle feature access changes on plan switch (gates, limits)
- Notify users of changes (email, in-app banner)
- Audit log all plan changes for billing support

### Invoicing
- Generate invoices on subscription events (creation, renewal, change)
- Include line items: plan, add-ons, credits, taxes, discounts
- Support tax calculation (Stripe Tax, TaxJar, Avalara)
- PDF invoices downloadable from customer portal
- Net terms for enterprise: 30, 60, 90 days

### Revenue Recognition
- Track MRR, ARR, churn rate, LTV, CAC
- Deferred revenue for annual prepaid subscriptions
- ASC 606 compliance: recognize revenue over service period
- Use analytics tools (Baremetrics, ChartMogul, ProfitWell)
- Segment revenue by plan, region, acquisition channel

### Analytics
| Metric | Definition |
|--------|------------|
| MRR | Monthly recurring revenue |
| ARR | MRR × 12 |
| Churn rate | % of customers lost per period |
| LTV | Avg revenue per customer over lifetime |
| CAC | Cost to acquire a new customer |
| LTV:CAC | Health ratio (>3x is healthy) |
| Net Revenue Retention | Revenue from existing customers including upgrades/downgrades |
