---
name: monitoring-observability
description: Monitoring and observability (metrics, logging, distributed tracing, alerting, dashboards, SLI/SLO, on-call practices, runbooks, tools)
license: MIT
compatibility: opencode
---

## monitoring-observability

### Three Pillars

| Pillar | What | Example |
|--------|------|---------|
| Metrics | Numerical measurements over time | Request rate, error rate, latency |
| Logs | Structured event records | Error stack traces, audit events |
| Traces | End-to-end request paths | Span tree across services |

### Metrics Frameworks

- **RED Method**: Rate, Errors, Duration (for services)
- **USE Method**: Utilization, Saturation, Errors (for resources)
- **Four Golden Signals**: Latency, Traffic, Errors, Saturation

### SLI / SLO / Error Budgets

- SLI: measured value (e.g., p99 latency = 180ms)
- SLO: target (e.g., p99 latency < 200ms, 99.9% of the time over 30d)
- Error budget: 100% - SLO = allowable failures
- Burn rate: how fast error budget is consumed; alert on high burn rate

### Alerting

| Severity | Response | Example |
|----------|----------|---------|
| P0 | Immediate (page) | Service down, data loss |
| P1 | <15 min (page) | High error rate, high latency |
| P2 | <1 hour (ticket) | Degraded performance |
| P3 | Next business day | Low disk space, minor warnings |

- Alert on symptoms, not causes
- Use alert fatigue reduction: deduplication, grouping, minimum duration
- Multi-window, multi-burn-rate alerts for SLO-based alerting

### Dashboards

- **Executive/overview**: uptime, SLO compliance, major incidents
- **Service dashboard**: RED metrics per service, dependency health
- **Resource dashboard**: CPU, memory, disk, network per host
- **Business dashboard**: DAU, conversion, revenue, funnels

### Tools

| Category | Tools |
|----------|-------|
| Metrics | Prometheus + Thanos, Datadog, Grafana Mimir |
| Logging | ELK, Loki, Datadog Logs, Splunk |
| Tracing | Jaeger, Grafana Tempo, Datadog APM, Honeycomb |
| Alerting | Alertmanager, PagerDuty, Opsgenie |
| On-call | PagerDuty, Opsgenie, Grafana OnCall |
| OpenTelemetry | Collector, SDK, OTLP protocol |

### On-Call Practices

- Follow-the-sun rotation for global teams
- Maximum 12-hour shifts for primary on-call
- Clear escalation path: primary → secondary → engineering manager
- Blameless postmortems within 48 hours of incident
- Regular incident drills and game days

### Runbooks

- Written for every alert that pages
- Include: symptom → diagnosis → remediation steps → verification
- Auto-link from alert to runbook
- Script automated recovery where possible
- Review and update quarterly

### Distributed Tracing

- Trace = tree of spans; each span = operation within a service
- Propagation: `traceparent` header (W3C Trace Context)
- Sampling: head-based for low-volume, tail-based for high-volume
- Critical for identifying latency bottlenecks in request paths
