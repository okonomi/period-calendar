/**
 * 年月を表す型
 */
export type YearMonth = {
  year: number
  month: number
}

/**
 * 年と月を正規化する
 */
function normalizeYearMonth(year: number, month: number): { year: number; month: number } {
  if (month <= 0) {
    const adjustedYear = Math.floor((month - 1) / 12)
    year += adjustedYear
    month = 12 + (((month - 1) % 12) + 1)
  } else if (month > 12) {
    year += Math.floor((month - 1) / 12)
    month = ((month - 1) % 12) + 1
  }
  return { year, month }
}

/**
 * YearMonthオブジェクトを作成する
 */
export function createYearMonth(year: number, month: number): YearMonth {
  const normalized = normalizeYearMonth(year, month)
  return normalized
}

/**
 * YearMonthに指定された月数を加算する
 */
export function addMonths(yearMonth: YearMonth, months: number): YearMonth {
  const normalized = normalizeYearMonth(yearMonth.year, yearMonth.month + months)
  return normalized
}

/**
 * 年月を日本語形式でフォーマット (YYYY年M月)
 */
export function format(yearMonth: YearMonth): string {
  return `${yearMonth.year}年${yearMonth.month}月`
}
