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
    displayMode: {
      control: { type: "radio" },
      options: ["continuous", "monthly"],
      description: "カレンダー表示モード",
      defaultValue: "continuous",
    },
  },
} satisfies Meta<typeof DateCell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: { ...currentDate, day: currentDate.day + 2 },
    displayMode: "continuous",
  },
}

export const Holiday: Story = {
  args: {
    date: createCalendarDate(2023, 2, 2),
    displayMode: "continuous",
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
    displayMode: "continuous",
  },
}

export const Future: Story = {
  args: {
    date: { ...currentDate, day: currentDate.day + 1 },
    displayMode: "continuous",
  },
}

export const Past: Story = {
  args: {
    date: { ...currentDate, day: currentDate.day - 1 },
    displayMode: "continuous",
  },
}

export const FirstDayOfMonth: Story = {
  args: {
    date: createCalendarDate(2023, 1, 1),
    displayMode: "continuous",
  },
  parameters: {
    docs: {
      description: {
        story: "月の1日のセル（連続表示モード - 背景色あり）",
      },
    },
  },
}

export const FirstDayMonthly: Story = {
  args: {
    date: createCalendarDate(2023, 1, 1),
    displayMode: "monthly",
  },
  parameters: {
    docs: {
      description: {
        story: "月の1日のセル（月表示モード - 背景色なし）",
      },
    },
  },
}
