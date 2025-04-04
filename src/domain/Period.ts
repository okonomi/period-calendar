import { defaultSettings } from "../types/Settings"
import type { CalendarDate } from "./CalendarDate"
import { type YearMonth, addMonths, createYearMonth } from "./YearMonth"

const defaultFirstPeriodStartYearMonth: YearMonth = defaultSettings.firstPeriodStart

export type PeriodRange = {
  start: YearMonth
  end: YearMonth
}

// 期から年月を計算
export function getPeriodRange(
  period: number,
  firstPeriodStartYearMonth: YearMonth = defaultFirstPeriodStartYearMonth
): PeriodRange {
  const start = createYearMonth(firstPeriodStartYearMonth.year + (period - 1), firstPeriodStartYearMonth.month)
  const end = addMonths(start, 11) // 1年間（12ヶ月 - 1）

  return { start, end }
}

// 上期の範囲（firstPeriodStartMonthから6ヶ月間）を取得する
export function getFirstHalfPeriodRange(
  period: number,
  firstPeriodStartYearMonth: YearMonth = defaultFirstPeriodStartYearMonth
): PeriodRange {
  const start = createYearMonth(firstPeriodStartYearMonth.year + (period - 1), firstPeriodStartYearMonth.month)
  const end = addMonths(start, 5) // 6ヶ月間

  return { start, end }
}

// 下期の範囲（上期の翌月から6ヶ月間）を取得する
export function getSecondHalfPeriodRange(
  period: number,
  firstPeriodStartYearMonth: YearMonth = defaultFirstPeriodStartYearMonth
): PeriodRange {
  const firstHalf = getFirstHalfPeriodRange(period, firstPeriodStartYearMonth)
  const start = addMonths(firstHalf.end, 1)
  const end = addMonths(start, 5) // 6ヶ月間

  return { start, end }
}

// 現在の日付から期を計算する
export function calculatePeriodFromDate(
  today: CalendarDate,
  firstPeriodStartYearMonth: YearMonth = defaultFirstPeriodStartYearMonth
): number {
  const currentYear = today.year
  const currentMonth = today.month

  if (currentMonth < firstPeriodStartYearMonth.month) {
    return currentYear - firstPeriodStartYearMonth.year
  }
  return currentYear - firstPeriodStartYearMonth.year + 1
}

// 期の開始月と現在の期から1期目の開始年月を算出する
export function calculateFirstPeriodStartYearMonth(
  periodStartMonth: number,
  currentPeriod: number,
  currentDate: CalendarDate
): YearMonth {
  const currentYear = currentDate.year
  const currentMonth = currentDate.month

  // 現在の月が期の開始月より前なら、追加で1年引く必要がある
  const yearOffset = currentMonth < periodStartMonth ? currentPeriod : currentPeriod - 1
  const firstPeriodStartYear = currentYear - yearOffset

  return createYearMonth(firstPeriodStartYear, periodStartMonth)
}
