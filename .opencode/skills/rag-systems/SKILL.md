---
name: rag-systems
description: RAG system design covering chunking strategies, embedding selection, vector database choice, retrieval strategies, re-ranking, context window management, and evaluation with RAGAS
license: MIT
compatibility: opencode
---

## rag-systems

### Chunking Strategies

| Strategy | Size | Overlap | Use Case |
|---|---|---|---|
| Fixed-size | 256-512 tokens | 10-20% | General purpose |
| Recursive character | 500-1000 chars | 10-15% | Markdown/code |
| Semantic | Variable | Dynamic | Narrative prose |
| Document-aware | Per-section | 0% | Structured docs |

- Chunk size matches embedding model context window
- Overlap prevents boundary information loss
- Metadata per chunk (source, heading, position)

### Embedding Selection
| Model | Dims | Use Case |
|---|---|---|
| text-embedding-3-small | 1536 | General, cost-sensitive |
| text-embedding-3-large | 3076 | High accuracy |
| BGE / E5 | 1024 | Open-source, self-hosted |
| Cohere Embed v3 | 1024 | Multilingual, search |

### Vector Database Choice
| DB | Strengths |
|---|---|
| pgvector | PostgreSQL native, hybrid search |
| Qdrant | High performance, filtering |
| Milvus | Billion-scale, distributed |
| Weaviate | Built-in hybrid + generative |
| Chroma | Lightweight, local dev |

### Retrieval Strategies
- **Hybrid search** — Dense + sparse (BM25) weighted combination
- **RRF (Reciprocal Rank Fusion)** — Merges ranked lists from multiple sources
- **Multi-query** — Generate N query variants, union results
- **Parent document retrieval** — Retrieve chunks, return full parent

### Re-ranking
- Cross-encoder models (Cohere Rerank, BGE Reranker)
- Re-rank top-k (50-100) results after initial retrieval
- Improves precision at low latency cost
- Can use as final filter before LLM context

### Context Window Management
- **Sliding window** — Most recent + relevant chunks
- **Summary context** — Pre-summarize older chunks
- **MMR (Maximum Marginal Relevance)** — Diversity vs relevance
- **Lost-in-the-middle** — Place most important info at start/end

### Evaluation (RAGAS)
| Metric | What it Measures |
|---|---|
| Faithfulness | Answer supported by retrieved context |
| Answer Relevance | Answer addresses the question |
| Context Precision | Retrieved chunks are relevant |
| Context Recall | All relevant chunks retrieved |
| Aspect Critique | Hallucination, harm, correctness |
