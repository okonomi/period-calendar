// filepath: /Users/okonomi/src/github.com/okonomi/period-calendar/src/components/ReloadButton.tsx
import { ArrowPathIcon } from "./icon/ArrowPathIcon"

interface Props {
  className?: string
  onClick?: () => void
}

export const ReloadButton: React.FC<Props> = ({ className = "", onClick }) => {
  return (
    <button
      type="button"
      className={`text-gray-500 hover:text-gray-700 focus:outline-none ${className}`}
      onClick={onClick}
      aria-label="ページを再読み込み"
      title="ページを再読み込み"
    >
      <ArrowPathIcon className="h-5 w-5" />
    </button>
  )
}
