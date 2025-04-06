import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createCalendarDate, getToday } from "../domain/CalendarDate"
import { calculateFirstPeriodStartYearMonth, calculatePeriodFromDate } from "../domain/Period"
import type { Settings } from "../types/Settings"
import { CalculatorIcon } from "./icon/CalculatorIcon"

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
  // ポップアップの参照
  const popupRef = useRef<HTMLDivElement>(null)
  // ボタンの参照（ポップアップの位置決めに使用）
  const buttonRef = useRef<HTMLButtonElement>(null)

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
      setShowCalculator(false) // 計算適用後にポップアップを閉じる
    }
  }

  // ポップアップ外のクリックを検知して閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowCalculator(false)
      }
    }

    if (showCalculator) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showCalculator])

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

      {/* 1期目の開始年月設定セクション */}
      <div className="mb-6 border border-gray-100 rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-calendar-text mb-3 text-sm font-semibold sm:text-base border-b pb-2">1期目の開始年月</h3>

        {/* 直接入力フォームと計算ボタン */}
        <div className="mb-4">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label htmlFor="firstPeriodYear" className="text-calendar-text mb-1.5 block text-xs font-medium">
                年
              </label>
              <input
                type="number"
                id="firstPeriodYear"
                {...register("firstPeriodStart.year")}
                min="1900"
                max="2100"
                className="text-calendar-text w-24 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.firstPeriodStart?.year && (
                <p className="mt-1 text-xs text-red-500">{errors.firstPeriodStart.year.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="firstPeriodMonth" className="text-calendar-text mb-1.5 block text-xs font-medium">
                月
              </label>
              <input
                type="number"
                id="firstPeriodMonth"
                {...register("firstPeriodStart.month")}
                min="1"
                max="12"
                className="text-calendar-text w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              {errors.firstPeriodStart?.month && (
                <p className="mt-1 text-xs text-red-500">{errors.firstPeriodStart.month.message}</p>
              )}
            </div>

            {/* 期から計算ボタン（コンパクト版） */}
            <div className="relative ml-2">
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setShowCalculator(!showCalculator)}
                className={`flex h-9 items-center gap-1 px-2 py-1 text-sm rounded-md transition-all cursor-pointer ${
                  showCalculator
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="期から計算ツール"
              >
                <CalculatorIcon width={16} height={16} />
                <span className="hidden sm:inline">期計算</span>
              </button>

              {/* ポップアップ式の期計算フォーム - showCalculatorがtrueの時だけ表示 */}
              {showCalculator && (
                <div
                  ref={popupRef}
                  className="absolute right-0 top-full mt-1 z-10 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
                  style={{
                    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))",
                  }}
                >
                  {/* 上部の三角形（吹き出し用） */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45" />

                  <h4 className="text-blue-700 font-medium text-sm mb-3">期から計算ツール</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="periodStartMonth"
                          className="text-calendar-text mb-1.5 block text-xs font-medium"
                        >
                          期の開始月
                        </label>
                        <input
                          type="number"
                          id="periodStartMonth"
                          {...register("periodStartMonth")}
                          min="1"
                          max="12"
                          className="text-calendar-text w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.periodStartMonth && (
                          <p className="mt-1 text-xs text-red-500">{errors.periodStartMonth.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="currentPeriod" className="text-calendar-text mb-1.5 block text-xs font-medium">
                          現在何期目
                        </label>
                        <input
                          type="number"
                          id="currentPeriod"
                          {...register("currentPeriod")}
                          min="1"
                          className="text-calendar-text w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        {errors.currentPeriod && (
                          <p className="mt-1 text-xs text-red-500">{errors.currentPeriod.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-calendar-text text-xs bg-blue-50 p-2 rounded-md italic">
                        例：現在3期目で4月始まりの場合、開始月に4、現在何期目に3を設定
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={applyCalculatedValue}
                        className="bg-blue-600 px-3 py-1.5 text-sm text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        計算結果を反映
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <p className="text-calendar-text mt-2 text-xs bg-gray-50 p-2 rounded italic">
            例：1期が1999年8月から始まる場合、1999と8を設定
          </p>
        </div>
      </div>

      {/* カレンダー表示設定セクション */}
      <div className="mb-6 border border-gray-100 rounded-lg p-4 shadow-sm bg-white">
        <h3 className="text-calendar-text mb-3 text-sm font-semibold sm:text-base border-b pb-2">カレンダー表示設定</h3>
        <div className="flex flex-col gap-5">
          {/* 前期・後期の表示方法 */}
          <div>
            <h4 className="text-calendar-text mb-3 text-xs font-medium sm:text-sm">前期・後期の表示方法</h4>
            <div className="flex flex-col gap-3 pl-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="split"
                  {...register("periodSplitMode")}
                  className="h-4 w-4 accent-blue-600"
                />
                <div>
                  <span className="text-sm">2つに分けて表示</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    前期と後期を<span className="font-medium">別々のカレンダー</span>で表示
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="single"
                  {...register("periodSplitMode")}
                  className="h-4 w-4 accent-blue-600"
                />
                <div>
                  <span className="text-sm">1つにまとめて表示</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    前期と後期を<span className="font-medium">1つのカレンダー</span>として表示
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* 月のレイアウト */}
          <div>
            <h4 className="text-calendar-text mb-3 text-xs font-medium sm:text-sm">月のレイアウト</h4>
            <div className="flex flex-col gap-3 pl-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="monthly"
                  {...register("monthLayoutMode")}
                  className="h-4 w-4 accent-blue-600"
                />
                <div>
                  <span className="text-sm">月ごとに区切る</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    月が変わる時に<span className="font-medium">改行して区切り</span>
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="continuous"
                  {...register("monthLayoutMode")}
                  className="h-4 w-4 accent-blue-600"
                />
                <div>
                  <span className="text-sm">区切らず連続</span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    月が変わっても<span className="font-medium">改行せず連続</span>して表示
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ボタン群 */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="text-calendar-text cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          保存
        </button>
      </div>

      {/* デバッグ情報（開発時のみ表示） */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-6 rounded-md bg-gray-100 p-3">
          <h3 className="text-calendar-text mb-2 text-sm font-medium">デバッグ情報</h3>
          <pre className="text-xs text-gray-700 overflow-auto max-h-40">{JSON.stringify(formValues, null, 2)}</pre>
        </div>
      )}
    </form>
  )
}
