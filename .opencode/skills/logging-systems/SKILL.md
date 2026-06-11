---
name: logging-systems
description: Logging systems design (structured logging, log levels, centralized logging, log retention, correlation IDs, sampling, alerting, PII redaction, distributed tracing integration)
license: MIT
compatibility: opencode
---

## logging-systems

### Structured Logging

Every log entry is a JSON object with consistent fields:

```json
{
  "timestamp": "2026-06-11T12:00:00Z",
  "level": "info",
  "message": "Order processed",
  "service": "order-service",
  "trace_id": "abc123",
  "user_id": "user_456",
  "order_id": "ord_789",
  "duration_ms": 42,
  "metadata": { ... }
}
```

### Log Levels

| Level | Use Case |
|-------|----------|
| DEBUG | Development diagnostics, no production use |
| INFO | Normal operations (requests, state transitions) |
| WARN | Unexpected but handled situations (retries, fallbacks) |
| ERROR | Failures requiring human attention |
| FATAL | Process-aborting conditions |

### Centralized Logging

| Stack | Components |
|-------|------------|
| ELK | Elasticsearch + Logstash + Kibana |
| Loki | Grafana Loki + Promtail + Grafana |
| Cloud | CloudWatch, Azure Monitor, GCP Logging |
| SaaS | Datadog, Splunk, Sumo Logic |

### Correlation IDs

- Generate a unique trace ID per request at the edge (gateway/ingress)
- Propagate via HTTP headers (`X-Request-Id`, `traceparent`)
- Include in every log entry, downstream RPC call, and queue message
- Use OpenTelemetry for cross-service trace propagation

### Sampling

- **Head-based**: sample at ingress (e.g., 1% of all requests)
- **Tail-based**: sample based on outcome (always sample errors)
- **Rate-limited**: cap logs per service per minute
- **Adaptive**: increase sampling during incidents for detail

### Alerting

- Alert on ERROR/FATAL rate spikes (not individual occurrences)
- Use SLI-based alerting (e.g., log error ratio > 1% over 5m)
- Avoid alert fatigue: deduplicate, group by cause, set minimum severity
- Route alerts to appropriate on-call channels (PagerDuty, Slack)

### PII Redaction

- Never log raw passwords, tokens, credit card numbers, or personal data
- Use structured logging to automatically redact known PII fields
- Implement patterns: `email`, `phone`, `ssn`, `credit_card`
- Mask values: `"user@example.com"` → `"use***@example.com"`

### Distributed Tracing Integration

- Log entries carry `trace_id`, `span_id`, `parent_span_id`
- Correlate logs with traces via trace ID in log entries
- OpenTelemetry SDK auto-instruments common frameworks
- Unified view: traces in Grafana Tempo/Jaeger, logs in Loki/Elasticsearch
