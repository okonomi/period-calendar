import { useState } from "react"
import { z } from "zod"
import { createCalendarDate } from "../domain/CalendarDate"
import { calculateFirstPeriodStartYearMonth } from "../domain/Period"
import type { YearMonth } from "../domain/YearMonth"
import type { Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (settings: Settings) => void
  onCancel: () => void
}

// 文字列を数値に変換するプリプロセッサ
const stringToNumber = (val: unknown) => {
  if (typeof val === "string") {
    const parsed = Number(val)
    return Number.isNaN(parsed) ? undefined : parsed
  }
  return val
}

// YearMonth型のzodスキーマ（変換と検証を一体化）
const yearMonthSchema = z.object({
  year: z.preprocess(stringToNumber, z.number().int().min(1900).max(2100)),
  month: z.preprocess(stringToNumber, z.number().int().min(1).max(12)),
})

// フォーム状態のzodスキーマ（変換と検証を一体化）
const formStateSchema = z.object({
  useDirectInput: z.boolean(),
  firstPeriodStart: yearMonthSchema,
  periodStartMonth: z.preprocess(stringToNumber, z.number().int().min(1).max(12)),
  currentPeriod: z.preprocess(stringToNumber, z.number().int().min(1)),
  monthLayoutMode: z.enum(["monthly", "continuous"]),
  periodSplitMode: z.enum(["split", "single"]),
})

// フォーム状態の型をzodスキーマから導出
type FormState = z.infer<typeof formStateSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  // 既存の年月から現在の年と現在の期を計算
  const currentYearMonth = { ...settings.firstPeriodStart }

  // フォーム状態を単一のstateオブジェクトで管理
  const [formState, setFormState] = useState<FormState>({
    useDirectInput: true,
    firstPeriodStart: {
      year: settings.firstPeriodStart.year,
      month: settings.firstPeriodStart.month,
    },
    periodStartMonth: settings.firstPeriodStart.month,
    currentPeriod: 1,
    monthLayoutMode: settings.monthLayoutMode,
    periodSplitMode: settings.periodSplitMode,
  })

  // 期から計算モードで設定値を生成する
  const generateFirstPeriodFromPeriodSettings = () => {
    const calendarDate = createCalendarDate(currentYearMonth.year, currentYearMonth.month, 1)
    const firstPeriodStart = calculateFirstPeriodStartYearMonth(
      formState.periodStartMonth,
      formState.currentPeriod,
      calendarDate
    )
    return firstPeriodStart || { year: settings.firstPeriodStart.year, month: settings.firstPeriodStart.month }
  }

  // フォームの入力値を一元処理するハンドラ関数
  const handleChange = (
    field: keyof FormState | { parent: "firstPeriodStart"; field: keyof FormState["firstPeriodStart"] },
    value: string | number | boolean
  ) => {
    try {
      // 特殊ケース: useDirectInputが変更された場合の処理
      if (field === "useDirectInput") {
        const newUseDirectInput = formStateSchema.shape.useDirectInput.parse(value)

        setFormState((prev) => {
          // 直接入力→期から計算への切り替え
          if (!newUseDirectInput) {
            return {
              ...prev,
              useDirectInput: newUseDirectInput,
              periodStartMonth: prev.firstPeriodStart.month,
              currentPeriod: 1,
            }
          }
          // 期から計算→直接入力への切り替え

          // 期の計算結果を直接入力の初期値として設定
          const calculatedFirstPeriod = generateFirstPeriodFromPeriodSettings()
          return {
            ...prev,
            useDirectInput: newUseDirectInput,
            firstPeriodStart: calculatedFirstPeriod,
          }
        })
        return
      }

      // オブジェクト型フィールドの処理
      if (typeof field === "object" && field.parent === "firstPeriodStart") {
        const fieldName = field.field as keyof YearMonth

        // zodの変換機能を使用して値を適切な型に変換
        try {
          const schema = fieldName === "year" ? yearMonthSchema.shape.year : yearMonthSchema.shape.month

          const parsedValue = schema.parse(value)

          if (parsedValue === undefined) return // 変換に失敗した場合

          setFormState((prev) => ({
            ...prev,
            firstPeriodStart: {
              ...prev.firstPeriodStart,
              [fieldName]: parsedValue,
            },
          }))
        } catch (error) {
          console.error(`変換エラー: ${error}`)
        }
        return
      }

      // 期から計算モード関連フィールドの処理
      if (field === "periodStartMonth" || field === "currentPeriod") {
        const fieldName = field as keyof FormState

        try {
          const schema = formStateSchema.shape[fieldName]
          const parsedValue = schema.parse(value)

          if (parsedValue === undefined) return // 変換に失敗した場合

          setFormState((prev) => {
            const newState = {
              ...prev,
              [fieldName]: parsedValue,
            }

            // 期から計算モードが有効な場合、firstPeriodStartも更新
            if (!prev.useDirectInput) {
              const calendarDate = createCalendarDate(currentYearMonth.year, currentYearMonth.month, 1)
              const periodStartMonth = field === "periodStartMonth" ? (parsedValue as number) : prev.periodStartMonth
              const currentPeriod = field === "currentPeriod" ? (parsedValue as number) : prev.currentPeriod

              const firstPeriodStart = calculateFirstPeriodStartYearMonth(periodStartMonth, currentPeriod, calendarDate)

              if (firstPeriodStart) {
                newState.firstPeriodStart = firstPeriodStart
              }
            }

            return newState
          })
        } catch (error) {
          console.error(`変換エラー: ${error}`)
        }
        return
      }

      // その他の一般的なフィールド処理
      const fieldName = field as keyof FormState

      try {
        const schema = formStateSchema.shape[fieldName]
        if (!schema) return // 不明なフィールドは無視

        const parsedValue = schema.parse(value)

        setFormState((prev) => ({
          ...prev,
          [fieldName]: parsedValue,
        }))
      } catch (error) {
        console.error(`変換エラー: ${error}`)
      }
    } catch (error) {
      console.error(`入力値の変換エラー: ${error}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // formState全体をバリデーション
      formStateSchema.parse(formState)

      // 設定を保存
      const newSettings: Settings = {
        firstPeriodStart: formState.firstPeriodStart,
        monthLayoutMode: formState.monthLayoutMode,
        periodSplitMode: formState.periodSplitMode,
      }
      onSave(newSettings)
    } catch (error) {
      if (error instanceof z.ZodError) {
        // エラーメッセージを適切に表示
        const errors = error.errors

        // firstPeriodStartに関するエラー処理
        const yearError = errors.find((e) => e.path.includes("firstPeriodStart") && e.path.includes("year"))
        const monthError = errors.find((e) => e.path.includes("firstPeriodStart") && e.path.includes("month"))

        if (yearError) {
          alert(`年の値が不正です: ${yearError.message}`)
          return
        }

        if (monthError) {
          alert(`月の値が不正です: ${monthError.message}`)
          return
        }

        // periodStartMonthとcurrentPeriodのエラー処理
        const periodStartMonthError = errors.find((e) => e.path.includes("periodStartMonth"))
        const currentPeriodError = errors.find((e) => e.path.includes("currentPeriod"))

        if (periodStartMonthError) {
          alert(`期の開始月の値が不正です: ${periodStartMonthError.message}`)
          return
        }

        if (currentPeriodError) {
          alert(`現在何期目かの値が不正です: ${currentPeriodError.message}`)
          return
        }

        // その他のエラーは一般的なメッセージで表示
        alert(`入力値が不正です: ${errors[0]?.message || "不明なエラー"}`)
      } else {
        alert("入力値が不正です。")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-calendar-text mb-4 text-lg font-semibold sm:text-xl">カレンダー設定</h2>
      <div className="mb-5">
        <h3 className="text-calendar-text mb-2 text-sm font-medium sm:mb-3 sm:text-base">1期目の開始年月</h3>

        <div className="mb-3 flex items-center gap-3">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="inputMode"
              checked={formState.useDirectInput}
              onChange={() => handleChange("useDirectInput", true)}
              className="h-4 w-4"
            />
            <span className="text-sm">直接入力</span>
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="inputMode"
              checked={!formState.useDirectInput}
              onChange={() => handleChange("useDirectInput", false)}
              className="h-4 w-4"
            />
            <span className="text-sm">期から計算</span>
          </label>
        </div>

        {formState.useDirectInput ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label htmlFor="firstPeriodYear" className="text-calendar-text mb-1 block text-xs font-medium">
                  年
                </label>
                <input
                  type="number"
                  id="firstPeriodYear"
                  value={formState.firstPeriodStart.year}
                  onChange={(e) => handleChange({ parent: "firstPeriodStart", field: "year" }, e.target.value)}
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
                  value={formState.firstPeriodStart.month}
                  onChange={(e) => handleChange({ parent: "firstPeriodStart", field: "month" }, e.target.value)}
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
                  value={formState.periodStartMonth}
                  onChange={(e) => handleChange("periodStartMonth", e.target.value)}
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
                  value={formState.currentPeriod}
                  onChange={(e) => handleChange("currentPeriod", e.target.value)}
                  min="1"
                  className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
              </div>
            </div>
            <p className="text-calendar-text mt-1 text-xs">
              例：現在3期目で4月始まりの場合、開始月に4、現在何期目に3を設定
            </p>
            {!formState.useDirectInput && (
              <div className="mt-2 text-sm">
                <span className="font-medium">計算結果：</span>
                {(() => {
                  const calendarDate = createCalendarDate(currentYearMonth.year, currentYearMonth.month, 1)
                  const result = calculateFirstPeriodStartYearMonth(
                    formState.periodStartMonth,
                    formState.currentPeriod,
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
                  checked={formState.periodSplitMode === "split"}
                  onChange={() => handleChange("periodSplitMode", "split")}
                  className="h-4 w-4"
                />
                <span className="text-sm">2つに分けて表示</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="periodSplitMode"
                  value="single"
                  checked={formState.periodSplitMode === "single"}
                  onChange={() => handleChange("periodSplitMode", "single")}
                  className="h-4 w-4"
                />
                <span className="text-sm">1つにまとめて表示</span>
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-calendar-text text-xs">
                {formState.periodSplitMode === "split" ? (
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
                  checked={formState.monthLayoutMode === "monthly"}
                  onChange={() => handleChange("monthLayoutMode", "monthly")}
                  className="h-4 w-4"
                />
                <span className="text-sm">月ごとに区切る</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="monthLayoutMode"
                  value="continuous"
                  checked={formState.monthLayoutMode === "continuous"}
                  onChange={() => handleChange("monthLayoutMode", "continuous")}
                  className="h-4 w-4"
                />
                <span className="text-sm">区切らず連続</span>
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-calendar-text text-xs">
                {formState.monthLayoutMode === "monthly" ? (
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
          type="submit"
          className="cursor-pointer rounded-md bg-blue-500 px-2 py-1 text-sm text-white transition-colors duration-200 hover:scale-105 hover:bg-blue-600 hover:shadow sm:px-3 sm:py-1.5"
        >
          保存
        </button>
      </div>
    </form>
  )
}
