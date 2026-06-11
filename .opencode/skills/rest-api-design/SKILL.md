---
name: rest-api-design
description: REST API design covering resource naming, HTTP methods, status codes, pagination, filtering, sorting, HATEOAS, versioning, error responses, OpenAPI documentation, rate limiting, and idempotency
license: MIT
compatibility: opencode
---

## rest-api-design

### Resource Naming
- Nouns, not verbs: `/users` not `/getUsers`
- Plural: `/users`, `/users/:id/orders`
- Kebab-case for multi-word: `/order-items`
- Nest sparingly (max 2 levels deep)

### HTTP Methods

| Method | Action | Idempotent |
|---|---|---|
| `GET` | Read | Yes |
| `POST` | Create | No (new resource each call) |
| `PUT` | Replace | Yes |
| `PATCH` | Partial update | No* |
| `DELETE` | Remove | Yes |

(\*) PATCH can be made idempotent with conditional requests using ETag.

### Status Codes
| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created (after POST) |
| 204 | No Content (after DELETE) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 5xx | Server Error |

### Pagination
```
GET /users?page=2&per_page=20
```
- Cursor-based for large/real-time datasets: `?cursor=abc123&limit=20`
- Response includes `{ data, meta: { total, page, per_page } }` or `next_cursor`
- Link headers for pagination navigation

### Filtering, Sorting, Searching
- **Filter**: `?status=active&role=admin`
- **Sort**: `?sort=-created_at,name` (desc with `-`)
- **Search**: `?q=search-term` (full-text, separate from filter)
- Compound: `?filter[status]=active&sort=-created_at`

### HATEOAS
```json
{
  "data": { "id": 1, "name": "Alice" },
  "_links": {
    "self": "/users/1",
    "orders": "/users/1/orders",
    "update": { "method": "PATCH", "href": "/users/1" }
  }
}
```

### Versioning
- URI-based: `/v1/users`, `/v2/users`
- Header-based: `Accept: application/vnd.api+json;version=2`
- Maintain older versions for at least one deprecation cycle
- Document breaking changes per version

### Error Responses
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "email", "message": "must be a valid email" }
    ]
  }
}
```

### API Documentation (OpenAPI)
- `openapi: "3.1.0"` spec
- Auto-generated from code annotations (Swagger, FastAPI)
- Example requests/responses for every endpoint
- Authentication scheme documented in components/securitySchemes

### Rate Limiting
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- 429 response with `Retry-After` header
- Per-user or per-API-key tokens

### Idempotency
- `Idempotency-Key` header on POST/PATCH
- Store key with response for replay dedup
- Expire after TTL (24h)
- Return cached response for duplicate key within window
