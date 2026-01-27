# Code Style and Conventions

## Formatting
- Indentation: 2 spaces
- Line width: 120 characters
- Semicolons: as needed (omit when Prettier removes them)
- Quote style: double quotes
- Trailing commas: ES5 style

## Imports
- Use path imports (e.g., `import { calculatePeriodFromDate } from "../domain/Period"`)
- Group imports: React hooks first, then third-party libs, then local imports
- Use `import type` for type-only imports

## TypeScript
- Use explicit types for function parameters and return values
- Prefer `type` over `interface` for simple type definitions
- Use `z.infer<typeof Schema>` to derive form types from Zod schemas
- Avoid non-null assertions (`!`); use optional chaining (`?.`) instead

## Naming Conventions
- Components: PascalCase (e.g., `SettingsForm`)
- Hooks: camelCase with "use" prefix (e.g., `useSettings`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `STORAGE_KEY`)
- Types: PascalCase (e.g., `PeriodRange`)
- File names:
  - Hooks: kebab-case (e.g., `use-settings.ts`)
  - Components: PascalCase (e.g., `SettingsForm.tsx`)

## React Patterns
- Use `React.FC<Props>` for component type annotations
- Use functional components with hooks
- Extract complex hooks into separate files
- Use `clsx` for conditional class names

## CSS/Styling
- Use Tailwind CSS utility classes inline
- Avoid CSS modules or custom CSS classes
- Use `clsx` for conditional Tailwind classes
- Keep components self-contained with inline styles

## Testing
- Unit tests: `<file>.test.ts` alongside source files
- Storybook stories: `<component>.stories.tsx` alongside components
- Use `describe`/`it` pattern from Vitest

## Error Handling
- Use Zod for form validation with `zodResolver`
- Display validation errors inline under form fields
- Use try/catch for async operations where needed
