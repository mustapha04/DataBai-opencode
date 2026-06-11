---
name: skill-creator
description: Creating, structuring, testing, and publishing OpenCode skills
license: MIT
compatibility: opencode
---

## skill-creator

### SKILL.md Format
Skills are Markdown files with YAML frontmatter placed in `.opencode/skills/<name>/SKILL.md`.

```markdown
---
name: skill-name
description: One-line description of when to use this skill
license: MIT
compatibility: opencode
---

## skill-name

### Section
Content with subsections, lists, tables, and code blocks as appropriate.
```

### Frontmatter Fields
| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Directory name; lowercase with hyphens |
| `description` | Yes | Single sentence on when the skill activates |
| `license` | Yes | SPDX identifier (MIT, Apache-2.0, etc.) |
| `compatibility` | Yes | Target platform (`opencode`) |

### Description Writing
- Start with a verb: "Creating...", "Debugging...", "Designing..."
- Keep under 120 characters
- Make it scannable: "Debugging Node.js memory leaks in production"
- Avoid marketing fluff; state the concrete task the skill helps with

### Content Structuring
- Use `###` subsections for topic grouping
- Use tables for comparisons, lists for steps/items, code blocks for examples
- Keep content actionable (checklists, patterns, decision trees)
- Cross-reference other skills when topics overlap
- Prefer brevity: bullet points over paragraphs

### Testing Skills
- Test with the task: invoke the skill and verify output quality
- Confirm the skill triggers only for matching tasks (not overly broad)
- Edge cases: test with partial matches, empty inputs, malformed requests
- Validate frontmatter YAML is well-formed

### Publishing
- Place SKILL.md in `.opencode/skills/<name>/`
- Include any bundled resources in the same directory
- Keep skills versioned with the project (git-tracked)
- Do not commit skills that expose proprietary information

### Versioning
- Skills are versioned by git history, not separate version fields
- Update the `description` if the skill's scope changes significantly
- Major rewrites should be done in a new directory or a clear commit

### Updating Skills
- Revise when frameworks, APIs, or best practices change
- Remove deprecated advice; note version requirements
- Update cross-references to other skills when paths change
- Run validation after edits (check frontmatter, broken links)

### Skill Organization Patterns
| Pattern | Description |
|---------|-------------|
| **Narrow focus** | One skill per specific task (recommended) |
| **Hierarchy** | `/skills/web/react/SKILL.md` for multi-level |
| **Composable** | Skills that reference each other for complex workflows |
| **Template** | Boilerplate skills for common project types |
