---
name: affiliate-systems
description: Affiliate marketing system design covering tracking, cookie attribution, commission calculation, fraud detection, payouts, and link generation
license: MIT
compatibility: opencode
---

## affiliate-systems

### Architecture Overview

```
[Affiliate Link] → [Redirect Server] → [Set Cookie] → [Landing Page]
                                                         ↓
[Fraud Check] ← [Commission Calc] ← [Conversion Track] ← [Purchase Event]
       ↓
[Payout Queue] → [Payment Processor] → [Affiliate Dashboard]
```

### Tracking Mechanisms

- **Cookie-based**: First-party cookie set on click; typical TTL 1–90 days
- **Last-click attribution**: Default model – last affiliate link before conversion gets credit
- **Multi-touch attribution**: Distribute credit across multiple touchpoints (linear, time-decay, U-shaped)
- **Unique link IDs**: `?ref=affiliate_id` or subdomains per affiliate
- **Server-side tracking**: POST pixel or webhook on conversion to avoid ad-blocker loss

### Commission Models

| Model | Description | Typical Use |
|-------|-------------|-------------|
| CPA (Cost Per Action) | Fixed payout per conversion | High-ticket items, signups |
| CPS (Cost Per Sale) | % of order value | E-commerce |
| Recurring | % of subscription value | SaaS, membership sites |
| Tiered | Rate increases with volume | Performance bonuses |
| Performance-based | Dynamic rate by conversion rate | Large affiliate networks |

### Fraud Detection

- **Click fraud**: Excessive clicks from same IP/user-agent in short window
- **Conversion fraud**: Fake transactions via stolen cards or self-referrals
- **Cookie stuffing**: Injecting affiliate cookies without user action
- **Detection strategies**: Rate limits, device fingerprinting, behavioral analysis, manual review thresholds

### Payout Flows

1. Affiliate accumulates commissions in pending status
2. Holding period (30–60 days) for refund/chargeback window
3. Minimum threshold check (e.g., $50 minimum)
4. Payment method selection (PayPal, bank transfer, store credit)
5. Batch payout run (weekly/bi-weekly/monthly)
6. Transaction recorded and status moved to paid

### Link Generation

- Redirect endpoint creates unique URL with affiliate code
- Store mapping of `ref` → affiliate ID in Redis for fast lookup
- Support deep-linking to product pages with query param passthrough
- QR code generation for offline campaigns
