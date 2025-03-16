// 期から年月を計算
export function getPeriodRange(period: number): {
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
} {
  // 期は8月開始、翌年7月終了
  // 1期は1999年8月開始
  const startYear = 1999 + (period - 1)
  const startMonth = 8
  const endYear = startYear + 1
  const endMonth = 7

  return { startYear, startMonth, endYear, endMonth }
}
