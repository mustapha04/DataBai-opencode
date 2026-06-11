---
name: playwright-best-practices
description: Use when writing or debugging Playwright end-to-end tests. Covers selectors, assertions, parallel execution, CI integration, and test organization patterns.
license: MIT
compatibility: opencode
---

## Playwright Best Practices

### Test Organization
- Group tests by feature/page using `test.describe`
- One `test.describe` per page or logical flow
- Keep tests independent — no shared state between them
- Use `test.beforeEach` for setup (login, navigate), not `beforeAll`

### Selectors
- Prefer user-facing attributes: `getByRole`, `getByText`, `getByLabel`, `getByPlaceholder`
- Use `getByTestId` only as last resort — avoid brittle CSS/XPath selectors
- Data attributes: `data-testid="submit-button"` format, kebab-case
- Avoid chaining selectors when a direct one works

### Assertions
- Use auto-retrying assertions: `expect(page.locator(...)).toHaveText()`
- Prefer `toHaveText` / `toContainText` over `toBeVisible` for content verification
- Assert loading states: wait for elements to disappear (`toBeHidden`), not arbitrary timeouts
- Avoid `page.waitForTimeout` — use `waitForSelector`, `waitForURL`, `waitForResponse`

### Parallel Execution
- Tests in a single file run serially by default; use `test.describe.configure({ mode: 'parallel' })` for independent tests
- Use `fullyParallel: true` in config for project-wide parallel mode
- Each test worker gets its own browser context (isolated storage, cookies)
- Set `workers: process.env.CI ? 4 : 1` for CI vs local

### CI Integration
- Use `retries: 2` in CI for flaky tests
- Record traces on retry: `trace: 'on-first-retry'`
- Capture screenshots on failure: `screenshot: 'only-on-failure'`
- Use `--reporter=html,github` for nice reports in CI output

### Fixtures
- Extend base test with custom fixtures for auth, DB, API mocking
```ts
const test = base.extend<{ auth: AuthFixture }>({
  auth: async ({ page }, use) => { ... }
})
```
