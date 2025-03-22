import type { PeriodRange } from "../types/PeriodRange"
import type { Settings } from "../types/Settings"
import { defaultSettings } from "../types/Settings"

// 期から年月を計算
export function getPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings

  // 期は設定された月開始、翌年の前月終了
  const startYear = firstPeriodStartYear + (period - 1)
  const startMonth = firstPeriodStartMonth

  // 終了年・終了月を計算
  let endYear = startYear
  // 終了月は開始月から11ヶ月後（1年間）
  let endMonth = startMonth - 1

  if (endMonth <= 0) {
    endMonth += 12
    endYear = startYear
  } else {
    endYear = startYear + 1
  }

  return {
    start: { year: startYear, month: startMonth },
    end: { year: endYear, month: endMonth },
  }
}

// 現在の日付から期を計算する
export function calculateInitialPeriod(today: Date, settings: Settings = defaultSettings): number {
  const { firstPeriodStartYear, firstPeriodStartMonth } = settings

  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1 // 0-based to 1-based

  // カスタム設定の場合の一般的な計算ロジック
  if (currentMonth < firstPeriodStartMonth) {
    return currentYear - firstPeriodStartYear
  }

  return currentYear - firstPeriodStartYear + 1
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

  return {
    start: { year: startYear, month: startMonth },
    end: { year: endYear, month: endMonth },
  }
}

// 下期の範囲（上期の翌月から6ヶ月間）を取得する
export function getSecondHalfPeriodRange(period: number, settings: Settings = defaultSettings): PeriodRange {
  const firstHalf = getFirstHalfPeriodRange(period, settings)

  let startYear = firstHalf.end.year
  let startMonth = firstHalf.end.month + 1

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

  return {
    start: { year: startYear, month: startMonth },
    end: { year: endYear, month: endMonth },
  }
}
