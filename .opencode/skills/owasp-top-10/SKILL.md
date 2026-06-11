---
name: owasp-top-10
description: OWASP Top 10 vulnerability detection, prevention, and testing covering injection, broken auth, XSS, IDOR, misconfiguration, cryptographic failures, SSRF, and logging/monitoring
license: MIT
compatibility: opencode
---

## owasp-top-10

### A01 — Broken Access Control
- **Detection**: Missing role checks, direct object references
- **Prevention**: Centralized authorization middleware, least privilege
- **Testing**: Attempt access as unauthenticated / low-privilege user

### A02 — Cryptographic Failures
- **Detection**: Plaintext secrets, weak ciphers, missing TLS
- **Prevention**: Use Argon2/bcrypt for passwords, TLS 1.2+, key rotation
- **Testing**: Check for exposed secrets in configs/logs

### A03 — Injection (SQL, NoSQL, OS, LDAP)
- **Detection**: Unsanitized input in queries
- **Prevention**: Parameterized queries, ORM, input validation, escaping
- **Testing**: Fuzz inputs with payload strings (`' OR 1=1--`)

### A04 — Insecure Design
- **Detection**: Missing rate limits, trust assumptions
- **Prevention**: Threat modeling, security requirements in design phase
- **Testing**: Business logic abuse testing

### A05 — Security Misconfiguration
- **Detection**: Default creds, debug endpoints, verbose errors
- **Prevention**: Hardened configs, minimal attack surface, automated scans
- **Testing**: Scan with OWASP ZAP / Nessus

### A06 — Vulnerable & Outdated Components
- **Detection**: Old library versions with CVEs
- **Prevention**: Dependabot/Renovate, SBOM, regular updates
- **Testing**: `npm audit`, `pip-audit`, Grype, Trivy

### A07 — Identification & Authentication Failures
- **Detection**: Weak password policy, no MFA, session fixation
- **Prevention**: MFA, password strength rules, secure session mgmt
- **Testing**: Attempt brute force, session replay, CSRF

### A08 — Software & Data Integrity Failures
- **Detection**: Unsigned updates, insecure CI/CD
- **Prevention**: Sign artifacts, verify supply chain (SLSA)
- **Testing**: Check signature enforcement, CI pipeline security

### A09 — Security Logging & Monitoring Failures
- **Detection**: No audit trail, missing alerts
- **Prevention**: Structured logging, centralized SIEM, alert rules
- **Testing**: Verify logs capture auth failures, privilege changes

### A10 — Server-Side Request Forgery (SSRF)
- **Detection**: User-controlled URLs fetched server-side
- **Prevention**: Allowlist destinations, disable URL scheme recursion, network segmentation
- **Testing**: Attempt internal network requests (`http://169.254.169.254/`)
