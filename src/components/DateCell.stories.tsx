import type { Meta, StoryObj } from "@storybook/react"

import { HolidaysContext } from "../contexts/HolidaysContext"
import { createCalendarDate } from "../domain/CalendarDate"
import { DateCell } from "./DateCell"

const currentDate = createCalendarDate(2023, 1, 11)

const meta = {
  title: "Components/DateCell",
  component: DateCell,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    mockdate: new Date(currentDate.year, currentDate.month - 1, currentDate.day),
  },
  decorators: [
    (Story) => (
      <HolidaysContext.Provider value={{}}>
        <div className="@container size-20">
          <Story />
        </div>
      </HolidaysContext.Provider>
    ),
  ],
  argTypes: {
    date: {
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof DateCell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: { ...currentDate, day: currentDate.day + 2 },
  },
}

export const Holiday: Story = {
  args: {
    date: createCalendarDate(2023, 2, 2),
  },
  decorators: [
    (Story) => {
      const mockHoliday = {
        "2023-02-02": {
          date: createCalendarDate(2023, 2, 2),
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
    date: currentDate,
  },
}

export const Future: Story = {
  args: {
    date: { ...currentDate, day: currentDate.day + 1 },
  },
}

export const Past: Story = {
  args: {
    date: { ...currentDate, day: currentDate.day - 1 },
  },
}
