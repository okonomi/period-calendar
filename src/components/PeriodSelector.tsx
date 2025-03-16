import { clsx } from "clsx"
import { formatYearMonthJP } from "../utils/dateUtils"
import { type PeriodRange, getPeriodRange } from "../utils/periodUtils"

function formatPeriodRange(periodInfo: PeriodRange) {
  return `${formatYearMonthJP(periodInfo.startYear, periodInfo.startMonth)}～${formatYearMonthJP(periodInfo.endYear, periodInfo.endMonth)}`
}

interface YearSelectorProps {
  period: number
  onPrevPeriod: () => void
  onNextPeriod: () => void
}

export const PeriodSelector: React.FC<YearSelectorProps> = ({ period, onPrevPeriod, onNextPeriod }) => {
  const buttonClasses = clsx(
    "px-2 py-1 rounded bg-white",
    "border border-gray-200 text-xs text-gray-600",
    "hover:bg-gray-50 hover:border-gray-300",
    "transition-colors duration-200 shadow-sm"
  )

  const periodRange = formatPeriodRange(getPeriodRange(period))

  return (
    <div className="flex items-center justify-center space-x-2">
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
