---
name: qa
description: Use when performing quality assurance, bug triage, or writing test plans. Covers QA workflows, bug reporting, regression testing, and quality metrics.
license: MIT
compatibility: opencode
---

## QA Practices

### Bug Reporting
- Title: clear problem statement ("Login fails with valid credentials on Safari")
- Steps to reproduce: numbered, starting from a known state
- Expected vs actual result (with screenshots/recordings)
- Environment: OS, browser, device, screen size
- Severity: Critical / Major / Minor / Trivial
- Include logs, network tab capture, console errors

### Test Plan Structure
- Feature description and scope
- Test environment requirements
- Acceptance criteria mapped to test cases
- Edge cases: empty states, error states, boundary values, permissions
- Regression scope: what existing functionality could break

### QA Checklist (per feature)
- [ ] Happy path works end-to-end
- [ ] Error states handled gracefully
- [ ] Loading states shown during async operations
- [ ] Empty states display helpful message + action
- [ ] Input validation (required, format, length)
- [ ] Responsive layout at 320px, 768px, 1024px, 1440px
- [ ] Keyboard navigation (Tab order, Enter/Space activation)
- [ ] Screen reader (aria labels, live regions, focus management)
- [ ] Dark mode renders correctly
- [ ] API errors (4xx, 5xx) don't crash the UI

### Regression Testing
- Automate critical paths (login, checkout, core CRUD)
- Run regression suite before every release
- Tag smoke tests to run in CI on every commit
- Visual regression for UI-heavy features

### Quality Metrics
- Bug reopen rate (< 5%)
- Test coverage (> 80% critical paths)
- Regression test pass rate (> 99%)
- Time to fix critical bugs (< 24h)
- User-reported vs internal-found bug ratio

### QA Process
1. Verify acceptance criteria against the build
2. Run exploratory tests beyond the AC
3. Regression test related areas
4. Document all findings in the ticket
5. Mark pass/fail per test case
