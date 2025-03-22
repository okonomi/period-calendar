import { generateDates } from "../domain/Dates"
import { format } from "../domain/YearMonth"
import type { Holiday } from "../types/Holiday"

// 後方互換性のために年のみ指定するバージョンを残す
export function generateDatesForYear(year: number): Date[] {
  return generateDates(year, 1, year, 12)
}

const DAYS_IN_WEEK = 7

// 日付を週ごとにグループ化
export function groupDatesByWeek(dates: Date[]): (Date | null)[][] {
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

export function isHoliday(date: Date, holidays: Record<string, Holiday>): boolean {
  const dateString = formatDate(date)
  return dateString in holidays
}

export function getHoliday(date: Date, holidays: Record<string, Holiday>): Holiday | null {
  const dateString = formatDate(date)
  if (dateString in holidays) {
    return holidays[dateString]
  }
  return null
}

export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
