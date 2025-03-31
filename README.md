# Period Calendar

A calendar viewer application based on fiscal or business periods, allowing you to manage calendars based on time frames that differ from the standard calendar year.

## Key Features

- Period-based calendar display with each period spanning 12 months (1 year), divided into first and second halves
- Side-by-side display of first and second half calendars
- Customizable start year/month for the first period
- Period navigation (previous and next period)
- Date highlighting features:
  - Current day (highlighted in green)
  - First day of month (highlighted in blue)
  - Past dates (displayed in lighter color)
  - Holidays (displayed in red with tooltip showing holiday name)

## Technology Stack

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vite](https://vitejs.dev/) - Build tool
- [Vitest](https://vitest.dev/) - Testing framework
- [Storybook](https://storybook.js.org/) - UI component development environment

## Requirements

- Node.js v18 or higher
- pnpm v8 or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/okonomi/period-calendar.git
cd period-calendar

# Install dependencies
pnpm install
```

## Development

### Local Development Server

Start the development server with hot module replacement:

```bash
pnpm dev
```

### Code Quality

Run all linting checks in parallel:

```bash
pnpm lint
```

Run TypeScript type checking:

```bash
pnpm lint:tsc
```

Check code formatting with Prettier:

```bash
pnpm lint:prettier
```

Run Biome linting checks:

```bash
pnpm lint:biome
```

### Automatic Fixes

Fix all linting and formatting issues automatically:

```bash
pnpm lint-fix
```

Fix Prettier formatting issues:

```bash
pnpm lint-fix:prettier
```

Fix Biome linting issues:

```bash
pnpm lint-fix:biome
```

### Testing

Run the test suite:

```bash
pnpm test
```

### Component Development

Launch Storybook for component development:

```bash
pnpm storybook
```

## Build

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## License

[MIT License](LICENSE)
