import { beforeEach, describe, expect, it } from "vitest"
import type { Holiday } from "../types/Holiday"
import {
  formatDate,
  formatYearMonthJP,
  generateDates,
  generateDatesForYear,
  getDateNum,
  getHoliday,
  getToday,
  groupDatesByWeek,
  isFirstDayOfMonth,
  isHoliday,
  isPastDate,
  isSameDate,
} from "./dateUtils"

describe("getDateNum", () => {
  it("should return the date number", () => {
    const date = new Date("2022-01-01")
    expect(getDateNum(date)).toBe(20220101)
  })
})

describe("isPastDate", () => {
  const today = new Date()

  it("should return false for today", () => {
    expect(isPastDate(today, today)).toBe(false)
  })

  it("should return true for past dates", () => {
    const pastDate = new Date("2022-01-01")
    expect(isPastDate(pastDate, today)).toBe(true)
  })

  it("should return false for future dates", () => {
    const futureDate = new Date("2099-01-01")
    expect(isPastDate(futureDate, today)).toBe(false)
  })

  it("should return true for past dates regardless of time", () => {
    const date = new Date()
    date.setHours(2, 0, 0, 0)
    const today = new Date()
    today.setHours(1, 0, 0, 0)
    expect(isPastDate(date, today)).toBe(false)
  })
})

describe("isFirstDayOfMonth", () => {
  it("should return true for the first day of the month", () => {
    const date = new Date("2022-01-01")
    expect(isFirstDayOfMonth(date)).toBe(true)
  })

  it("should return false for other days of the month", () => {
    const date = new Date("2022-01-02")
    expect(isFirstDayOfMonth(date)).toBe(false)
  })
})

describe("formatDate", () => {
  it("should format a date with single digit month and day", () => {
    const date = new Date("2023-01-05")
    expect(formatDate(date)).toBe("2023-01-05")
  })

  it("should format a date with double digit month and day", () => {
    const date = new Date("2023-12-25")
    expect(formatDate(date)).toBe("2023-12-25")
  })

  it("should ignore time component and format only the date part", () => {
    const date = new Date("2023-06-15T14:30:45.123Z")
    expect(formatDate(date)).toBe("2023-06-15")
  })
})

describe("generateDates", () => {
  it("should generate dates for a single month", () => {
    const dates = generateDates(2023, 1, 2023, 1)
    expect(dates.length).toBe(31)
    expect(dates[0]).toEqual(new Date(2023, 0, 1))
    expect(dates[30]).toEqual(new Date(2023, 0, 31))
  })

  it("should generate dates across months", () => {
    const dates = generateDates(2023, 12, 2024, 1)
    expect(dates.length).toBe(62) // 31 days in December + 31 days in January
    expect(dates[0]).toEqual(new Date(2023, 11, 1))
    expect(dates[dates.length - 1]).toEqual(new Date(2024, 0, 31))
  })
})

describe("generateDatesForYear", () => {
  it("should generate dates for entire year", () => {
    const dates = generateDatesForYear(2023)
    expect(dates.length).toBe(365) // non-leap year
    expect(dates[0]).toEqual(new Date(2023, 0, 1))
    expect(dates[dates.length - 1]).toEqual(new Date(2023, 11, 31))
  })

  it("should handle leap years", () => {
    const dates = generateDatesForYear(2024)
    expect(dates.length).toBe(366)
    expect(dates[31 + 28]).toEqual(new Date(2024, 1, 29)) // Feb 29th exists
  })
})

describe("groupDatesByWeek", () => {
  it("should group dates into weeks with Monday start", () => {
    const dates = generateDates(2024, 1, 2024, 1) // January 2024
    const weeks = groupDatesByWeek(dates)
    expect(weeks.length).toBe(5) // January 2024 spans 5 weeks
    expect(weeks[0].filter((d) => d !== null).length).toBe(7) // First week has 6 days (1st is Monday)
    expect(weeks[4].filter((d) => d !== null).length).toBe(3) // Last week has 3 days
  })

  it("should handle empty input", () => {
    const weeks = groupDatesByWeek([])
    expect(weeks).toEqual([])
  })
})

describe("isSameDate", () => {
  it("should return true for same dates", () => {
    const date1 = new Date(2023, 0, 1)
    const date2 = new Date(2023, 0, 1)
    expect(isSameDate(date1, date2)).toBe(true)
  })

  it("should return false for different dates", () => {
    const date1 = new Date(2023, 0, 1)
    const date2 = new Date(2023, 0, 2)
    expect(isSameDate(date1, date2)).toBe(false)
  })

  it("should ignore time component", () => {
    const date1 = new Date(2023, 0, 1, 10, 30)
    const date2 = new Date(2023, 0, 1, 15, 45)
    expect(isSameDate(date1, date2)).toBe(true)
  })
})

describe("isHoliday", () => {
  const holidays: Record<string, Holiday> = {
    "2024-01-01": { name: "元日", date: new Date(2024, 1 - 1, 1) },
    "2024-01-08": { name: "成人の日", date: new Date(2024, 1 - 1, 8) },
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
    "2024-01-01": { name: "元日", date: new Date(2024, 1 - 1, 1) },
    "2024-01-08": { name: "成人の日", date: new Date(2024, 1 - 1, 8) },
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

describe("formatYearMonthJP", () => {
  it("should format year and month in Japanese style", () => {
    expect(formatYearMonthJP(2023, 4)).toBe("2023年4月")
    expect(formatYearMonthJP(2023, 12)).toBe("2023年12月")
  })
})

describe("getToday", () => {
  beforeEach(() => {
    // @ts-expect-error: Reset cached today for testing
    globalThis.cachedToday = null
  })

  it("should return today's date", () => {
    const today = getToday()
    const actualToday = new Date()

    expect(today.getFullYear()).toBe(actualToday.getFullYear())
    expect(today.getMonth()).toBe(actualToday.getMonth())
    expect(today.getDate()).toBe(actualToday.getDate())
  })

  it("should cache the date", () => {
    const firstCall = getToday()
    // Wait a moment to ensure time has passed
    const delay = 100
    return new Promise((resolve) => {
      setTimeout(() => {
        const secondCall = getToday()
        expect(firstCall).toBe(secondCall) // Same object reference
        expect(firstCall.getTime()).toBe(secondCall.getTime()) // Same time
        resolve(true)
      }, delay)
    })
  })
})
