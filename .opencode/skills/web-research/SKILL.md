---
name: web-research
description: Web research techniques for AI agents including search, extraction, and source evaluation
license: MIT
compatibility: opencode
---

## web-research

### Search Engine Integration
- Use search APIs (Google Custom Search, Bing Search, SerpAPI, Brave Search)
- Construct queries with boolean operators and domain restrictions
- Use site-specific searches (`site:github.com`), file type filters (`filetype:pdf`)
- Paginate results when comprehensive coverage is needed
- Handle rate limits, API quotas, and backoff strategies
- Fallback to alternative search providers on failure

### Content Extraction
- Parse HTML to extract main content (readability, Mozilla Readability, trafilatura)
- Extract structured data: tables, lists, code blocks, definitions
- Handle JavaScript-rendered content (headless browser: Puppeteer, Playwright)
- Convert to Markdown or structured text for LLM consumption
- Extract metadata: title, author, date, description, Open Graph tags
- Strip ads, nav, footers, and irrelevant elements

### Crawling Strategies
| Strategy | Description | Use Case |
|----------|-------------|----------|
| Breadth-first | Crawl all links on a page first | Comprehensive site analysis |
| Depth-first | Follow links deeper recursively | Deep documentation research |
| Focused | Follow links matching keyword/topic | Targeted research |
| Sitemap-based | Use /sitemap.xml for page list | Known site structure |
| API-based | Use site's REST/GraphQL API | High-quality structured data |
| URL pattern | Enumerate predictable URL patterns | Paginated lists |

### Rate Limiting
- Respect `robots.txt` crawl directives
- Add delay between requests (1-3 seconds per domain)
- Use `Retry-After` header when throttled
- Rotate user agents and IP addresses (residential proxies if needed)
- Set max pages per domain per minute
- Cache fetched content to avoid redundant requests

### Data Deduplication
- Hash page content (MD5, SHA256) to identify duplicates
- Near-duplicate detection with MinHash or SimHash
- Deduplicate by canonical URL (rel=canonical)
- Merge information from multiple sources on the same topic
- Keep the most authoritative source when conflicts exist

### Source Credibility Assessment
| Signal | Credibility Indicator |
|--------|----------------------|
| Domain authority | `.gov`, `.edu`, established `.com`, peer-reviewed journals |
| Author credentials | Named author with expertise, publication history |
| Date recency | Timely for the topic (avoid outdated information) |
| Citations | References to primary sources, data, studies |
| Bias | Acknowledged perspective, balanced presentation |
| Consistency | Aligns with other credible sources |
| Professional editing | Grammar, formatting, clear structure |

### Structured Data Extraction
- Extract JSON-LD, Microdata, RDFa from page markup
- Parse tables into row-column format
- Extract lists into ordered/unordered items
- Identify key-value pairs (specifications, properties)
- Use regex or CSS selectors for specific data patterns
- Validate extracted data against expected schema

### Citation Management
- Track source URL, title, access date for every citation
- Use standardized citation format (APA, MLA, Chicago) as appropriate
- Include direct quotes with page/paragraph references
- Distinguish between primary and secondary sources
- Flag unverifiable claims for user verification
- Maintain a bibliography for the research session
