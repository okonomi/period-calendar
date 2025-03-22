import type { PeriodRange } from "../types/PeriodRange"
import type { Settings } from "../types/Settings"
import { defaultSettings } from "../types/Settings"
import type { YearMonth } from "../types/YearMonth"

// YearMonth型のヘルパー関数
function createYearMonth(year: number, month: number): YearMonth {
  return { year, month }
}

function addMonths(yearMonth: YearMonth, months: number): YearMonth {
  let newYear = yearMonth.year
  let newMonth = yearMonth.month + months

  // 12ヶ月を超える場合の調整
  if (newMonth > 12) {
    newYear += Math.floor((newMonth - 1) / 12)
    newMonth = ((newMonth - 1) % 12) + 1
  }
  // 0以下になる場合の調整
  else if (newMonth <= 0) {
    newYear -= Math.floor((11 - newMonth) / 12)
    newMonth = 12 - (-newMonth % 12)
  }

  return createYearMonth(newYear, newMonth)
}

// 期から年月を計算
export function getPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings
  const start = createYearMonth(firstPeriodStartYear + (period - 1), firstPeriodStartMonth)
  const end = addMonths(start, 11) // 1年間（12ヶ月 - 1）

  return { start, end }
}

// 現在の日付から期を計算する
export function calculateInitialPeriod(today: Date, settings: Settings = defaultSettings): number {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1 // 0-based to 1-based

  if (currentMonth < firstPeriodStartMonth) {
    return currentYear - firstPeriodStartYear
  }
  return currentYear - firstPeriodStartYear + 1
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
