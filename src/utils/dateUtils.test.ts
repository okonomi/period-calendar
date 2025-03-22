import { beforeEach, describe, expect, it } from "vitest"
import { getToday } from "./dateUtils"

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
