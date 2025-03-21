import { useState } from "react"
import type { Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth">) => void
  onCancel: () => void
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
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
    <div className="p-4 bg-white w-72">
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
