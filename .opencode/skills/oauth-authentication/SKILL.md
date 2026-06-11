---
name: oauth-authentication
description: OAuth 2.0 and OIDC authentication covering authorization flows, token management, provider integration, security considerations, session management, and SSO implementation
license: MIT
compatibility: opencode
---

## oauth-authentication

### OAuth 2.0 Flows

| Flow | Use Case | Security Level |
|---|---|---|
| Authorization Code | Server-side web apps | High |
| PKCE | Mobile / SPAs | High |
| Client Credentials | Service-to-service | Medium |
| Device Code | CLI / TV / IoT | Medium |
| Implicit (deprecated) | Legacy SPAs | Low |

### Authorization Code + PKCE
1. Client generates `code_verifier` and `code_challenge` (S256)
2. Redirect user to `/authorize?response_type=code&code_challenge=...`
3. Exchange code at `/token` with `code_verifier`
4. Receive `access_token`, `refresh_token`, `id_token` (OIDC)

### Token Management
- **Access token** — Short-lived (15m), opaque or JWT
- **Refresh token** — Long-lived, rotate on use
- **ID token** — JWT, signed, contains claims (`sub`, `email`, etc.)
- Store securely: httpOnly cookies or secure client storage
- Validate: signature (`jwks_uri`), expiry, issuer, audience

### Provider Integration
- **OIDC discovery** `/.well-known/openid-configuration`
- Libraries: `openid-client`, `passport-{provider}`, NextAuth.js
- Always validate `nonce` and `state` parameters

### Security Considerations
- CSRF protection via `state` parameter
- Redirect URI strict allowlist
- `private_key_jwt` for client authentication
- Certificate pinning for token endpoints
- Rotate client secrets regularly

### Session Management
- Server sessions with Redis store
- JWT session with short expiry + refresh rotation
- Session revocation / logout — call `end_session_endpoint`
- Idle timeout and absolute timeout

### SSO Implementation
- Identity Provider (IdP): Keycloak, Okta, Auth0, Azure AD
- Service Provider initiates via OIDC request
- IdP-initiated SAML or OIDC
- Session federation across subdomains
- Logout: Front-channel (redirects) or back-channel (RP-initiated)
