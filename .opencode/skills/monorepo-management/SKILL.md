---
name: monorepo-management
description: Use when setting up, maintaining, or scaling a monorepo. Covers tooling, dependency management, CI strategies, code ownership, and monorepo best practices.
license: MIT
compatibility: opencode
---

## Monorepo Management

### Tooling
| Tool | Language | Features |
|---|---|---|
| turborepo | JS/TS | Cached builds, parallel tasks, remote caching |
| nx | JS/TS, Python, Go | Task graph, affected commands, distributed execution |
| Bazel | Any | Hermetic builds, incremental, multi-language |
| pants | Python, Scala, Go | Fast, incremental, dependency graph |
| rush | JS/TS | Version management, publish workflow |

### Directory Structure
```
apps/           — deployable applications
packages/       — shared libraries
tools/          — build tools, scripts
configs/        — shared configs (eslint, tsconfig, prettier)
docs/           — project documentation
scripts/        — CI scripts, release scripts
```

### Dependency Management
- All packages in the monorepo should use compatible dependency versions
- Use workspace protocol (`workspace:*`) for internal package references
- Hoist shared dependencies to the root `node_modules` / `site-packages`
- Run `npm dedupe` / `poetry lock --no-update` to resolve conflicts
- Audit for duplicate packages: `npm ls --all | grep deduped`

### CI Strategy
- Use "affected" detection: only build/test packages changed in the PR
- Pipeline stages: lint → typecheck → test → build → deploy
- Cache `node_modules`, build artifacts, and test results across CI runs
- Parallelize across packages: independent packages test concurrently
- Set up a CI dashboard showing build times per package

### Code Ownership
- `CODEOWNERS` file at root: `apps/auth/* @team-auth`
- Each package has its own README with owner info
- Architecture Decision Records (ADRs) at `docs/adrs/`
- Enforce cross-package dependencies via tooling rules

### Release Strategy
- Independent versioning per package (not a single monorepo version)
- Auto-generate changelogs from conventional commits per package
- Publish using changesets or semantic-release per package
- Tag releases: `pkg-name@1.2.3`

### Scaling Considerations
- Over 100 packages: consider Bazel or Nx for incremental builds
- Over 50 developers: enforce strict CODEOWNERS and PR size limits
- Over 10 apps: shared CI caching becomes critical
- Monthly dependency audit to prevent version drift
