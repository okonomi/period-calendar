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
  const firstPeriodYearMonth = settings.firstPeriodStart
  const periodRange = formatPeriodRange(getPeriodRange(period, firstPeriodYearMonth))

  const buttonClasses = clsx(
    // ベーススタイル
    "sc-box sc-button",
    // テキスト・サイズ
    "text-calendar-text text-sm",
    // レイアウト
    "h-9 rounded-md px-3 py-1.5",
    // インタラクション
    "cursor-pointer",
    "hover:scale-105 hover:shadow",
    "transition-all"
  )

  return (
    <div className="calendar-header">
      <button type="button" onClick={onPrevPeriod} className={buttonClasses}>
        ◀ 前期
      </button>
      <div className="text-center">
        <div className="text-calendar-text text-lg font-medium">{period}期</div>
        <div className="text-sm text-stone-500">{periodRange}</div>
      </div>
      <button type="button" onClick={onNextPeriod} className={buttonClasses}>
        来期 ▶
      </button>
    </div>
  )
}
