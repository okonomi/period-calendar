import { clsx } from "clsx"
import { useState } from "react"
import { useHolidays } from "../hooks/use-holidays"
import { formatDate, isFirstDayOfMonth, isHoliday, isPastDate, isToday } from "../utils/dateUtils"

interface DateCellProps {
  date: Date
}

export const DateCell: React.FC<DateCellProps> = ({ date }) => {
  const holidays = useHolidays()
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null)

  const handleMouseEnter = (event: React.MouseEvent) => {
    const dateString = formatDate(date)
    if (holidays[dateString]) {
      setTooltip(holidays[dateString].name)
      const rect = event.currentTarget.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      setTooltipPosition({ top: rect.top + scrollTop - 30, left: rect.left + scrollLeft + rect.width / 2 })
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
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
          "text-red-500": isHoliday(date, holidays),
        }
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {date.getDate()}
      {tooltip && tooltipPosition && (
        <div
          className="absolute bg-black text-white text-xs rounded py-1 px-2"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left, transform: "translateX(-50%)" }}
        >
          {tooltip}
        </div>
      )}
    </div>
  )
}
