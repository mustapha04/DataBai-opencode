---
name: ui-ux-pro-max
description: Use when designing user interfaces, improving user experience, or reviewing UI/UX decisions. Covers usability heuristics, interaction design, micro-interactions, and UX research principles.
license: MIT
compatibility: opencode
---

## UI/UX Pro Max

### Usability Heuristics (Nielsen)
1. **Visibility of system status** — always show feedback within reasonable time
2. **Match system and real world** — use familiar metaphors, natural language
3. **User control and freedom** — undo, redo, cancel, back buttons
4. **Consistency and standards** — same patterns across the product
5. **Error prevention** — confirm destructive actions, constrain inputs
6. **Recognition not recall** — show options, don't make users remember
7. **Flexibility and efficiency** — shortcuts for power users, keep it simple for beginners
8. **Aesthetic and minimalist** — no irrelevant info; every element has a purpose
9. **Help users recognize and recover from errors** — clear error messages with solutions
10. **Help and documentation** — searchable help, contextual tooltips

### Interaction Design
- Transitions: 150-300ms for UI feedback, 300-500ms for page transitions
- Use `ease-out` for exits (fast start), `ease-in-out` for state changes
- Micro-interactions serve a purpose: confirm, guide, delight — never just decoration
- Loading states: skeleton screens preferred over spinners for content

### Mobile UX
- Touch targets minimum 44x44px (48x48 recommended)
- Thumb zone: primary actions in the bottom half of the screen
- Swipe gestures should have visual hints and be reversible

### UX Copy
- Buttons: verb-driven ("Save changes" not "Submit")
- Errors: explain what happened + how to fix it, not just "Error occurred"
- Empty states: illustration + explanation + action ("No items yet. Create your first one.")
- Confirmation: specific about what will happen ("Delete 3 files?" not "Are you sure?")
