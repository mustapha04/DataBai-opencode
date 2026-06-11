---
name: shadcn-ui
description: Use when building UI components with shadcn/ui, Radix primitives, or Tailwind classes. Covers component patterns, customization, theming, and best practices for shadcn/ui.
license: MIT
compatibility: opencode
---

## shadcn/ui Guidelines

### Setup & Conventions
- Components live in `@/components/ui/` by default
- Each component is a single file exporting a named React component
- Components are installed per-project via `npx shadcn@latest add <component>`
- Avoid modifying the generated UI components directly — extend or wrap them

### Component Patterns
- Accept and spread `className` for custom styling via parent
- Use `cn()` utility (clsx + tailwind-merge) to merge Tailwind classes
- Forward refs with `React.forwardRef` for imperative access
- Support `asChild` prop via Radix's Slot primitive when wrapping children

### Theming
- CSS variables defined in `:root` and `.dark` classes in `globals.css`
- Theme colors: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`
- Use `hsl(var(--color-name))` format for CSS variables
- Borders: `border-border` class. Radius: `rounded-lg` (default `var(--radius)`)

### Customization
- Override component styles via `className` prop
- Create variants with `cva` (class-variance-authority)
- Use `tailwind.config.ts` → `theme.extend` for project-specific tokens
- Add custom colors as CSS variables in the theme, not as arbitrary hex values

### Patterns
- Dialogs: always pair `DialogTrigger` + `DialogContent` inside `Dialog`
- Forms: wrap shadcn form components with `react-hook-form` + `zod`
- Tables: use `@tanstack/react-table` with shadcn's `<Table>` primitives
- Navigation: use `next/link` inside shadcn button/link components via `asChild`
