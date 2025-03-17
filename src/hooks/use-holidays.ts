import { useContext } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"

export function useHolidays(): Record<string, { date: Date; name: string }> {
  return useContext(HolidaysContext)
}
