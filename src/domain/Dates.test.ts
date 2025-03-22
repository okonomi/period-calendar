import { describe, expect, it } from "vitest"
import { generateDates, groupDatesByWeek } from "./Dates"

describe("groupDatesByWeek", () => {
  it("should group dates into weeks with Monday start", () => {
    const dates = generateDates({ year: 2024, month: 1 }, { year: 2024, month: 1 }) // January 2024
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

describe("generateDates", () => {
  it("should generate dates for a single month", () => {
    const dates = generateDates({ year: 2023, month: 1 }, { year: 2023, month: 1 })
    expect(dates.length).toBe(31)
    expect(dates[0]).toEqual(new Date(2023, 0, 1))
    expect(dates[30]).toEqual(new Date(2023, 0, 31))
  })

  it("should generate dates across months", () => {
    const dates = generateDates({ year: 2023, month: 12 }, { year: 2024, month: 1 })
    expect(dates.length).toBe(62) // 31 days in December + 31 days in January
    expect(dates[0]).toEqual(new Date(2023, 11, 1))
    expect(dates[dates.length - 1]).toEqual(new Date(2024, 0, 31))
  })
})
