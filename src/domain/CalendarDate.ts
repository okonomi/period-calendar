export type CalendarDate = {
  year: number
  month: number
  day: number
  weekday: number
}

export function createCalendarDate(year: number, month: number, day: number): CalendarDate {
  return createCalendarDateFromDate(new Date(year, month - 1, day))
}

export function createCalendarDateFromDate(date: Date): CalendarDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay(),
  }
}

export function isSame(date1: CalendarDate, date2: CalendarDate): boolean {
  return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day
}

export function getToday(): CalendarDate {
  return createCalendarDateFromDate(new Date())
}

export function isToday(date: CalendarDate): boolean {
  return isSame(date, getToday())
}

export function getDateNum(date: CalendarDate): number {
  return date.year * 10000 + date.month * 100 + date.day
}

export function isPastDate(date: CalendarDate): boolean {
  return getDateNum(date) < getDateNum(getToday())
}

export function isFirstDayOfMonth(date: CalendarDate): boolean {
  return date.day === 1
}

export function format(date: CalendarDate): string {
  const year = date.year
  const month = date.month.toString().padStart(2, "0")
  const day = date.day.toString().padStart(2, "0")
  return `${year}-${month}-${day}`
}
