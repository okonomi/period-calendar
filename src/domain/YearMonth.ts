/**
 * 年月を表す型
 */
export type YearMonth = {
  year: number
  month: number
}

/**
 * YearMonthオブジェクトを作成する
 */
export function createYearMonth(year: number, month: number): YearMonth {
  return { year, month }
}

/**
 * YearMonthに指定された月数を加算する
 */
export function addMonths(yearMonth: YearMonth, months: number): YearMonth {
  let newYear = yearMonth.year
  let newMonth = yearMonth.month + months

  // 12ヶ月を超える場合の調整
  if (newMonth > 12) {
    newYear += Math.floor((newMonth - 1) / 12)
    newMonth = ((newMonth - 1) % 12) + 1
  }
  // 0以下になる場合の調整
  else if (newMonth <= 0) {
    newYear += Math.floor((newMonth - 1) / 12)
    newMonth = 12 - (-newMonth % 12)
  }

  return createYearMonth(newYear, newMonth)
}

/**
 * 年月を日本語形式でフォーマット (YYYY年M月)
 */
export function format(yearMonth: YearMonth): string {
  return `${yearMonth.year}年${yearMonth.month}月`
}
