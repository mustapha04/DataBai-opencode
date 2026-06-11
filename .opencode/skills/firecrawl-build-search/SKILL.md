---
name: firecrawl-build-search
description: Building search functionality with Firecrawl covering crawling patterns, ingestion pipelines, chunking strategies, embedding generation, indexing, hybrid search, and reranking
license: MIT
compatibility: opencode
---

## firecrawl-build-search

### Crawling Patterns
- **URL-based** — start from seed URLs, follow links up to configurable depth
- **Sitemap-based** — parse XML sitemaps for complete site coverage
- **API-driven** — crawl via API responses instead of HTML
- **Authenticated crawling** — handle cookie/session or token-based auth
- **Respect robots.txt** — use crawl delays and exclusion rules

### Ingestion Pipelines
```
Crawl → Extract → Chunk → Embed → Index → Search → Rerank → Return
```
- Orchestrate with queues (Bull, Celery) for large-scale ingestion
- Deduplication via content hashing (SHA-256)
- Incremental updates — detect changed content via etag/last-modified

### Chunking Strategies
| Strategy | Granularity | Best For |
|----------|------------|----------|
| Fixed-size | N tokens/characters | Simple, predictable |
| Recursive | Split on separators (paragraph, sentence) | Semantic coherence |
| Semantic | ML-based boundary detection | Highest quality chunks |
| Document-aware | Respect HTML headings, markdown structure | Hierarchical content |

### Embedding Generation
- OpenAI `text-embedding-3-*`, Cohere, or local models (`SentenceTransformers`)
- Batch processing for throughput
- Normalize vectors for cosine similarity
- Cache embeddings to avoid redundant API calls

### Indexing & Hybrid Search
| Search Type | Method | When |
|----------|--------|------|
| Semantic | Vector similarity (cosine, dot) | Need concept matching |
| Keyword | BM25 / TF-IDF | Exact term matching |
| Hybrid | Weighted combination | Best of both worlds |
| Dense-sparse | Learned sparse + dense | State-of-the-art |

### Reranking
- Cross-encoder models (Cohere Rerank, BGE Reranker) for second-pass
- BM25-based reranking for keyword-heavy queries
- Metadata boosting (recency, source authority, document type)
- Sliding window reranking for long documents
