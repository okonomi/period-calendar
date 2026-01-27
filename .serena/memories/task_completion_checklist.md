# Task Completion Checklist

## Before Committing

1. **Run lint-fix**: `pnpm lint-fix`
   - Fixes Biome and Prettier issues automatically

2. **Run type check**: `pnpm lint:tsc`
   - Ensure no TypeScript errors

3. **Run tests**: `pnpm test`
   - Ensure all tests pass

4. **Check changes**: `git --no-pager diff`
   - Review all changes before committing

## Git Conventions

### Commit Message Format
Use Conventional Commits format:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `test:` - Test changes
- `style:` - Code style (formatting, etc.)
- `perf:` - Performance improvement
- `build:` - Build system changes
- `ci:` - CI configuration
- `chore:` - Other changes

### Examples
- `feat: add calendar display mode setting`
- `fix: resolve issue with date calculation`
- `refactor: replace CSS classes with Tailwind utilities`

### Notes
- Write commit messages in English
- Run `pnpm lint-fix` before committing
