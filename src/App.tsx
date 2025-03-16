import { clsx } from "clsx"
import { useState } from "react"
import { DateCell } from "./components/DateCell"
import { YearSelector } from "./components/YearSelector"
import { generateDates, groupDatesByWeek } from "./utils/dateUtils"

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const allDates = generateDates(selectedYear)
  const weeklyDates = groupDatesByWeek(allDates)

  const handlePrevYear = () => setSelectedYear(selectedYear - 1)
  const handleNextYear = () => setSelectedYear(selectedYear + 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 py-6">
        <div className="max-w-2xl mx-auto">
          <YearSelector year={selectedYear} onPrevYear={handlePrevYear} onNextYear={handleNextYear} />

          <div className="bg-white rounded-lg shadow mt-4 p-3 w-[296px] mx-auto">
            <div className="flex flex-row">
              {/* 左カラム - 月名表示 */}
              <div className="w-12 flex flex-col">
                {/* スペーサーセル */}
                <div className="h-8" />
                {weeklyDates.map((week, weekIndex) => {
                  const firstDayOfMonth = week.find((d) => d?.getDate() === 1)
                  const month = firstDayOfMonth?.getMonth()
                  const monthKey = firstDayOfMonth
                    ? `month-${firstDayOfMonth.getFullYear()}-${firstDayOfMonth.getMonth()}`
                    : `empty-month-${weekIndex}`

                  return (
                    <div key={monthKey} className="h-8 flex items-center justify-center">
                      {month !== undefined && <span className="text-sm font-medium text-gray-700">{month + 1}月</span>}
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
                  // Create a stable identifier for the week based on its first valid date
                  const firstValidDate = week.find((date) => date !== null)
                  const weekStart = firstValidDate
                    ? `${firstValidDate.getFullYear()}-${firstValidDate.getMonth()}-${firstValidDate.getDate()}`
                    : `empty-${selectedYear}-${week[0]?.toString() || "null"}`

                  return (
                    <div key={`week-${weekStart}`} className="grid grid-cols-7">
                      {week.map((date, dateIndex) => {
                        if (!date) {
                          // Create a stable position-based key that doesn't rely on the index itself
                          // Use absolute day position in the calendar grid for spacers (day of week)
                          const dayOfWeek = dateIndex
                          const spacerKey = `spacer-${weekStart}-day${dayOfWeek}`
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
        </div>
      </div>
    </div>
  )
}
