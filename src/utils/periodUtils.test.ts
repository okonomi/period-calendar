import { describe, expect, it } from "vitest"
import type { Settings } from "../types/Settings"
import {
  calculateInitialPeriod,
  getFirstHalfPeriodRange,
  getPeriodRange,
  getSecondHalfPeriodRange,
} from "./periodUtils"

describe("getPeriodRange", () => {
  describe("with default settings", () => {
    it("returns correct date range for period 1", () => {
      const result = getPeriodRange(1)
      expect(result).toEqual({
        startYear: 1999,
        startMonth: 8,
        endYear: 2000,
        endMonth: 7,
      })
    })

    it("returns correct date range for period 25", () => {
      const result = getPeriodRange(25)
      expect(result).toEqual({
        startYear: 2023,
        startMonth: 8,
        endYear: 2024,
        endMonth: 7,
      })
    })
  })

  describe("with custom settings", () => {
    it("returns correct date range with custom start month", () => {
      const customSettings: Settings = {
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 4,
      }

      const result = getPeriodRange(10, customSettings)
      expect(result).toEqual({
        startYear: 2009,
        startMonth: 4,
        endYear: 2010,
        endMonth: 3,
      })
    })

    it("handles edge cases for first month correctly", () => {
      // January case (wraps within same year)
      const januarySettings: Settings = {
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 1,
      }

      const januaryResult = getPeriodRange(1, januarySettings)
      expect(januaryResult).toEqual({
        startYear: 2000,
        startMonth: 1,
        endYear: 2000,
        endMonth: 12,
      })

      // December case (wraps to next year)
      const decemberSettings: Settings = {
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 12,
      }

      const decemberResult = getPeriodRange(1, decemberSettings)
      expect(decemberResult).toEqual({
        startYear: 2000,
        startMonth: 12,
        endYear: 2001,
        endMonth: 11,
      })
    })
  })
})

describe("getFirstHalfPeriodRange", () => {
  it("returns first half range with default settings", () => {
    const range = getFirstHalfPeriodRange(25)
    expect(range).toEqual({
      startYear: 2023,
      startMonth: 8,
      endYear: 2024,
      endMonth: 1,
    })
  })

  it("handles month overflow correctly with custom settings", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 10,
    }

    const range = getFirstHalfPeriodRange(3, customSettings)
    expect(range).toEqual({
      startYear: 2002,
      startMonth: 10,
      endYear: 2003,
      endMonth: 3,
    })
  })
})

describe("getSecondHalfPeriodRange", () => {
  it("returns second half range with default settings", () => {
    const range = getSecondHalfPeriodRange(25)
    expect(range).toEqual({
      startYear: 2024,
      startMonth: 2,
      endYear: 2024,
      endMonth: 7,
    })
  })

  it("handles month overflow correctly with custom settings", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 10,
    }

    const range = getSecondHalfPeriodRange(3, customSettings)
    expect(range).toEqual({
      startYear: 2003,
      startMonth: 4,
      endYear: 2003,
      endMonth: 9,
    })
  })

  it("handles year transition correctly when first half ends in December", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 7,
    }

    const range = getSecondHalfPeriodRange(1, customSettings)
    expect(range).toEqual({
      startYear: 2001,
      startMonth: 1,
      endYear: 2001,
      endMonth: 6,
    })
  })

  it("handles case when second half ends in next year", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 11,
    }

    const range = getSecondHalfPeriodRange(1, customSettings)
    expect(range).toEqual({
      startYear: 2001,
      startMonth: 5,
      endYear: 2001,
      endMonth: 10,
    })
  })

  it("handles case when first half ends in June (second half starts in July)", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 1,
    }

    const range = getSecondHalfPeriodRange(1, customSettings)
    expect(range).toEqual({
      startYear: 2000,
      startMonth: 7,
      endYear: 2000,
      endMonth: 12,
    })
  })

  it("handles case when first half ends in November (second half starts in December)", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 6,
    }

    const range = getSecondHalfPeriodRange(1, customSettings)
    expect(range).toEqual({
      startYear: 2000,
      startMonth: 12,
      endYear: 2001,
      endMonth: 5,
    })
  })

  it("calculates correctly for a different period number", () => {
    const range = getSecondHalfPeriodRange(10)
    expect(range).toEqual({
      startYear: 2009,
      startMonth: 2,
      endYear: 2009,
      endMonth: 7,
    })
  })

  it("respects custom firstPeriodStartYear setting", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2010,
      firstPeriodStartMonth: 4,
    }

    const range = getSecondHalfPeriodRange(2, customSettings)
    expect(range).toEqual({
      startYear: 2011,
      startMonth: 10,
      endYear: 2012,
      endMonth: 3,
    })
  })
})

describe("calculateInitialPeriod", () => {
  it("calculates period correctly with default settings", () => {
    // First period start date
    const period1 = calculateInitialPeriod(new Date(1999, 8 - 1, 1))
    expect(period1).toBe(1)

    // Future date
    const period26 = calculateInitialPeriod(new Date(2024, 8 - 1, 1))
    expect(period26).toBe(26)
  })

  it("calculates period correctly at period boundaries with custom settings", () => {
    const customSettings: Settings = {
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 4,
    }

    // Last day of period 23
    const period23 = calculateInitialPeriod(new Date(2023, 3 - 1, 31), customSettings)
    expect(period23).toBe(23)

    // First day of period 24
    const period24 = calculateInitialPeriod(new Date(2023, 4 - 1, 1), customSettings)
    expect(period24).toBe(24)
  })
})
