import type { YearMonth } from "./YearMonth"

export type Dates = Date[]

const DAYS_IN_WEEK = 7

// 日付を週ごとにグループ化
export function groupDatesByWeek(dates: Dates): (Date | null)[][] {
  if (dates.length === 0) return []

  // 最初の週に必要なパディングを計算（月曜始まり）
  const firstDate = dates[0]
  const firstDayOfWeek = firstDate.getDay()
  // 日曜日は0なので6に、それ以外は-1して前の週の月曜からの日数を計算
  const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // 最後の週に必要なパディングを計算（月曜始まり）
  const lastDate = dates[dates.length - 1]
  const lastDayOfWeek = lastDate.getDay()
  // 日曜日は0なので6に、それ以外は7から引いて次の週の日曜までの日数を計算
  const endPadding = DAYS_IN_WEEK - (lastDayOfWeek === 0 ? 7 : lastDayOfWeek)

  // 前後にパディングを追加
  const paddedDates = [...Array(startPadding).fill(null), ...dates, ...Array(endPadding).fill(null)]

  // 7日ずつグループ化
  const weeks: (Date | null)[][] = []
  for (let i = 0; i < paddedDates.length; i += DAYS_IN_WEEK) {
    weeks.push(paddedDates.slice(i, i + DAYS_IN_WEEK))
  }
  return weeks
}

// 指定された期間の全日付を生成
export function generateDates(start: YearMonth, end: YearMonth): Dates {
  const dates = []

  // Start and end dates (months are 0-indexed in JavaScript)
  const startDate = new Date(start.year, start.month - 1, 1)
  const endDate = new Date(end.year, end.month, 0) // Last day of end month

  // Current date pointer
  const currentDate = new Date(startDate)

  // Loop through each day in the range
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
