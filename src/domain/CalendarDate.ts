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
