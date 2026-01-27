# Suggested Commands

## Development
- `pnpm dev` - Start dev server and Storybook in parallel
- `pnpm dev:vite` - Start Vite dev server only
- `pnpm dev:storybook` - Start Storybook only (port 6006)
- `pnpm preview` - Preview production build

## Building
- `pnpm build` - Create production build (tsc + vite)
- `pnpm gen` - Run all generators
- `pnpm gen:storybook` - Build Storybook static

## Testing
- `pnpm test` - Run all tests with Vitest
- `pnpm test -- <file_path>` - Run single test file (e.g., `pnpm test -- src/domain/Period.test.ts`)
- `pnpm test -- --testNamePattern="test name"` - Run tests matching pattern

## Linting and Formatting
- `pnpm lint` - Run all lint checks in parallel
- `pnpm lint:tsc` - TypeScript type checking only
- `pnpm lint:biome` - Biome linting
- `pnpm lint:prettier` - Prettier format check
- `pnpm lint-fix` - Auto-fix all lint/format issues
- `pnpm lint-fix:biome` - Auto-fix Biome issues
- `pnpm lint-fix:prettier` - Auto-fix Prettier issues

## System Commands (Darwin/macOS)
- `git` - Standard git commands
- `ls` - List directory contents
- `cd` - Change directory
- `grep` - Search text patterns
- `find` - Find files (note: Darwin version differs from GNU)
