---
name: secure-coding
description: Secure coding practices to prevent vulnerabilities throughout the SDLC
license: MIT
compatibility: opencode
---

## secure-coding

### Input Validation
- Validate on server-side (never trust client-side validation alone)
- Whitelist allowed characters/patterns instead of blacklisting
- Validate type, length, range, and format
- Use parameterized validation libraries (Joi, Zod, Pydantic, Cerberus)
- Reject unexpected input early; fail closed

### Output Encoding
- Context-aware encoding: HTML, URL, JavaScript, CSS, XML
- Use templating engines with auto-escaping (React, Jinja2, Thymeleaf)
- Avoid `dangerouslySetInnerHTML`, `innerHTML`, or `response.write(raw)`
- Sanitize rich HTML with libraries (DOMPurify, Bleach)

### Parameterized Queries
- Always use parameterized queries / prepared statements
- Never concatenate user input into SQL, NoSQL, or LDAP queries
- ORMs (Prisma, SQLAlchemy, TypeORM) provide parameterization by default
- Be aware of NoSQL injection (MongoDB `$where`, `$regex`)

### Secure Session Management
- Use HTTP-only, Secure, SameSite cookies
- Generate session IDs with CSPRNG (crypto.randomUUID)
- Session timeout: idle + absolute expiration
- Rotate session ID after login/privilege escalation
- Store sessions server-side; never expose session tokens in URLs

### CSP Headers
- Content-Security-Policy: `default-src 'self'`
- Restrict script-src, style-src, img-src, connect-src explicitly
- Use nonces or hashes for inline scripts instead of `'unsafe-inline'`
- Report-URI/report-to for violation monitoring
- Test CSP with report-only mode before enforcing

### Secrets Handling
- Never hardcode secrets in source code
- Use environment variables or secret manager (Vault, AWS Secrets Manager, GCP Secret Manager)
- Scan for committed secrets (git-secrets, truffleHog, Gitleaks)
- Rotate secrets regularly; revoke compromised secrets immediately
- Use `.env` files only for local dev; never commit them

### Dependency Scanning
- Run `npm audit`, `pip audit`, `cargo audit`, or OWASP Dependency-Check
- Monitor CVEs for direct and transitive dependencies
- Use Dependabot, Renovate, or Snyk for automated PRs
- Pin dependency versions; lock files are required
- Review licenses for compliance risk

### SAST / DAST Tools
| Tool Type | Examples | Stage |
|-----------|----------|-------|
| SAST (Static) | SonarQube, Semgrep, CodeQL, ESLint security plugin | Pre-commit / CI |
| DAST (Dynamic) | OWASP ZAP, Burp Suite, Nikto | Staging / Pre-prod |
| SCA | Snyk, Dependabot, Trivy, Grype | CI / Periodic |
| Secret scanning | Gitleaks, truffleHog, ggshield | Pre-commit / CI |
