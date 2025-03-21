import { describe, expect, it } from "vitest"
import { type Settings, defaultSettings } from "../types/Settings"
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

    it("returns correct date range for period 2", () => {
      const result = getPeriodRange(2)
      expect(result).toEqual({
        startYear: 2000,
        startMonth: 8,
        endYear: 2001,
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
    it("returns correct date range for period 1 with April start month", () => {
      const customSettings: Settings = {
        ...defaultSettings,
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 4,
      }

      const result = getPeriodRange(1, customSettings)
      expect(result).toEqual({
        startYear: 2000,
        startMonth: 4,
        endYear: 2001,
        endMonth: 3,
      })
    })

    it("returns correct date range for period 10 with April start month", () => {
      const customSettings: Settings = {
        ...defaultSettings,
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

    it("handles December as first month correctly", () => {
      const customSettings: Settings = {
        ...defaultSettings,
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 12,
      }

      const result = getPeriodRange(1, customSettings)
      expect(result).toEqual({
        startYear: 2000,
        startMonth: 12,
        endYear: 2001,
        endMonth: 11,
      })
    })

    it("handles January as first month correctly", () => {
      const customSettings: Settings = {
        ...defaultSettings,
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 1,
      }

      const result = getPeriodRange(1, customSettings)
      expect(result).toEqual({
        startYear: 2000,
        startMonth: 1,
        endYear: 2000,
        endMonth: 12,
      })
    })
  })
})

describe("getFirstHalfPeriodRange", () => {
  describe("with default settings", () => {
    it("returns first half range for period 25", () => {
      const range = getFirstHalfPeriodRange(25)
      expect(range).toEqual({
        startYear: 2023,
        startMonth: 8,
        endYear: 2024,
        endMonth: 1,
      })
    })

    it("returns first half range for period 26", () => {
      const range = getFirstHalfPeriodRange(26)
      expect(range).toEqual({
        startYear: 2024,
        startMonth: 8,
        endYear: 2025,
        endMonth: 1,
      })
    })
  })

  describe("with custom settings", () => {
    it("returns first half range with April start month", () => {
      const customSettings: Settings = {
        ...defaultSettings,
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 4,
      }

      const range = getFirstHalfPeriodRange(5, customSettings)
      expect(range).toEqual({
        startYear: 2004,
        startMonth: 4,
        endYear: 2004,
        endMonth: 9,
      })
    })

    it("handles month overflow correctly with October start month", () => {
      const customSettings: Settings = {
        ...defaultSettings,
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
})

describe("getSecondHalfPeriodRange", () => {
  describe("with default settings", () => {
    it("returns second half range for period 25", () => {
      const range = getSecondHalfPeriodRange(25)
      expect(range).toEqual({
        startYear: 2024,
        startMonth: 2,
        endYear: 2024,
        endMonth: 7,
      })
    })

    it("returns second half range for period 26", () => {
      const range = getSecondHalfPeriodRange(26)
      expect(range).toEqual({
        startYear: 2025,
        startMonth: 2,
        endYear: 2025,
        endMonth: 7,
      })
    })
  })

  describe("with custom settings", () => {
    it("returns second half range with April start month", () => {
      const customSettings: Settings = {
        ...defaultSettings,
        firstPeriodStartYear: 2000,
        firstPeriodStartMonth: 4,
      }

      const range = getSecondHalfPeriodRange(5, customSettings)
      expect(range).toEqual({
        startYear: 2004,
        startMonth: 10,
        endYear: 2005,
        endMonth: 3,
      })
    })

    it("handles month overflow correctly with October start month", () => {
      const customSettings: Settings = {
        ...defaultSettings,
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
  })
})

describe("calculateInitialPeriod", () => {
  describe("with default settings", () => {
    it("calculates period 1 for the first period start date", () => {
      const period = calculateInitialPeriod(new Date(1999, 8 - 1, 1))
      expect(period).toBe(1)
    })

    it("calculates period 26 for 2024-08-01", () => {
      const period = calculateInitialPeriod(new Date(2024, 8 - 1, 1))
      expect(period).toBe(26)
    })
  })

  describe("with custom settings", () => {
    it("calculates period correctly at period boundaries", () => {
      const customSettings: Settings = {
        ...defaultSettings,
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
})
