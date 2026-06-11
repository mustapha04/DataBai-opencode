---
name: cloud-security
description: Cloud security fundamentals including shared responsibility model, IAM, encryption, network security, compliance, secrets management, and monitoring
license: MIT
compatibility: opencode
---

## cloud-security

### Core Concepts
- **Shared Responsibility Model** — understand what the cloud provider secures vs. what the customer secures
- **Defense in Depth** — layer security controls (network, identity, application, data)

### IAM Best Practices
- Least privilege principle, role-based access control (RBAC), policy conditions
- Use temporary credentials (STS, OIDC) over long-lived keys
- Regular access reviews and policy simulation

### Encryption
| Layer | At Rest | In Transit |
|-------|---------|------------|
| Approach | Server-side encryption with KMS; client-side encryption | TLS 1.2+; mTLS for service-to-service |
| Key Mgmt | Automatic key rotation; HSM-backed keys | Certificate lifecycle management |

### Network Security
- VPC segmentation, security groups, network ACLs, private subnets
- API gateways, WAF, DDoS protection
- Zero-trust architecture with service meshes

### Secrets Management
- Dedicated vaults (AWS Secrets Manager, HashiCorp Vault, GCP Secret Manager)
- Never hardcode secrets — inject via environment or sidecar
- Automatic rotation and audit logging

### Compliance & Monitoring
- Compliance frameworks (SOC 2, HIPAA, PCI-DSS, FedRAMP)
- Security monitoring: SIEM, anomaly detection, CSPM
- Threat detection (GuardDuty, Security Command Center, Defender for Cloud)
- Incident response playbooks and forensic readiness
