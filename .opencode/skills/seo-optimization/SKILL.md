---
name: seo-optimization
description: SEO optimization techniques for improving search engine visibility and rankings
license: MIT
compatibility: opencode
---

## seo-optimization

### Meta Tags
- **Title tag**: `<title>` — unique per page, 50-60 chars, primary keyword first
- **Meta description**: 150-160 chars, compelling summary with CTA
- **Open Graph**: `og:title`, `og:description`, `og:image`, `og:url` for social sharing
- **Twitter Cards**: `twitter:card`, `twitter:site` for Twitter previews
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Robots**: `<meta name="robots" content="index, follow">` per page

### Structured Data (JSON-LD)
- **Organization**: name, logo, URL, contact info
- **BreadcrumbList**: navigation path for rich snippets
- **Article/BlogPosting**: headline, author, datePublished, image
- **Product**: name, price, availability, reviews
- **FAQPage**: question/answer pairs for featured snippets
- **LocalBusiness**: address, phone, hours, geo coordinates

### Sitemap
- XML sitemap at root (`/sitemap.xml`)
- Include all canonical pages; exclude thin/duplicate content
- Use `<lastmod>`, `<changefreq>`, `<priority>` tags
- Submit to Google Search Console and Bing Webmaster Tools
- Keep under 50k URLs or 50MB; use sitemap index for larger sites

### robots.txt
- Allow/disallow crawler paths (`User-agent: *`, `Disallow: /admin/`)
- Point to sitemap: `Sitemap: https://example.com/sitemap.xml`
- Test with Google's robots.txt tester
- Block sensitive areas (admin, staging, API if not public)

### Canonical URLs
- `<link rel="canonical" href="https://example.com/page/">`
- Prevent duplicate content issues (www vs non-www, http vs https, trailing slash)
- Self-referencing canonical on preferred page version
- Consistent URL structure across the site

### Heading Structure
- Single `<h1>` per page (primary topic/keyword)
- Hierarchical: `h1 → h2 → h3` (never skip levels)
- Headings describe page content; include keywords naturally
- Use descriptive headings, not generic ("Services" → "Cloud Migration Services")

### Page Speed
- Target <2.5s LCP, <100ms FID, <0.1 CLS (Core Web Vitals)
- Optimize images: WebP/AVIF, lazy loading, responsive sizes
- Minify HTML, CSS, JS; remove unused CSS/JS
- Use CDN and enable compression (Brotli, gzip)
- Reduce render-blocking resources; defer non-critical JS

### Mobile Friendliness
- Responsive design with mobile-first CSS
- Touch-friendly targets (48px minimum)
- No intrusive interstitials (pop-ups)
- Test with Google's Mobile-Friendly Test
- Use `viewport` meta tag correctly

### Backlink Strategy
- Earn links from authoritative, relevant sites
- Create linkable assets: guides, research, tools, infographics
- Guest post on reputable industry blogs
- Disavow toxic backlinks via Google Search Console
- Monitor backlink profile (Ahrefs, Majestic, Moz)

### Analytics
- Google Analytics 4 (GA4) or alternative (Plausible, Fathom)
- Track organic traffic, landing pages, bounce rate, conversions
- Set up goals and conversion tracking
- Monitor search console data for impressions, clicks, CTR, position

### hreflang
- `rel="alternate" hreflang="x"` for multilingual sites
- Include self-referencing hreflang tag
- Use language-region codes (`en-US`, `en-GB`, `fr-CA`)
- Submit in sitemap or `<link>` tags in `<head>`
- Every language page must have reciprocal hreflang tags
