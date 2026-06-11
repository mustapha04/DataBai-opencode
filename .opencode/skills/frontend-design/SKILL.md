---
name: frontend-design
description: Use when building or modifying UI components, layouts, or visual design. Provides frontend design principles including spacing, typography, color, layout, accessibility, and responsive design patterns.
license: MIT
compatibility: opencode
---

## Frontend Design Guidelines

### Spacing & Layout
- Use a consistent 4px or 8px grid system for spacing (margin, padding, gap)
- Prefer `gap` over individual margins in flex/grid layouts
- Maintain balanced whitespace: dense on data-heavy pages, airy on content pages
- Max content width 1200px, with 24px side padding on mobile

### Typography
- Limit to 1-2 font families (1 display + 1 body)
- Type scale: 12 / 14 / 16 / 20 / 24 / 32 / 48 px
- Line-height: 1.5 body, 1.3 headings
- Max line length 70-80 characters for readability

### Color
- Use CSS variables for all colors (never hardcode hex values)
- Provide light + dark themes via `prefers-color-scheme` or class toggle
- Ensure WCAG AA contrast (4.5:1 text, 3:1 large text)
- Semantic colors: accent (primary), muted (secondary), danger (errors), success, warning

### Accessibility
- All interactive elements must be keyboard-focusable
- Use `aria-label` on icon-only buttons
- Form inputs need explicit `<label>` elements
- Maintain focus-visible ring styles

### Responsive
- Mobile-first CSS: base styles for mobile, `min-width` breakpoints up
- Common breakpoints: 640px, 768px, 1024px, 1280px
- Test at 320px width minimum

### Performance
- Lazy-load images below the fold
- Avoid layout shifts: set explicit width/height on images
- Minimize re-renders with `React.memo`, `useMemo`, `useCallback` where measured
- Code-split route-level components
