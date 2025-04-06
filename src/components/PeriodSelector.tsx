import { type PeriodRange, getPeriodRange } from "../domain/Period"
import { format } from "../domain/YearMonth"
import { useSettings } from "../hooks/use-settings"

function formatPeriodRange(periodInfo: PeriodRange) {
  const { start, end } = periodInfo
  return `${format(start)}～${format(end)}`
}

type Props = {
  period: number
  onPrevPeriod: () => void
  onNextPeriod: () => void
}

export const PeriodSelector: React.FC<Props> = ({ period, onPrevPeriod, onNextPeriod }) => {
  const { settings } = useSettings()
  const firstPeriodYearMonth = settings.firstPeriodStart
  const periodRange = formatPeriodRange(getPeriodRange(period, firstPeriodYearMonth))

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <button
        type="button"
        onClick={onPrevPeriod}
        className="sc-box sc-button text-calendar-text h-9 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-all hover:scale-105 hover:shadow"
      >
        <span className="hidden md:inline">◀ 前期</span>
        <span className="hidden sm:inline md:hidden">◀ 前</span>
        <span className="inline sm:hidden">◀</span>
      </button>
      <div className="text-center">
        <div className="text-calendar-text text-base font-medium sm:text-lg">{period}期</div>
        <div className="text-xs text-stone-500 sm:text-sm">{periodRange}</div>
      </div>
      <button
        type="button"
        onClick={onNextPeriod}
        className="sc-box sc-button text-calendar-text h-9 cursor-pointer rounded-md px-3 py-1.5 text-sm transition-all hover:scale-105 hover:shadow"
      >
        <span className="hidden md:inline">来期 ▶</span>
        <span className="hidden sm:inline md:hidden">次 ▶</span>
        <span className="inline sm:hidden">▶</span>
      </button>
    </div>
  )
}
