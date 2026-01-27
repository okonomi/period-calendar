import { useEffect, useState } from "react"
import { useSettings } from "../hooks/use-settings"

export const SetupToast: React.FC = () => {
  const { showSetupToast, dismissSetupToast } = useSettings()
  const [visible, setVisible] = useState(true)
  const [isClosing, setIsClosing] = useState(false)

  // 5秒後に自動でフェードアウト
  useEffect(() => {
    if (!showSetupToast) return

    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [showSetupToast])

  const handleClose = () => {
    setIsClosing(true)
    // フェードアウトアニメーション後にトーストを閉じる
    setTimeout(() => {
      setVisible(false)
      dismissSetupToast()
    }, 300)
  }

  if (!showSetupToast || !visible) {
    return null
  }

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-calendar-text text-sm font-medium">1期目の開始年月を設定しましょう</p>
        <button type="button" onClick={handleClose} className="text-gray-400 hover:text-gray-600" aria-label="閉じる">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
