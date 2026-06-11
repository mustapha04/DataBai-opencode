---
name: fastapi-templates
description: FastAPI application templates covering project structure, dependency injection, routers, Pydantic schemas, authentication, database integration, testing, and async patterns
license: MIT
compatibility: opencode
---

## fastapi-templates

### Project Structure
```
app/
├── api/          # Route handlers, grouped by domain
├── core/         # Config, security, database, logging
├── models/       # SQLAlchemy / Beanie ORM models
├── schemas/      # Pydantic request/response schemas
├── services/     # Business logic
├── repositories/ # Data access layer
├── dependencies/ # FastAPI dependency injection
└── main.py       # App factory
```

### Routers & Dependencies
- `APIRouter(prefix="/v1/...", tags=[...])` for domain grouping
- FastAPI `Depends()` for auth, database sessions, permissions
- Modular router registration in `app/api/__init__.py`

### Pydantic Schemas
- Request/Response separation — never expose ORM models
- `from_attributes=True` for ORM mode
- `Field(..., description=...)` for OpenAPI docs
- Configurable `response_model_exclude_unset`, `response_model_by_alias`

### Authentication
- OAuth2 with JWT (access + refresh tokens)
- API key authentication via header
- OAuth2 scopes for fine-grained authorization
- Password hashing with passlib/bcrypt

### Database Integration
| ORM | Sync/Async | Best For |
|-----|-----------|----------|
| SQLAlchemy | Both | Full-featured ORM |
| SQLModel | Async | Pydantic + SQLAlchemy combined |
| Beanie | Async | MongoDB ODM |
| Tortoise-ORM | Async | Django-like for async |

### Testing
- `httpx.AsyncClient` with `TestClient` for integration tests
- Fixtures for database setup/teardown
- `pytest-asyncio` for async test support
- Test database isolation (transaction rollback per test)

### Async Patterns
- Background tasks with `BackgroundTasks`
- Async database sessions (`AsyncSession`)
- Proper `asyncio` event loop management
- `asyncio.gather` for concurrent I/O (but not CPU work)
