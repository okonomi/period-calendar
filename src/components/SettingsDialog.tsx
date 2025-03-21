import { useEffect, useRef, useState } from "react"
import { useSettings } from "../hooks/use-settings"
import type { Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth">) => void
  onCancel: () => void
  formRef: React.RefObject<HTMLDivElement>
}

const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel, formRef }) => {
  const [year, setYear] = useState(settings.firstPeriodStartYear.toString())
  const [month, setMonth] = useState(settings.firstPeriodStartMonth.toString())

  const handleSave = () => {
    const yearValue = Number.parseInt(year, 10)
    const monthValue = Number.parseInt(month, 10)

    if (Number.isNaN(yearValue) || yearValue < 1900 || yearValue > 2100) {
      alert("年の値が不正です。1900〜2100の間で設定してください。")
      return
    }

    if (Number.isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
      alert("月の値が不正です。1〜12の間で設定してください。")
      return
    }

    onSave({
      firstPeriodStartYear: yearValue,
      firstPeriodStartMonth: monthValue,
    })
  }

  return (
    <div
      ref={formRef}
      className="mt-2 p-4 bg-white rounded-lg shadow border border-gray-200 absolute right-0 z-10 w-72"
    >
      <h3 className="text-lg font-medium text-gray-800 mb-4">カレンダー設定</h3>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-800 mb-2">1期目の開始年月</h4>
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="firstPeriodYear" className="block text-xs text-gray-700 mb-1 font-medium">
              年
            </label>
            <input
              type="number"
              id="firstPeriodYear"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max="2100"
              className="px-2 py-1 border border-gray-300 rounded text-sm w-24 text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="firstPeriodMonth" className="block text-xs text-gray-700 mb-1 font-medium">
              月
            </label>
            <input
              type="number"
              id="firstPeriodMonth"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              className="px-2 py-1 border border-gray-300 rounded text-sm w-16 text-gray-800"
            />
          </div>
        </div>
        <p className="text-xs text-gray-700 mt-1">例：1期が1999年8月から始まる場合、1999と8を設定</p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </div>
  )
}

// 設定フォームの表示制御コンポーネント（開閉状態管理）
export const SettingsDialog: React.FC = () => {
  const { settings, updateSettings } = useSettings()
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleSettings = () => setIsOpen(!isOpen)
  const closeSettings = () => setIsOpen(false)

  // ESCキー押下でフォームを閉じる
  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeSettings()
      }
    }

    window.addEventListener("keydown", handleEscKeyDown)
    return () => {
      window.removeEventListener("keydown", handleEscKeyDown)
    }
  }, [isOpen])

  // フォーム外クリックでフォームを閉じる
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        formRef.current &&
        buttonRef.current &&
        !formRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeSettings()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  const handleSaveSettings = (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth">) => {
    updateSettings(newSettings)
    closeSettings()
  }

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleSettings}
        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        ⚙️ 設定
      </button>

      {isOpen && (
        <SettingsForm settings={settings} onSave={handleSaveSettings} onCancel={closeSettings} formRef={formRef} />
      )}
    </div>
  )
}
