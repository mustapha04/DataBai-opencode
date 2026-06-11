---
name: code-review-excellence
description: Use when conducting or reviewing code changes. Covers review principles, what to look for, constructive feedback patterns, and common code quality issues.
license: MIT
compatibility: opencode
---

## Code Review Excellence

### Review Principles
1. Review the **what** (does it solve the problem?) before the **how** (code style)
2. Be constructive, not critical — suggest alternatives, not just problems
3. Distinguish blockers from nits — label clearly: `blocking` / `nitpick` / `suggestion`
4. Review in small batches (200-400 lines max per session)
5. Respond within 24 hours on weekdays

### What to Check (in order)
- **Correctness**: does the code do what it says it does? Any edge cases missed?
- **Security**: SQL injection, XSS, CSRF, auth bypass, secrets exposed?
- **Performance**: N+1 queries, unnecessary re-renders, large bundles?
- **Test coverage**: are the right scenarios tested? Do tests fail meaningfully?
- **Error handling**: are errors caught, logged, and surfaced to users?
- **Accessibility**: keyboard nav, screen reader support, color contrast
- **Maintainability**: is the code easy to understand and modify?

### Feedback Patterns
| Instead of | Say |
|---|---|
| "This is wrong" | "This won't handle X case because Y. Consider Z." |
| "Rewrite this" | "I found this pattern works well for similar cases: ..." |
| "This is confusing" | "Could we add a comment explaining why X happens here?" |
| "Bad naming" | "What do you think of `getActiveUsers` instead of `getAUs`?" |

### Common Issues to Catch
- Unhandled promise rejections (missing `.catch()` or `try/catch`)
- Mutating props or state directly in React/Vue
- Missing loading/error/empty states
- Hardcoded strings, URLs, or magic numbers
- Overly complex conditionals (consider early returns)
- Console.log / debugger statements left in
- Imports from wrong paths or unused imports
- Missing type definitions (any usage bypasses TypeScript)

### PR Hygiene
- PR should be atomic: one feature/fix per PR, ideally under 400 lines
- Title follows conventional commits: `feat:`, `fix:`, `refactor:`, `chore:`
- Description explains why + screenshots for UI changes
- Self-review before requesting reviewers
- Respond to all comments; mark resolved ones as resolved
