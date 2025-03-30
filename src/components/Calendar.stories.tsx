import type { Meta, StoryObj } from "@storybook/react"
import MockDate from "mockdate"

import { HolidaysContext } from "../contexts/HolidaysContext"
import { createCalendarDate, format } from "../domain/CalendarDate"
import { generateDates } from "../domain/Dates"
import { createYearMonth } from "../domain/YearMonth"
import { Calendar } from "./Calendar"

const currentDate = createCalendarDate(2023, 5, 15)

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <HolidaysContext.Provider value={{}}>
        <div className="w-[300px]">
          <Story />
        </div>
      </HolidaysContext.Provider>
    ),
  ],
  play: async () => {
    MockDate.set(format(currentDate))
  },
  argTypes: {
    dates: {
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof Calendar>

export default meta

type Story = StoryObj<typeof meta>

// Generate dates for a 3-month range
const threeMontDates = generateDates(createYearMonth(2023, 5), createYearMonth(2023, 7))

// Default story with 3 months of dates
export const Default: Story = {
  args: {
    dates: threeMontDates,
  },
  parameters: {
    autoplay: true,
  },
}

// Single month calendar
export const SingleMonth: Story = {
  args: {
    dates: generateDates(createYearMonth(2023, 5), createYearMonth(2023, 5)),
  },
  parameters: {
    autoplay: true,
  },
}

// Calendar with holidays
export const WithHolidays: Story = {
  args: {
    dates: threeMontDates,
  },
  parameters: {
    autoplay: true,
  },
  decorators: [
    (Story) => {
      const mockHolidays = {
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
      return (
        <HolidaysContext.Provider value={mockHolidays}>
          <div className="w-[300px]">
            <Story />
          </div>
        </HolidaysContext.Provider>
      )
    },
  ],
}
