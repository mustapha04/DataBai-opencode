---
name: systematic-debugging
description: Systematic debugging process for identifying, isolating, and fixing software defects
license: MIT
compatibility: opencode
---

## systematic-debugging

### Debugging Process
1. **Reproduce** — Get a consistent, minimal reproduction of the issue
2. **Isolate** — Narrow down the root cause (binary search, remove variables)
3. **Hypothesize** — Form a theory of the cause based on evidence
4. **Test** — Verify the hypothesis with a targeted experiment
5. **Fix** — Apply the correction and verify it resolves the issue
6. **Verify** — Confirm the fix under real-world conditions; add regression tests

### Reproduction
- Record exact steps, inputs, environment, and state
- Create a minimal reproduction (remove extraneous code/data)
- Reproduce in a clean environment (fresh checkout, Docker container)
- Determine if it's deterministic or intermittent (race condition, timing)
- For intermittent bugs: collect logs, traces, and metrics from occurrences

### Isolation Techniques
| Technique | Description |
|-----------|-------------|
| Binary search | Comment out or toggle half the code at a time |
| Bisecting | `git bisect` to find the commit that introduced the bug |
| Divide & conquer | Disable components/modules until the bug disappears |
| Simplify input | Reduce input data until the failure shows a clear pattern |
| Log spamming | Add targeted log statements at suspected failure points |

### Debugging Tools
| Tool Type | Examples | Use Case |
|-----------|----------|----------|
| Debugger | GDB, LLDB, VS Code debugger, Chrome DevTools | Step through code, inspect variables |
| Profiler | perf, flamegraph, pprof, Xcode Instruments | CPU/memory hot spots |
| Tracer | strace, ltrace, dtrace, eBPF, Wireshark | System calls, network traffic |
| Log analyzer | ELK, Grafana Loki, Splunk, SigNoz | Aggregated log search and correlation |
| Memory checker | Valgrind, ASan, LeakSanitizer | Memory leaks, buffer overflows |

### Binary Search
- Apply bisection to code changes, input data, or configuration
- Use `git bisect start` + `git bisect good` / `git bisect bad`
- Automate bisect with `git bisect run <script>` for CI-friendly workflow
- Binary search on input: halve the dataset to find the exact failing case

### Log Analysis
- Use structured logging (JSON format) with correlation IDs
- Trace requests across services with distributed tracing (OpenTelemetry, Jaeger)
- Look for anomalies: error spikes, latency outliers, unusual request patterns
- Correlate logs from multiple sources by timestamp and trace ID
- Set up log alerts for known error patterns

### Rubber Ducking
- Explain the problem out loud to a rubber duck (or colleague)
- State assumptions explicitly; you'll often find the flaw yourself
- Walk through the code line by line, explaining what it should do vs what it does
- Document the debugging process as you go — writing forces clarity
