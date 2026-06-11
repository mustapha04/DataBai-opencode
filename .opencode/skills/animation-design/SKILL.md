---
name: animation-design
description: UI animation design principles covering timing, easing, stagger, transitions, micro-interactions, layout animations, performance, and accessibility
license: MIT
compatibility: opencode
---

## animation-design

### Timing & Easing

| Easing | CSS | Feel |
|--------|-----|------|
| Linear | `linear` | Mechanical, robotic |
| Ease-out | `cubic-bezier(0, 0, 0.2, 1)` | Natural deceleration – UI elements entering |
| Ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth start + end – transitions between states |
| Overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounce effect |

- Duration: 100–200ms for micro-interactions, 200–500ms for transitions, < 300ms recommended
- Use consistent duration and easing across similar interactions

### Stagger & Delay

- Stagger children: offset each child's start by `delay * index`
- Creates a ripple or cascade effect (list items, grid elements)
- Max total duration of stagger sequence: ~500ms to avoid feeling slow

### Micro-interactions

- Button press: scale 0.97 → 1.0 in 100ms
- Hover: subtle transform (translateY(-2px)) + shadow elevation
- Toggle: smooth 180° rotation for chevrons, color fill for switches
- Skeleton loader: shimmer animation (CSS gradient sweep) for content loading

### Layout Animations

- Use FLIP (First, Last, Invert, Play) technique for animating layout shifts
- `transform` and `opacity` only – trigger composite, not layout or paint
- Framer Motion / Motion library for React: `AnimatePresence`, `layoutId` for shared layouts
- CSS `view-transition-name` for shared element transitions (View Transitions API)

### Performance

- **Only animate `transform` and `opacity`** – GPU-composited, avoids layout thrashing
- Use `will-change: transform` sparingly (creates new layer)
- Avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
- Keep animation frame rate at 60fps; monitor with browser DevTools Performance tab

### Accessibility

- Respect `prefers-reduced-motion`: disable or reduce animations
- Provide `animation: none` or `transition-duration: 0.01ms` alternative
- Use `@media (prefers-reduced-motion: no-preference)` for enhanced animations
- Avoid flashing animations (risk of seizure – WCAG 2.3)
- Ensure all interactive elements animating are still reachable and operable
