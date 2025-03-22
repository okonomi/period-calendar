import { clsx } from "clsx"
import type { PeriodRange } from "../domain/Period"
import { getPeriodRange } from "../domain/Period"
import { useSettings } from "../hooks/use-settings"
import { formatYearMonthJP } from "../utils/dateUtils"

function formatPeriodRange(periodInfo: PeriodRange) {
  return `${formatYearMonthJP(periodInfo.start.year, periodInfo.start.month)}～${formatYearMonthJP(periodInfo.end.year, periodInfo.end.month)}`
}

type Props = {
  period: number
  onPrevPeriod: () => void
  onNextPeriod: () => void
}

export const PeriodSelector: React.FC<Props> = ({ period, onPrevPeriod, onNextPeriod }) => {
  const { settings } = useSettings()

  const buttonClasses = clsx(
    "px-2 py-1 rounded bg-white",
    "border border-gray-200 text-xs text-gray-600",
    "hover:bg-gray-50 hover:border-gray-300",
    "transition-colors duration-200 shadow-sm"
  )

  const periodRange = formatPeriodRange(getPeriodRange(period, settings))

  return (
    <div className="flex items-center justify-center space-x-2 w-full py-2">
      <button type="button" onClick={onPrevPeriod} className={buttonClasses}>
        ◀ 前期
      </button>
      <div className="text-center">
        <div className="text-base font-medium text-black">{period}期</div>
        <div className="text-xs text-gray-600">{periodRange}</div>
      </div>
      <button type="button" onClick={onNextPeriod} className={buttonClasses}>
        来期 ▶
      </button>
    </div>
  )
}
