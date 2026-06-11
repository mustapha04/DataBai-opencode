---
name: nginx-expert
description: Nginx expertise covering reverse proxy, load balancing, caching, SSL termination, rate limiting, gzip, static file serving, location blocks, upstream configs, logging, and performance tuning
license: MIT
compatibility: opencode
---

## nginx-expert

### Core Directives

| Category | Key Directives |
|---|---|
| Server | `listen`, `server_name`, `root`, `index` |
| Location | `location`, `alias`, `try_files`, `rewrite` |
| SSL | `ssl_certificate`, `ssl_protocols`, `ssl_ciphers` |
| Proxy | `proxy_pass`, `proxy_set_header`, `proxy_redirect` |
| Cache | `proxy_cache`, `proxy_cache_key`, `proxy_cache_valid` |

### Reverse Proxy
```
location /api/ {
    proxy_pass http://backend:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Load Balancing
```
upstream backend {
    least_conn;
    server app1:3000 weight=3;
    server app2:3000;
    server app3:3000 backup;
}
```
Algorithms: `round-robin` (default), `least_conn`, `ip_hash`, `random`

### Caching
- `proxy_cache_path` with levels, keys_zone, max_size
- Cache key customization with `proxy_cache_key`
- Bypass with `$cookie_nocache` or `$arg_nocache`
- Stale-while-revalidate with `proxy_cache_use_stale`

### SSL Termination
- TLS 1.2+ only (`ssl_protocols TLSv1.2 TLSv1.3`)
- Strong ciphers (`ssl_ciphers HIGH:!aNULL:!MD5`)
- HSTS with `add_header Strict-Transport-Security`
- OCSP stapling

### Rate Limiting
```
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
location /api/ { limit_req zone=api burst=20 nodelay; }
```

### Static File Serving
- `sendfile on; tcp_nopush on;` for performance
- Expires headers for versioned assets
- Gzip with `gzip on; gzip_types text/css application/javascript;`

### Performance Tuning
- `worker_processes auto;`
- `worker_connections 1024;`
- `keepalive 65;`
- Buffer sizes: `client_body_buffer_size`, `proxy_buffer_size`

### Logging
- `access_log /var/log/nginx/access.log main;`
- Custom log format with `log_format main '$remote_addr - $upstream_status...'`
- Error log levels: `debug`, `info`, `notice`, `warn`, `error`
