import { describe, expect, it } from "vitest"
import { getPeriodRange } from "./periodUtils"

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
