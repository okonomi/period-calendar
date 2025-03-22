import { describe, expect, it } from "vitest"
const context = describe

import { createCalendarDate } from "./CalendarDate"

describe("createCalendarDate", () => {
  context("basic functionality", () => {
    it("creates a CalendarDate with specified year, month and day", () => {
      const result = createCalendarDate(2025, 3, 22)
      expect(result).toEqual({
        year: 2025,
        month: 3,
        day: 22,
      })
    })
  })

  context("month edge cases", () => {
    it("handles month 0 by setting to previous year December", () => {
      const result = createCalendarDate(2025, 0, 15)
      expect(result).toEqual({
        year: 2024,
        month: 12,
        day: 15,
      })
    })

    it("handles month 13 by setting to next year January", () => {
      const result = createCalendarDate(2025, 13, 15)
      expect(result).toEqual({
        year: 2026,
        month: 1,
        day: 15,
      })
    })
  })

  context("day boundary cases", () => {
    it("handles last day of month", () => {
      const result = createCalendarDate(2025, 3, 31)
      expect(result).toEqual({
        year: 2025,
        month: 3,
        day: 31,
      })
    })

    it("rolls over to next month when date does not exist", () => {
      const result = createCalendarDate(2025, 4, 31)
      expect(result).toEqual({
        year: 2025,
        month: 5,
        day: 1,
      })
    })

    it("handles day 0 by setting to previous month last day", () => {
      const result = createCalendarDate(2025, 3, 0)
      expect(result).toEqual({
        year: 2025,
        month: 2,
        day: 28,
      })
    })
  })

  context("leap year cases", () => {
    it("handles February 29 in leap year", () => {
      const result = createCalendarDate(2024, 2, 29)
      expect(result).toEqual({
        year: 2024,
        month: 2,
        day: 29,
      })
    })

    it("rolls over to March 1 when February 29 in non-leap year", () => {
      const result = createCalendarDate(2025, 2, 29)
      expect(result).toEqual({
        year: 2025,
        month: 3,
        day: 1,
      })
    })
  })

  context("negative value handling", () => {
    it("should handle negative month by subtracting from current year", () => {
      const result = createCalendarDate(2025, -1, 15)
      expect(result).toEqual({
        year: 2024,
        month: 11,
        day: 15,
      })
    })

    it("should handle negative day by subtracting from current month", () => {
      const result = createCalendarDate(2025, 3, -1)
      expect(result).toEqual({
        year: 2025,
        month: 2,
        day: 27,
      })
    })
  })
})
