import { useContext } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"
import type { Holiday } from "../domain/Holiday"

export function useHolidays(): Record<string, Holiday> {
  return useContext(HolidaysContext)
}
