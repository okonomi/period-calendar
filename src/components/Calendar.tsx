import { clsx } from "clsx"
import { type CalendarDate, getDateNum } from "../domain/CalendarDate"
import { groupDatesByWeek } from "../domain/Dates"
import { DateCell } from "./DateCell"

function generateMonthKey(firstDayOfMonth: CalendarDate | null | undefined, weekIndex: number) {
  return firstDayOfMonth ? `month-${firstDayOfMonth.year}-${firstDayOfMonth.month}` : `empty-month-${weekIndex}`
}

function generateWeekKey(firstValidDate: CalendarDate | null | undefined) {
  return firstValidDate
    ? `${firstValidDate.year}-${firstValidDate.month}-${firstValidDate.day}`
    : `empty-${Math.random()}`
}

function generateSpacerKey(weekStart: string, dayOfWeek: number) {
  return `spacer-${weekStart}-day${dayOfWeek}`
}

type Props = {
  dates: CalendarDate[]
}

export const Calendar: React.FC<Props> = ({ dates }) => {
  const weeklyDates = groupDatesByWeek(dates)

  return (
    <div className="calendar-container">
      <div className="flex flex-row">
        {/* 左カラム - 月名表示 */}
        <div className="w-14 flex flex-col">
          {/* スペーサーセル */}
          <div className="h-9" />
          {weeklyDates.map((week, weekIndex) => {
            const firstDayOfMonth = week.find((d) => d?.day === 1)
            if (!firstDayOfMonth) {
              return <div key={generateMonthKey(firstDayOfMonth, weekIndex)} className="h-9" />
            }

            const month = firstDayOfMonth.month
            const monthKey = generateMonthKey(firstDayOfMonth, weekIndex)

            return (
              <div key={monthKey} className="calendar-month">
                {month}月
              </div>
            )
          })}
        </div>

        {/* 右カラム - カレンダー本体 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 曜日の行 */}
          <div className="grid grid-cols-7">
            {["月", "火", "水", "木", "金", "土", "日"].map((dayName) => (
              <div key={`weekday-${dayName}`} className="calendar-weekday">
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
                    return <div key={spacerKey} className="h-9" />
                  }

                  return <DateCell key={`date-${getDateNum(date)}`} date={date} />
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
