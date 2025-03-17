import { useEffect, useState } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"

async function fetchHolidays() {
  const date = new Date()
  const response = await fetch(`https://holidays-jp.github.io/api/v1/${date.getFullYear()}/date.json`)
  const data = await response.json()
  const holidayDates = Object.keys(data).map((dateString) => new Date(dateString))
  return holidayDates
}

// HolidaysProviderコンポーネントの作成
export const HolidaysProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [holidays, setHolidays] = useState<Date[]>([])

  useEffect(() => {
    fetchHolidays().then((holidayDates) => setHolidays(holidayDates))
  }, [])

  return <HolidaysContext.Provider value={holidays}>{children}</HolidaysContext.Provider>
}
