import { useState } from "react"
import type { MonthLayoutMode, PeriodSplitMode, Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (newSettings: Pick<Settings, "firstPeriodStart" | "monthLayoutMode" | "periodSplitMode">) => void
  onCancel: () => void
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  const [year, setYear] = useState(settings.firstPeriodStart.year.toString())
  const [month, setMonth] = useState(settings.firstPeriodStart.month.toString())
  const [monthLayoutMode, setMonthLayoutMode] = useState<MonthLayoutMode>(settings.monthLayoutMode)
  const [periodSplitMode, setPeriodSplitMode] = useState<PeriodSplitMode>(settings.periodSplitMode)

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
      firstPeriodStart: { year: yearValue, month: monthValue },
      monthLayoutMode,
      periodSplitMode,
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
        <div className="flex flex-col gap-6">
          <div className="rounded-md bg-gray-50 p-3">
            <div className="text-calendar-text mb-2 block text-sm font-medium">前期・後期の表示方法</div>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="periodSplitMode"
                  value="split"
                  checked={periodSplitMode === "split"}
                  onChange={() => setPeriodSplitMode("split")}
                  className="h-4 w-4"
                />
                <span>2つに分けて表示</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="periodSplitMode"
                  value="single"
                  checked={periodSplitMode === "single"}
                  onChange={() => setPeriodSplitMode("single")}
                  className="h-4 w-4"
                />
                <span>1つにまとめて表示</span>
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-calendar-text text-xs">
                {periodSplitMode === "split" ? (
                  <>
                    前期と後期を<span className="font-medium">別々のカレンダー</span>で表示します
                  </>
                ) : (
                  <>
                    前期と後期を<span className="font-medium">1つのカレンダー</span>として続けて表示します
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-md bg-gray-50 p-3">
            <div className="text-calendar-text mb-2 block text-sm font-medium">月のレイアウト</div>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="monthLayoutMode"
                  value="monthly"
                  checked={monthLayoutMode === "monthly"}
                  onChange={() => setMonthLayoutMode("monthly")}
                  className="h-4 w-4"
                />
                <span>月ごとに区切る</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="monthLayoutMode"
                  value="continuous"
                  checked={monthLayoutMode === "continuous"}
                  onChange={() => setMonthLayoutMode("continuous")}
                  className="h-4 w-4"
                />
                <span>区切らず連続</span>
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-calendar-text text-xs">
                {monthLayoutMode === "monthly" ? (
                  <>
                    月が変わる時に<span className="font-medium">改行して区切り</span>ます
                  </>
                ) : (
                  <>
                    月が変わっても<span className="font-medium">改行せず連続</span>して表示します
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-calendar-text cursor-pointer rounded-md border border-gray-300 px-3 py-1 text-sm transition-colors duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition-colors duration-200 hover:scale-105 hover:bg-blue-600 hover:shadow"
        >
          保存
        </button>
      </div>
    </>
  )
}
