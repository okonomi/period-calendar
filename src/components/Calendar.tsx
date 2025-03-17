import { clsx } from "clsx"
import { groupDatesByWeek } from "../utils/dateUtils"
import { DateCell } from "./DateCell"

function generateMonthKey(firstDayOfMonth: Date | null | undefined, weekIndex: number) {
  return firstDayOfMonth
    ? `month-${firstDayOfMonth.getFullYear()}-${firstDayOfMonth.getMonth()}`
    : `empty-month-${weekIndex}`
}

function generateWeekKey(firstValidDate: Date | null | undefined) {
  return firstValidDate
    ? `${firstValidDate.getFullYear()}-${firstValidDate.getMonth()}-${firstValidDate.getDate()}`
    : `empty-${Math.random()}`
}

function generateSpacerKey(weekStart: string, dayOfWeek: number) {
  return `spacer-${weekStart}-day${dayOfWeek}`
}

type Props = {
  dates: Date[]
}

export const Calendar: React.FC<Props> = ({ dates }) => {
  const weeklyDates = groupDatesByWeek(dates)

  return (
    <div className="bg-white rounded-lg shadow mt-4 p-3 w-[296px] mx-auto">
      <div className="flex flex-row">
        {/* 左カラム - 月名表示 */}
        <div className="w-12 flex flex-col">
          {/* スペーサーセル */}
          <div className="h-8" />
          {weeklyDates.map((week, weekIndex) => {
            const firstDayOfMonth = week.find((d) => d?.getDate() === 1)
            if (!firstDayOfMonth) {
              return <div key={generateMonthKey(firstDayOfMonth, weekIndex)} className="h-8" />
            }

            const month = firstDayOfMonth.getMonth()
            const monthKey = generateMonthKey(firstDayOfMonth, weekIndex)

            return (
              <div key={monthKey} className="h-8 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">{month + 1}月</span>
              </div>
            )
          })}
        </div>

        {/* 右カラム - カレンダー本体 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 曜日の行 */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {["月", "火", "水", "木", "金", "土", "日"].map((dayName) => (
              <div
                key={`weekday-${dayName}`}
                className={clsx("h-8", "flex items-center justify-center", "font-medium text-xs text-gray-700")}
              >
                {dayName}
              </div>
            ))}
          </div>

          {weeklyDates.map((week) => {
            const firstValidDate = week.find((date) => date !== null) || null
            const weekStart = generateWeekKey(firstValidDate)

            return (
              <div key={`week-${weekStart}`} className="grid grid-cols-7">
                {week.map((date, dateIndex) => {
                  if (!date) {
                    const dayOfWeek = dateIndex
                    const spacerKey = generateSpacerKey(weekStart, dayOfWeek)
                    return <div key={spacerKey} className="h-8" />
                  }

                  return <DateCell key={`date-${date.getTime()}`} date={date} />
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
