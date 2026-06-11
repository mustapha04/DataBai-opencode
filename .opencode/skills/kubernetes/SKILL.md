---
name: kubernetes
description: Kubernetes patterns (Pod design, Deployments, Services, Ingress, ConfigMaps, Secrets, Persistent Volumes, Helm, operators, RBAC, resource quotas, auto-scaling, monitoring with Prometheus)
license: MIT
compatibility: opencode
---

## kubernetes

### Pod Design

- **Sidecar**: co-located helper container (logging, proxy, sync)
- **Init containers**: run to completion before app containers start
- **Resource requests/limits**: always set CPU/memory for predictability
- **PodSecurityContext**: set `runAsNonRoot`, `readOnlyRootFilesystem`
- **Lifecycle hooks**: `preStop` for graceful shutdown, `postStart` for initialization

### Deployments & Rollouts

- Use Deployments (not bare Pods) for stateless workloads
- Strategy: `RollingUpdate` (default) or `Recreate`
- Configure `maxSurge` and `maxUnavailable` for rollout speed
- Use readiness probes to ensure only healthy Pods receive traffic
- `kubectl rollout undo` for rollback

### Services & Networking

| Type | Use Case |
|------|----------|
| ClusterIP | Internal service discovery |
| NodePort | External traffic (dev/test) |
| LoadBalancer | Cloud LB integration |
| ExternalName | DNS alias to external service |

### Ingress

- Path-based and host-based routing
- TLS termination at the Ingress controller
- Annotations for rate limiting, CORS, rewrites
- Controllers: nginx, Traefik, HAProxy, AWS ALB, GKE Ingress

### ConfigMaps & Secrets

- ConfigMaps: environment variables or mounted files (non-sensitive)
- Secrets: base64-encoded, encrypted at rest with KMS
- Mount as volumes for auto-reload (with controller or reloader sidecar)
- Use External Secrets Operator or Sealed Secrets for GitOps

### Persistent Volumes

- `StorageClass` with reclaim policy (Retain, Delete, Recycle)
- Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany
- Use StatefulSets for stateful workloads (databases, queues)
- Volume snapshots for backup

### Helm

- Charts: templates + values, packaged as `.tgz`
- Use `helm template --validate` in CI
- Manage dependencies in `Chart.yaml`
- Avoid `tpl` and overly complex Go templates

### RBAC

- Principle of least privilege
- `Role` / `ClusterRole` → `RoleBinding` / `ClusterRoleBinding`
- ServiceAccounts for Pod-to-API communication
- Audit with `kubectl auth can-i`

### Auto-Scaling

| Resource | Metric | Action |
|----------|--------|--------|
| HPA | CPU/memory/custom metrics | Replicas |
| VPA | Historical usage | CPU/memory requests |
| KEDA | Queue length, event-driven | Replicas |
| Cluster Autoscaler | Pending Pods | Node count |

### Monitoring (Prometheus)

- ServiceMonitor and PodMonitor CRDs for scraping
- Node exporter for hardware metrics
- kube-state-metrics for cluster state
- Prometheus Operator for lifecycle management
- Alertmanager for routing and deduplication
