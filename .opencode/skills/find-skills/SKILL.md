---
name: find-skills
description: Finding relevant OpenCode skills for a given task or query using skill matching, keyword analysis, combining skills, and fallback strategies
license: MIT
compatibility: opencode
---

## find-skills

### Skill Matching
- Parse user request for domain keywords (e.g., "index", "migration", "Dockerfile")
- Map keywords to skill names and descriptions
- Consider compound tasks — a single query may match multiple skills

### Keyword Analysis
| Category | Example Keywords | Likely Skill |
|----------|-----------------|--------------|
| Infrastructure | container, image, compose, Dockerfile | docker-expert |
| Data | index, query plan, EXPLAIN, slow query | database-indexing / database-performance |
| Architecture | event, broker, Kafka, saga | event-driven-architecture |
| Cloud | IAM, encryption, compliance, VPC | cloud-security |

### Combining Skills
- A task may need multiple skills: e.g., migrating a database in Docker needs `database-migrations` + `docker-expert`
- Chain skills: run find-skills first, then load matched skills in order
- Skill priority: more specific skill over more general one (e.g., `database-performance` over `database-optimization`)

### Fallback Strategies
- No match found → use general-purpose coding capabilities
- Partial match → load closest skill and supplement with general knowledge
- Ambiguous match → load the most specific skill; ask user for clarification if needed
- Periodically review skill catalog to identify gaps for new skill creation
