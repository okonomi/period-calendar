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

  const cellClassName = clsx("calendar-cell", {
    "calendar-cell-first-of-month": isFirstDayOfMonth(date),
    "calendar-cell-today": isToday(date),
    "calendar-cell-past": isPastDate(date),
    "calendar-cell-holiday": !!holiday,
  })

  return (
    <TooltipContainer tooltip={tooltip}>
      <div className={cellClassName}>{date.day}</div>
    </TooltipContainer>
  )
}
