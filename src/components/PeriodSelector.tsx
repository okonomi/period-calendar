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
  const periodRange = formatPeriodRange(getPeriodRange(period, settings))

  return (
    <div className="calendar-header">
      <button type="button" onClick={onPrevPeriod} className="sc-box sc-button period-selector-button">
        ◀ 前期
      </button>
      <div className="text-center">
        <div className="font-medium text-calendar-text text-lg">{period}期</div>
        <div className="text-sm text-stone-500">{periodRange}</div>
      </div>
      <button type="button" onClick={onNextPeriod} className="sc-box sc-button period-selector-button">
        来期 ▶
      </button>
    </div>
  )
}
