---
name: vercel-react-best-practices
description: Use when writing React components or reviewing React code. Covers component architecture, hooks, state management, performance patterns, and Vercel platform conventions.
license: MIT
compatibility: opencode
---

## React Best Practices (Vercel-aligned)

### Component Architecture
- Prefer server components by default in Next.js App Router
- Keep components small and focused (single responsibility)
- Use composition over inheritance; prefer children/slot props
- Co-locate tests, stories, and CSS modules with the component

### Hooks
- Custom hooks start with `use`, encapsulate state + side effects
- Keep hooks focused; split into multiple hooks if responsibilities diverge
- Use `useMemo`/`useCallback` only when profiling shows a bottleneck
- Prefer `useReducer` over `useState` for complex state logic

### State Management
- Start with local state + props drilling; introduce context only when prop drilling exceeds 3 levels
- Use React Query / SWR for server state (caching, revalidation, loading states)
- Avoid putting derived state in `useState` — compute it with `useMemo`
- URL state (search params, path) belongs in the router, not React state

### Performance
- Dynamic import heavy components with `next/dynamic` or `React.lazy`
- Virtualize long lists (`react-window`, `@tanstack/virtual`)
- Memoize expensive computations with `useMemo`
- Avoid inline function/object props in render cycles

### Vercel Conventions
- Use `next/image` for images (automatic optimization, lazy loading)
- Use `next/link` for client-side navigation (prefetching)
- Incremental Static Regeneration (ISR) for content that changes periodically
- Edge Functions for low-latency personalization
