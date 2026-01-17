# AGENTS.md - Period Calendar Development Guide

## Build, Lint, and Test Commands

### Core Commands

- Run all tests: `pnpm test`
- Run single test file: `pnpm test -- <file_path>` (e.g., `pnpm test -- src/domain/Period.test.ts`)
- Run single test: `pnpm test -- --testNamePattern="test name"`
- Build project: `pnpm build`
- Preview build: `pnpm preview`
- Start dev server: `pnpm dev`
- Start Storybook: `pnpm dev:storybook`

### Generation Commands

- Run all generators: `pnpm gen`
- Build Storybook static: `pnpm gen:storybook`

### Linting and Formatting

- All lint checks: `pnpm lint`
- Type check only: `pnpm lint:tsc`
- Biome lint: `pnpm lint:biome`
- Prettier check: `pnpm lint:prettier`
- Auto-fix all: `pnpm lint-fix`
- Auto-fix Biome: `pnpm lint-fix:biome`
- Auto-fix Prettier: `pnpm lint-fix:prettier`

## Code Style Guidelines

### Imports

- Use path imports (e.g., `import { calculatePeriodFromDate } from "../domain/Period"`)
- Group imports: React hooks first, then third-party libs, then local imports
- Use `import type` for type-only imports

### Formatting

- Indent: 2 spaces
- Line width: 120 characters
- Semicolons: as needed (omit when Prettier removes them)
- Quote style: double quotes
- Trailing commas: ES5 style

### TypeScript

- Use explicit types for function parameters and return values
- Prefer `type` over `interface` for simple type definitions
- Use `z.infer<typeof Schema>` to derive form types from Zod schemas
- Avoid non-null assertions (`!`); use optional chaining (`?.`) instead

### Naming Conventions

- Components: PascalCase (e.g., `SettingsForm`)
- Hooks: camelCase with "use" prefix (e.g., `useSettings`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `STORAGE_KEY`)
- Types: PascalCase (e.g., `PeriodRange`)
- File names: kebab-case for hooks (e.g., `use-settings.ts`), PascalCase for components (e.g., `SettingsForm.tsx`)

### React Patterns

- Use `React.FC<Props>` for component type annotations
- Use functional components with hooks
- Extract complex hooks into separate files (e.g., `useClickOutside`)
- Use `clsx` for conditional class names

### Error Handling

- Use Zod for form validation with `zodResolver`
- Display validation errors inline under form fields
- Use try/catch for async operations where needed

### CSS/Styling

- Use Tailwind CSS utility classes inline
- Avoid CSS modules or custom CSS classes
- Use `clsx` for conditional Tailwind classes
- Keep components self-contained with inline styles

### File Organization

- Domain logic: `src/domain/`
  - `Period.ts` - Period calculation logic
  - `CalendarDate.ts` - Calendar date utilities
  - `Dates.ts` - Date range generation
  - `Holiday.ts` - Holiday handling
  - `YearMonth.ts` - Year/month type and utilities
- Components: `src/components/`
  - Icons in `icon/` subdir (e.g., `SettingsIcon.tsx`, `ArrowPathIcon.tsx`, `CalculatorIcon.tsx`)
  - UI components (e.g., `Calendar.tsx`, `DateCell.tsx`, `SettingsForm.tsx`)
- Providers: `src/providers/` (e.g., `SettingsProvider.tsx`, `HolidaysProvider.tsx`)
- Contexts: `src/contexts/` (e.g., `SettingsContext.ts`, `HolidaysContext.ts`)
- Types: `src/types/` (e.g., `Settings.ts`)
- Hooks: `src/hooks/` (e.g., `use-settings.ts`, `use-holidays.ts`)

### Testing

- Unit tests: `<file>.test.ts` alongside source files
- Storybook stories: `<component>.stories.tsx` alongside components
- Use `describe`/`it` pattern from vitest
- Test files follow the same directory structure as source files

### Git Conventions

- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `style:`, `perf:`, `build:`, `ci:`, `chore:`
- Write commit messages in English
- Run `pnpm lint-fix` before committing
- Check changes with `git --no-pager diff`
- Examples:
  - `feat: add calendar display mode setting`
  - `fix: resolve issue with date calculation`
  - `refactor: replace CSS classes with Tailwind utilities`
