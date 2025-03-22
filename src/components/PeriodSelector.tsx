import { clsx } from "clsx"
import { type PeriodRange, getPeriodRange } from "../domain/Period"
import { format } from "../domain/YearMonth"
import { useSettings } from "../hooks/use-settings"

function formatPeriodRange(periodInfo: PeriodRange) {
  return `${format(periodInfo.start)}～${format(periodInfo.end)}`
}

type Props = {
  period: number
  onPrevPeriod: () => void
  onNextPeriod: () => void
}

export const PeriodSelector: React.FC<Props> = ({ period, onPrevPeriod, onNextPeriod }) => {
  const { settings } = useSettings()

  const buttonClasses = clsx(
    "px-3 py-1.5 rounded-md",
    "bg-stone-50 border border-stone-200 text-sm text-stone-600",
    "hover:bg-stone-100 hover:border-stone-300",
    "transition-colors duration-200",
    "shadow-sm"
  )

  const periodRange = formatPeriodRange(getPeriodRange(period, settings))

  return (
    <div className="calendar-header">
      <button type="button" onClick={onPrevPeriod} className={buttonClasses}>
        ◀ 前期
      </button>
      <div className="text-center">
        <div className="text-lg font-medium text-stone-800">{period}期</div>
        <div className="text-sm text-stone-500">{periodRange}</div>
      </div>
      <button type="button" onClick={onNextPeriod} className={buttonClasses}>
        来期 ▶
      </button>
    </div>
  )
}
