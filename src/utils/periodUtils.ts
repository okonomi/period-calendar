import type { PeriodRange } from "../types/PeriodRange"
import type { Settings } from "../types/Settings"
import { defaultSettings } from "../types/Settings"

// 期から年月を計算
export function getPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings

  // 期は設定された月開始、翌年の前月終了
  const startYear = firstPeriodStartYear + (period - 1)
  const startMonth = firstPeriodStartMonth
  const endYear = startMonth === 12 ? startYear + 1 : startYear
  const endMonth = startMonth === 12 ? startMonth - 5 : startMonth + 7

  return { startYear, startMonth, endYear, endMonth }
}

// 現在の日付から期を計算する
export function calculateInitialPeriod(today: Date, settings: Settings = defaultSettings): number {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings

  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1 // 0-based to 1-based

  // firstPeriodStartMonth以降は次の期になる
  if (currentMonth >= firstPeriodStartMonth) {
    return currentYear - (firstPeriodStartYear - 1)
  }

  return currentYear - firstPeriodStartYear
}

// 上期の範囲（firstPeriodStartMonthから6ヶ月間）を取得する
export function getFirstHalfPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings

  const startYear = firstPeriodStartYear + (period - 1)
  const startMonth = firstPeriodStartMonth

  // 終了月が翌年になるかどうかを計算
  let endYear = startYear
  let endMonth = startMonth + 5

  if (endMonth > 12) {
    endYear = startYear + 1
    endMonth = endMonth - 12
  }

  return { startYear, startMonth, endYear, endMonth }
}

// 下期の範囲（上期の翌月から6ヶ月間）を取得する
export function getSecondHalfPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const firstHalf = getFirstHalfPeriodRange(period, settings)

  let startYear = firstHalf.endYear
  let startMonth = firstHalf.endMonth + 1

  if (startMonth > 12) {
    startYear += 1
    startMonth = 1
  }

  let endYear = startYear
  let endMonth = startMonth + 5

  if (endMonth > 12) {
    endYear += 1
    endMonth = endMonth - 12
  }

  return { startYear, startMonth, endYear, endMonth }
}
