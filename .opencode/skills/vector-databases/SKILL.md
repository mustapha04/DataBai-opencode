---
name: vector-databases
description: Vector database selection, indexing, and similarity search for AI applications
license: MIT
compatibility: opencode
---

## vector-databases

### Database Comparison
| Database | Strengths | Best For |
|----------|-----------|----------|
| Pinecone | Fully managed, high availability, no ops | Production RAG, serverless |
| Weaviate | Hybrid search (vector + keyword), GraphQL | Rich metadata filtering |
| Qdrant | Rust-based, fast filtering, quantization | High-performance filtering |
| Chroma | Lightweight, local-first, simple API | Prototyping, small-scale |
| Milvus | Distributed, GPU acceleration, billion-scale | Large-scale similarity search |

### Indexing Strategies
| Index Type | Description | When to Use |
|------------|-------------|-------------|
| Flat (brute force) | Exact search, no approximation | Small datasets (<10K vectors) |
| IVF (Inverted File) | Cluster-based approximate search | Large datasets, fast recall |
| HNSW (Hierarchical Navigable Small World) | Graph-based ANN | High-recall, low-latency |
| PQ (Product Quantization) | Compressed vectors | Memory-constrained environments |
| DiskANN | SSD-based index | Billion-scale on limited RAM |

### Similarity Metrics
| Metric | Formula | Use Case |
|--------|---------|----------|
| Cosine | `1 - cos(θ)` | Text embeddings, semantic similarity |
| Dot Product | `A · B` | Normalized vectors, efficient scoring |
| Euclidean (L2) | `||A - B||²` | Image embeddings, geo data |
| Manhattan (L1) | `Σ|Ai - Bi|` | Sparse vectors, robust to outliers |

### Hybrid Search
- Combine vector similarity with keyword (BM25) or metadata filters
- Weaviate: hybrid search with `alpha` parameter tuning
- Qdrant: `filter` + `vector` query with payload indexing
- Reciprocal Rank Fusion (RRF) to merge vector + keyword results
- Hybrid improves out-of-domain retrieval significantly

### Filtering
- Pre-filter: apply metadata filters before vector search (reduces candidate pool)
- Post-filter: vector search first, then filter results (may miss relevant items)
- Qdrant payload index for fast pre-filtering
- Pinecone namespaces for logical partitioning (e.g., per-tenant)
- Weaviate property filtering with inverted index

### Scaling
- Shard vectors across nodes by hash of vector ID
- Replication for high availability and read throughput
- Memory estimation: 4 bytes per dimension × float32 × vector count + overhead
- GPU-accelerated indexing (Milvus, Qdrant) for high-throughput ingestion
- Batch insert for bulk loading; avoid one-by-one inserts
- Monitor recall vs latency trade-off as dataset grows

### Backup
- Export vector IDs and metadata; embeddings can be regenerated
- Use database-native backup tools (Pinecone export, Weaviate backup API)
- Snapshot and restore for disaster recovery
- Store backup in object storage (S3, GCS)
- Test restore process periodically
