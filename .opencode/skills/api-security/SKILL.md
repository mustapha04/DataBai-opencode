---
name: api-security
description: API security best practices covering rate limiting, input validation, authentication, authorization, CORS, CSRF, OWASP API Security Top 10, and common vulnerabilities
license: MIT
compatibility: opencode
---

## api-security

### OWASP API Security Top 10 (Key Items)

| Category | Vulnerability | Mitigation |
|----------|---------------|------------|
| API1 | Broken Object Level Authorization | Validate user owns the requested resource |
| API2 | Broken Authentication | Strong auth, MFA, short-lived tokens |
| API3 | Excessive Data Exposure | Return only necessary fields (use DTOs) |
| API4 | Lack of Resources & Rate Limiting | Per-user/IP rate limits, throttling |
| API5 | Broken Function Level Authorization | Role/permission checks on every admin endpoint |
| API6 | Mass Assignment | Reject unexpected fields, use allowlists |
| API7 | Security Misconfiguration | Disable directory listing, remove defaults |
| API8 | Injection | Parameterized queries, input sanitization |
| API9 | Improper Asset Management | Versioning, deprecation notices, doc access control |
| API10 | Unsafe Consumption of APIs | Validate upstream responses, timeouts |

### Authentication & Authorization

- **JWT**: Short-lived access tokens (15 min) + refresh tokens (7 days)
- **OAuth2**: Use authorization code flow with PKCE for SPAs
- **API keys**: For service-to-service, rotate regularly, scope per key
- **RBAC**: Check roles/permissions at middleware layer before route handler
- **ABAC**: Evaluate attributes (user, resource, environment) for fine-grained control

### Input Validation

- Validate all input at the boundary (JSON schema, Zod, class-validator)
- Reject unexpected fields to prevent mass assignment
- Content-Type enforcement (reject `application/xml` if not expected)
- Size limits on request body, URL length, file uploads

### Rate Limiting Strategies

| Strategy | Granularity | Example |
|----------|-------------|---------|
| Fixed window | Per IP | 100 req/min per IP |
| Sliding window | Per IP + endpoint | 1000 req/hr per user per route |
| Token bucket | Bursty traffic | 10 burst, 5 refill/sec |
| Concurrency | Active requests | Max 5 concurrent requests per user |

### CORS & CSRF

- **CORS**: Restrict `Access-Control-Allow-Origin` to specific origins, not `*`
- **CSRF**: Use SameSite=Strict/Lax cookies, CSRF tokens for cookie-based auth
- Prefer token-based auth (Authorization header) which is immune to CSRF

### Response Security Headers

```
Content-Security-Policy: default-src 'self'
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
X-Frame-Options: DENY
```
