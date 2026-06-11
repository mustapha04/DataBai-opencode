---
name: docker-expert
description: Docker expertise covering multi-stage builds, layer optimization, docker-compose, networking, volumes, health checks, security scanning, and orchestration patterns
license: MIT
compatibility: opencode
---

## docker-expert

### Multi-Stage Builds
- Separate build environment from runtime
- Builder stage: install SDKs, compile, run tests
- Runtime stage: copy only artifacts, minimal base image (distroless, alpine)
- Cache mount for package manager downloads

### Layer Optimization
- Combine `RUN` commands to reduce layers
- Order layers by change frequency (install deps first, copy code last)
- Use `.dockerignore` to exclude unnecessary files
- Leverage build cache: `--cache-from`

### Docker Compose
- Service definitions, networks, volumes, depends_on, health checks
- Profiles for dev/test/prod configurations
- `docker compose watch` for hot-reload during development

### Networking & Volumes
| Network Driver | Scope | Use Case |
|--------------|-------|----------|
| bridge | Single host | Default, container-to-container |
| host | Single host | Performance, no NAT |
| overlay | Multi-host | Swarm, Kubernetes (via CNI) |

- Named volumes for persistent data, bind mounts for development
- Volume drivers for remote storage (NFS, cloud)

### Health Checks & Resource Limits
- `HEALTHCHECK` instruction for container liveness
- `--memory`, `--cpus` to prevent noisy neighbors
- OOM kill policy and restart policies (`always`, `on-failure`)

### Security
- Image scanning (Trivy, Snyk, Docker Scout)
- Run as non-root user; drop capabilities
- Secrets via `--secret` (BuildKit) or docker secrets (swarm)
- Read-only root filesystem where possible

### Orchestration Patterns
- Blue/green deployments, canary releases
- Sidecar containers for logging, proxying
- Init containers for setup tasks
- Graceful shutdown with signal handling
