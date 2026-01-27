# Period Calendar - Project Overview

## Purpose
Period Calendar is a calendar viewer application based on fiscal or business periods. It allows users to manage calendars based on time frames that differ from the standard calendar year.

## Key Features
- Period-based calendar display (12-month periods divided into first and second halves)
- Side-by-side display of first and second half calendars
- Customizable start year/month for the first period
- Period navigation (previous/next)
- Date highlighting: current day (green), first day of month (blue), past dates (light), holidays (red with tooltip)

## Tech Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Package Manager**: pnpm 10.7.0
- **Styling**: Tailwind CSS 4
- **Form Handling**: react-hook-form with Zod validation
- **Testing**: Vitest with browser testing (@vitest/browser)
- **UI Development**: Storybook 8
- **Linting**: Biome, ESLint (with react-hooks and react-refresh plugins)
- **Formatting**: Prettier with Tailwind plugin

## Project Structure
```
src/
├── domain/       # Business logic (Period, CalendarDate, Dates, Holiday, YearMonth)
├── components/   # React components including icons in icon/ subdir
├── providers/    # Context providers (Settings, Holidays)
├── contexts/     # React contexts
├── hooks/        # Custom hooks (use-settings, use-holidays)
├── types/        # Type definitions
└── assets/       # Static assets
```

## Requirements
- Node.js v18+
- pnpm v8+
