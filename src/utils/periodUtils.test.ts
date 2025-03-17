import { describe, expect, it } from "vitest"
import { getFirstHalfPeriodRange, getPeriodRange, getSecondHalfPeriodRange } from "./periodUtils"

describe("getPeriodRange", () => {
  it("should return correct date range for period 1", () => {
    const result = getPeriodRange(1)
    expect(result).toEqual({
      startYear: 1999,
      startMonth: 8,
      endYear: 2000,
      endMonth: 7,
    })
  })

  it("should return correct date range for period 25", () => {
    const result = getPeriodRange(25)
    expect(result).toEqual({
      startYear: 2023,
      startMonth: 8,
      endYear: 2024,
      endMonth: 7,
    })
  })

  it("should return correct date range for period 2", () => {
    const result = getPeriodRange(2)
    expect(result).toEqual({
      startYear: 2000,
      startMonth: 8,
      endYear: 2001,
      endMonth: 7,
    })
  })
})

describe("getFirstHalfPeriodRange", () => {
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

describe("getSecondHalfPeriodRange", () => {
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
