---
name: browser-use
description: Browser automation with Playwright and Puppeteer covering page automation, scraping, form filling, screenshots, network interception, and performance metrics
license: MIT
compatibility: opencode
---

## browser-use

### Tool Selection

| Feature | Playwright | Puppeteer |
|---------|------------|-----------|
| Browser support | Chromium, Firefox, WebKit | Chromium only |
| Cross-language | JS, Python, .NET, Java | JS, Python (unofficial) |
| Auto-wait API | Built-in (`locator.waitFor()`) | Manual (`page.waitForSelector()`) |
| Network interception | Full API | Full API |
| Native mobile emulation | Yes | Yes |
| CI out-of-box | Ships browsers | Requires download |

### Core Operations

- **Navigation**: `page.goto(url, { waitUntil: 'networkidle' })`
- **Selectors**: Prefer `getByRole`, `getByText`, `getByTestId` – avoid fragile CSS selectors
- **Form filling**: `locator.fill('value')` – clears and types
- **Screenshots**: `page.screenshot({ fullPage: true })` for entire page
- **PDF generation**: `page.pdf({ format: 'A4' })` (Chromium only)

### Waiting Strategies

| Strategy | Method | Use Case |
|----------|--------|----------|
| Navigation | `waitUntil: 'networkidle'` | Page fully loaded |
| Element visible | `locator.waitFor({ state: 'visible' })` | Element appears |
| Network idle | `page.waitForLoadState('networkidle')` | All network requests settled |
| Custom timeout | `page.waitForTimeout(ms)` | Only when absolutely necessary |
| Response | `page.waitForResponse(url)` | Wait for specific API response |

### Network Interception

- Block unnecessary resources (images, fonts, analytics): `page.route('**/*.{png,jpg,woff}', route => route.abort())`
- Mock API responses for deterministic testing
- Capture HAR files: `page.route('**', handler)` to record requests/responses
- Modify request headers (User-Agent, Authorization)
- Slow down network: `page.route('**', route => setTimeout(() => route.continue(), ms))`

### Performance Metrics

```javascript
const metrics = await page.metrics();
// { Timestamp, Documents, Frames, JSEventListeners, Nodes,
//   LayoutCount, RecalcStyleCount, LayoutDuration, RecalcStyleDuration,
//   ScriptDuration, TaskDuration, JSHeapUsedSize, JSHeapTotalSize }
```

- **LCP, FID, CLS**: Core Web Vitals via `page.evaluate()` or Lighthouse
- **Tracing**: `browser.startTracing(page)` for detailed performance timeline
- **Console monitoring**: Listen to `console` events for warnings/errors

### Parallel Execution

- Create multiple `BrowserContext` objects for isolated sessions
- Each context: separate cookies, localStorage, cache
- Run scenarios in worker threads (Playwright test runner) or `Promise.all`
- Context limit per browser: ~5–10 before memory becomes an issue
