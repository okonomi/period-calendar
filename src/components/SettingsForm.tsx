import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createCalendarDate, getToday } from "../domain/CalendarDate"
import { calculateFirstPeriodStartYearMonth, calculatePeriodFromDate } from "../domain/Period"
import type { Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (settings: Settings) => void
  onCancel: () => void
}

// YearMonth型のzodスキーマ（変換と検証を一体化）
const yearMonthSchema = z.object({
  year: z.coerce.number().int().min(1900).max(2100),
  month: z.coerce.number().int().min(1).max(12),
})

// フォーム状態のzodスキーマ（変換と検証を一体化）
const formStateSchema = z.object({
  inputMode: z.enum(["direct", "calculate"]),
  firstPeriodStart: yearMonthSchema,
  periodStartMonth: z.coerce.number().int().min(1).max(12),
  currentPeriod: z.coerce.number().int().min(1),
  monthLayoutMode: z.enum(["monthly", "continuous"]),
  periodSplitMode: z.enum(["split", "single"]),
})

// フォーム状態の型をzodスキーマから導出
type FormState = z.infer<typeof formStateSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  const today = getToday()
  // 期から計算セクションの表示/非表示状態
  const [showCalculator, setShowCalculator] = useState(false)

  // react-hook-formの設定
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(formStateSchema),
    defaultValues: {
      inputMode: "direct", // デフォルトは直接入力
      firstPeriodStart: settings.firstPeriodStart,
      periodStartMonth: settings.firstPeriodStart.month,
      currentPeriod: calculatePeriodFromDate(today, settings.firstPeriodStart),
      monthLayoutMode: settings.monthLayoutMode,
      periodSplitMode: settings.periodSplitMode,
    },
  })

  // フォーム全体の値を監視
  const formValues = watch()

  // 期から計算して直接入力フィールドに反映する
  const applyCalculatedValue = () => {
    const calendarDate = createCalendarDate(today.year, today.month, today.day)
    const result = calculateFirstPeriodStartYearMonth(watch("periodStartMonth"), watch("currentPeriod"), calendarDate)
    if (result) {
      setValue("firstPeriodStart.year", result.year)
      setValue("firstPeriodStart.month", result.month)
    }
  }

  // フォーム送信処理
  const onSubmitForm = (data: FormState) => {
    const newSettings: Settings = {
      firstPeriodStart: data.firstPeriodStart,
      monthLayoutMode: data.monthLayoutMode,
      periodSplitMode: data.periodSplitMode,
    }
    onSave(newSettings)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <h2 className="text-calendar-text mb-4 text-lg font-semibold sm:text-xl">カレンダー設定</h2>
      <div className="mb-5">
        <h3 className="text-calendar-text mb-2 text-sm font-medium sm:mb-3 sm:text-base">1期目の開始年月</h3>

        {/* 直接入力フォーム */}
        <div className="mb-4 rounded-md bg-gray-50 p-3">
          <h4 className="text-calendar-text mb-2 text-xs font-medium">直接入力</h4>
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <label htmlFor="firstPeriodYear" className="text-calendar-text mb-1 block text-xs font-medium">
                年
              </label>
              <input
                type="number"
                id="firstPeriodYear"
                {...register("firstPeriodStart.year")}
                min="1900"
                max="2100"
                className="text-calendar-text w-20 rounded-md border border-gray-300 px-2 py-1 text-sm sm:w-24"
              />
              {errors.firstPeriodStart?.year && (
                <p className="mt-1 text-xs text-red-500">{errors.firstPeriodStart.year.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="firstPeriodMonth" className="text-calendar-text mb-1 block text-xs font-medium">
                月
              </label>
              <input
                type="number"
                id="firstPeriodMonth"
                {...register("firstPeriodStart.month")}
                min="1"
                max="12"
                className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
              />
              {errors.firstPeriodStart?.month && (
                <p className="mt-1 text-xs text-red-500">{errors.firstPeriodStart.month.message}</p>
              )}
            </div>
          </div>
          <p className="text-calendar-text mt-1 text-xs">例：1期が1999年8月から始まる場合、1999と8を設定</p>
          <button
            type="button"
            onClick={() => setShowCalculator(!showCalculator)}
            className="mt-2 text-xs text-blue-600 underline hover:text-blue-800"
          >
            {showCalculator ? "期から計算を非表示にする" : "期から計算で設定する"}
          </button>
        </div>

        {/* 期から計算フォーム - showCalculatorがtrueの時だけ表示 */}
        {showCalculator && (
          <div className="mb-4 rounded-md bg-gray-50 p-3">
            <h4 className="text-calendar-text mb-2 text-xs font-medium">期から計算</h4>
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label htmlFor="periodStartMonth" className="text-calendar-text mb-1 block text-xs font-medium">
                  期の開始月
                </label>
                <input
                  type="number"
                  id="periodStartMonth"
                  {...register("periodStartMonth")}
                  min="1"
                  max="12"
                  className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
                {errors.periodStartMonth && (
                  <p className="mt-1 text-xs text-red-500">{errors.periodStartMonth.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="currentPeriod" className="text-calendar-text mb-1 block text-xs font-medium">
                  現在何期目
                </label>
                <input
                  type="number"
                  id="currentPeriod"
                  {...register("currentPeriod")}
                  min="1"
                  className="text-calendar-text w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
                />
                {errors.currentPeriod && <p className="mt-1 text-xs text-red-500">{errors.currentPeriod.message}</p>}
              </div>
            </div>
            <p className="text-calendar-text mt-1 text-xs">
              例：現在3期目で4月始まりの場合、開始月に4、現在何期目に3を設定
            </p>
            <button
              type="button"
              onClick={applyCalculatedValue}
              className="mt-2 rounded-md bg-blue-500 px-2 py-1 text-xs text-white transition-colors duration-200 hover:bg-blue-600"
            >
              計算結果を反映
            </button>
          </div>
        )}
      </div>

      <div className="mb-5">
        <h3 className="text-calendar-text mb-2 text-sm font-medium sm:mb-3 sm:text-base">カレンダー表示設定</h3>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="rounded-md bg-gray-50 p-2 sm:p-3">
            <div className="text-calendar-text mb-2 block text-xs font-medium sm:text-sm">前期・後期の表示方法</div>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <label className="flex items-center gap-1">
                <input type="radio" value="split" {...register("periodSplitMode")} className="h-4 w-4" />
                <span className="text-sm">2つに分けて表示</span>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="single" {...register("periodSplitMode")} className="h-4 w-4" />
                <span className="text-sm">1つにまとめて表示</span>
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-calendar-text text-xs">
                {watch("periodSplitMode") === "split" ? (
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
                <input type="radio" value="monthly" {...register("monthLayoutMode")} className="h-4 w-4" />
                <span className="text-sm">月ごとに区切る</span>
              </label>
              <label className="flex items-center gap-1">
                <input type="radio" value="continuous" {...register("monthLayoutMode")} className="h-4 w-4" />
                <span className="text-sm">区切らず連続</span>
              </label>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-calendar-text text-xs">
                {watch("monthLayoutMode") === "monthly" ? (
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

      <div className="mt-4 rounded-md bg-gray-100 p-3">
        <h3 className="text-calendar-text mb-2 text-sm font-medium">デバッグ情報</h3>
        <pre className="text-xs text-gray-700">{JSON.stringify(formValues, null, 2)}</pre>
      </div>
    </form>
  )
}
