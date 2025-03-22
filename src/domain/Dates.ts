export type Dates = Date[]

// 指定された期間の全日付を生成
export function generateDates(startYear: number, startMonth: number, endYear: number, endMonth: number): Dates {
  const dates = []

  // Start and end dates (months are 0-indexed in JavaScript)
  const startDate = new Date(startYear, startMonth - 1, 1)
  const endDate = new Date(endYear, endMonth, 0) // Last day of end month

  // Current date pointer
  const currentDate = new Date(startDate)

  // Loop through each day in the range
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
