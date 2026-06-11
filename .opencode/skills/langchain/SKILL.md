---
name: langchain
description: LangChain framework (chains, agents, retrievers, memory, document loaders, embeddings, vector stores, tool integration, streaming, callbacks, evaluation, production deployment)
license: MIT
compatibility: opencode
---

## langchain

### Core Components

| Component | Purpose |
|-----------|---------|
| Chat Models | LLM wrappers (OpenAI, Anthropic, local) |
| Prompts | Templates, few-shot, message composition |
| Chains | Sequences of calls (LLM + tools + logic) |
| Agents | LLM-driven decision loops with tool access |
| Retrievers | Document retrieval for RAG |
| Memory | Conversation history, entity extraction |
| Document Loaders | Parse PDFs, HTML, code, databases |
| Embeddings | Text → vector transformation |
| Vector Stores | Storage + similarity search |

### Chains

- **LLMChain**: prompt → LLM → output parser
- **SequentialChain**: chain of chains, passing variables
- **RouterChain**: conditional routing based on input
- **LCEL** (LangChain Expression Language): `chain = prompt | model | output_parser`

### Agents

- Tool-calling agents with `create_react_agent`, `create_openai_functions_agent`
- AgentExecutor: loop of thought → action → observation
- Tool definition: `@tool` decorator or `Tool` class with `args_schema`

### RAG Pipeline

```
load → split → embed → store → retrieve → augment → generate
```

- **Chunking**: recursive character splitter, semantic splitting
- **Retrieval**: similarity search, MMR, contextual compression, self-query
- **Multi-query**: generate diverse queries, retrieve for each
- **Parent document**: retrieve chunks, return full parent

### Memory

| Type | Scope | Persistence |
|------|-------|-------------|
| BufferMemory | Conversation history | In-memory |
| SummaryMemory | Summarized history | In-memory |
| VectorStoreMemory | Semantic retrieval | Vector DB |
| PostgresChatMemory | Full history | PostgreSQL |

### Streaming & Callbacks

- `stream` / `astream` for token-by-token output
- `CallbackHandler` for logging, tracing, metrics
- LangSmith integration for observability

### Evaluation

- Generate test datasets from real conversations
- Evaluate: correctness, faithfulness, relevance, harmfulness
- Use `langchain.evaluation` with LLM-as-judge or labeled datasets

### Production

- Caching: `CacheBackedEmbeddings`, LLM caching (InMemoryCache, RedisCache)
- Rate limiting: controlled by model client (token bucket)
- Fallbacks: model fallback chain, retry logic
- Serialization: save/load chains, prompts, agents
