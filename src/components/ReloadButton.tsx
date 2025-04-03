// filepath: /Users/okonomi/src/github.com/okonomi/period-calendar/src/components/ReloadButton.tsx
import { ArrowPathIcon } from "./icon/ArrowPathIcon"

interface Props {
  onClick?: () => void
}

export const ReloadButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="sc-box sc-button text-calendar-text flex size-9 cursor-pointer items-center justify-center p-1.5 transition-all hover:scale-105 hover:shadow"
      onClick={onClick}
      aria-label="ページを再読み込み"
      title="ページを再読み込み"
    >
      <ArrowPathIcon className="h-5 w-5" />
    </button>
  )
}
