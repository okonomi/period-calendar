import { clsx } from "clsx"
import { useEffect, useState } from "react"
import { isFirstDayOfMonth, isHoliday, isPastDate, isToday } from "../utils/dateUtils"

function useHolidays(date: Date): Date[] {
  const [holidays, setHolidays] = useState<Date[]>([])

  useEffect(() => {
    async function fetchHolidays() {
      const response = await fetch(`https://holidays-jp.github.io/api/v1/${date.getFullYear()}/date.json`)
      const data = await response.json()
      const holidayDates = Object.keys(data).map((dateString) => new Date(dateString))
      setHolidays(holidayDates)
    }

    fetchHolidays()
  }, [date])

  return holidays
}

interface DateCellProps {
  date: Date
}

export const DateCell: React.FC<DateCellProps> = ({ date }) => {
  const holidays = useHolidays(date)

  return (
    <div
      className={clsx(
        "h-8 px-1 border-b border-gray-100",
        "flex items-center justify-center",
        "text-xs text-gray-700",
        "hover:bg-gray-50 transition-colors duration-200",
        {
          "bg-blue-50": isFirstDayOfMonth(date),
          "bg-green-100 font-bold": isToday(date),
          "opacity-50": isPastDate(date),
          "text-red-500": isHoliday(date, holidays),
        }
      )}
    >
      {date.getDate()}
    </div>
  )
}
