---
name: review
description: Code review process and best practices for efficient, high-quality reviews
license: MIT
compatibility: opencode
---

## review

### Review Scope
- **Functionality**: Does the code do what it's supposed to?
- **Correctness**: Edge cases, error handling, boundary conditions
- **Security**: Injection, auth, data exposure, dependency risks
- **Performance**: N+1 queries, memory leaks, unnecessary allocations
- **Maintainability**: Readability, naming, comments, complexity
- **Test coverage**: Unit, integration, regression tests present and meaningful

### What to Check (Checklist)
| Area | Items |
|------|-------|
| Logic | Off-by-one, race conditions, state mutations, null safety |
| API | Breaking changes, versioning, backward compatibility |
| Data | Schema migrations, data loss, validation, sanitization |
| Config | Hardcoded values, environment variables, feature flags |
| Logging | PII泄漏, log levels, structured logging |
| Docs | Inline docs, API docs, changelog entries |

### Feedback Patterns
- **Praise first**: Acknowledge what's done well before critique
- **Specific & actionable**: "Rename `x` to `userId`" not "this is unclear"
- **Ask questions**: "What happens when this returns null?" rather than commands
- **Prefer non-blocking**: Use "nit:" or "suggestion:" labels when appropriate

### Common Issues
- Unhandled errors / swallowed exceptions
- Missing input validation on public APIs
- Overly broad permissions / missing auth checks
- Dead code / commented-out blocks
- Large single commits (aim for <400 lines)
- Missing or weak test assertions

### PR Hygiene
- Keep PRs small and focused (single concern per PR)
- Write descriptive titles and summaries
- Link to issues/tickets
- Self-review before requesting others
- Rebase onto target branch before review

### Review Velocity
- Respond within 1 business day
- Prioritize blocking issues over style nits
- Use draft PRs for early feedback on approach
- Automate linting, formatting, and type-checking in CI

### Giving & Receiving Feedback Constructively
- Separate the person from the code
- Assume good intent; ask clarifying questions
- If you disagree, discuss synchronously (chat/call) not in comments
- Accept that your code will be reviewed; treat feedback as learning
- Follow up: address all comments before merge
