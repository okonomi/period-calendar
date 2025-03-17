export type PeriodRange = {
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
}

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
