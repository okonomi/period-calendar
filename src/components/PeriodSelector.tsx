import { clsx } from "clsx"

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

  return (
    <div className="flex items-center justify-center space-x-2">
      <button type="button" onClick={onPrevPeriod} className={buttonClasses}>
        ◀ 前期
      </button>
      <span className="text-base font-medium text-black">{period}期</span>
      <button type="button" onClick={onNextPeriod} className={buttonClasses}>
        来期 ▶
      </button>
    </div>
  )
}
