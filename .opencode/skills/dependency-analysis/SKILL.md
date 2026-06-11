---
name: dependency-analysis
description: Use when analyzing, auditing, or cleaning up project dependencies. Covers dependency graphs, version conflicts, unused deps, security vulnerabilities, and upgrade strategies.
license: MIT
compatibility: opencode
---

## Dependency Analysis

### Inventory
- Catalog all direct and transitive dependencies
- Distinguish prod vs dev dependencies
- Note which deps are pinned vs using ranges (`^1.2.3`, `~1.2.3`, `1.2.3`)
- Identify peer dependencies that must be satisfied by consumers

### Dependency Graph
- Visualize: `npm ls --all`, `pipdeptree`, `cargo tree`, `go mod graph`
- Look for:
  - Duplicate packages (different versions of the same package)
  - Circular dependencies
  - Deep dependency trees (excessive nesting)
  - Unexpected transitive dependencies (wrong package pulled in)

### Version Conflicts
- Check for major version mismatches (dep A needs lodash@3, dep B needs lodash@4)
- Use `npm dedupe`, `yarn dedupe`, `pip-compile` to resolve
- For monorepos: ensure workspace packages share compatible versions
- Use lockfiles (`package-lock.json`, `yarn.lock`, `poetry.lock`, `Cargo.lock`)

### Security Audit
- Run `npm audit`, `pip-audit`, `cargo audit`, `safety check`
- Review known CVEs in dependencies
- Check for deprecated or unmaintained packages
- Verify package signatures where available

### Unused Dependencies
- Detect: `depcheck` (JS), `pipenv graph --reverse`, `cargo-udeps`, `go mod tidy`
- Remove unused deps one at a time, running tests after each removal
- Be careful with implicit deps (plugins, loaders, type packages)

### Upgrade Strategy
- **Major**: evaluate breaking changes via changelogs, upgrade one at a time
- **Minor**: batch upgrades, run full test suite
- **Patch**: auto-merge (Dependabot/Renovate) if tests pass
- Use `npm outdated`, `pip list --outdated`, `cargo outdated` for candidates

### Enforcing Policies
- Lock dependency versions in CI (prevent unpinned installations)
- Use Dependabot or Renovate for automated PR updates
- Block PRs with vulnerable deps via CI checks
- Regular audit schedule: weekly automated, monthly manual review
