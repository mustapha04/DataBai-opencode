---
name: performance-engineering
description: End-to-end performance engineering including requirements definition, load testing, stress testing, profiling, bottleneck analysis, capacity planning, modeling, and regression prevention
license: MIT
compatibility: opencode
---

## performance-engineering

### Performance Requirements
- **SLAs**: Latency (p50/p95/p99), throughput (RPS/TPS), error rate
- **SLOs**: Internal targets tighter than SLAs
- **Resource budgets**: CPU, memory, I/O, network per component

### Load Testing
| Tool | Use |
|---|---|
| k6 | Scriptable, CI-friendly |
| Locust | Python-based, distributed |
| Artillery | YAML config, Node.js |
| wrk / hey | HTTP benchmark, simple |

- Ramp-up patterns: step, spike, soak
- Production-like dataset and traffic mix

### Stress Testing
- Push beyond expected peak to find breaking point
- Test recovery: auto-scaling, circuit breakers, degradation
- Resource exhaustion tests (OOM, disk full, FD limit)

### Profiling
- **CPU**: `perf` (Linux), `pprof` (Go), `cProfile` (Python), `clinic` (Node)
- **Memory**: Heap dumps, GC logs, allocation profiles
- **I/O**: `iostat`, `iotop`, database query profiling
- **Async**: Event loop lag, connection pool waits

### Bottleneck Analysis
- USE method (Utilization, Saturation, Errors) per resource
- RED method (Rate, Errors, Duration) for services
- Flame graphs for CPU and wall-clock time

### Capacity Planning
- Trend analysis from historical metrics
- Linear / exponential growth models
- Scale-up vs scale-out cost analysis
- What-if scenarios (traffic spikes, new features)

### Performance Modeling
- Little's Law: `L = λW` (Concurrency = Throughput × Latency)
- Queuing theory for latency prediction under load
- Amdahl's Law for parallel speedup limits

### Regression Prevention
- CI gate with percentile latency checks
- Benchmark suite compared against baseline
- Trace comparisons for degraded endpoints
- Alert on performance budget violations
