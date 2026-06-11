---
name: aws-architecture
description: AWS architecture patterns covering VPC design, multi-AZ, auto-scaling, load balancing, RDS, ElastiCache, S3, CDN, and Well-Architected Framework pillars
license: MIT
compatibility: opencode
---

## aws-architecture

### Well-Architected Framework Pillars

| Pillar | Focus |
|--------|-------|
| Operational Excellence | Run and monitor systems, continuously improve processes |
| Security | Protect data, identity, and access |
| Reliability | Recover from failures, scale with demand |
| Performance Efficiency | Use resources efficiently, right-sizing |
| Cost Optimization | Eliminate waste, use managed services |
| Sustainability | Minimize environmental impact |

### VPC Design

- **Multi-AZ**: Minimum 2 AZs, each with public, private, and database subnets
- **NAT Gateway**: Private subnets route through NAT in public subnets for outbound traffic
- **Security Groups**: Stateful, per-resource firewall – default-deny
- **NACLs**: Stateless, subnet-level rule – use for IP blocklists
- **VPC Endpoints**: Private access to S3, DynamoDB, others without internet gateway
- **Transit Gateway**: Connect multiple VPCs and on-premises networks

### Compute & Auto-scaling

- **ALB**: Layer 7 routing, path-based, host-based, WebSocket support
- **Auto Scaling Groups**: Launch template, min/max/desired capacity, health checks
- **Scaling policies**: Target tracking (CPU 70%), scheduled, step scaling
- **Spot instances**: For fault-tolerant, stateless workloads (60-90% discount)
- **Warm pools**: Pre-initialized instances to reduce scaling latency

### Data Layer

| Service | Use Case | Pattern |
|---------|----------|---------|
| RDS (Aurora) | Relational, ACID | Multi-AZ, read replicas, auto-scaling storage |
| ElastiCache (Redis) | Caching, sessions | Cluster mode, replica shards, backup |
| DynamoDB | NoSQL, high-scale | On-demand or provisioned, DAX for caching |
| S3 | Object storage | Standard/IA/Glacier tiers, versioning, replication |
| RDS Proxy | Connection pooling | Reduce Lambda cold start connection overhead |

### CDN & Edge

- **CloudFront**: Global edge cache, HTTPS termination, WAF integration
- **Lambda@Edge**: Lightweight request/response modification at edge
- **Origin Shield**: Additional caching layer to reduce origin load

### Cost Optimization

- Use Savings Plans / Reserved Instances for steady-state workloads
- S3 lifecycle policies to transition to IA/Glacier
- Right-size RDS instances using CloudWatch metrics
- Delete orphaned EBS volumes, unused Elastic IPs
- Use Compute Optimizer for instance type recommendations
