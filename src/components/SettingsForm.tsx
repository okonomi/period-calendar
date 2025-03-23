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
    <div className="w-72 bg-white p-4">
      <h3 className="mb-4 font-medium text-gray-800 text-lg">カレンダー設定</h3>

      <div className="mb-4">
        <h4 className="mb-2 font-medium text-gray-800 text-sm">1期目の開始年月</h4>
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="firstPeriodYear" className="mb-1 block font-medium text-gray-700 text-xs">
              年
            </label>
            <input
              type="number"
              id="firstPeriodYear"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max="2100"
              className="w-24 rounded-md border border-gray-300 px-2 py-1 text-gray-800 text-sm"
            />
          </div>
          <div>
            <label htmlFor="firstPeriodMonth" className="mb-1 block font-medium text-gray-700 text-xs">
              月
            </label>
            <input
              type="number"
              id="firstPeriodMonth"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              className="w-16 rounded-md border border-gray-300 px-2 py-1 text-gray-800 text-sm"
            />
          </div>
        </div>
        <p className="mt-1 text-gray-700 text-xs">例：1期が1999年8月から始まる場合、1999と8を設定</p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-3 py-1 text-gray-700 text-sm hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </div>
  )
}
