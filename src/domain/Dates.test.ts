import { describe, expect, it } from "vitest"
import { generateDates, groupDatesByWeekContinuous, groupDatesByWeekMonthly } from "./Dates"

describe("groupDatesByWeekContinuous", () => {
  it("should group dates continuously", () => {
    const dates = generateDates({ year: 2024, month: 1 }, { year: 2024, month: 1 }) // January 2024
    const weeks = groupDatesByWeekContinuous(dates)
    expect(weeks.length).toBe(5) // January 2024 spans 5 weeks
    expect(weeks[0].filter((d) => d !== null).length).toBe(7) // First week has 7 days
    expect(weeks[4].filter((d) => d !== null).length).toBe(3) // Last week has 3 days
  })

  it("should handle empty input", () => {
    const weeks = groupDatesByWeekContinuous([])
    expect(weeks).toEqual([])
  })
})

describe("groupDatesByWeekMonthly", () => {
  it("should group dates with month breaks", () => {
    // 2024年1月〜2月の日付を生成
    const dates = generateDates({ year: 2024, month: 1 }, { year: 2024, month: 2 })
    const weeks = groupDatesByWeekMonthly(dates)

    // 週の数を確認（正確な値はカレンダーによって異なる）
    expect(weeks.length).toBeGreaterThan(0)

    // 月が変わるところで週が分割されていることを確認
    let found2Month = false
    for (const week of weeks) {
      const validDates = week.filter((d) => d !== null)
      if (validDates.length > 0) {
        // 同じ週に異なる月の日付がないことを確認
        const months = new Set(validDates.map((d) => d!.month))
        expect(months.size).toBe(1)

        // 2月の日付を含む週を見つけたらフラグを立てる
        if (validDates[0]!.month === 2) {
          found2Month = true
        }
      }
    }

    // 2月の日付を含む週があることを確認
    expect(found2Month).toBe(true)
  })

  it("should not produce empty rows", () => {
    const dates = generateDates({ year: 2024, month: 1 }, { year: 2024, month: 2 })
    const weeks = groupDatesByWeekMonthly(dates)

    // すべての週が少なくとも1つの非nullの日付を持つことを確認
    for (const week of weeks) {
      const hasValidDate = week.some((date) => date !== null)
      expect(hasValidDate).toBe(true)
    }
  })
})

describe("generateDates", () => {
  it("should generate dates for a single month", () => {
    const dates = generateDates({ year: 2023, month: 1 }, { year: 2023, month: 1 })
    expect(dates.length).toBe(31)
    expect(dates[0]).toMatchObject({
      year: 2023,
      month: 1,
      day: 1,
    })
    expect(dates[30]).toMatchObject({
      year: 2023,
      month: 1,
      day: 31,
    })
  })

  it("should generate dates across months", () => {
    const dates = generateDates({ year: 2023, month: 12 }, { year: 2024, month: 1 })
    expect(dates.length).toBe(62) // 31 days in December + 31 days in January
    expect(dates[0]).toMatchObject({
      year: 2023,
      month: 12,
      day: 1,
    })
    expect(dates[dates.length - 1]).toMatchObject({
      year: 2024,
      month: 1,
      day: 31,
    })
  })
})
