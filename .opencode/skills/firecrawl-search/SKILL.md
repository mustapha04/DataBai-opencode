---
name: firecrawl-search
description: Using Firecrawl for web searching and content extraction including crawl configuration, rate limiting, content parsing, selective extraction, scheduling, and AI integration
license: MIT
compatibility: opencode
---

## firecrawl-search

### Firecrawl Setup
- API key authentication via Bearer token
- Base URL: `https://api.firecrawl.dev`
- SDKs available for Python, Node.js, Go, Rust

### Crawl Configuration
| Parameter | Purpose |
|-----------|---------|
| `url` | Target URL or sitemap |
| `limit` | Max pages to crawl |
| `maxDepth` | How many link levels to follow |
| `scrapeOptions` | Include/exclude selectors |
| `webhook` | Async completion callback |
| `allowBackwardLinks` | Allow crawling to parent paths |

### Rate Limiting & Concurrency
- Respect `Crawl-Delay` in robots.txt
- Configure `max-concurrency` to avoid 429 responses
- Exponential backoff on rate limit errors
- Queue-based scheduling for large crawls

### Content Parsing & Extraction
- Strip navigation, footers, ads — focus on main content
- HTML → markdown conversion for AI-friendly text
- `scrapeOptions.includeTags` / `excludeTags` for targeted extraction
- CSS selector-based extraction for structured data
- Auto-detect language and encoding

### Selective Extraction (LLM-based)
- Use `extract` endpoint with prompt-based field extraction
- Structured schema: define fields (type, description, required)
- Useful for product details, pricing, contact info, reviews
- Batch extraction for repetitive patterns across pages

### Scheduling & Monitoring
- Periodic crawling with cron triggers (daily, hourly)
- Change detection — only re-crawl modified pages
- Crawl success/failure metrics, error logging
- Webhook notifications for crawl completion

### Integration with AI Workflows
- Feed crawled content into RAG pipelines
- Pre-process for token limits (chunking, truncation)
- Combine web search + Firecrawl for real-time knowledge
- Cache crawl results to reduce redundant network calls
