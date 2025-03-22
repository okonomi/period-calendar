import { format } from "../domain/YearMonth"

// 年月を日本語形式でフォーマット (YYYY年M月)
export function formatYearMonthJP(year: number, month: number): string {
  const yearMonth = { year, month }
  return format(yearMonth)
}

// 同じ日付かどうかを判定
export function isSameDate(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// メモ化された今日の日付を返す
let cachedToday: Date | null = null

export function getToday(): Date {
  if (!cachedToday) {
    cachedToday = new Date()
  }

  return cachedToday
}

export function isToday(date: Date): boolean {
  return isSameDate(date, getToday())
}

export function getDateNum(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

export function isPastDate(date: Date, today: Date | null = null): boolean {
  return getDateNum(date) < getDateNum(today ?? getToday())
}

export function isFirstDayOfMonth(date: Date): boolean {
  return date.getDate() === 1
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
