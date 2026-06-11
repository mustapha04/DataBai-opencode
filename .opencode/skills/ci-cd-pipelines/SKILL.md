---
name: ci-cd-pipelines
description: CI/CD pipeline design covering GitHub Actions, GitLab CI, and Jenkins with stages, caching, artifact management, environment promotion, secret management, testing strategies, and deployment strategies
license: MIT
compatibility: opencode
---

## ci-cd-pipelines

### Pipeline Stages

```
[Code Push] → [Lint] → [Unit Test] → [Build] → [Integration Test]
                                                         ↓
[Production] ← [Smoke Test] ← [Staging Deploy] ← [Artifact Push]
```

1. **Lint/Format** – ESLint, Prettier, ruff (fast feedback, < 1 min)
2. **Unit Test** – Vitest, pytest, Jest (parallel execution)
3. **Build** – Compile, bundle, Docker image
4. **Integration/E2E Test** – Playwright, Cypress (parallel shards)
5. **Publish Artifact** – Push to registry (npm, Docker Hub, S3)
6. **Deploy Staging** – Auto-deploy to staging environment
7. **Smoke Test** – Health check, critical path validation
8. **Deploy Production** – Manual approval or auto-deploy

### Caching

| Cache Type | Key Strategy | Example |
|------------|-------------|---------|
| Dependencies | Lockfile hash | `npm cache` based on `package-lock.json` hash |
| Docker layers | Dockerfile hash | Layer caching via BuildKit |
| Build output | Branch + commit | Vite/CRA build artifacts |
| Playwright browsers | Version key | Browsers cached by version |

### Artifact Management

- Store built artifacts with versioned tags (`v1.2.3-build.456`)
- Use immutable artifact repositories (Docker registry, npm registry, S3)
- Retention policy: keep latest N versions, delete older than M days
- Signed/checksum-verified artifacts for supply chain security

### Environment Promotion

| Environment | Trigger | Approval | Configuration |
|-------------|---------|----------|---------------|
| Development | Push to branch | None | Feature flags, mock services |
| Staging | Merge to main | Auto | Production-like, anonymized data |
| Production | Git tag / release | Manual + time window | Live, secrets from vault |

### Secret Management

- **Never** hardcode secrets in repository
- Use platform-native secret stores: GitHub Actions Secrets, GitLab CI Variables, Jenkins Credentials
- For cloud: AWS Secrets Manager, Azure Key Vault, HashiCorp Vault
- Rotate secrets regularly, audit access
- Inject as environment variables or mounted files (Docker secrets)

### Deployment Strategies

| Strategy | Downtime | Risk | Complexity |
|----------|----------|------|------------|
| Rolling | None | Low | Low |
| Blue-green | None | Low | Medium |
| Canary | None | Very low | High |
| Feature flags | None | Very low | Medium |
| Recreate | Full | High | Low |

- **Rolling**: Incrementally replace instances (kubernetes `RollingUpdate`)
- **Blue-green**: Swap traffic between two identical environments
- **Canary**: Route small % traffic to new version, monitor, gradually increase
- **Feature flags**: Merge code but gate behind flag; enable via dashboard
