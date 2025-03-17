import type { PeriodRange } from "../types/PeriodRange"

// 期から年月を計算
export function getPeriodRange(period: number): PeriodRange {
  // 期は8月開始、翌年7月終了
  // 1期は1999年8月開始
  const startYear = 1999 + (period - 1)
  const startMonth = 8
  const endYear = startYear + 1
  const endMonth = 7

  return { startYear, startMonth, endYear, endMonth }
}

// 現在の日付から期を計算する
export function calculateInitialPeriod(today: Date): number {
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1 // 0-based to 1-based

  // 8月以降は次の期になる
  // 例: 2024年8月以降は26期（2024年度）
  //     2024年7月以前は25期（2023年度）
  return currentMonth >= 8 ? currentYear - 1998 : currentYear - 1999
}

// 上期の範囲（8月から翌年1月）を取得する
export function getFirstHalfPeriodRange(period: number): PeriodRange {
  const startYear = 1999 + (period - 1)
  const startMonth = 8
  const endYear = startYear + 1
  const endMonth = 1

  return { startYear, startMonth, endYear, endMonth }
}

// 下期の範囲（2月から7月）を取得する
export function getSecondHalfPeriodRange(period: number): PeriodRange {
  const startYear = 2000 + (period - 1)
  const startMonth = 2
  const endYear = startYear
  const endMonth = 7

  return { startYear, startMonth, endYear, endMonth }
}
