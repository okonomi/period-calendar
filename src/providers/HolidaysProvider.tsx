import { useEffect, useState } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"
import { getPeriodRange } from "../utils/periodUtils"

async function fetchHolidays(year: number) {
  const response = await fetch(`https://holidays-jp.github.io/api/v1/${year}/date.json`)
  const data = await response.json()
  const holidayDates = Object.keys(data).map((dateString) => new Date(dateString))
  return holidayDates
}

// HolidaysProviderコンポーネントの作成
export const HolidaysProvider: React.FC<React.PropsWithChildren<{ period: number }>> = ({ children, period }) => {
  const [holidays, setHolidays] = useState<Date[]>([])

  useEffect(() => {
    const { startYear } = getPeriodRange(period)
    fetchHolidays(startYear).then((holidayDates) => setHolidays(holidayDates))
  }, [period])

  return <HolidaysContext.Provider value={holidays}>{children}</HolidaysContext.Provider>
}
