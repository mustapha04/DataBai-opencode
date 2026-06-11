---
name: refactoring-expert
description: Use when refactoring existing code to improve structure, readability, or performance. Covers refactoring techniques, safe refactoring strategies, and code smell detection.
license: MIT
compatibility: opencode
---

## Refactoring Expert

### Principles
- Refactor to improve structure without changing behavior
- Never refactor and add features in the same PR
- Have a safety net (tests) before touching code
- Make small, verifiable steps — commit after each safe transformation
- If a refactor is risky, do a gradual migration (strangler fig pattern)

### Code Smells
| Smell | Fix |
|---|---|
| Long method | Extract smaller methods |
| Large class | Extract class/module |
| God object | Split into focused modules |
| Shotgun surgery | Consolidate related behavior |
| Feature envy | Move method to the data it uses |
| Switch statements | Replace with polymorphism |
| Primitive obsession | Create value objects |
| Duplicated code | Extract function/class |
| Long parameter list | Introduce parameter object |
| Data clumps | Group into a class |

### Safe Refactoring Steps
1. **Characterize**: add tests capturing current behavior (characterization tests)
2. **Identify**: find the code smell / improvement area
3. **Plan**: decide the refactoring technique
4. **Execute**: make one transformation at a time
5. **Verify**: run tests after each step
6. **Commit**: commit the refactoring (not mixed with feature work)

### Common Refactorings
- **Extract Function**: inline code → named function with clear intent
- **Inline Function**: simple delegation → direct call
- **Rename Variable/Function**: improve clarity (IDE rename refactoring)
- **Replace Conditional with Polymorphism**: switch/case → strategy pattern
- **Extract Class**: cohesive group of fields/methods → separate class
- **Parameter Object**: multiple related params → single object
- **Replace Magic Number with Constant**: literal → named constant

### Refactoring Legacy Code
- Before touching untested code, add characterization tests
- Use the "Sprout Method" pattern: add new code as a separate method, then inline
- Use the "Sprout Class" pattern: extract new functionality into a new class
- Strangler Fig: route old behavior to new implementation incrementally

### When NOT to Refactor
- Code that will be rewritten soon anyway
- Code that works and is never modified
- In a rush before a deadline
- When it would break third-party integrations without sufficient testing
