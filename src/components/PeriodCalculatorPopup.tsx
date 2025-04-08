import { useFormContext } from "react-hook-form"
import type { FormState } from "./SettingsForm"

type PeriodCalculatorPopupProps = {
  onApply: () => void
}

export const PeriodCalculatorPopup = ({ onApply }: PeriodCalculatorPopupProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormState>()

  return (
    <div className="absolute top-full right-0 z-10 mt-1 w-72 rounded-lg border border-gray-200 bg-white p-4 shadow-lg drop-shadow-sm sm:w-80">
      <div className="absolute -top-2 right-6 size-4 rotate-45 transform border-t border-l border-gray-200 bg-white" />

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="periodStartMonth" className="text-calendar-text mb-1.5 block text-xs font-medium">
              期の開始月
            </label>
            <input
              type="number"
              id="periodStartMonth"
              {...register("periodStartMonth", {
                min: 1,
                max: 12,
              })}
              className="text-calendar-text w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.periodStartMonth && <p className="mt-1 text-xs text-red-500">{errors.periodStartMonth.message}</p>}
          </div>
          <div>
            <label htmlFor="currentPeriod" className="text-calendar-text mb-1.5 block text-xs font-medium">
              現在何期目
            </label>
            <input
              type="number"
              id="currentPeriod"
              {...register("currentPeriod", {
                min: 1,
              })}
              className="text-calendar-text w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            {errors.currentPeriod && <p className="mt-1 text-xs text-red-500">{errors.currentPeriod.message}</p>}
          </div>
        </div>

        <div>
          <p className="text-calendar-text rounded-md bg-blue-50 p-2 text-xs italic">
            例：現在3期目で4月始まりの場合、開始月に4、現在何期目に3を設定
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onApply}
            className="flex cursor-pointer items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            計算結果を反映
          </button>
        </div>
      </div>
    </div>
  )
}
