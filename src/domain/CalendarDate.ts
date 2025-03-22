import { getToday } from "../utils/dateUtils"

export type CalendarDate = {
  year: number
  month: number
  day: number
}

export function createCalendarDate(year: number, month: number, day: number): CalendarDate {
  return createCalendarDateFromDate(new Date(year, month - 1, day))
}

export function createCalendarDateFromDate(date: Date): CalendarDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

export function isSame(date1: CalendarDate, date2: CalendarDate): boolean {
  return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day
}

export function isToday(date: CalendarDate): boolean {
  const today = createCalendarDateFromDate(getToday())
  return isSame(date, today)
}

export function getDateNum(date: CalendarDate): number {
  return date.year * 10000 + date.month * 100 + date.day
}

export function isPastDate(date: CalendarDate): boolean {
  return getDateNum(date) < getDateNum(createCalendarDateFromDate(getToday()))
}

export function isFirstDayOfMonth(date: CalendarDate): boolean {
  return date.day === 1
}
