import { beforeEach, describe, expect, it } from "vitest"
import { formatDate, getToday } from "./dateUtils"

describe("formatDate", () => {
  it("should format a date with single digit month and day", () => {
    const date = new Date("2023-01-05")
    expect(formatDate(date)).toBe("2023-01-05")
  })

  it("should format a date with double digit month and day", () => {
    const date = new Date("2023-12-25")
    expect(formatDate(date)).toBe("2023-12-25")
  })

  it("should ignore time component and format only the date part", () => {
    const date = new Date("2023-06-15T14:30:45.123Z")
    expect(formatDate(date)).toBe("2023-06-15")
  })
})

describe("getToday", () => {
  beforeEach(() => {
    // @ts-expect-error: Reset cached today for testing
    globalThis.cachedToday = null
  })

  it("should return today's date", () => {
    const today = getToday()
    const actualToday = new Date()

    expect(today.getFullYear()).toBe(actualToday.getFullYear())
    expect(today.getMonth()).toBe(actualToday.getMonth())
    expect(today.getDate()).toBe(actualToday.getDate())
  })

  it("should cache the date", () => {
    const firstCall = getToday()
    // Wait a moment to ensure time has passed
    const delay = 100
    return new Promise((resolve) => {
      setTimeout(() => {
        const secondCall = getToday()
        expect(firstCall).toBe(secondCall) // Same object reference
        expect(firstCall.getTime()).toBe(secondCall.getTime()) // Same time
        resolve(true)
      }, delay)
    })
  })
})
