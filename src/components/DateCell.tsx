import { clsx } from "clsx"
import { createCalendarDateFromDate, isPastDate, isToday } from "../domain/CalendarDate"
import { getHoliday } from "../domain/Holiday"
import { useHolidays } from "../hooks/use-holidays"
import { isFirstDayOfMonth } from "../utils/dateUtils"
import { TooltipContainer } from "./TooltipContainer"

type Props = {
  date: Date
}

export const DateCell: React.FC<Props> = ({ date }) => {
  const holidays = useHolidays()
  const holiday = getHoliday(date, holidays)
  const tooltip = holiday?.name

  const cellClassName = clsx(
    "h-8 px-1 border-b border-gray-100",
    "flex items-center justify-center",
    "text-xs text-gray-700",
    "hover:bg-gray-50 transition-colors duration-200",
    {
      "bg-blue-50": isFirstDayOfMonth(date),
      "bg-green-100 font-bold": isToday(createCalendarDateFromDate(date)),
      "opacity-50": isPastDate(createCalendarDateFromDate(date)),
      "text-red-500": !!holiday,
    }
  )

  return (
    <TooltipContainer tooltip={tooltip}>
      <div className={cellClassName}>{date.getDate()}</div>
    </TooltipContainer>
  )
}
