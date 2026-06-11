---
name: design-taste-frontend
description: Use when making visual design decisions, choosing aesthetics, or improving polish of a frontend UI. Provides guidance on modern design trends, visual polish, animations, and aesthetic judgment.
license: MIT
compatibility: opencode
---

## Design Taste for Frontend

### Modern Aesthetic Principles
- **Subtle depth**: light shadows (not heavy drop shadows), layered cards, elevated navigation
- **Soft gradients**: muted accent-to-accent gradients for backgrounds, not bright neon
- **Glassmorphism**: backdrop-blur with semi-transparent backgrounds for overlays/modals
- **Border radius**: 8px as default card radius, 16-24px for large modals, 9999px for pills
- **Thin borders**: 1px borders using slightly transparent colors (`border-white/10` on dark)

### Visual Polish
- Icons should have consistent stroke width (1.5px-2px) across the app
- Use subtle hover states: scale(1.02) for cards, color shift for buttons
- Focus states: use `ring-2 ring-offset-2` pattern, not `outline`
- Loading: skeleton gradients with shimmer animation, not plain gray blocks

### Typography Choices
- Sans-serif for UI (Inter, SF Pro, system-ui), serif/display for headings on content pages
- Monospace for code, numbers, and data (JetBrains Mono, SF Mono)
- Avoid pure black text on white (#000/#fff) — use near-black/near-white (#111/#f5f5f5)

### Color Taste
- Use color sparingly: 80% neutral, 15% accent, 5% semantic (success/warning/danger)
- Accent color for interactive elements only (links, buttons, active states)
- Avoid pure red for errors, pure green for success — use muted variants (#e53e3e, #38a169)

### Motion Taste
- Staggered entrance animations (items appear one after another, 50ms delay each)
- Page transitions: fade + slight slide (100-200ms)
- Hover animations: subtle lift (translateY(-2px)) + shadow deepening
- Respect `prefers-reduced-motion`: disable all non-essential animations

### Anti-Patterns (What NOT to do)
- No gradients on text (hard to read)
- No auto-playing carousels
- No underlines on non-link text
- No center-aligned text in paragraphs (only headings)
- No clashing border radii (mix sharp and pill shapes)
- No full-width horizontal scrolling
