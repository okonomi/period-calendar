import { clsx } from "clsx"

interface YearSelectorProps {
  year: number
  onPrevYear: () => void
  onNextYear: () => void
}

export const YearSelector: React.FC<YearSelectorProps> = ({ year, onPrevYear, onNextYear }) => {
  const buttonClasses = clsx(
    "px-2 py-1 rounded bg-white",
    "border border-gray-200 text-xs text-gray-600",
    "hover:bg-gray-50 hover:border-gray-300",
    "transition-colors duration-200 shadow-sm"
  )

  return (
    <div className="flex items-center justify-center space-x-2">
      <button type="button" onClick={onPrevYear} className={buttonClasses}>
        ◀ 前年
      </button>
      <span className="text-base font-medium text-black">{year}年</span>
      <button type="button" onClick={onNextYear} className={buttonClasses}>
        翌年 ▶
      </button>
    </div>
  )
}
