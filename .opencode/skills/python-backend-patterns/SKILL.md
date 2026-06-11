---
name: python-backend-patterns
description: Python backend patterns for async/await, dependency injection, repository pattern, service layer, background tasks, settings management, logging, middleware, and testing with pytest
license: MIT
compatibility: opencode
---

## python-backend-patterns

### Async/Await
- `asyncio` with `async def` routes (FastAPI, Sanic, Litestar)
- `httpx.AsyncClient` for outgoing HTTP
- `asyncpg` / `aiosqlite` for database
- `asyncio.gather()` for concurrent independent I/O
- `anyio` for structured concurrency

### Dependency Injection
- FastAPI `Depends()` for request-scoped dependencies
- `@dataclass` or `@attrs` for injectable services
- Lifespan context managers for startup/shutdown
- Override dependencies in tests

### Repository Pattern
```python
class UserRepository:
    async def get_by_id(self, user_id: int) -> User: ...
    async def create(self, data: UserCreate) -> User: ...

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo
```

### Service Layer
- Business logic in services, not endpoints
- Services depend on repositories, not directly on DB
- Unit of Work for transaction management
- Services raise custom exceptions caught by middleware

### Background Tasks
| Tool | Queue | Use |
|---|---|---|
| Celery | Redis/RabbitMQ | Distributed, periodic, retries |
| ARQ | Redis | Lightweight, async-native |
| FastAPI BackgroundTasks | In-process | Quick fire-and-forget |
| Huey | Redis/SQLite | Simple task queue |

### Settings Management
- `pydantic-settings` with `BaseSettings`
- Environment variables, `.env` file, secrets
- Strict validation of required settings
- Per-environment profiles (dev/staging/prod)

### Logging
- Structured JSON logs with `structlog` or `python-json-logger`
- Correlation ID via middleware injected into log context
- Log levels per module configuration
- Avoid logging sensitive data (PII, tokens)

### Middleware
- Request ID generation
- CORS, trusted hosts
- Auth middleware extracting user from token
- Error handler middleware returning consistent JSON
- Timing middleware for request duration metrics

### Testing with pytest
- `pytest-asyncio` for async tests
- Fixtures for DB session, HTTP client, mocks
- `httpx.AsyncClient` + `ASGITransport` for FastAPI e2e
- `pytest-cov` for coverage reports
- Factories (factory_boy) for test data
