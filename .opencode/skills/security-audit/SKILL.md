---
name: security-audit
description: Security auditing methodology for identifying and remediating vulnerabilities
license: MIT
compatibility: opencode
---

## security-audit

### Audit Scope
- Define in-scope systems, APIs, data classifications, and infrastructure
- Exclude third-party systems explicitly (or mark for vendor assessment)
- Set testing boundaries (production vs staging; safe testing windows)
- Document assumptions and constraints before starting

### Threat Modeling
- Use STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation)
- Draw data flow diagrams to identify trust boundaries
- Identify assets, threat agents, and attack vectors
- Prioritize risks using DREAD or CVSS scoring
- Revisit threat models after major architectural changes

### Code Review for Security
- Review authentication, authorization, and session management first
- Check for injection vulnerabilities (SQL, NoSQL, OS command, LDAP, SSTI)
- Verify encryption at rest and in transit (TLS 1.2+, AES-256)
- Audit logging: sensitive data must never appear in logs
- Validate file upload handling (type, size, path traversal, malware scanning)

### Dependency Scanning
- Check for known CVEs in direct and transitive dependencies
- Review outdated or unmaintained libraries
- Verify license compliance (GPL, AGPL restrictions)
- Use SBoM generation (CycloneDX, SPDX) for inventory

### Configuration Review
- Harden default configurations (remove default creds, disable unused services)
- Review IAM policies for least privilege (AWS IAM, GCP IAM, Azure RBAC)
- Check network security groups / firewall rules (0.0.0.0/0 is a red flag)
- Verify logging & monitoring are enabled (CloudTrail, audit logs)
- Review CORS, CSP, HSTS, and other security headers

### Penetration Testing
- Start with automated scanning (OWASP ZAP, Nessus, Nuclei)
- Manual testing for business logic flaws and chained exploits
- Test API endpoints: rate limiting, auth bypasses, mass assignment
- Verify session management: token theft, fixation, CSRF
- Document each finding with reproduction steps and evidence

### Compliance Checks
| Framework | Focus Areas |
|-----------|-------------|
| SOC 2 | Controls, availability, confidentiality, privacy |
| PCI DSS | Cardholder data, encryption, access control |
| HIPAA | PHI protection, audit controls, BAA |
| GDPR | Data minimization, consent, right to deletion |
| FedRAMP | Cloud security, continuous monitoring |

### Reporting
- Executive summary for leadership (business impact, risk posture)
- Technical findings ranked by severity (Critical/High/Medium/Low/Info)
- Each finding: title, description, impact, reproduction steps, remediation guidance, CVSS score
- Track remediation: assign owner, target date, verification method
- Follow-up audit to verify fixes are effective
