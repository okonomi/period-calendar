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

  const cellClassName = clsx(
    "text-calendar-text flex aspect-square size-9 flex-1 items-center justify-center rounded-md text-sm transition-colors duration-200 hover:bg-stone-50",
    {
      "bg-emerald-50 font-bold": isToday(date),
      "bg-sky-50": isFirstDayOfMonth(date),
      "text-red-600": !!holiday,
      "opacity-40": isPastDate(date),
    }
  )

  return (
    <TooltipContainer tooltip={tooltip}>
      <div className={cellClassName}>{date.day}</div>
    </TooltipContainer>
  )
}
