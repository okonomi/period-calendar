import { useState } from "react"
import { useSettings } from "../hooks/use-settings"

export const SettingsForm: React.FC = () => {
  const { settings, updateSettings } = useSettings()
  const [isOpen, setIsOpen] = useState(false)

  const [year, setYear] = useState(settings.firstPeriodStartYear.toString())
  const [month, setMonth] = useState(settings.firstPeriodStartMonth.toString())

  const toggleSettings = () => setIsOpen(!isOpen)

  const saveSettings = () => {
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

    updateSettings({
      firstPeriodStartYear: yearValue,
      firstPeriodStartMonth: monthValue,
    })

    setIsOpen(false)
  }

  return (
    <div className="mt-4 mb-8">
      <button
        type="button"
        onClick={toggleSettings}
        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        ⚙️ 設定
      </button>

      {isOpen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-medium mb-4">カレンダー設定</h3>

          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">1期目の開始年月</h4>
            <div className="flex items-center gap-3">
              <div>
                <label htmlFor="firstPeriodYear" className="block text-xs text-gray-600 mb-1">
                  年
                </label>
                <input
                  type="number"
                  id="firstPeriodYear"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  min="1900"
                  max="2100"
                  className="px-2 py-1 border border-gray-300 rounded text-sm w-24"
                />
              </div>
              <div>
                <label htmlFor="firstPeriodMonth" className="block text-xs text-gray-600 mb-1">
                  月
                </label>
                <input
                  type="number"
                  id="firstPeriodMonth"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  min="1"
                  max="12"
                  className="px-2 py-1 border border-gray-300 rounded text-sm w-16"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">例：1期が1999年8月から始まる場合、1999と8を設定</p>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={saveSettings}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              保存
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
