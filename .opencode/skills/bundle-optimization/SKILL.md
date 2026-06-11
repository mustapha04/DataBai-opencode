---
name: bundle-optimization
description: Frontend bundle optimization covering tree shaking, code splitting, dynamic imports, lazy loading, bundle analysis, image optimization, and font subsetting
license: MIT
compatibility: opencode
---

## bundle-optimization

### Bundle Analysis

| Tool | Type | What It Shows |
|------|------|---------------|
| webpack-bundle-analyzer | Webpack plugin | Interactive treemap of bundle contents |
| vite-bundle-visualizer | Vite plugin | Rollup output visualization |
| source-map-explorer | CLI | Size breakdown from source maps |
| Lighthouse | Browser | Unused JS/CSS, bundle size impact on load |

### Tree Shaking

- Use ES module syntax (`import`/`export`) – CommonJS cannot be tree-shaken reliably
- Mark side-effect-free packages: `"sideEffects": false` in `package.json`
- Avoid barrel files (`index.ts` that re-export everything) – they prevent tree shaking
- Import directly from module path: `import { throttle } from 'lodash-es/throttle'`
- Use `lodash-es` over `lodash` for tree-shakable lodash

### Code Splitting & Dynamic Imports

```javascript
// Dynamic import – splits into separate chunk
const AdminDashboard = () => import('./AdminDashboard.vue')

// React.lazy for component-level splitting
const SettingsPage = React.lazy(() => import('./pages/Settings'))
```

- Split by route (most common and effective)
- Split by component visibility (heavy component below the fold)
- Split by library condition (WYSIWYG editor loaded only when user clicks edit)
- Preload critical chunks: `<link rel="preload">`, `prefetch` for next-page chunks

### Image Optimization

- **Modern formats**: WebP, AVIF (30% / 50% smaller than JPEG), with `<picture>` fallback
- **Responsive images**: `srcset` with multiple widths, `sizes` attribute
- **Lazy loading**: `loading="lazy"` for below-fold images
- **CDN transformation**: `?w=800&format=webp` query parameters (imgix, Cloudinary)
- **Blur placeholders**: Tiny preview (30x30px, blurred) while full image loads
- **CSS sprites / SVG sprites**: Combine small icons into single file

### Font Subsetting

- Include only characters actually used (Latin, specific glyphs)
- Tools: `glyphhanger`, `fonttools`, Google Fonts `?text=` parameter
- Use `font-display: swap` to prevent invisible text during load
- Prefer WOFF2 format (30–50% smaller than WOFF)

### Vite / Webpack / Rollup Configs

| Tool | Key Optimization | Config |
|------|------------------|--------|
| Vite | Automatic code splitting | `build.rollupOptions.output.manualChunks` |
| Webpack | SplitChunksPlugin | `optimization.splitChunks.cacheGroups` |
| Rollup | Manual chunks | `output.manualChunks` function |
| esbuild | Minification + bundling | `minify: true`, `target: 'es2020'` |

### Measuring Impact

- Track: total JS size (gzipped), total CSS size, first-load JS, code coverage (% unused)
- Budget: < 200 KB JS (gzipped) for initial load, < 50 KB CSS
- Lighthouse score for performance budget enforcement in CI
