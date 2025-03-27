import { type CalendarDate, getDateNum } from "../domain/CalendarDate"
import { groupDatesByWeek } from "../domain/Dates"
import { DateCell } from "./DateCell"

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
    <div className="sc-box calendar-container">
      {/* 曜日の行 */}
      <div className="flex w-full justify-center">
        <div className="w-14" />
        {["月", "火", "水", "木", "金", "土", "日"].map((dayName) => (
          <div
            key={`weekday-${dayName}`}
            className="flex aspect-square flex-1 items-center justify-center font-medium text-calendar-text text-sm"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* カレンダー本体 - 1行ずつflexboxで表示 */}
      {weeklyDates.map((week) => {
        const firstValidDate = week.find((date) => date !== null) || null
        const weekStart = generateWeekKey(firstValidDate)
        const firstDayOfMonth = week.find((d) => d?.day === 1)

        return (
          <div key={`week-${weekStart}`} className="flex">
            {/* 月表示のセル - 月表示がないときもスペーサーを表示する */}
            {firstDayOfMonth ? (
              <div className="flex w-14 items-center justify-center px-2 py-1 font-medium text-sm">
                {firstDayOfMonth.month}月
              </div>
            ) : (
              <div className="w-14" />
            )}

            {/* 日付セル */}
            {week.map((date, dateIndex) => {
              if (!date) {
                const dayOfWeek = dateIndex
                const spacerKey = generateSpacerKey(weekStart, dayOfWeek)
                return <div key={spacerKey} className="flex aspect-square size-9 flex-1 items-center justify-center" />
              }

              return (
                <div key={`date-${getDateNum(date)}`} className="flex flex-1 items-center justify-center">
                  <DateCell date={date} />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
