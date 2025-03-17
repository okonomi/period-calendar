import { describe, expect, it } from "vitest"
import { getDateNum, isFirstDayOfMonth, isPastDate } from "./dateUtils"

describe("getDateNum", () => {
  it("should return the date number", () => {
    const date = new Date("2022-01-01")
    expect(getDateNum(date)).toBe(20220101)
  })
})

describe("isPastDate", () => {
  const today = new Date()

  it("should return false for today", () => {
    expect(isPastDate(today, today)).toBe(false)
  })

  it("should return true for past dates", () => {
    const pastDate = new Date("2022-01-01")
    expect(isPastDate(pastDate, today)).toBe(true)
  })

  it("should return false for future dates", () => {
    const futureDate = new Date("2099-01-01")
    expect(isPastDate(futureDate, today)).toBe(false)
  })

  it("should return true for past dates regardless of time", () => {
    const date = new Date()
    date.setHours(2, 0, 0, 0)
    const today = new Date()
    today.setHours(1, 0, 0, 0)
    expect(isPastDate(date, today)).toBe(false)
  })
})

describe("isFirstDayOfMonth", () => {
  it("should return true for the first day of the month", () => {
    const date = new Date("2022-01-01")
    expect(isFirstDayOfMonth(date)).toBe(true)
  })

  it("should return false for other days of the month", () => {
    const date = new Date("2022-01-02")
    expect(isFirstDayOfMonth(date)).toBe(false)
  })
})
