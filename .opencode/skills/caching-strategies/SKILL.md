---
name: caching-strategies
description: Caching patterns covering CDN, browser cache, Redis/Memcached, application cache, database query cache, and cache invalidation strategies including TTL, write-through, write-behind, cache-aside, and stale-while-revalidate
license: MIT
compatibility: opencode
---

## caching-strategies

### Cache Layers

| Layer | Location | Latency | Capacity | Persistence |
|-------|----------|---------|----------|-------------|
| Browser cache | User device | ~0ms | Limited | Disk (HTTP cache) |
| CDN | Edge nodes | < 10ms | Large | Distributed |
| Application cache | In-process | ~0.001ms | RAM limited | Process lifetime |
| Distributed cache (Redis) | Network | < 1ms | RAM + disk | Configurable |
| Database query cache | DB server | < 0.1ms | Configurable | Managed |

### Caching Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Cache-aside (lazy loading) | Check cache first; on miss, load from DB and set cache | Read-heavy, moderate write |
| Write-through | Write to cache first, then DB synchronously | Consistency-critical |
| Write-behind (write-back) | Write to cache, async write to DB later | Write-heavy, tolerate short inconsistency |
| Read-through | Cache layer auto-loads from DB on miss | Simple API for app code |
| Refresh-ahead | Cache proactively refreshes before TTL expires | Predictable access patterns |
| Stale-while-revalidate | Serve stale data immediately, refresh in background | High-traffic, tolerate stale data |

### Cache Invalidation

- **TTL-based**: Simplest – set expiry, let cache naturally clear
- **Event-driven**: Publish invalidation event (Redis pub/sub, SNS) on data mutation
- **Tag-based**: Associate keys with tags; invalidate all keys for a tag (e.g., `user:42:*`)
- **Write-through**: Guarantee cache and DB are always in sync (higher write latency)
- **Versioned keys**: `key:v2` – bump version on schema change or deploy

### Cache-Aside (Pseudocode)

```python
def get_user(user_id):
    key = f"user:{user_id}"
    data = redis.get(key)
    if data is not None:
        return deserialize(data)
    user = db.query("SELECT * FROM users WHERE id = ?", user_id)
    redis.setex(key, 3600, serialize(user))  # TTL 1 hour
    return user
```

### TTL Guidelines

| Data Type | TTL | Rationale |
|-----------|-----|-----------|
| User profile | 1–6 hours | Low change frequency |
| Product catalog | 5–30 minutes | Price/stock updates |
| Blog content | 24 hours | Rare updates |
| Session data | Session duration | Must match session TTL |
| Rate limit counters | 1 second–1 minute | High precision needed |

### Stale-While-Revalidate (HTTP)

```
Cache-Control: public, max-age=600, stale-while-revalidate=3600
```

- Serve cached response for up to 600s (fresh)
- For next 3600s (stale window), serve stale + trigger background refresh
- After total 4200s, blocking fetch required

### Cache Stampede Prevention

- **Mutex/lock**: Only one process recomputes; others wait or get stale
- **Early recomputation**: Refresh when TTL is 10% remaining
- **Probabilistic early expiration**: Random early refresh around TTL boundary
- **Dogpile effect avoidance**: Use lock or `SET NX` for expensive cache rebuilds
