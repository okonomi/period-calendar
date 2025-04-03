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
    <div className="flex w-full justify-between items-center space-x-2">
      <button type="button" onClick={onPrevPeriod} className={buttonClasses}>
        <span className="hidden md:inline">◀ 前期</span>
        <span className="hidden sm:inline md:hidden">◀ 前</span>
        <span className="inline sm:hidden">◀</span>
      </button>
      <div className="text-center">
        <div className="text-calendar-text text-base sm:text-lg font-medium">{period}期</div>
        <div className="text-xs sm:text-sm text-stone-500">{periodRange}</div>
      </div>
      <button type="button" onClick={onNextPeriod} className={buttonClasses}>
        <span className="hidden md:inline">来期 ▶</span>
        <span className="hidden sm:inline md:hidden">次 ▶</span>
        <span className="inline sm:hidden">▶</span>
      </button>
    </div>
  )
}
