import { createCalendarDate, isSame } from "../domain/CalendarDate"

// メモ化された今日の日付を返す
let cachedToday: Date | null = null

export function getToday(): Date {
  if (!cachedToday) {
    cachedToday = new Date()
  }

  return cachedToday
}

export function isToday(date: Date): boolean {
  const calDate1 = createCalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
  const calDate2 = createCalendarDate(getToday().getFullYear(), getToday().getMonth() + 1, getToday().getDate())
  return isSame(calDate1, calDate2)
}

export function getDateNum(date: Date): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
}

export function isPastDate(date: Date, today: Date = getToday()): boolean {
  return getDateNum(date) < getDateNum(today)
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
