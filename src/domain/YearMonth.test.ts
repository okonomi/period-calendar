import { describe, expect, it } from "vitest"
const context = describe

import { addMonths, createYearMonth, format } from "./YearMonth"

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
      expect(yearMonth).toEqual({ year: 2024, month: 1 })
    })

    it("handles month greater than 24", () => {
      const yearMonth = createYearMonth(2023, 25)
      expect(yearMonth).toEqual({ year: 2025, month: 1 })
    })

    it("handles very large month number", () => {
      const yearMonth = createYearMonth(2023, 1234)
      expect(yearMonth).toEqual({ year: 2125, month: 10 })
    })

    it("handles zero month", () => {
      const yearMonth = createYearMonth(2023, 0)
      expect(yearMonth).toEqual({ year: 2022, month: 12 })
    })

    it("handles negative month", () => {
      const yearMonth = createYearMonth(2023, -1)
      expect(yearMonth).toEqual({ year: 2022, month: 11 })
    })

    it("handles negative month less than -12", () => {
      const yearMonth = createYearMonth(2023, -13)
      expect(yearMonth).toEqual({ year: 2021, month: 11 })
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
