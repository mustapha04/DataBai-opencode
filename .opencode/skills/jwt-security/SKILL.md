---
name: jwt-security
description: JWT security best practices (token structure, signing algorithms, expiration, refresh tokens, revocation, storage, CSRF protection, claims validation, common vulnerabilities)
license: MIT
compatibility: opencode
---

## jwt-security

### Token Structure

A JWT consists of three Base64URL-encoded parts separated by dots:

```
header.payload.signature
```

- **Header**: `{ "alg": "RS256", "typ": "JWT", "kid": "key-id" }`
- **Payload**: claims (registered, public, private)
- **Signature**: HMAC or asymmetric encryption of header + payload

### Signing Algorithms

| Algorithm | Type | Use Case |
|-----------|------|----------|
| HS256 | Symmetric (HMAC+SHA256) | Single service, no key distribution needed |
| RS256 | Asymmetric (RSA+SHA256) | Multi-service, verification without secret |
| ES256 | Asymmetric (ECDSA) | Compact keys, better performance than RSA |

**Never** use `alg: "none"` or accept algorithm confusion attacks (verify the algorithm matches expectations).

### Claims Validation

Always validate these claims on every request:

| Claim | Validation |
|-------|------------|
| `exp` | Must be in the future (with grace window) |
| `nbf` | Must be in the past |
| `iss` | Must match the expected issuer |
| `aud` | Must contain the expected audience |
| `iat` | Should be reasonable (not far in past/future) |

### Expiration & Refresh

- Access tokens: short-lived (5-30 minutes)
- Refresh tokens: longer-lived (days/weeks), stored securely
- Refresh token rotation: issue a new refresh token on each refresh, invalidate the old one
- Refresh token reuse detection: revoke all tokens for a user if a used refresh token is replayed

### Revocation

- Maintain a blocklist/deny list for compromised tokens (until natural expiry)
- Use a token version stored in the user record; increment to invalidate all tokens
- For high-security: check a revocation store (Redis) on every request

### Storage

| Storage | Security | XSS Risk | CSRF Risk |
|---------|----------|----------|-----------|
| `httpOnly` cookie | High | None | Requires SameSite/CSRF token |
| `localStorage` | Low | High | None |
| `sessionStorage` | Low | High (tab-scoped) | None |
| Memory variable | High | None | None (but lost on refresh) |

**Recommendation**: `httpOnly` + `Secure` + `SameSite=Strict` cookie for access tokens. Refresh tokens in a separate `httpOnly` cookie with `Path=/auth`.

### CSRF Protection

- Use `SameSite=Strict` or `SameSite=Lax` cookie attribute
- CSRF tokens for state-changing requests
- Custom request headers (e.g., `X-Requested-By`) checked server-side

### Common Vulnerabilities

- **alg: none**: reject unsigned tokens
- **Weak secret**: use strong secrets (>256 bits) for HS256
- **Token injection in headers**: validate bearer token format
- **Timing attacks**: use constant-time comparison for HMAC
- **JWK injection**: never trust `jwk` or `jku` header parameters from untrusted sources
