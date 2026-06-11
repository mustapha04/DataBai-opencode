---
name: graphql-design
description: GraphQL API design (schema design, resolvers, N+1 problem, DataLoader, mutations, subscriptions, federation, security, performance monitoring, pagination patterns)
license: MIT
compatibility: opencode
---

## graphql-design

### Schema Design Principles

- **Product-centric**: model the schema around business domains, not database tables
- **Nullable by default**: make fields nullable unless there's a strong reason
- **Naming conventions**: camelCase fields, PascalCase types, descriptive names
- **Deprecation**: use `@deprecated` with a reason instead of breaking changes

### Resolvers & N+1 Problem

```graphql
type Query {
  posts: [Post!]!
}

type Post {
  id: ID!
  author: User!  # N+1 risk
  comments: [Comment!]!
}
```

Use **DataLoader** to batch and cache per-request:
- Group individual DB/API calls into batched requests
- Cache results within a single GraphQL request
- Clear cache per request, never across requests

### Pagination Patterns

- **Cursor-based** (preferred): `GraphQL Cursor Connections Spec`
- **Offset-based**: suitable only for small, static datasets
- **Keyset pagination**: efficient for large tables with indexed sort columns

```graphql
type Query {
  posts(first: Int!, after: String): PostConnection!
}

type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
}
```

### Mutations

- Single responsibility per mutation
- Return a mutation payload type (not just the mutated object)
- Include `clientMutationId` for idempotency when needed
- Use input types for all arguments beyond 1-2 fields

### Subscriptions

- Use WebSocket or SSE transport
- Subscribe to domain events, not database changes directly
- Implement backpressure handling for slow consumers
- Authenticate on connection, authorize on event

### Federation

- Compose multiple sub-graphs into a single supergraph
- Use `@key`, `@requires`, `@provides`, `@external` directives
- Each service owns its domain types
- Use Apollo Federation or similar gateway

### Security

- Depth limiting, query cost analysis, rate limiting
- Whitelist persisted queries in production
- Never expose introspection in production (or restrict to authenticated users)
- Validate authorization at the resolver level, not just the transport layer

### Performance Monitoring

- Trace resolver execution times
- Track query depth and complexity
- Monitor DataLoader cache hit rates
- Log slow queries for analysis
