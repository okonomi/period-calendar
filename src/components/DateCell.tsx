import { clsx } from "clsx"
import { type CalendarDate, isFirstDayOfMonth, isPastDate, isToday } from "../domain/CalendarDate"
import { getHoliday } from "../domain/Holiday"
import { useHolidays } from "../hooks/use-holidays"
import { TooltipContainer } from "./TooltipContainer"

import type { MonthLayoutMode } from "../types/Settings"

type Props = {
  date: CalendarDate
  displayMode?: MonthLayoutMode
}

export const DateCell: React.FC<Props> = ({ date, displayMode = "monthly" }) => {
  const holidays = useHolidays()
  const holiday = getHoliday(date, holidays)
  const tooltip = holiday?.name
  const todayDate = isToday(date)

  const cellClassName = clsx(
    "text-calendar-text grid size-full place-content-center rounded-md text-sm transition-colors duration-200 hover:bg-stone-50",
    {
      "bg-emerald-50 font-bold": todayDate,
      "bg-sky-50": isFirstDayOfMonth(date) && displayMode === "continuous",
      "text-red-600": !!holiday,
      "opacity-40": isPastDate(date),
    }
  )

  return (
    <TooltipContainer tooltip={tooltip}>
      <div className={cellClassName} data-today={todayDate ? "true" : undefined}>
        <span className="text-[40cqw] leading-none">{date.day}</span>
      </div>
    </TooltipContainer>
  )
}
