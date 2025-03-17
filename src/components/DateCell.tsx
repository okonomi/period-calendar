import { clsx } from "clsx"
import { useState } from "react"
import { useHolidays } from "../hooks/use-holidays"
import { getHoliday, isFirstDayOfMonth, isPastDate, isToday } from "../utils/dateUtils"
import { Tooltip, type TooltipPosition } from "./Tooltip"

type Props = {
  date: Date
}

export const DateCell: React.FC<Props> = ({ date }) => {
  const holidays = useHolidays()
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null)

  const holiday = getHoliday(date, holidays)
  const tooltip = holiday?.name ?? ""

  const handleMouseEnter = (event: React.MouseEvent) => {
    if (tooltip) {
      const rect = event.currentTarget.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      setTooltipPosition({ top: rect.top + scrollTop - 30, left: rect.left + scrollLeft + rect.width / 2 })
    }
  }

  const handleMouseLeave = () => {
    setTooltipPosition(null)
  }

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
          "text-red-500": !!holiday,
        }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {date.getDate()}
      {tooltipPosition && <Tooltip text={tooltip} position={tooltipPosition} />}
    </div>
  )
}
