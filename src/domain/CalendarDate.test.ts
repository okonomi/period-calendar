import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
const context = describe
import {
  createCalendarDate,
  createCalendarDateFromDate,
  format,
  getDateNum,
  getToday,
  isFirstDayOfMonth,
  isPastDate,
  isSame,
  isToday,
} from "./CalendarDate"

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

  describe("weekday", () => {
    it("日曜日は0を返す", () => {
      const date = createCalendarDate(2025, 3, 23) // 2025-03-23は日曜日
      expect(date.weekday).toBe(0)
    })

    it("土曜日は6を返す", () => {
      const date = createCalendarDate(2025, 3, 22) // 2025-03-22は土曜日
      expect(date.weekday).toBe(6)
    })
  })
})

describe("createCalendarDateFromDate", () => {
  it("creates CalendarDate from Date object", () => {
    const date = new Date(2025, 2, 22) // month is 0-based in Date constructor
    const result = createCalendarDateFromDate(date)
    expect(result).toEqual({
      year: 2025,
      month: 3, // month should be 1-based in CalendarDate
      day: 22,
    })
  })
})

describe("isSame", () => {
  it("returns true when comparing the same date", () => {
    const date1 = createCalendarDate(2025, 3, 22)
    const date2 = createCalendarDate(2025, 3, 22)
    expect(isSame(date1, date2)).toBe(true)
  })

  it("returns false when comparing different dates", () => {
    const date1 = createCalendarDate(2025, 3, 22)
    const date2 = createCalendarDate(2025, 3, 23)
    expect(isSame(date1, date2)).toBe(false)
  })

  it("returns false when comparing different months", () => {
    const date1 = createCalendarDate(2025, 3, 22)
    const date2 = createCalendarDate(2025, 4, 22)
    expect(isSame(date1, date2)).toBe(false)
  })

  it("returns false when comparing different years", () => {
    const date1 = createCalendarDate(2025, 3, 22)
    const date2 = createCalendarDate(2024, 3, 22)
    expect(isSame(date1, date2)).toBe(false)
  })
})

describe("getToday", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 2, 22)) // 2025-03-22
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns current system date as CalendarDate", () => {
    expect(getToday()).toEqual({
      year: 2025,
      month: 3,
      day: 22,
    })
  })
})

describe("isToday", () => {
  beforeEach(() => {
    // 2025-03-22に日付を固定
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2025, 2, 22))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns true for today's date", () => {
    const today = createCalendarDate(2025, 3, 22)
    expect(isToday(today)).toBe(true)
  })

  it("returns false for a different date", () => {
    const otherDay = createCalendarDate(2025, 3, 23)
    expect(isToday(otherDay)).toBe(false)
  })
})

describe("getDateNum", () => {
  context("basic cases", () => {
    it("converts CalendarDate to number format YYYYMMDD", () => {
      const date = createCalendarDate(2025, 3, 22)
      expect(getDateNum(date)).toBe(20250322)
    })

    it("pads single digit month and day with zeros", () => {
      const date = createCalendarDate(2025, 1, 5)
      expect(getDateNum(date)).toBe(20250105)
    })
  })

  context("edge cases", () => {
    it("handles last day of month", () => {
      const date = createCalendarDate(2025, 12, 31)
      expect(getDateNum(date)).toBe(20251231)
    })

    it("handles first day of month", () => {
      const date = createCalendarDate(2025, 1, 1)
      expect(getDateNum(date)).toBe(20250101)
    })
  })
})

describe("isPastDate", () => {
  context("with fixed current date of 2025-03-22", () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2025, 2, 22))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    context("basic cases", () => {
      it("returns true for yesterday", () => {
        const pastDate = createCalendarDate(2025, 3, 21)
        expect(isPastDate(pastDate)).toBe(true)
      })

      it("returns false for today", () => {
        const today = createCalendarDate(2025, 3, 22)
        expect(isPastDate(today)).toBe(false)
      })

      it("returns false for tomorrow", () => {
        const futureDate = createCalendarDate(2025, 3, 23)
        expect(isPastDate(futureDate)).toBe(false)
      })
    })

    context("month boundaries", () => {
      it("returns true for last day of previous month", () => {
        const pastMonth = createCalendarDate(2025, 2, 28)
        expect(isPastDate(pastMonth)).toBe(true)
      })

      it("returns false for first day of next month", () => {
        const futureMonth = createCalendarDate(2025, 4, 1)
        expect(isPastDate(futureMonth)).toBe(false)
      })
    })

    context("year boundaries", () => {
      it("returns true for last day of previous year", () => {
        const pastYear = createCalendarDate(2024, 12, 31)
        expect(isPastDate(pastYear)).toBe(true)
      })

      it("returns false for first day of next year", () => {
        const futureYear = createCalendarDate(2026, 1, 1)
        expect(isPastDate(futureYear)).toBe(false)
      })
    })
  })
})

describe("isFirstDayOfMonth", () => {
  context("basic cases", () => {
    it("returns true for first day of month", () => {
      const firstDay = createCalendarDate(2025, 3, 1)
      expect(isFirstDayOfMonth(firstDay)).toBe(true)
    })

    it("returns false for middle day of month", () => {
      const middleDay = createCalendarDate(2025, 3, 15)
      expect(isFirstDayOfMonth(middleDay)).toBe(false)
    })

    it("returns false for last day of month", () => {
      const lastDay = createCalendarDate(2025, 3, 31)
      expect(isFirstDayOfMonth(lastDay)).toBe(false)
    })
  })

  context("different months", () => {
    it("returns true for first day of January", () => {
      const firstDayOfYear = createCalendarDate(2025, 1, 1)
      expect(isFirstDayOfMonth(firstDayOfYear)).toBe(true)
    })

    it("returns true for first day of December", () => {
      const firstDayOfLastMonth = createCalendarDate(2025, 12, 1)
      expect(isFirstDayOfMonth(firstDayOfLastMonth)).toBe(true)
    })
  })

  context("month boundary cases", () => {
    it("returns true for first day after month rollover", () => {
      const date = createCalendarDate(2025, 4, 31) // This will be rolled over to May 1
      expect(isFirstDayOfMonth(date)).toBe(true)
    })

    it("returns true for first day of month in leap year February", () => {
      const leapYearFirstDay = createCalendarDate(2024, 2, 1)
      expect(isFirstDayOfMonth(leapYearFirstDay)).toBe(true)
    })
  })
})

describe("format", () => {
  context("basic cases", () => {
    it("formats date in YYYY-MM-DD format", () => {
      const date = createCalendarDate(2025, 3, 22)
      expect(format(date)).toBe("2025-03-22")
    })

    it("pads single digit month with zero", () => {
      const date = createCalendarDate(2025, 1, 15)
      expect(format(date)).toBe("2025-01-15")
    })

    it("pads single digit day with zero", () => {
      const date = createCalendarDate(2025, 12, 5)
      expect(format(date)).toBe("2025-12-05")
    })

    it("pads both single digit month and day with zeros", () => {
      const date = createCalendarDate(2025, 1, 5)
      expect(format(date)).toBe("2025-01-05")
    })
  })

  context("edge cases", () => {
    it("handles last day of year", () => {
      const date = createCalendarDate(2025, 12, 31)
      expect(format(date)).toBe("2025-12-31")
    })

    it("handles first day of year", () => {
      const date = createCalendarDate(2025, 1, 1)
      expect(format(date)).toBe("2025-01-01")
    })
  })
})
