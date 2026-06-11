---
name: repository-analysis
description: Use when analyzing a new or unfamiliar code repository. Covers project structure discovery, dependency mapping, code quality assessment, and documentation extraction.
license: MIT
compatibility: opencode
---

## Repository Analysis

### Initial Scan
- Read `README.md`, `CONTRIBUTING.md`, `LICENSE`
- Check `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod` for deps and scripts
- Review `tsconfig.json`, `.eslintrc`, `prettier.config`, `.editorconfig` for conventions
- Check CI config (`.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`)

### Project Structure
```
src/          — source code
tests/        — test files
docs/         — documentation
scripts/      — build/deploy scripts
configs/      — configuration files
```

### Dependency Analysis
- Identify framework and major libraries
- Check for outdated/deprecated dependencies
- Map internal module dependencies (circular dependencies?)
- Look for duplicated functionality

### Code Quality Assessment
- Check test coverage (look for coverage reports or run `pytest --cov`)
- Run linter and note violations (use project's own lint config)
- Review error handling patterns
- Check for security issues: hardcoded secrets, unsanitized inputs, SQL injection risk

### Architecture Discovery
- Identify entry points (`main.py`, `index.ts`, `app.tsx`)
- Trace request/event flow: entry → middleware → handler → data layer → response
- Map component hierarchy (React component tree, module dependency graph)
- Document API routes and their data flow

### Documentation
- Extract API contracts (OpenAPI, GraphQL schema)
- Note undocumented modules or functions
- Identify missing README sections (setup, env vars, deployment)
- Check for inline docs quality (JSDoc, docstrings, comments)

### Report Format
```
# <repo-name> Analysis
- **Language/Framework**: ...
- **Test coverage**: X%
- **Lint score**: X errors, X warnings
- **Architecture**: ...
- **Strengths**: ...
- **Concerns**: ...
- **Recommendations**: ...
```
