---
name: web-design-guidelines
description: Use when building web UI layouts, navigation, landing pages, or content pages. Covers visual hierarchy, information architecture, navigation patterns, and conversion-focused design.
license: MIT
compatibility: opencode
---

## Web Design Guidelines

### Visual Hierarchy
- Most important action gets the most visual weight (color, size, position)
- Headings create scannable content structure (H1 → H2 → H3)
- Use whitespace to group related elements and separate unrelated ones
- Contrast draws attention: primary CTAs should stand out clearly

### Information Architecture
- Navigation should answer "Where am I? Where can I go? How do I get back?"
- Limit top-level nav to 5-7 items
- Breadcrumbs for content deeper than 2 levels
- Search for content-heavy sites (500+ pages)

### Landing Pages
- Hero section: 1 clear value proposition, 1 primary CTA, supporting visual
- Social proof (testimonials, logos, stats) builds trust above the fold
- Feature sections: problem → solution format, one per row
- Clear CTA repetition every 1-2 scrolls

### Navigation Patterns
- Sticky top nav for desktop, bottom nav or hamburger for mobile
- Active state must be visually distinct
- Dropdowns should be keyboard-accessible (Enter opens, Escape closes)
- Mega-menus for complex hierarchies (e-commerce, SaaS)

### Forms
- Single-column layouts convert better than multi-column
- Show inline validation errors (not just on submit)
- Group related fields with `<fieldset>` and `<legend>`
- Use appropriate input types (`email`, `tel`, `number`, `date`)

### Conversion
- Reduce friction: remove optional fields, show progress bars on multi-step
- Primary CTA: action-oriented text ("Get Started" not "Submit")
- Trust signals near forms (money-back guarantee, privacy link)
- A/B test headlines, CTAs, and form length
