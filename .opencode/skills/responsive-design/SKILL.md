---
name: responsive-design
description: Responsive web design covering breakpoint strategy, mobile-first CSS, fluid typography, responsive images, container queries, responsive grids, accessibility across devices, and testing
license: MIT
compatibility: opencode
---

## responsive-design

### Breakpoint Strategy
```css
/* Mobile-first approach */
/* Base styles: mobile (default) */
@media (min-width: 640px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Wide */ }
```

| Breakpoint | Target |
|---|---|
| 0-639px | Mobile |
| 640-1023px | Tablet portrait |
| 1024-1439px | Desktop |
| 1440px+ | Wide desktop |

- Use logical, content-driven breakpoints, not device-specific
- Max 4-5 breakpoints to maintain complexity

### Mobile-First
- Base CSS targets smallest viewport
- Enhance with `min-width` media queries
- Touch targets ≥ 44×44px
- Bottom-anchored navigation on mobile

### Fluid Typography
```css
font-size: clamp(1rem, 0.75rem + 0.5vw, 1.25rem);
```
- `clamp()` for responsive font scales
- CSS `calc()` with viewport units
- Modular scale (1.25, 1.333) for headings

### Responsive Images
```html
<img src="small.jpg"
     srcset="medium.jpg 640w, large.jpg 1024w"
     sizes="(max-width: 640px) 100vw, 50vw"
     alt="Description">
```
- `<picture>` element for art direction
- AVIF/WebP formats with `<source>` fallback
- `loading="lazy"` for below-fold images
- `aspect-ratio` to prevent layout shift

### Container Queries
```css
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```
- Component-level responsiveness
- `container-type: inline-size` on parent
- Combine with grid for fully adaptive layouts

### Responsive Grids
- CSS Grid with `auto-fill` / `auto-fit` and `minmax()`
```css
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
```
- Flexbox for simpler layout / nav / inline elements

### Accessibility Across Devices
- Focus indicators visible on all screen sizes
- Touch-friendly spacing (8px grid)
- `prefers-reduced-motion` for motion sensitivity
- `prefers-color-scheme` for dark mode
- Landmarks (`<nav>`, `<main>`, `<aside>`) regardless of layout

### Testing
- Chrome DevTools device emulation
- Responsive design mode in Firefox
- Real device testing (BrowserStack, physical)
- Visual regression testing (Playwright, Percy)
- Performance testing on 3G throttling
