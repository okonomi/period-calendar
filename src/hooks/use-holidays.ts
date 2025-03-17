import { useContext } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"

export function useHolidays(): Record<string, Date> {
  return useContext(HolidaysContext)
}
