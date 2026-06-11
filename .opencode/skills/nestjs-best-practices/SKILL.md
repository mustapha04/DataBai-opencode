---
name: nestjs-best-practices
description: NestJS best practices covering modules, providers, guards, interceptors, pipes, filters, DTO validation, database integration, testing, monorepo, and configuration
license: MIT
compatibility: opencode
---

## nestjs-best-practices

### Project Structure
```
src/
├── modules/          # Feature modules
├── common/           # Shared guards, filters, pipes, interceptors
├── config/           # Configuration modules
└── database/         # TypeORM/Prisma entities, migrations
```

### Modules
- One module per domain feature
- `@Global()` only for truly cross-cutting concerns
- Use `forRootAsync()` for dynamic module configuration
- Export providers other modules need

### Providers & Dependency Injection
- Constructor injection with `@Injectable()`
- Custom providers with `useClass`, `useFactory`, `useValue`
- Scoped providers (request, transient) for per-request state
- Avoid circular dependencies — use `forwardRef()` sparingly

### Guards, Interceptors, Pipes, Filters
- **Guards** — Authentication/authorization logic
- **Interceptors** — Request/response transformation, logging, caching
- **Pipes** — Validation and transformation (`ValidationPipe` with `whitelist: true`)
- **Filters** — Exception handling (`ExceptionFilter` for consistent error shape)

### DTO Validation
- `class-validator` decorators on DTO classes
- `class-transformer` for serialization (`@Exclude`, `@Expose`)
- `@ApiProperty()` for OpenAPI documentation
- Use `PartialType`, `PickType`, `OmitType`, `IntersectionType`

### Database Integration
| ORM | Setup |
|---|---|
| TypeORM | `@nestjs/typeorm`, `TypeOrmModule.forRoot()`, `@Entity()` |
| Prisma | `@nestjs/prisma`, `PrismaModule`, `PrismaService` |

- Repositories / services encapsulate queries
- Transactions via `QueryRunner` or Prisma interactive transactions
- Migrations in CI/CD pipeline

### Testing
- **Unit** — Jest with `Test.createTestingModule()`, mock providers
- **E2E** — Supertest, `createTestingModule()` with in-memory DB
- Use `@nestjs/testing` standalone apps for integration

### Monorepo
- Nx or NestJS monorepo mode
- Shared libraries (`@app/common`)
- Distinct `tsconfig` per app

### Configuration
- `@nestjs/config` with `ConfigModule.forRoot()`
- Validated environment variables with `Joi` or Zod
- Per-environment `.env` files

### Serialization
- `ClassSerializerInterceptor` globally
- `@Exclude()` on sensitive fields
- Custom interceptors for envelope responses (`{ data, meta }`)
