import { clsx } from "clsx"
import { type CalendarDate, isFirstDayOfMonth, isPastDate, isToday } from "../domain/CalendarDate"
import { getHoliday } from "../domain/Holiday"
import { useHolidays } from "../hooks/use-holidays"
import { TooltipContainer } from "./TooltipContainer"

type Props = {
  date: CalendarDate
}

export const DateCell: React.FC<Props> = ({ date }) => {
  const holidays = useHolidays()
  const holiday = getHoliday(date, holidays)
  const tooltip = holiday?.name

  const cellClassName = clsx("calendar-cell date-cell", {
    "date-cell-first-of-month": isFirstDayOfMonth(date),
    "date-cell-today": isToday(date),
    "date-cell-past": isPastDate(date),
    "date-cell-holiday": !!holiday,
  })

  return (
    <TooltipContainer tooltip={tooltip}>
      <div className={cellClassName}>{date.day}</div>
    </TooltipContainer>
  )
}
