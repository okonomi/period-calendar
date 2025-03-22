import type { Settings } from "../types/Settings"
import { defaultSettings } from "../types/Settings"
import type { CalendarDate } from "./CalendarDate"
import { type YearMonth, addMonths, createYearMonth } from "./YearMonth"

export type PeriodRange = {
  start: YearMonth
  end: YearMonth
}

// 期から年月を計算
export function getPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings
  const start = createYearMonth(firstPeriodStartYear + (period - 1), firstPeriodStartMonth)
  const end = addMonths(start, 11) // 1年間（12ヶ月 - 1）

  return { start, end }
}

// 上期の範囲（firstPeriodStartMonthから6ヶ月間）を取得する
export function getFirstHalfPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings
  const start = createYearMonth(firstPeriodStartYear + (period - 1), firstPeriodStartMonth)
  const end = addMonths(start, 5) // 6ヶ月間

  return { start, end }
}

// 下期の範囲（上期の翌月から6ヶ月間）を取得する
export function getSecondHalfPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const firstHalf = getFirstHalfPeriodRange(period, settings)
  const start = addMonths(firstHalf.end, 1)
  const end = addMonths(start, 5) // 6ヶ月間

  return { start, end }
}

// 現在の日付から期を計算する
export function calculateInitialPeriod(today: CalendarDate, settings: Settings = defaultSettings): number {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings
  const currentYear = today.year
  const currentMonth = today.month

  if (currentMonth < firstPeriodStartMonth) {
    return currentYear - firstPeriodStartYear
  }
  return currentYear - firstPeriodStartYear + 1
}
