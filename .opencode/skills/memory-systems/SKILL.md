---
name: memory-systems
description: Memory systems for AI agents (conversation history, summarization, vector memory, entity extraction, episodic memory, semantic memory, memory retrieval, compression, persistence)
license: MIT
compatibility: opencode
---

## memory-systems

### Memory Types

| Type | Description | Storage |
|------|-------------|---------|
| Episodic | Specific past interactions and events | Vector DB + timestamps |
| Semantic | General knowledge and facts extracted over time | Vector DB + knowledge graph |
| Procedural | Instructions on how to perform tasks | Code + tool definitions |
| Working | Current conversation context | In-memory (LLM context window) |

### Conversation History

- Maintain a sliding window of recent messages (last N turns)
- Reserve context window room for system prompt + tools + retrieval
- Trim oldest messages when exceeding token budget; summarize before dropping
- Use explicit token counting (tiktoken) to manage context

### Summarization

- **Rolling summary**: periodically summarize older conversation segments
- **Hierarchical**: daily summaries → weekly summaries → monthly
- **Extractive**: pull key sentences (ROUGE-based or LLM-driven)
- **Abstractive**: LLM generates concise summary of a conversation block

### Vector Memory

- Embed each conversation turn or extracted fact
- Store in vector DB (Pinecone, Chroma, Qdrant, pgvector)
- Retrieve top-K relevant memories at each turn
- Include metadata: timestamp, confidence, source, expiry

### Entity Extraction

- Extract named entities (people, places, organizations, dates) from conversations
- Maintain an entity store with relationships and attributes
- Update entity confidence scores based on recency and repetition
- Use for personalization and context-aware responses

### Memory Retrieval

- **Semantic search**: query vector DB with current message embedding
- **Recency boost**: weight recent memories higher
- **Importance scoring**: LLM rates memory importance (1-10), filter by threshold
- **Multi-hop**: retrieve initial results, then retrieve related memories

### Compression

- Remove redundant or low-information content
- Deduplicate near-identical memories (cosine similarity threshold)
- Prune memories below relevance/confidence thresholds
- Merge related facts into consolidated entries

### Persistence

- Save memory state to database between sessions
- Use SQLite for local/single-user, PostgreSQL for multi-user
- Vector DB for semantic search, KV store for episodic (Redis)
- Backup strategy: export memories as JSON, version as schemas evolve

### Best Practices

- Always respect user privacy: allow memory deletion and opt-out
- Set TTLs on memories; expire old or unverified information
- Log memory operations (store, retrieve, update, delete) for audit
- Batch memory writes; avoid per-turn synchronous persistence
