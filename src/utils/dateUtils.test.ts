import { beforeEach, describe, expect, it } from "vitest"
import type { Holiday } from "../types/Holiday"
import {
  formatDate,
  formatYearMonthJP,
  getDateNum,
  getToday,
  isFirstDayOfMonth,
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
