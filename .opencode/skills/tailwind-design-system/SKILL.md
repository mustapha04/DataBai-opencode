---
name: tailwind-design-system
description: Use when writing Tailwind CSS classes, configuring tailwind.config, or building design tokens. Covers utility patterns, responsive design, custom theme extensions, and design system tokens.
license: MIT
compatibility: opencode
---

## Tailwind Design System

### Utility Patterns
- Mobile-first: unresponsive classes are mobile, `sm:` `md:` `lg:` `xl:` `2xl:` for larger
- Use `flex`, `grid`, `gap-*` for layout instead of float/position hacks
- Spacing scale (p/m/gap): 0, 0.5 (2px), 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px)
- Color opacity: `bg-primary/50` for 50% opacity of the primary color

### Theme Configuration (`tailwind.config.ts`)
```ts
export default {
  theme: {
    extend: {
      colors: {
        brand: { 50: '...' 500: '...' 900: '...' },
      },
      fontFamily: { display: ['...'], body: ['...'] },
      spacing: { 18: '4.5rem', 22: '5.5rem' },
      borderRadius: { '4xl': '2rem' },
    },
  },
}
```

### Design System Tokens
- Colors: use semantic names (`primary`, `muted`, `danger`) in the config, reference via `text-primary`
- Dark mode: use `dark:` prefix or `class` strategy with a toggle
- Typography: define font families and sizes in config, use `font-body` `font-display` utilities
- Use `@tailwindcss/typography` plugin for prose content

### Performance
- Avoid dynamic class construction (use full class names so PurgeCSS can detect them)
- Use `@apply` sparingly — prefer utility classes directly in JSX
- Extract repeated patterns into React components, not utility abstractions

### Best Practices
- Keep `tailwind.config.ts` the single source of truth for design tokens
- Extend rather than override the default theme
- Group related classes in JSX consistently (layout → spacing → typography → color → effects)
