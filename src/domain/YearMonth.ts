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
function normalizeYearMonth(year: number, month: number): YearMonth {
  let normalizedYear = year
  let normalizedMonth = month

  if (normalizedMonth > 12) {
    const overflowYears = Math.floor(normalizedMonth / 12)
    normalizedYear += overflowYears
    normalizedMonth -= 12 * overflowYears
  } else if (normalizedMonth === 0) {
    normalizedYear -= 1
    normalizedMonth = 12
  } else if (normalizedMonth < 0) {
    const underflowYears = Math.abs(Math.floor(normalizedMonth / 12))
    normalizedYear -= underflowYears
    normalizedMonth += 12 * underflowYears
  }

  return { year: normalizedYear, month: normalizedMonth }
}

/**
 * YearMonthオブジェクトを作成する
 */
export function createYearMonth(year: number, month: number): YearMonth {
  return normalizeYearMonth(year, month)
}

/**
 * YearMonthに指定された月数を加算する
 */
export function addMonths(yearMonth: YearMonth, months: number): YearMonth {
  return normalizeYearMonth(yearMonth.year, yearMonth.month + months)
}

/**
 * 年月を日本語形式でフォーマット (YYYY年M月)
 */
export function format(yearMonth: YearMonth): string {
  return `${yearMonth.year}年${yearMonth.month}月`
}
