---
name: redis-expert
description: Redis expertise covering data structures, caching patterns, session storage, rate limiting, pub/sub, streams, distributed locks, RedisJSON, RediSearch, persistence, cluster, sentinel, and performance tuning
license: MIT
compatibility: opencode
---

## redis-expert

### Data Structures

| Type | Use Case |
|---|---|
| String | Cache, counters, tokens |
| List | Queues, message buffer |
| Set | Uniqueness, tags, followers |
| Sorted Set | Leaderboards, rate limiting |
| Hash | Object representation |
| HyperLogLog | Cardinality estimation |
| Bitmap | Feature flags, daily active users |
| Geospatial | Location-based queries |

### Caching Patterns
- **Cache-aside** — Read from cache, miss → load from DB → write cache
- **Write-through** — Write to DB + cache atomically
- **Write-behind** — Write to cache, async flush to DB
- **Cache invalidation** — TTL, event-driven, key prefix deletion

### Session Storage
- `SET session:{id} {json} EX 3600`
- Rotate session ID on login
- `GET/DEL` on logout
- Lua scripts for atomic session operations

### Rate Limiting
```lua
-- Sliding window with sorted sets
local now = redis.call('TIME')[1]
redis.call('ZREMRANGEBYSCORE', KEYS[1], 0, now - ARGV[1])
redis.call('ZADD', KEYS[1], now, now)
return redis.call('ZCARD', KEYS[1])
```
- Token bucket algorithm
- Per-user, per-IP, per-endpoint limits

### Pub/Sub
- Fire-and-forget messaging
- Use Redis Streams for reliable delivery
- `PUBLISH channel message`
- `SUBSCRIBE channel`

### Streams
- Reliable message queue with consumer groups
- `XADD`, `XREADGROUP`, `XACK`, `XPENDING`
- Reclaim failed messages with `XAUTOCLAIM`
- Dead letter handling

### Distributed Locks
- Redlock algorithm — lock with `SET key uuid NX PX 30000`
- `Redlock-py` / `Redisson` for production
- Lock timeout + heartbeat extension
- Fencing tokens for critical sections

### Redis Modules
| Module | Purpose |
|---|---|
| RedisJSON | Native JSON document store |
| RediSearch | Full-text search, secondary index |
| RedisGraph | Property graph (deprecated) |
| RedisTimeSeries | Time-series data |
| RedisBloom | Probabilistic data structures |

### Persistence
| Option | Durability | Performance |
|---|---|---|
| RDB | Point-in-time snapshot | High |
| AOF | Per-write log | Medium |
| RDB + AOF | Best of both | Medium |

### Cluster & Sentinel
- **Sentinel** — High availability, failover, monitoring
- **Cluster** — Sharding (16384 slots), auto-failover
- Smart client with slot routing
- Cross-slot operations require careful design

### Performance Tuning
- `maxmemory-policy allkeys-lru` for cache
- Pipeline commands for batch operations
- Avoid `KEYS` — use `SCAN` with `MATCH`
- Monitor `latency` and `SLOWLOG`
