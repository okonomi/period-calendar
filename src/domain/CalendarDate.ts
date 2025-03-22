export type CalendarDate = {
  year: number
  month: number
  day: number
}

export function createCalendarDate(year: number, month: number, day: number): CalendarDate {
  const date = new Date(year, month - 1, day)
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

export function isSame(date1: CalendarDate, date2: CalendarDate): boolean {
  return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day
}
