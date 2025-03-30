import type { Meta, StoryObj } from "@storybook/react"

import { createCalendarDateFromDate } from "../domain/CalendarDate"
import { DateCell } from "./DateCell"

const meta = {
  title: "Components/DateCell",
  component: DateCell,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DateCell>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    date: createCalendarDateFromDate(new Date(2023, 1, 1)),
  },
}
