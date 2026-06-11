---
name: accessibility-expert
description: Web accessibility guidance covering WCAG 2.2, ARIA, keyboard navigation, screen readers, color contrast, and focus management
license: MIT
compatibility: opencode
---

## accessibility-expert

### Core Principles

- **Perceivable** – Content must be presentable to users in ways they can perceive (text alternatives, captions, adaptable content)
- **Operable** – UI components must be operable via multiple input methods (keyboard, voice, switch devices)
- **Understandable** – Content and interface must be understandable (readable text, predictable behavior, input assistance)
- **Robust** – Content must be interpretable by a wide variety of user agents including assistive technologies

### WCAG 2.2 Conformance Levels

| Level | Description | Example requirements |
|-------|-------------|---------------------|
| A | Minimum – essential barriers removed | Alt text, captions, keyboard accessible |
| AA | Mid-range – most common barriers addressed | Color contrast 4.5:1, focus visible, error identification |
| AAA | Highest – specialized accessibility | Sign language, extended audio descriptions, contrast 7:1 |

### Common Violations

- Missing or empty `alt` attributes on images
- Insufficient color contrast (< 4.5:1 for normal text)
- Non-semantic HTML (div-based buttons without ARIA roles)
- Missing form labels or improper `aria-labelledby`
- Focus not visible or focus order illogical
- Missing `lang` attribute on `<html>`
- No skip navigation link
- Dynamic content changes without `aria-live` regions

### ARIA Best Practices

- **First rule**: Use native HTML elements before ARIA (use `<button>` not `<div role="button">`)
- Ensure all interactive ARIA widgets support keyboard interaction
- Use `aria-expanded`, `aria-controls`, `aria-selected` for toggles and tabs
- Use `aria-live="polite"` for dynamic updates, `aria-live="assertive"` for critical alerts
- Avoid redundant roles (e.g., `<button role="button">`)

### Testing Tools

| Tool | Type | Use case |
|------|------|----------|
| axe DevTools | Browser extension | Automated audit during development |
| Lighthouse | Built-in Chrome | Performance + accessibility score |
| WAVE | Browser extension | Visual overlay of issues |
| NVDA / JAWS | Screen reader | Manual testing with assistive technology |
| Colour Contrast Analyser | Desktop app | Check contrast ratios |
| Accessibility Tree (DevTools) | Browser built-in | Inspect computed accessible properties |
