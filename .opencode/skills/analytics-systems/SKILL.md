---
name: analytics-systems
description: Building analytics systems covering event tracking, funnel analysis, cohort analysis, retention, A/B test analysis, and data pipeline design
license: MIT
compatibility: opencode
---

## analytics-systems

### Data Pipeline Architecture

```
[Client SDK] → [Event Collector] → [Buffer/Queue] → [Stream Processor]
                                                          ↓
[OLAP DB] ← [Batch ETL] ← [Data Lake (S3)] ← [Raw Events]
    ↓
[Dashboard API] → [Frontend]
```

### Event Tracking

- **Schema-on-write**: Define event name, properties, user_id, timestamp, session_id
- **Client SDK**: Instrument web/mobile apps with minimal payload (POST, gzip)
- **Server-side events**: Track critical business events from backend (purchases, refunds)
- **Identity resolution**: Merge anonymous → identified users via user_id mapping
- **Batching**: Send events in batches (every 5s or 500 events) to reduce requests

### Funnel Analysis

```sql
-- Step-by-step conversion query
SELECT step, COUNT(DISTINCT user_id) AS users
FROM events
WHERE event_name IN ('page_view', 'add_to_cart', 'checkout_start', 'purchase')
  AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY step
ORDER BY step
```

- Each step filters to users who completed the previous step (consecutive)
- Track drop-off rates between each step
- Support time-bounded funnels (e.g., complete within 7 days)

### Cohort & Retention Analysis

- **Cohort**: Group users by acquisition date (Week 0, Week 1, ...)
- **Retention**: % of cohort active in each subsequent period
- **Unbounded cohort queries**: Use sparse matrix, pre-aggregate daily active users
- **Churn prediction**: ML model on engagement decline patterns

### Aggregation Strategies

| Strategy | Latency | Accuracy | Use Case |
|----------|---------|----------|----------|
| Real-time (streaming) | Seconds | Approximate | Dashboards, alerts |
| Micro-batch (5 min) | Minutes | Near-exact | Operational reports |
| Daily batch | Hours | Exact | Financial reports, data export |

### Query Optimization

- Pre-aggregate rollups by day/week/month per dimension
- Use materialized views for common queries
- Partition by date, cluster by user_id for fast range scans
- Approximate count distinct (HyperLogLog) for high-cardinality metrics
