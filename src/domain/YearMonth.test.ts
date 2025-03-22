import { describe, expect, it } from "vitest"
const context = describe

import { addMonths, createYearMonth, format, fromDate, toDate } from "./YearMonth"

describe("createYearMonth", () => {
  it("creates YearMonth object with given year and month", () => {
    const yearMonth = createYearMonth(2023, 4)
    expect(yearMonth).toEqual({ year: 2023, month: 4 })
  })

  it("handles month value of 12", () => {
    const yearMonth = createYearMonth(2023, 12)
    expect(yearMonth).toEqual({ year: 2023, month: 12 })
  })

  it("handles invalid month values correctly", () => {
    const yearMonth = createYearMonth(2023, 13)
    expect(yearMonth).toEqual({ year: 2023, month: 13 })
  })

  it("handles negative year values", () => {
    const yearMonth = createYearMonth(-1, 1)
    expect(yearMonth).toEqual({ year: -1, month: 1 })
  })
})

describe("addMonths", () => {
  context("adding positive months", () => {
    it("handles adding months within the same year", () => {
      const yearMonth = createYearMonth(2023, 4)
      const result = addMonths(yearMonth, 3)
      expect(result).toEqual({ year: 2023, month: 7 })
    })

    it("handles adding months across year boundary", () => {
      const yearMonth = createYearMonth(2023, 10)
      const result = addMonths(yearMonth, 5)
      expect(result).toEqual({ year: 2024, month: 3 })
    })

    it("handles adding more than 12 months", () => {
      const yearMonth = createYearMonth(2023, 4)
      const result = addMonths(yearMonth, 15)
      expect(result).toEqual({ year: 2024, month: 7 })
    })
  })

  context("adding negative months", () => {
    it("handles subtracting months within the same year", () => {
      const yearMonth = createYearMonth(2023, 7)
      const result = addMonths(yearMonth, -3)
      expect(result).toEqual({ year: 2023, month: 4 })
    })

    it("handles subtracting months across year boundary", () => {
      const yearMonth = createYearMonth(2023, 3)
      const result = addMonths(yearMonth, -5)
      expect(result).toEqual({ year: 2022, month: 10 })
    })

    it("handles subtracting more than 12 months", () => {
      const yearMonth = createYearMonth(2023, 7)
      const result = addMonths(yearMonth, -15)
      expect(result).toEqual({ year: 2022, month: 4 })
    })

    it("handles subtracting months resulting in month 0", () => {
      const yearMonth = createYearMonth(2023, 1)
      const result = addMonths(yearMonth, -1)
      expect(result).toEqual({ year: 2022, month: 12 })
    })

    it("handles large negative number of months", () => {
      const yearMonth = createYearMonth(2023, 7)
      const result = addMonths(yearMonth, -24)
      expect(result).toEqual({ year: 2021, month: 7 })
    })
  })

  it("handles extremely large number of months", () => {
    const yearMonth = createYearMonth(2023, 1)
    const result = addMonths(yearMonth, 1200) // 100年分
    expect(result).toEqual({ year: 2123, month: 1 })
  })

  it("handles extremely large negative number of months", () => {
    const yearMonth = createYearMonth(2023, 1)
    const result = addMonths(yearMonth, -1200) // 100年分
    expect(result).toEqual({ year: 1923, month: 1 })
  })
})

describe("toDate", () => {
  it("converts YearMonth to Date", () => {
    const yearMonth = createYearMonth(2023, 4)
    const date = toDate(yearMonth)
    expect(date.getFullYear()).toBe(2023)
    expect(date.getMonth()).toBe(3) // JavaScriptのDate.getMonth()は0-basedなので3=4月
    expect(date.getDate()).toBe(1) // 常に月の1日になる
  })

  it("handles December correctly", () => {
    const yearMonth = createYearMonth(2023, 12)
    const date = toDate(yearMonth)
    expect(date.getFullYear()).toBe(2023)
    expect(date.getMonth()).toBe(11) // JavaScriptのDate.getMonth()は0-basedなので11=12月
    expect(date.getDate()).toBe(1)
  })

  it("handles January correctly", () => {
    const yearMonth = createYearMonth(2023, 1)
    const date = toDate(yearMonth)
    expect(date.getFullYear()).toBe(2023)
    expect(date.getMonth()).toBe(0) // JavaScriptのDate.getMonth()は0-basedなので0=1月
    expect(date.getDate()).toBe(1)
  })

  it("handles invalid month value", () => {
    const yearMonth = createYearMonth(2023, 13)
    const date = toDate(yearMonth)
    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(0) // 13月は次の年の1月として扱われる
    expect(date.getDate()).toBe(1)
  })
})

describe("fromDate", () => {
  it("converts Date to YearMonth", () => {
    const date = new Date(2023, 3, 15) // 2023年4月15日
    const yearMonth = fromDate(date)
    expect(yearMonth).toEqual({ year: 2023, month: 4 })
  })

  it("handles month conversion from 0-based to 1-based", () => {
    const date = new Date(2023, 0, 1) // 2023年1月1日
    const yearMonth = fromDate(date)
    expect(yearMonth).toEqual({ year: 2023, month: 1 })
  })

  it("handles dates with time components", () => {
    const date = new Date(2023, 3, 15, 12, 30, 45) // 2023年4月15日 12:30:45
    const yearMonth = fromDate(date)
    expect(yearMonth).toEqual({ year: 2023, month: 4 })
  })

  it("handles dates at month boundaries", () => {
    const lastDayOfMonth = new Date(2023, 3, 30) // 2023年4月30日
    const yearMonth = fromDate(lastDayOfMonth)
    expect(yearMonth).toEqual({ year: 2023, month: 4 })
  })
})

describe("format", () => {
  it("formats YearMonth in Japanese style", () => {
    const yearMonth = createYearMonth(2023, 4)
    const formatted = format(yearMonth)
    expect(formatted).toBe("2023年4月")
  })

  it("handles single digit months", () => {
    const yearMonth = createYearMonth(2023, 4)
    const formatted = format(yearMonth)
    expect(formatted).toBe("2023年4月")
  })

  it("handles double digit months", () => {
    const yearMonth = createYearMonth(2023, 12)
    const formatted = format(yearMonth)
    expect(formatted).toBe("2023年12月")
  })

  it("handles single digit year", () => {
    const yearMonth = createYearMonth(5, 4)
    const formatted = format(yearMonth)
    expect(formatted).toBe("5年4月")
  })

  it("handles negative year", () => {
    const yearMonth = createYearMonth(-2023, 4)
    const formatted = format(yearMonth)
    expect(formatted).toBe("-2023年4月")
  })

  it("handles year zero", () => {
    const yearMonth = createYearMonth(0, 4)
    const formatted = format(yearMonth)
    expect(formatted).toBe("0年4月")
  })
})
