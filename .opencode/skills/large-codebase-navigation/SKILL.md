---
name: large-codebase-navigation
description: Use when working with large monorepos or multi-module codebases (100K+ lines). Covers efficient navigation, modular boundaries, cross-cutting concerns, and scaling development workflows.
license: MIT
compatibility: opencode
---

## Large Codebase Navigation

### Mental Map
- Start with the dependency graph from the root/entry point outward
- Identify bounded contexts (separate apps, packages, modules) and their public APIs
- Document module boundaries — what each owns and what it delegates
- Use `#region` / directory structure to understand physical organization

### Finding Code Efficiently
- **By entry point**: trace from user-facing feature → handler → service → data layer
- **By error**: grep error messages or log statements to locate source
- **By test**: find test files matching the module name (`test_<module>.py`)
- **By config**: search for feature flags, route registrations, DI container entries
- **By schema**: find type definitions, database schemas, API contracts

### Cross-Cutting Concerns
Track these across the entire codebase:
- Logging framework and conventions
- Error handling strategy (custom exceptions? result types? HTTP codes?)
- Authentication/authorization boundaries
- Feature flags and their locations
- Telemetry/metrics instrumentation points

### Refactoring Safely
- Identify unused code (grep for exports/imports, coverage reports, IDE inspections)
- Isolate changes behind interfaces before refactoring internals
- Add characterization tests for code you don't fully understand
- Use feature flags to ship partially-done refactors

### Scaling Patterns
- Enforce module boundaries with architecture tests (e.g., `import-linter`)
- Use code ownership files (`CODEOWNERS`) for team responsibility
- Adopt a consistent module naming convention (e.g., `features/<name>/*`)

### Tools
- `rg` (ripgrep): fastest grep for large codebases
- `cloc`: count lines per language
- `depcruise` (dependency-cruiser): visualize JavaScript/TypeScript deps
- `pydeps`: visualize Python import dependencies
