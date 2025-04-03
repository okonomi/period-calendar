// filepath: /Users/okonomi/src/github.com/okonomi/period-calendar/src/components/ReloadIcon.tsx
interface Props {
  className?: string
  onClick?: () => void
}

export const ReloadIcon: React.FC<Props> = ({ className = "", onClick }) => {
  return (
    <button
      type="button"
      className={`text-gray-500 hover:text-gray-700 focus:outline-none ${className}`}
      onClick={onClick}
      aria-label="ページを再読み込み"
      title="ページを再読み込み"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </button>
  )
}
