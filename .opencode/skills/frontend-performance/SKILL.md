---
name: frontend-performance
description: Frontend performance optimization (Core Web Vitals, Lighthouse, performance budgets, render optimization, lazy loading, code splitting, image optimization, CDN, caching, RAIL model)
license: MIT
compatibility: opencode
---

## frontend-performance

### Core Web Vitals

| Metric | Good | Poor | Description |
|--------|------|------|-------------|
| LCP | ≤2.5s | >4.0s | Largest Contentful Paint |
| FID/INP | ≤100ms | >300ms | First Input Delay / Interaction to Next Paint |
| CLS | ≤0.1 | >0.25 | Cumulative Layout Shift |

### RAIL Model

- **Response**: respond to user input within 50ms
- **Animation**: produce a frame every 10ms (60fps)
- **Idle**: maximize idle time for deferred work
- **Load**: deliver content within 5s

### Techniques

- **Lazy Loading**: `loading="lazy"` on images/iframes, dynamic `import()`
- **Code Splitting**: route-based and component-level splitting with dynamic imports
- **Image Optimization**: WebP/AVIF, responsive `srcset`, CDN transformations, blur-up placeholders
- **Bundle Optimization**: tree-shaking, scope hoisting, minification, compression (Brotli/Gzip)
- **Caching**: service workers (Cache First for assets, Network First for API), HTTP caching headers, CDN edge caching
- **Critical CSS**: inline above-the-fold styles, defer non-critical
- **Font Loading**: `font-display: swap`, subset fonts, preload critical fonts

### Performance Budgets

Set thresholds for bundle size (JS ≤170KB gzipped), time to interactive, and page weight. Enforce in CI with tools like Lighthouse CI or Webpack Bundle Analyzer.

### Render Optimization

- Avoid layout thrashing: batch DOM reads/writes
- Use `will-change` sparingly, promote layers with `transform: translateZ(0)`
- Virtualize long lists with `react-window` or similar
- Debounce/resize observers for scroll and resize handlers

### Monitoring

- Real User Monitoring (RUM) with Web Vitals API
- Synthetic monitoring with Lighthouse CI
- Error budget tracking aligned to SLOs
