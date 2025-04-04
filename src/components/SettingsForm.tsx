import { useState } from "react"
import { z } from "zod"
import { createCalendarDate } from "../domain/CalendarDate"
import { calculateFirstPeriodStartYearMonth } from "../domain/Period"
import type { Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (settings: Settings) => void
  onCancel: () => void
}

// YearMonth型のzodスキーマ
const yearMonthSchema = z.object({
  year: z.number().int().min(1900).max(2100),
  month: z.number().int().min(1).max(12),
})

// フォーム状態のzodスキーマ定義
const formStateSchema = z.object({
  useDirectInput: z.boolean(),
  firstPeriodStart: yearMonthSchema,
  periodStartMonth: z.number().int().min(1).max(12),
  currentPeriod: z.number().int().min(1),
  monthLayoutMode: z.enum(["monthly", "continuous"]),
  periodSplitMode: z.enum(["split", "single"]),
})

// 入力値変換用のスキーマ定義
const inputParsers = {
  useDirectInput: z.boolean(),
  firstPeriodStart: {
    year: z.coerce.number().int().catch(Number.NaN),
    month: z.coerce.number().int().catch(Number.NaN),
  },
  periodStartMonth: z.coerce.number().int().catch(Number.NaN),
  currentPeriod: z.coerce.number().int().catch(Number.NaN),
  monthLayoutMode: z.enum(["monthly", "continuous"]),
  periodSplitMode: z.enum(["split", "single"]),
}

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
        const newUseDirectInput = inputParsers.useDirectInput.parse(value)

        setFormState((prev) => {
          // 直接入力→期から計算への切り替え
          if (!newUseDirectInput) {
            // 現在の設定から適切なperiodStartMonthとcurrentPeriodを推定
            // (この例では単純に既存の月を使用し、期は1を設定)
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
        const fieldName = field.field as keyof typeof inputParsers.firstPeriodStart
        const parser = inputParsers.firstPeriodStart[fieldName]

        if (!parser) return // 不明なフィールドは無視

        // zodの変換機能を使用して値を適切な型に変換
        const parsedValue = parser.parse(value)

        // NaNだった場合はスキップ
        if (typeof parsedValue === "number" && Number.isNaN(parsedValue)) return

        setFormState((prev) => ({
          ...prev,
          firstPeriodStart: {
            ...prev.firstPeriodStart,
            [field.field]: parsedValue,
          },
        }))
        return
      }

      // 期から計算モード関連フィールドの処理
      if (field === "periodStartMonth" || field === "currentPeriod") {
        const fieldName = field as keyof FormState
        const parser = inputParsers[fieldName]

        if (!parser) return
        const parsedValue = parser.parse(value)

        if (typeof parsedValue === "number" && Number.isNaN(parsedValue)) return

        setFormState((prev) => {
          const newState = {
            ...prev,
            [fieldName]: parsedValue,
          }

          // 期から計算モードが有効な場合、firstPeriodStartも更新
          if (!prev.useDirectInput) {
            const calendarDate = createCalendarDate(currentYearMonth.year, currentYearMonth.month, 1)
            // periodStartMonthかcurrentPeriodどちらかが更新された場合
            const periodStartMonth = field === "periodStartMonth" ? (parsedValue as number) : prev.periodStartMonth
            const currentPeriod = field === "currentPeriod" ? (parsedValue as number) : prev.currentPeriod

            const firstPeriodStart = calculateFirstPeriodStartYearMonth(periodStartMonth, currentPeriod, calendarDate)

            if (firstPeriodStart) {
              newState.firstPeriodStart = firstPeriodStart
            }
          }

          return newState
        })
        return
      }

      // その他の一般的なフィールド処理
      const fieldName = field as keyof FormState
      const parser = inputParsers[fieldName]

      if (!parser) return // 不明なフィールドは無視

      // zodの変換機能を使用して値を適切な型に変換
      const parsedValue = parser.parse(value)

      setFormState((prev) => ({
        ...prev,
        [fieldName]: parsedValue,
      }))
    } catch (error) {
      // 変換エラーが発生した場合は何もしない（UIのバリデーションはonSubmitで行う）
      console.error(`入力値の変換エラー: ${error}`)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // zodスキーマを使用してバリデーション（直接入力モードの場合）
    if (formState.useDirectInput) {
      try {
        // firstPeriodStartのバリデーション
        yearMonthSchema.parse(formState.firstPeriodStart)
      } catch (error) {
        if (error instanceof z.ZodError) {
          // エラーメッセージを表示
          const yearError = error.errors.find((e) => e.path.includes("year"))
          const monthError = error.errors.find((e) => e.path.includes("month"))

          if (yearError) {
            alert(`年の値が不正です: ${yearError.message}`)
            return
          }

          if (monthError) {
            alert(`月の値が不正です: ${monthError.message}`)
            return
          }
        }

        alert("入力値が不正です。")
        return
      }
    } else {
      // 期から計算する場合の処理
      try {
        // periodStartMonthとcurrentPeriodのバリデーション
        z.object({
          periodStartMonth: z.number().int().min(1).max(12),
          currentPeriod: z.number().int().min(1),
        }).parse({
          periodStartMonth: formState.periodStartMonth,
          currentPeriod: formState.currentPeriod,
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          const periodStartMonthError = error.errors.find((e) => e.path.includes("periodStartMonth"))
          const currentPeriodError = error.errors.find((e) => e.path.includes("currentPeriod"))

          if (periodStartMonthError) {
            alert(`期の開始月の値が不正です: ${periodStartMonthError.message}`)
            return
          }

          if (currentPeriodError) {
            alert(`現在何期目かの値が不正です: ${currentPeriodError.message}`)
            return
          }
        }

        alert("入力値が不正です。")
        return
      }

      const calendarDate = createCalendarDate(currentYearMonth.year, currentYearMonth.month, 1)
      const firstPeriodStart = calculateFirstPeriodStartYearMonth(
        formState.periodStartMonth,
        formState.currentPeriod,
        calendarDate
      )

      if (!firstPeriodStart) {
        alert("期の開始月または現在何期目かの値が不正です。")
        return
      }

      // 計算結果の値チェック
      try {
        yearMonthSchema.parse(firstPeriodStart)
      } catch (error) {
        alert("計算された年月の値が範囲外です。1900〜2100の間になるよう設定してください。")
        return
      }
    }

    // 最終的な設定値をフォームの現在の状態から取得
    const newSettings = {
      firstPeriodStart: formState.firstPeriodStart, // 既に常に最新の状態が維持されている
      monthLayoutMode: formState.monthLayoutMode,
      periodSplitMode: formState.periodSplitMode,
    }
    onSave(newSettings)
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
