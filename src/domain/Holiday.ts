import { formatDate } from "../utils/dateUtils"

export type Holiday = {
  date: Date
  name: string
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
