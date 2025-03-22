import { describe, expect, it } from "vitest"
const context = describe

import { addMonths, createYearMonth, format, fromDate, toDate } from "./YearMonth"

describe("createYearMonth", () => {
  context("normal cases", () => {
    it("creates object with specified year and month", () => {
      const yearMonth = createYearMonth(2023, 4)
      expect(yearMonth).toEqual({ year: 2023, month: 4 })
    })

    it("accepts month 12", () => {
      const yearMonth = createYearMonth(2023, 12)
      expect(yearMonth).toEqual({ year: 2023, month: 12 })
    })

    it("accepts negative year", () => {
      const yearMonth = createYearMonth(-1, 1)
      expect(yearMonth).toEqual({ year: -1, month: 1 })
    })
  })

  context("edge cases", () => {
    it("accepts month greater than 12 as is", () => {
      const yearMonth = createYearMonth(2023, 13)
      expect(yearMonth).toEqual({ year: 2023, month: 13 })
    })
  })
})

describe("addMonths", () => {
  context("adding positive months", () => {
    it("adds months within the same year", () => {
      const yearMonth = createYearMonth(2023, 4)
      const result = addMonths(yearMonth, 3)
      expect(result).toEqual({ year: 2023, month: 7 })
    })

    it("adds months across year boundary", () => {
      const yearMonth = createYearMonth(2023, 10)
      const result = addMonths(yearMonth, 5)
      expect(result).toEqual({ year: 2024, month: 3 })
    })

    it("adds more than 12 months", () => {
      const yearMonth = createYearMonth(2023, 4)
      const result = addMonths(yearMonth, 15)
      expect(result).toEqual({ year: 2024, month: 7 })
    })
  })

  context("adding negative months (subtraction)", () => {
    it("subtracts months within the same year", () => {
      const yearMonth = createYearMonth(2023, 7)
      const result = addMonths(yearMonth, -3)
      expect(result).toEqual({ year: 2023, month: 4 })
    })

    it("subtracts months across year boundary", () => {
      const yearMonth = createYearMonth(2023, 3)
      const result = addMonths(yearMonth, -5)
      expect(result).toEqual({ year: 2022, month: 10 })
    })

    it("subtracts more than 12 months", () => {
      const yearMonth = createYearMonth(2023, 7)
      const result = addMonths(yearMonth, -15)
      expect(result).toEqual({ year: 2022, month: 4 })
    })

    it("handles subtraction resulting in month zero or less", () => {
      const yearMonth = createYearMonth(2023, 1)
      const result = addMonths(yearMonth, -1)
      expect(result).toEqual({ year: 2022, month: 12 })
    })

    it("subtracts 24 months", () => {
      const yearMonth = createYearMonth(2023, 7)
      const result = addMonths(yearMonth, -24)
      expect(result).toEqual({ year: 2021, month: 7 })
    })
  })

  context("extreme cases", () => {
    it("adds months equivalent to 100 years", () => {
      const yearMonth = createYearMonth(2023, 1)
      const result = addMonths(yearMonth, 1200) // 100 years
      expect(result).toEqual({ year: 2123, month: 1 })
    })

    it("subtracts months equivalent to 100 years", () => {
      const yearMonth = createYearMonth(2023, 1)
      const result = addMonths(yearMonth, -1200) // 100 years
      expect(result).toEqual({ year: 1923, month: 1 })
    })
  })
})

describe("toDate", () => {
  context("normal cases", () => {
    it("converts YearMonth to Date object", () => {
      const yearMonth = createYearMonth(2023, 4)
      const date = toDate(yearMonth)
      expect(date.getFullYear()).toBe(2023)
      expect(date.getMonth()).toBe(3) // JavaScript Date uses 0-11 for months
      expect(date.getDate()).toBe(1) // Set to first day of month
    })

    it("converts December correctly", () => {
      const yearMonth = createYearMonth(2023, 12)
      const date = toDate(yearMonth)
      expect(date.getFullYear()).toBe(2023)
      expect(date.getMonth()).toBe(11) // December is represented as 11
      expect(date.getDate()).toBe(1)
    })

    it("converts January correctly", () => {
      const yearMonth = createYearMonth(2023, 1)
      const date = toDate(yearMonth)
      expect(date.getFullYear()).toBe(2023)
      expect(date.getMonth()).toBe(0) // January is represented as 0
      expect(date.getDate()).toBe(1)
    })
  })

  context("edge cases", () => {
    it("interprets month 13 as January of next year", () => {
      const yearMonth = createYearMonth(2023, 13)
      const date = toDate(yearMonth)
      expect(date.getFullYear()).toBe(2024)
      expect(date.getMonth()).toBe(0) // Month 13 is interpreted as January of next year
      expect(date.getDate()).toBe(1)
    })
  })
})

describe("fromDate", () => {
  context("normal cases", () => {
    it("extracts year and month from Date object", () => {
      const date = new Date(2023, 3, 15) // April 15, 2023
      const yearMonth = fromDate(date)
      expect(yearMonth).toEqual({ year: 2023, month: 4 })
    })

    it("converts zero-based month index to one-based", () => {
      const date = new Date(2023, 0, 1) // January 1, 2023
      const yearMonth = fromDate(date)
      expect(yearMonth).toEqual({ year: 2023, month: 1 })
    })
  })

  context("time component handling", () => {
    it("ignores time component", () => {
      const date = new Date(2023, 3, 15, 12, 30, 45) // April 15, 2023 12:30:45
      const yearMonth = fromDate(date)
      expect(yearMonth).toEqual({ year: 2023, month: 4 })
    })

    it("handles end of month dates", () => {
      const lastDayOfMonth = new Date(2023, 3, 30) // April 30, 2023
      const yearMonth = fromDate(lastDayOfMonth)
      expect(yearMonth).toEqual({ year: 2023, month: 4 })
    })
  })
})

describe("format", () => {
  context("basic formatting", () => {
    it("formats year and month in Japanese style", () => {
      const yearMonth = createYearMonth(2023, 4)
      const formatted = format(yearMonth)
      expect(formatted).toBe("2023年4月")
    })

    it("formats single-digit month", () => {
      const yearMonth = createYearMonth(2023, 4)
      const formatted = format(yearMonth)
      expect(formatted).toBe("2023年4月")
    })

    it("formats double-digit month", () => {
      const yearMonth = createYearMonth(2023, 12)
      const formatted = format(yearMonth)
      expect(formatted).toBe("2023年12月")
    })
  })

  context("special year cases", () => {
    it("formats single-digit year", () => {
      const yearMonth = createYearMonth(5, 4)
      const formatted = format(yearMonth)
      expect(formatted).toBe("5年4月")
    })

    it("formats negative year", () => {
      const yearMonth = createYearMonth(-2023, 4)
      const formatted = format(yearMonth)
      expect(formatted).toBe("-2023年4月")
    })

    it("formats year zero", () => {
      const yearMonth = createYearMonth(0, 4)
      const formatted = format(yearMonth)
      expect(formatted).toBe("0年4月")
    })
  })
})
