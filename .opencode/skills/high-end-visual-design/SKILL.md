---
name: high-end-visual-design
description: Premium visual design for web (cinematic layouts, parallax, micro-animations, rich typography, color science, visual hierarchy, white space, mood boards, design tokens for premium feel)
license: MIT
compatibility: opencode
---

## high-end-visual-design

### Cinematic Layouts

- Full-bleed hero sections with gradient overlays
- Asymmetric grid layouts with intentional negative space
- Layered depth via `z-index`, translucency, and shadows
- Sticky/pinned elements that create narrative scrolling

### Parallax & Scroll Effects

- Multi-plane parallax with `transform: translateZ()` and perspective
- Scroll-triggered reveals (intersection observer, scroll-driven animations)
- Horizontal scroll sections for portfolio/timeline content
- Video backgrounds with scroll-based playback scrubbing

### Micro-Animations

| Element | Animation | Purpose |
|---------|-----------|---------|
| Buttons | Scale + glow on hover | Affordance |
| Navigation | Underline slide, active indicator | Wayfinding |
| Cards | Lift + shadow depth on hover | Selectability |
| Page transitions | Shared element, crossfade | Continuity |
| Loading | Skeleton shimmer, gradient sweep | Perceived speed |

### Typography

- Pair contrasting typefaces (e.g., serif headings + sans body)
- Establish a modular scale (1.25 or 1.333 ratio)
- Consider `font-variation-settings` for variable fonts
- Optimal line-height: 1.2 for headings, 1.6 for body
- Letter-spacing: tighter for display, looser for lowercase body

### Color Science

- Use HSL for intuitive color manipulation
- Define a limited palette (primary, secondary, accent, neutral, surface)
- Ensure WCAG AA contrast (4.5:1 for text, 3:1 for large text)
- Dark mode: preserve hierarchy, use softer contrasts (reduced blue light)
- Gradient design: analogous hues with distinct saturation stops

### Visual Hierarchy

- Scannable: F-pattern or Z-pattern layouts
- Emphasis: size, color, weight, spacing (not all at once)
- Group related elements with proximity and background containers
- Limit to one primary action per viewport

### Design Tokens

```json
{
  "color": {
    "brand": { "primary": "#1a1a2e", "accent": "#e94560" }
  },
  "typography": {
    "font": { "display": "Canela", "body": "Inter" },
    "scale": { "h1": "3rem", "h2": "2rem", "body": "1rem" }
  },
  "spacing": {
    "xs": "0.25rem", "sm": "0.5rem", "md": "1rem",
    "lg": "2rem", "xl": "4rem", "2xl": "8rem"
  }
}
```

### White Space

- Generous padding around hero sections (20-30% viewport height)
- Content max-width: 640-720px for reading, 1200px for layouts
- Use whitespace to separate distinct content zones
- Avoid dense layouts; every element needs breathing room

### Mood Boards & Direction

- Reference: Awwwards, Dribbble, Behance, SiteInspire
- Pull from cinematic, editorial, and luxury brand design
- Define 3-5 key experiential qualities (e.g., "bold, warm, fluid, minimal")
