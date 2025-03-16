// 期から年月を計算
export function getPeriodRange(period: number): {
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
} {
  // 期は8月開始、翌年7月終了
  // 25期が2023年8月開始なので、25から引いて2023を足す
  const startYear = 2023 + (period - 25)
  const startMonth = 8
  const endYear = startYear + 1
  const endMonth = 7

  return { startYear, startMonth, endYear, endMonth }
}
