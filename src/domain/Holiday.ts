import { type CalendarDate, format } from "../domain/CalendarDate"

export type Holiday = {
  date: CalendarDate
  name: string
}

export function isHoliday(date: CalendarDate, holidays: Record<string, Holiday>): boolean {
  const dateString = format(date)
  return dateString in holidays
}

export function getHoliday(date: CalendarDate, holidays: Record<string, Holiday>): Holiday | null {
  const dateString = format(date)
  if (dateString in holidays) {
    return holidays[dateString]
  }
  return null
}
