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
  const isPast = isPastDate(date)
  const isFirstOfMonth = isFirstDayOfMonth(date) && displayMode === "continuous"
  const isHoliday = Boolean(holiday)

  const cellClassName = clsx(
    // ベースクラス
    "text-calendar-text grid size-full place-content-center rounded-md text-sm transition-colors duration-200 hover:bg-stone-50",
    // 状態による条件付きクラス
    {
      "bg-emerald-50 font-bold": todayDate,
      "bg-sky-50": isFirstOfMonth,
      "text-red-600": isHoliday,
      "opacity-40": isPast && !todayDate,
    }
  )

  return (
    <TooltipContainer tooltip={tooltip}>
      <div
        className={cellClassName}
        data-today={todayDate}
        data-holiday={isHoliday}
        data-first-of-month={isFirstOfMonth}
        data-past={isPast}
      >
        {date.day}
      </div>
    </TooltipContainer>
  )
}
