import { useEffect, useState } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"
import type { Holiday } from "../domain/Holiday"
import { getPeriodRange } from "../domain/Period"

async function fetchHolidays(year: number): Promise<Record<string, Holiday>> {
  const response = await fetch(`https://holidays-jp.github.io/api/v1/${year}/date.json`)
  const data = await response.json()
  const holidayDates = Object.keys(data).reduce<Record<string, Holiday>>((acc, dateString) => {
    acc[dateString] = { date: new Date(dateString), name: data[dateString] }
    return acc
  }, {})
  return holidayDates
}

// HolidaysProviderコンポーネントの作成
export const HolidaysProvider: React.FC<React.PropsWithChildren<{ period: number }>> = ({ children, period }) => {
  const [holidays, setHolidays] = useState<Record<string, Holiday>>({})

  useEffect(() => {
    const periodRange = getPeriodRange(period)
    Promise.all([fetchHolidays(periodRange.start.year), fetchHolidays(periodRange.end.year)]).then(
      ([startYearHolidays, endYearHolidays]) => {
        setHolidays({ ...startYearHolidays, ...endYearHolidays })
      }
    )
  }, [period])

  return <HolidaysContext.Provider value={holidays}>{children}</HolidaysContext.Provider>
}
