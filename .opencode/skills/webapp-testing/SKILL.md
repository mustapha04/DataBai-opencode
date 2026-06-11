---
name: webapp-testing
description: Use when writing tests for web applications across all layers — unit, integration, e2e, and visual regression. Covers testing strategy, tool selection, and coverage patterns.
license: MIT
compatibility: opencode
---

## Webapp Testing Strategy

### Testing Trophy (not pyramid)
- **Static analysis** (TypeScript, ESLint) — catch type/format errors
- **Unit tests** (Vitest, Jest) — pure logic, hooks, utilities
- **Integration tests** (Testing Library) — component behavior, side effects
- **E2E tests** (Playwright, Cypress) — critical user journeys
- **Visual regression** (Storybook + Chromatic, Percy) — UI snapshot diffs
- Prioritize integration tests over unit tests for higher ROI

### Unit Tests (Vitest)
- Test pure functions, reducers, custom hooks, utility helpers
- Mock external dependencies (API calls, browser APIs) with `vi.mock`
- Group by module/feature, not by test type
- Coverage threshold: 80%+ on business logic, optional on UI boilerplate

### Integration Tests (Testing Library)
- Render components with their real dependencies where possible
- Query by accessibility role/text, not test IDs
- Test user flows: render → interact → assert
- Avoid testing implementation details (state, internal methods)

### E2E Tests
- Cover signup, login, core CRUD, payment flow
- Run against a staging or local environment
- Use data attributes (`data-testid`) sparingly for hard-to-reach elements
- Keep E2E suite under 15 minutes; split into parallel shards if larger

### Mocking Strategy
- Network: MSW (Mock Service Worker) for API mocking in all test types
- Time: `vi.useFakeTimers` for date/time dependent logic
- Browser APIs: mock `fetch`, `localStorage`, `IntersectionObserver` as needed

### Test Data
- Factories (not fixtures) for generating test data (Faker.js + custom factories)
- Clean up between tests: `afterEach` cleanup, `beforeEach` fresh state
- Never share mutable test data between tests
