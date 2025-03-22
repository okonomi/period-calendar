import { describe, expect, it } from "vitest"
import { createCalendarDate } from "./CalendarDate"
import { type Holiday, getHoliday, isHoliday } from "./Holiday"

describe("isHoliday", () => {
  const holidays: Record<string, Holiday> = {
    "2024-01-01": { name: "元日", date: createCalendarDate(2024, 1, 1) },
    "2024-01-08": { name: "成人の日", date: createCalendarDate(2024, 1, 8) },
  }

  it("should return true for holiday dates", () => {
    const date = new Date(2024, 0, 1)
    expect(isHoliday(date, holidays)).toBe(true)
  })

  it("should return false for non-holiday dates", () => {
    const date = new Date(2024, 0, 2)
    expect(isHoliday(date, holidays)).toBe(false)
  })
})

describe("getHoliday", () => {
  const holidays: Record<string, Holiday> = {
    "2024-01-01": { name: "元日", date: createCalendarDate(2024, 1, 1) },
    "2024-01-08": { name: "成人の日", date: createCalendarDate(2024, 1, 8) },
  }

  it("should return holiday info for holiday dates", () => {
    const date = new Date(2024, 0, 1)
    expect(getHoliday(date, holidays)).toHaveProperty("name", "元日")
  })

  it("should return null for non-holiday dates", () => {
    const date = new Date(2024, 0, 2)
    expect(getHoliday(date, holidays)).toBeNull()
  })
})
