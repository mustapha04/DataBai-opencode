---
name: supabase-expert
description: Supabase expertise for backend development, auth, realtime, and storage
license: MIT
compatibility: opencode
---

## supabase-expert

### Row Level Security (RLS)
- Enable RLS on every table by default; only disable for public reference data
- Define policies per operation (SELECT, INSERT, UPDATE, DELETE)
- Use `auth.uid()` and `auth.jwt()` for user identification
- Common patterns: `user_id = auth.uid()`, `tenant_id = auth.jwt() ->> 'org_id'`
- Test policies with `select * from pg_policies` and Supabase SQL editor
- Avoid SQL injection in RLS policies (use parameters, not string concatenation)

### Database Functions
- Use PostgreSQL functions/stored procedures for complex business logic
- Security definer vs invoker: definer for admin operations, invoker for RLS
- Use `plpgsql` for procedural logic, `sql` for simple queries
- Functions can bypass RLS when `SECURITY DEFINER` is set
- Enable extension functions (pg_trgm, uuid-ossp, pgcrypto) via Supabase dashboard

### Realtime Subscriptions
- Subscribe to tables with RLS: `supabase.from('table').on('*', cb).subscribe()`
- Use channel-based filtering for targeted updates
- Broadcast custom events for non-DB realtime communication
- Realtime presence for online user tracking
- Manage connection lifecycle (subscribe, unsubscribe, reconnect)
- Performance: avoid subscribing to high-churn tables without filters

### Storage
- Buckets: public (readable by anyone) vs private (RLS-protected)
- Upload via Supabase client SDK or signed URLs
- Serve files via CDN URL (`https://<project>.supabase.co/storage/v1/object/public/...`)
- Set file size limits and allowed MIME types in bucket config
- Use image transformation (Supabase Image Optimization) for resizing

### Authentication
- Built-in auth: email/password, magic link, OAuth (Google, GitHub, etc.), SMS
- Custom JWT for third-party auth integration
- Session management: auto-refresh, `supabase.auth.getSession()`
- Multi-factor authentication via Auth0 or Supabase Auth
- User management: `supabase.auth.admin.listUsers()`, CRUD via API

### Edge Functions
- Deploy TypeScript/Deno functions via Supabase CLI (`supabase functions deploy`)
- Serve as API endpoints, webhook handlers, or background workers
- Access Supabase client inside edge functions for DB queries
- Environment variables for secrets (STRIPE_KEY, etc.)
- Cold start optimization: minimize imports, use Deno's built-in APIs

### Dashboard Configuration
- SQL Editor for migrations and ad-hoc queries
- Database backups (point-in-time recovery on Pro plan)
- API settings: JWT expiry, anon/public key rotation
- Auth settings: redirect URLs, email templates, SMTP config
- Monitoring: query performance, logs, error tracking

### Local Development
- `supabase init` to create local config
- `supabase start` for local Postgres, GoTrue, Realtime, Storage
- Migrations: `supabase migration new`, `supabase db push`
- Seed data via `supabase/seed.sql`
- Type generation: `supabase gen types typescript --local > types.ts`

### Migration Strategy
- Use Supabase migrations (timestamp-based SQL files)
- Run migrations before deploying new code
- Never edit migrations after they're applied; create new ones
- Test migrations locally before pushing to staging/production
- Rollback plan: write `-- DOWN` comments or create revert migrations
