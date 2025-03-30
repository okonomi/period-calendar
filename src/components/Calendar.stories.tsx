import type { Meta, StoryObj } from "@storybook/react"

import { HolidaysContext } from "../contexts/HolidaysContext"
import { createCalendarDate } from "../domain/CalendarDate"
import { generateDates } from "../domain/Dates"
import type { Holiday } from "../domain/Holiday"
import { createYearMonth } from "../domain/YearMonth"
import { Calendar } from "./Calendar"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    mockdate: new Date(2023, 5 - 1, 15), // 2023-05-15
    docs: {
      source: {
        excludeDecorators: true,
        transform: (code: string) => code.replace(/containerWidth=\{[^}]+\}\s*/g, ""),
      },
    },
  },
  decorators: [
    (Story, context) => {
      const containerWidth = context.args.containerWidth
      const holidays = context.args.holidays ?? {}

      return (
        <HolidaysContext.Provider value={holidays}>
          <div style={{ width: `${containerWidth}px` }}>
            <Story />
          </div>
        </HolidaysContext.Provider>
      )
    },
  ],
  argTypes: {
    dates: {
      control: false,
    },
    containerWidth: {
      control: { type: "range", min: 100, max: 1000, step: 10 },
      description: "コンテナの幅 (px)",
      defaultValue: 300,
      table: {
        category: "コントロール",
      },
    },
    holidays: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<React.ComponentProps<typeof Calendar> & { containerWidth: number; holidays?: Record<string, Holiday> }>

export default meta

type Story = StoryObj<typeof meta>

// Generate dates for a 3-month range
const threeMontDates = generateDates(createYearMonth(2023, 5), createYearMonth(2023, 7))

// Default story with 3 months of dates
export const Default: Story = {
  args: {
    dates: threeMontDates,
    containerWidth: 300,
  },
}

// Single month calendar
export const SingleMonth: Story = {
  args: {
    dates: generateDates(createYearMonth(2023, 5), createYearMonth(2023, 5)),
    containerWidth: 300,
  },
}

// Full year calendar (12 months)
export const FullYear: Story = {
  args: {
    dates: generateDates(createYearMonth(2023, 1), createYearMonth(2023, 12)),
    containerWidth: 300,
  },
}

// 日本の祝日定義
const japaneseHolidays = {
  "2023-05-03": {
    date: createCalendarDate(2023, 5, 3),
    name: "憲法記念日",
  },
  "2023-05-04": {
    date: createCalendarDate(2023, 5, 4),
    name: "みどりの日",
  },
  "2023-05-05": {
    date: createCalendarDate(2023, 5, 5),
    name: "こどもの日",
  },
  "2023-07-17": {
    date: createCalendarDate(2023, 7, 17),
    name: "海の日",
  },
}

// Calendar with holidays
export const WithHolidays: Story = {
  args: {
    dates: threeMontDates,
    containerWidth: 300,
    holidays: japaneseHolidays,
  },
}
