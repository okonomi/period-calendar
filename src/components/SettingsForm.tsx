import { useState } from "react"
import type { DisplayMode, Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth" | "displayMode">) => void
  onCancel: () => void
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  const [year, setYear] = useState(settings.firstPeriodStartYear.toString())
  const [month, setMonth] = useState(settings.firstPeriodStartMonth.toString())
  const [displayMode, setDisplayMode] = useState<DisplayMode>(settings.displayMode)

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
      displayMode,
    })
  }

  return (
    <>
      <h2 className="text-calendar-text mb-5 text-xl font-semibold">カレンダー設定</h2>

      <div className="mb-5">
        <h3 className="text-calendar-text mb-3 text-base font-medium">1期目の開始年月</h3>
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="firstPeriodYear" className="text-calendar-text mb-1 block text-xs font-medium">
              年
            </label>
            <input
              type="number"
              id="firstPeriodYear"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max="2100"
              className="text-calendar-text w-24 rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
          <div>
            <label htmlFor="firstPeriodMonth" className="text-calendar-text mb-1 block text-xs font-medium">
              月
            </label>
            <input
              type="number"
              id="firstPeriodMonth"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
          </div>
        </div>
        <p className="text-calendar-text mt-1 text-xs">例：1期が1999年8月から始まる場合、1999と8を設定</p>
      </div>

      <div className="mb-5">
        <h3 className="text-calendar-text mb-3 text-base font-medium">カレンダー表示設定</h3>
        <div className="flex items-center gap-3">
          <div>
            <div className="text-calendar-text mb-1 block text-xs font-medium">表示モード</div>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="displayMode"
                  value="monthly"
                  checked={displayMode === "monthly"}
                  onChange={() => setDisplayMode("monthly")}
                  className="h-4 w-4"
                />
                <span>月区切り表示</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="displayMode"
                  value="continuous"
                  checked={displayMode === "continuous"}
                  onChange={() => setDisplayMode("continuous")}
                  className="h-4 w-4"
                />
                <span>連続表示</span>
              </label>
            </div>
          </div>
        </div>
        <p className="text-calendar-text mt-1 text-xs">月区切り表示を選ぶと、月ごとにカレンダーが区切られます</p>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-calendar-text rounded-md border border-gray-300 px-3 py-1 text-sm transition-colors duration-200 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition-colors duration-200 hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </>
  )
}
