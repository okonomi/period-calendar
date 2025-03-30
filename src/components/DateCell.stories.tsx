import type { Meta, StoryObj } from "@storybook/react"

import { HolidaysContext } from "../contexts/HolidaysContext"
import { createCalendarDateFromDate } from "../domain/CalendarDate"
import { DateCell } from "./DateCell"

const meta = {
  title: "Components/DateCell",
  component: DateCell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <HolidaysContext.Provider value={{}}>
        <Story />
      </HolidaysContext.Provider>
    ),
  ],
} satisfies Meta<typeof DateCell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: createCalendarDateFromDate(new Date(2023, 1, 1)),
  },
}

export const Holiday: Story = {
  args: {
    date: createCalendarDateFromDate(new Date(2023, 1, 1)),
  },
  decorators: [
    (Story) => {
      const mockHoliday = {
        "2023-02-01": {
          date: createCalendarDateFromDate(new Date(2023, 1, 1)),
          name: "Holiday Example",
        },
      }
      return (
        <HolidaysContext.Provider value={mockHoliday}>
          <Story />
        </HolidaysContext.Provider>
      )
    },
  ],
}

export const Today: Story = {
  args: {
    date: createCalendarDateFromDate(new Date()),
  },
}
