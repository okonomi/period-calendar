import { describe, expect, it } from "vitest"
const context = describe

import { createCalendarDate } from "./CalendarDate"
import { calculateInitialPeriod, getFirstHalfPeriodRange, getPeriodRange, getSecondHalfPeriodRange } from "./Period"
import type { YearMonth } from "./YearMonth"

describe("getPeriodRange", () => {
  context("with default settings", () => {
    it("returns correct date range for period 1", () => {
      const result = getPeriodRange(1)
      expect(result).toEqual({
        start: { year: 2001, month: 1 },
        end: { year: 2001, month: 12 },
      })
    })

    it("returns correct date range for period 25", () => {
      const result = getPeriodRange(25)
      expect(result).toEqual({
        start: { year: 2025, month: 1 },
        end: { year: 2025, month: 12 },
      })
    })
  })

  context("with custom settings", () => {
    it("returns correct date range with custom start month", () => {
      const customSettings: YearMonth = {
        year: 2000,
        month: 4,
      }

      const result = getPeriodRange(10, customSettings)
      expect(result).toEqual({
        start: { year: 2009, month: 4 },
        end: { year: 2010, month: 3 },
      })
    })

    it("handles edge cases for first month correctly", () => {
      // January case (wraps within same year)
      const januarySettings: YearMonth = {
        year: 2000,
        month: 1,
      }

      const januaryResult = getPeriodRange(1, januarySettings)
      expect(januaryResult).toEqual({
        start: { year: 2000, month: 1 },
        end: { year: 2000, month: 12 },
      })

      // December case (wraps to next year)
      const decemberSettings: YearMonth = {
        year: 2000,
        month: 12,
      }

      const decemberResult = getPeriodRange(1, decemberSettings)
      expect(decemberResult).toEqual({
        start: { year: 2000, month: 12 },
        end: { year: 2001, month: 11 },
      })
    })
  })
})

describe("getFirstHalfPeriodRange", () => {
  it("returns first half range with default settings", () => {
    const range = getFirstHalfPeriodRange(25)
    expect(range).toEqual({
      start: { year: 2025, month: 1 },
      end: { year: 2025, month: 6 },
    })
  })

  it("handles month overflow correctly with custom settings", () => {
    const customSettings: YearMonth = {
      year: 2000,
      month: 10,
    }

    const range = getFirstHalfPeriodRange(3, customSettings)
    expect(range).toEqual({
      start: { year: 2002, month: 10 },
      end: { year: 2003, month: 3 },
    })
  })
})

describe("getSecondHalfPeriodRange", () => {
  context("with default settings", () => {
    it("returns correct second half range for period 25", () => {
      const range = getSecondHalfPeriodRange(25)
      expect(range).toEqual({
        start: { year: 2025, month: 7 },
        end: { year: 2025, month: 12 },
      })
    })
  })

  context("with custom settings", () => {
    it("handles standard case (no month/year transitions)", () => {
      const customSettings: YearMonth = {
        year: 2000,
        month: 10,
      }

      const range = getSecondHalfPeriodRange(3, customSettings)
      expect(range).toEqual({
        start: { year: 2003, month: 4 },
        end: { year: 2003, month: 9 },
      })
    })

    context("month transitions", () => {
      it("handles case when first half ends in June (second half starts in July)", () => {
        const customSettings: YearMonth = {
          year: 2000,
          month: 1,
        }

        const range = getSecondHalfPeriodRange(1, customSettings)
        expect(range).toEqual({
          start: { year: 2000, month: 7 },
          end: { year: 2000, month: 12 },
        })
      })

      it("handles case when first half ends in November (second half starts in December)", () => {
        const customSettings: YearMonth = {
          year: 2000,
          month: 6,
        }

        const range = getSecondHalfPeriodRange(1, customSettings)
        expect(range).toEqual({
          start: { year: 2000, month: 12 },
          end: { year: 2001, month: 5 },
        })
      })
    })

    context("year transitions", () => {
      it("handles year transition when first half ends in December", () => {
        const customSettings: YearMonth = {
          year: 2000,
          month: 7,
        }

        const range = getSecondHalfPeriodRange(1, customSettings)
        expect(range).toEqual({
          start: { year: 2001, month: 1 },
          end: { year: 2001, month: 6 },
        })
      })

      it("handles case when second half spans across years", () => {
        const customSettings: YearMonth = {
          year: 2000,
          month: 11,
        }

        const range = getSecondHalfPeriodRange(1, customSettings)
        expect(range).toEqual({
          start: { year: 2001, month: 5 },
          end: { year: 2001, month: 10 },
        })
      })
    })

    it("respects custom firstPeriodStartYear setting", () => {
      const customSettings: YearMonth = {
        year: 2010,
        month: 4,
      }

      const range = getSecondHalfPeriodRange(2, customSettings)
      expect(range).toEqual({
        start: { year: 2011, month: 10 },
        end: { year: 2012, month: 3 },
      })
    })
  })
})

describe("calculateInitialPeriod", () => {
  it("calculates period correctly with default settings", () => {
    // First period start date
    const period1 = calculateInitialPeriod(createCalendarDate(2001, 1, 1))
    expect(period1).toBe(1)

    // Future date
    const period26 = calculateInitialPeriod(createCalendarDate(2024, 8, 1))
    expect(period26).toBe(24)
  })

  it("calculates period correctly at period boundaries with custom settings", () => {
    const customSettings: YearMonth = {
      year: 2000,
      month: 4,
    }

    // Last day of period 23
    const period23 = calculateInitialPeriod(createCalendarDate(2023, 3, 31), customSettings)
    expect(period23).toBe(23)

    // First day of period 24
    const period24 = calculateInitialPeriod(createCalendarDate(2023, 4, 1), customSettings)
    expect(period24).toBe(24)
  })
})
