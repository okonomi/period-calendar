import { createCalendarDateFromDate, format } from "../domain/CalendarDate"

export type Holiday = {
  date: Date
  name: string
}

export function isHoliday(date: Date, holidays: Record<string, Holiday>): boolean {
  const dateString = format(createCalendarDateFromDate(date))
  return dateString in holidays
}

export function getHoliday(date: Date, holidays: Record<string, Holiday>): Holiday | null {
  const dateString = format(createCalendarDateFromDate(date))
  if (dateString in holidays) {
    return holidays[dateString]
  }
  return null
}
