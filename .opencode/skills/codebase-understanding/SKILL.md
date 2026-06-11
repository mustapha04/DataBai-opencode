---
name: codebase-understanding
description: Use when navigating, reading, or explaining an unfamiliar codebase. Covers reading strategies, semantic mapping, tracing execution paths, and building mental models of code.
license: MIT
compatibility: opencode
---

## Codebase Understanding

### Reading Strategy
- **Top-down**: start at entry points, trace calls downward
- **Bottom-up**: start at leaf modules (utilities, helpers), build up to higher abstractions
- **Use-case driven**: pick a specific feature, trace it end-to-end
- **Diff-driven**: compare versions to understand changes and evolution

### Building a Mental Model
1. **Identify boundaries**: where does the codebase start and end? API? CLI? Library?
2. **Map layers**: presentation → application → domain → infrastructure
3. **Find patterns**: are there consistent patterns (MVC, clean architecture, feature folders)?
4. **Note conventions**: naming, file organization, import style, error handling
5. **Trace data flow**: input → transformation → storage → output

### Key Questions
- What problem does this codebase solve?
- What are the core entities and their relationships?
- Where does state live? How is it modified?
- How are errors handled? What guarantees does the system provide?
- How is the code tested? What's the testing strategy?

### Semantic Clues
- **File/directory names** reveal intent: `auth/`, `payment/`, `api/`, `utils/`
- **Import graphs** show dependencies: a file importing many things is likely a coordinator
- **Test files** reveal expected behavior: test names describe what the code should do
- **Config files** reveal environment assumptions: env vars, ports, external services
- **Package dependencies** reveal technology choices: web framework, DB, caching

### Code Navigation
- Start with: readme, main entry, route definitions, test files
- Find interfaces/abstract classes to understand contracts before implementations
- Search for keywords (`TODO`, `FIXME`, `HACK`, `WORKAROUND`) to find known issues
- Use grep to find where symbols are defined and referenced

### Documentation Tools
- Create a quick architecture diagram (Mermaid: graph TD)
- Document key data flows as sequence diagrams
- Map module relationships as a directed graph
- Collect glossary of domain-specific terms

### Output
Provide a concise summary: purpose, architecture style, tech stack, key modules, entry points, testing approach, and any notable patterns or concerns.
