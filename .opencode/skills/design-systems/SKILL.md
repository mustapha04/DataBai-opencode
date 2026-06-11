---
name: design-systems
description: Building and maintaining design systems including component taxonomy, token architecture, documentation, versioning, cross-platform consistency, and accessibility
license: MIT
compatibility: opencode
---

## design-systems

### Component Taxonomy
- **Atoms** — basic elements (button, input, label)
- **Molecules** — composed atoms (form field with label + error)
- **Organisms** — complex sections (navbar, card grid)
- **Templates** — page-level wireframes
- **Pages** — specific instances of templates with real content

### Design Token Architecture
| Token Type | Example | Scope |
|-----------|---------|-------|
| Global | `color-brand-primary` | Raw values |
| Alias | `color-surface-primary` | Semantic mapping |
| Component | `button-bg-primary` | Component-specific |
| Breakpoint | `breakpoint-md` | Responsive |

### Documentation & Distribution
- Storybook for component development and visual regression
- Versioned npm packages (`@company/design-system`)
- Release notes, changelogs, migration guides
- Figma/design tool libraries synced to code tokens

### Cross-Platform Consistency
- Shared token pipeline (JSON → platform-specific outputs)
- Web: CSS custom properties; iOS: asset catalogs; Android: Compose theme
- Component implementation parity matrix

### Accessibility
- Color contrast ratios meeting WCAG AA/AAA
- Keyboard navigation, focus management, screen reader labels
- Automated a11y testing (axe-core, Lighthouse)
- Manual testing with assistive technologies

### Adoption Strategy
- Audit existing codebase for design debt
- Provide codemods and migration scripts
- Maintain a backlog of deprecated components with sunset dates
- Collect telemetry on component usage
