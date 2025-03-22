import { describe, expect, it } from "vitest"
import { generateDates, groupDatesByWeek } from "./Dates"

describe("groupDatesByWeek", () => {
  it("should group dates into weeks with Monday start", () => {
    const dates = generateDates(2024, 1, 2024, 1) // January 2024
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
