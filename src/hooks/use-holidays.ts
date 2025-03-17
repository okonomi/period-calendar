import { useContext } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"

export function useHolidays(): Date[] {
  return useContext(HolidaysContext)
}
