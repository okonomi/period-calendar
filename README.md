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

```bash
# Start development server
pnpm dev

# Run linting
pnpm lint

# Auto-fix linting issues
pnpm lint-fix

# Run tests
pnpm test

# Launch Storybook
pnpm storybook
```

## Build

```bash
# Production build
pnpm build

# Preview build
pnpm preview
```

## License

[MIT License](LICENSE)
