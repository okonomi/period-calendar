import { useState } from "react"
import { createCalendarDate } from "../domain/CalendarDate"
import { calculateFirstPeriodStartYearMonth } from "../domain/Period"
import type { MonthLayoutMode, PeriodSplitMode, Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (settings: Settings) => void
  onCancel: () => void
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  // 既存の年月から現在の年と現在の期を計算
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1 // JavaScriptの月は0から始まるので+1

  const [useDirectInput, setUseDirectInput] = useState(true)
  const [year, setYear] = useState(settings.firstPeriodStart.year.toString())
  const [month, setMonth] = useState(settings.firstPeriodStart.month.toString())

  // 期の設定用の状態
  const [periodStartMonth, setPeriodStartMonth] = useState(settings.firstPeriodStart.month.toString())
  const [currentPeriod, setCurrentPeriod] = useState("1")

  const [monthLayoutMode, setMonthLayoutMode] = useState<MonthLayoutMode>(settings.monthLayoutMode)
  const [periodSplitMode, setPeriodSplitMode] = useState<PeriodSplitMode>(settings.periodSplitMode)

  const handleSave = () => {
    let yearValue: number
    let monthValue: number

    if (useDirectInput) {
      yearValue = Number.parseInt(year, 10)
      monthValue = Number.parseInt(month, 10)

      if (Number.isNaN(yearValue) || yearValue < 1900 || yearValue > 2100) {
        alert("年の値が不正です。1900〜2100の間で設定してください。")
        return
      }

      if (Number.isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
        alert("月の値が不正です。1〜12の間で設定してください。")
        return
      }
    } else {
      const periodStartMonthValue = Number.parseInt(periodStartMonth, 10)
      const currentPeriodValue = Number.parseInt(currentPeriod, 10)

      if (Number.isNaN(periodStartMonthValue) || periodStartMonthValue < 1 || periodStartMonthValue > 12) {
        alert("期の開始月の値が不正です。1〜12の間で設定してください。")
        return
      }

      if (Number.isNaN(currentPeriodValue) || currentPeriodValue < 1) {
        alert("現在何期目かの値が不正です。1以上の値を設定してください。")
        return
      }

      const calendarDate = createCalendarDate(currentYear, currentMonth, 1)
      const firstPeriodStart = calculateFirstPeriodStartYearMonth(
        periodStartMonthValue,
        currentPeriodValue,
        calendarDate
      )

      if (!firstPeriodStart) {
        alert("期の開始月または現在何期目かの値が不正です。")
        return
      }

      yearValue = firstPeriodStart.year
      monthValue = firstPeriodStart.month

      if (yearValue < 1900 || yearValue > 2100) {
        alert("計算された年の値が範囲外です。1900〜2100の間になるよう設定してください。")
        return
      }
    }

    const newSettings = {
      firstPeriodStart: { year: yearValue, month: monthValue },
      monthLayoutMode,
      periodSplitMode,
    }
    onSave(newSettings)
  }

  return (
    <>
      <h2 className="text-calendar-text mb-4 text-lg font-semibold sm:text-xl">カレンダー設定</h2>
      <div className="mb-5">
        <h3 className="text-calendar-text mb-2 text-sm font-medium sm:mb-3 sm:text-base">1期目の開始年月</h3>

        <div className="mb-3 flex items-center gap-3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="inputMode"
              checked={useDirectInput}
              onChange={() => setUseDirectInput(true)}
              className="h-4 w-4"
            />
            <span className="text-sm">直接入力</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="inputMode"
              checked={!useDirectInput}
              onChange={() => setUseDirectInput(false)}
              className="h-4 w-4"
            />
            <span className="text-sm">期から計算</span>
          </label>
        </div>

        {useDirectInput ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
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
                  className="text-calendar-text w-20 rounded-md border border-gray-300 px-2 py-1 text-sm sm:w-24"
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
          </>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label htmlFor="periodStartMonth" className="text-calendar-text mb-1 block text-xs font-medium">
                  期の開始月
                </label>
                <input
                  type="number"
                  id="periodStartMonth"
                  value={periodStartMonth}
                  onChange={(e) => setPeriodStartMonth(e.target.value)}
                  min="1"
                  max="12"
                  className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="currentPeriod" className="text-calendar-text mb-1 block text-xs font-medium">
                  現在何期目
                </label>
                <input
                  type="number"
                  id="currentPeriod"
                  value={currentPeriod}
                  onChange={(e) => setCurrentPeriod(e.target.value)}
                  min="1"
                  className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            </div>
            <p className="text-calendar-text mt-1 text-xs">
              例：現在3期目で4月始まりの場合、開始月に4、現在何期目に3を設定
            </p>
            {!useDirectInput && (
              <div className="mt-2 text-sm">
                <span className="font-medium">計算結果：</span>
                {(() => {
                  const periodStartMonthValue = Number.parseInt(periodStartMonth, 10)
                  const currentPeriodValue = Number.parseInt(currentPeriod, 10)
                  const calendarDate = createCalendarDate(currentYear, currentMonth, 1)
                  const result = calculateFirstPeriodStartYearMonth(
                    periodStartMonthValue,
                    currentPeriodValue,
                    calendarDate
                  )
                  return result ? `1期目は${result.year}年${result.month}月開始` : "値を入力してください"
                })()}
              </div>
            )}
          </>
        )}
      </div>
      <div className="mb-5">
        <h3 className="text-calendar-text mb-2 text-sm font-medium sm:mb-3 sm:text-base">カレンダー表示設定</h3>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="rounded-md bg-gray-50 p-2 sm:p-3">
            <div className="text-calendar-text mb-2 block text-xs font-medium sm:text-sm">前期・後期の表示方法</div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="periodSplitMode"
                  value="split"
                  checked={periodSplitMode === "split"}
                  onChange={() => setPeriodSplitMode("split")}
                  className="h-4 w-4"
                />
                <span className="text-sm">2つに分けて表示</span>
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
                <span className="text-sm">1つにまとめて表示</span>
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

          <div className="rounded-md bg-gray-50 p-2 sm:p-3">
            <div className="text-calendar-text mb-2 block text-xs font-medium sm:text-sm">月のレイアウト</div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="monthLayoutMode"
                  value="monthly"
                  checked={monthLayoutMode === "monthly"}
                  onChange={() => setMonthLayoutMode("monthly")}
                  className="h-4 w-4"
                />
                <span className="text-sm">月ごとに区切る</span>
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
                <span className="text-sm">区切らず連続</span>
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
          className="text-calendar-text cursor-pointer rounded-md border border-gray-300 px-2 py-1 text-sm transition-colors duration-200 hover:scale-105 hover:bg-gray-50 hover:shadow sm:px-3 sm:py-1.5"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-sm text-white transition-colors duration-200 hover:scale-105 hover:bg-blue-600 hover:shadow sm:px-3 sm:py-1.5"
        >
          保存
        </button>
      </div>
    </>
  )
}
