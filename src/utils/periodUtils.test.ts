import { describe, expect, it } from "vitest"
import { type Settings, defaultSettings } from "../types/Settings"
import {
  calculateInitialPeriod,
  getFirstHalfPeriodRange,
  getPeriodRange,
  getSecondHalfPeriodRange,
} from "./periodUtils"

describe("getPeriodRange", () => {
  // デフォルト設定でのテスト（従来の動作と互換性があることを確認）
  it("should return correct date range for period 1 with default settings", () => {
    const result = getPeriodRange(1)
    expect(result).toEqual({
      startYear: 1999,
      startMonth: 8,
      endYear: 2000,
      endMonth: 7,
    })
  })

  it("should return correct date range for period 25 with default settings", () => {
    const result = getPeriodRange(25)
    expect(result).toEqual({
      startYear: 2023,
      startMonth: 8,
      endYear: 2024,
      endMonth: 7,
    })
  })

  it("should return correct date range for period 2 with default settings", () => {
    const result = getPeriodRange(2)
    expect(result).toEqual({
      startYear: 2000,
      startMonth: 8,
      endYear: 2001,
      endMonth: 7,
    })
  })

  // カスタム設定でのテスト
  it("should return correct date range for period 1 with custom settings", () => {
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

  it("should return correct date range for period 10 with custom settings", () => {
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

  it("should handle settings with December as first month", () => {
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

  it("should handle settings with January as first month", () => {
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

describe("getFirstHalfPeriodRange", () => {
  it("returns first half range for period 25 with default settings", () => {
    const range = getFirstHalfPeriodRange(25)
    expect(range).toEqual({
      startYear: 2023,
      startMonth: 8,
      endYear: 2024,
      endMonth: 1,
    })
  })

  it("returns first half range for period 26 with default settings", () => {
    const range = getFirstHalfPeriodRange(26)
    expect(range).toEqual({
      startYear: 2024,
      startMonth: 8,
      endYear: 2025,
      endMonth: 1,
    })
  })

  it("returns first half range with custom settings", () => {
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

  it("handles month overflow correctly with custom settings", () => {
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

describe("getSecondHalfPeriodRange", () => {
  it("returns second half range for period 25 with default settings", () => {
    const range = getSecondHalfPeriodRange(25)
    expect(range).toEqual({
      startYear: 2024,
      startMonth: 2,
      endYear: 2024,
      endMonth: 7,
    })
  })

  it("returns second half range for period 26 with default settings", () => {
    const range = getSecondHalfPeriodRange(26)
    expect(range).toEqual({
      startYear: 2025,
      startMonth: 2,
      endYear: 2025,
      endMonth: 7,
    })
  })

  it("returns second half range with custom settings", () => {
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

  it("handles month overflow correctly with custom settings", () => {
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

describe("calculateInitialPeriod", () => {
  it("calculates current period correctly with default settings", () => {
    const period25 = calculateInitialPeriod(new Date(1999, 8, 1))
    expect(period25).toBe(1)

    const period26 = calculateInitialPeriod(new Date(2024, 8 - 1, 1))
    expect(period26).toBe(26)
  })

  it("calculates current period correctly with custom settings", () => {
    const customSettings: Settings = {
      ...defaultSettings,
      firstPeriodStartYear: 2000,
      firstPeriodStartMonth: 4,
    }

    // 2023年3月31日は23期
    const period23 = calculateInitialPeriod(new Date(2023, 2, 31), customSettings)
    expect(period23).toBe(23)

    // 2023年4月1日は24期
    const period24 = calculateInitialPeriod(new Date(2023, 3, 1), customSettings)
    expect(period24).toBe(24)
  })
})
