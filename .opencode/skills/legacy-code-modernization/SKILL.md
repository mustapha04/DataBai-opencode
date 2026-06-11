---
name: legacy-code-modernization
description: Use when updating or rewriting legacy systems. Covers assessment strategies, incremental migration patterns, strangler fig approach, and modernization decision frameworks.
license: MIT
compatibility: opencode
---

## Legacy Code Modernization

### Assessment
- **Understand the current system**: architecture, data model, dependencies
- **Find the seams**: places where new code can interface with old code
- **Identify risk areas**: non-tested code, hand-rolled ORM, no type safety
- **Define success criteria**: what does "modernized" mean for this system?

### Migration Strategies

#### Strangler Fig Pattern
1. Identify a bounded capability to replace
2. Build the new version alongside the old
3. Route traffic to the new version (feature flag, router)
4. Verify the new version works in production
5. Remove the old version

#### Branch by Abstraction
1. Introduce an interface/abstraction over the old implementation
2. Implement the new version behind the same interface
3. Swap the implementation at runtime (DI, config)
4. Remove the old implementation

#### Parallel Run
1. Run old and new systems simultaneously
2. Compare outputs for correctness
3. Switch over when confidence is high

### Modernization Targets (in order of ROI)
1. **Build system**: outdated build tools → modern (e.g., Make → Gradle, Webpack → Vite)
2. **Dependencies**: EOL frameworks → supported versions (e.g., AngularJS → React/Vue)
3. **Type safety**: untyped → TypeScript, Python type hints
4. **Testing**: manual/integration-first → unit-testable architecture
5. **Infrastructure**: VMs → containers, manual → IaC
6. **Data**: legacy storage → modern DB (e.g., Oracle → PostgreSQL)

### Risk Management
- Prefer incremental changes over big rewrites
- Keep a rollback plan for every migration step
- Measure everything: before/after latency, error rates, resource usage
- Shadow traffic: send real traffic to new system without affecting users

### Documentation
- Keep an ADR for each modernization decision
- Document the old system's quirks (known bugs, implicit contracts)
- Train the team on the new system before fully cutting over
- Update runbooks and operational docs
