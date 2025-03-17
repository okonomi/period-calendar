import { useContext } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"
import type { Holiday } from "../types/Holiday"

export function useHolidays(): Record<string, Holiday> {
  return useContext(HolidaysContext)
}
