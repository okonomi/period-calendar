import { useEffect, useState } from "react"
import { HolidaysContext } from "../contexts/HolidaysContext"
import { getPeriodRange } from "../utils/periodUtils"

async function fetchHolidays(year: number) {
  const response = await fetch(`https://holidays-jp.github.io/api/v1/${year}/date.json`)
  const data = await response.json()
  const holidayDates = Object.keys(data).reduce<Record<string, Date>>((acc, dateString) => {
    acc[dateString] = new Date(dateString)
    return acc
  }, {})
  return holidayDates
}

// HolidaysProviderコンポーネントの作成
export const HolidaysProvider: React.FC<React.PropsWithChildren<{ period: number }>> = ({ children, period }) => {
  const [holidays, setHolidays] = useState<Record<string, Date>>({})

  useEffect(() => {
    const { startYear, endYear } = getPeriodRange(period)
    Promise.all([fetchHolidays(startYear), fetchHolidays(endYear)]).then(([startYearHolidays, endYearHolidays]) => {
      setHolidays({ ...startYearHolidays, ...endYearHolidays })
    })
  }, [period])

  return <HolidaysContext.Provider value={holidays}>{children}</HolidaysContext.Provider>
}
