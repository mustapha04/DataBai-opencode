---
name: nodejs-backend-patterns
description: Node.js backend patterns for async control flow, error handling middleware, request validation, database access, authentication strategies, background jobs, API versioning, and logging
license: MIT
compatibility: opencode
---

## nodejs-backend-patterns

### Async Control Flow
- `async/await` over raw promises
- `Promise.allSettled()` for parallel independent tasks
- `p-limit` or `Bottleneck` for concurrency control
- Avoid `forEach` with async — use `for...of` or `Promise.all`

### Error Handling Middleware
```js
// Express
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
});
```
- Custom `AppError` class extending `Error` with `status` and `code`
- Centralized error handler in middleware chain
- Unhandled rejection handler (`process.on('unhandledRejection')`)

### Request Validation
- Zod or Joi schemas per route
- Middleware that validates `req.body`, `req.query`, `req.params`
- Sanitize inputs (strip unknown fields)

### Database Access Patterns
- **Repository pattern** — Data access layer abstraction
- **Unit of Work** — Transaction scoping
- **Query builder** (Knex) vs ORM (TypeORM, Prisma, Drizzle)
- Connection pooling with `pg.Pool` or ORM built-in

### Authentication Strategies
- Session-based with `express-session` + store (Redis)
- JWT with `jsonwebtoken`, short-lived access + long-lived refresh
- Passport.js strategies (local, JWT, OAuth)
- API keys for service-to-service

### Background Jobs
- Bull/BullMQ with Redis
- Agenda for MongoDB-backed jobs
- PgBoss for PostgreSQL-backed queues
- Worker threads for CPU-bound tasks

### API Versioning
- URI-based (`/v1/users`, `/v2/users`)
- Header-based (`Accept: application/vnd.api+json;version=2`)
- Maintain backward-compatible defaults

### Logging
- Structured JSON logs (pino, winston)
- Correlation IDs per request (`req.id` from `crypto.randomUUID()`)
- Log levels: `error`, `warn`, `info`, `debug`
- Request logging middleware (method, URL, status, duration)
