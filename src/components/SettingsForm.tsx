import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { createCalendarDate, getToday } from "../domain/CalendarDate"
import { calculateFirstPeriodStartYearMonth, calculatePeriodFromDate } from "../domain/Period"
import type { Settings } from "../types/Settings"
import { PeriodCalculatorPopup } from "./PeriodCalculatorPopup"
import { CalculatorIcon } from "./icon/CalculatorIcon"

/**
 * 要素の外側をクリックした時のイベントを処理するカスタムフック
 * @param isOpen ポップアップが開いているかどうか
 * @param onClose ポップアップを閉じる関数
 * @param refs クリックの対象外にする要素の参照配列
 */
const useClickOutside = (isOpen: boolean, onClose: () => void, refs: Array<React.RefObject<HTMLElement | null>>) => {
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      // いずれかの要素に含まれているかチェック
      const isClickInside = refs.some((ref) => ref.current?.contains(event.target as Node))

      // 内側のクリックでなければ閉じる
      if (!isClickInside) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose, refs])
}

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (settings: Settings) => void
  onCancel: () => void
}

// フォーム状態のzodスキーマ（変換と検証を一体化）
const FormStateSchema = z.object({
  inputMode: z.enum(["direct", "calculate"]),
  firstPeriodStart: z.object({
    year: z.coerce.number().int().min(1900).max(2100),
    month: z.coerce.number().int().min(1).max(12),
  }),
  periodStartMonth: z.coerce.number().int().min(1).max(12),
  currentPeriod: z.coerce.number().int().min(1),
  monthLayoutMode: z.enum(["monthly", "continuous"]),
  periodSplitMode: z.enum(["split", "single"]),
})

// フォーム状態の型をzodスキーマから導出
export type FormState = z.infer<typeof FormStateSchema>

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  const today = getToday()
  // 期から計算セクションの表示/非表示状態
  const [showCalculator, setShowCalculator] = useState(false)
  // ポップアップの参照
  const popupRef = useRef<HTMLDivElement>(null)
  // ボタンの参照（ポップアップの位置決めに使用）
  const buttonRef = useRef<HTMLButtonElement>(null)

  // カスタムフックを使用してポップアップ外のクリック検知
  useClickOutside(showCalculator, () => setShowCalculator(false), [popupRef, buttonRef])

  // react-hook-formの設定
  const methods = useForm<FormState>({
    resolver: zodResolver(FormStateSchema),
    defaultValues: {
      inputMode: "direct", // デフォルトは直接入力
      firstPeriodStart: settings.firstPeriodStart,
      periodStartMonth: settings.firstPeriodStart.month,
      currentPeriod: calculatePeriodFromDate(today, settings.firstPeriodStart),
      monthLayoutMode: settings.monthLayoutMode,
      periodSplitMode: settings.periodSplitMode,
    },
  })

  const { handleSubmit, watch, setValue } = methods

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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <h2 className="text-calendar-text mb-4 text-lg font-semibold sm:text-xl">カレンダー設定</h2>

        {/* 1期目の開始年月設定セクション */}
        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <h3 className="text-calendar-text mb-3 border-b pb-2 text-sm font-semibold sm:text-base">1期目の開始年月</h3>

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
                  {...methods.register("firstPeriodStart.year", {
                    min: 1900,
                    max: 2100,
                  })}
                  className="text-calendar-text w-24 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {methods.formState.errors.firstPeriodStart?.year && (
                  <p className="mt-1 text-xs text-red-500">{methods.formState.errors.firstPeriodStart.year.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="firstPeriodMonth" className="text-calendar-text mb-1.5 block text-xs font-medium">
                  月
                </label>
                <input
                  type="number"
                  id="firstPeriodMonth"
                  {...methods.register("firstPeriodStart.month", {
                    min: 1,
                    max: 12,
                  })}
                  className="text-calendar-text w-20 rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {methods.formState.errors.firstPeriodStart?.month && (
                  <p className="mt-1 text-xs text-red-500">{methods.formState.errors.firstPeriodStart.month.message}</p>
                )}
              </div>

              {/* 期から計算ボタン（コンパクト版） */}
              <div className="relative ml-2" ref={popupRef}>
                <button
                  type="button"
                  ref={buttonRef}
                  onClick={() => setShowCalculator(!showCalculator)}
                  className={clsx(
                    "flex h-9 cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm transition-all",
                    {
                      "bg-blue-100 text-blue-700 hover:bg-blue-200": showCalculator,
                      "bg-gray-100 text-gray-700 hover:bg-gray-200": !showCalculator,
                    }
                  )}
                  title="期から計算ツール"
                >
                  <CalculatorIcon width={16} height={16} />
                  <span className="hidden sm:inline">期計算</span>
                </button>

                {showCalculator && <PeriodCalculatorPopup onApply={applyCalculatedValue} />}
              </div>
            </div>
            <p className="text-calendar-text mt-2 rounded bg-gray-50 p-2 text-xs italic">
              例：1期が1999年8月から始まる場合、1999と8を設定
            </p>
          </div>
        </div>

        {/* カレンダー表示設定セクション */}
        <div className="mb-6 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
          <h3 className="text-calendar-text mb-3 border-b pb-2 text-sm font-semibold sm:text-base">
            カレンダー表示設定
          </h3>
          <div className="flex flex-col gap-5">
            {/* 前期・後期の表示方法 */}
            <div>
              <h4 className="text-calendar-text mb-3 text-xs font-medium sm:text-sm">前期・後期の表示方法</h4>
              <div className="flex flex-col gap-3 pl-2">
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value="split"
                    {...methods.register("periodSplitMode")}
                    className="size-4 accent-blue-600"
                  />
                  <div>
                    <span className="text-sm">2つに分けて表示</span>
                    <p className="mt-0.5 text-xs text-gray-500">
                      前期と後期を<span className="font-medium">別々のカレンダー</span>で表示
                    </p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value="single"
                    {...methods.register("periodSplitMode")}
                    className="size-4 accent-blue-600"
                  />
                  <div>
                    <span className="text-sm">1つにまとめて表示</span>
                    <p className="mt-0.5 text-xs text-gray-500">
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
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value="monthly"
                    {...methods.register("monthLayoutMode")}
                    className="size-4 accent-blue-600"
                  />
                  <div>
                    <span className="text-sm">月ごとに区切る</span>
                    <p className="mt-0.5 text-xs text-gray-500">
                      月が変わる時に<span className="font-medium">改行して区切り</span>
                    </p>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value="continuous"
                    {...methods.register("monthLayoutMode")}
                    className="size-4 accent-blue-600"
                  />
                  <div>
                    <span className="text-sm">区切らず連続</span>
                    <p className="mt-0.5 text-xs text-gray-500">
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
      </form>
    </FormProvider>
  )
}
