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
      <div className="calendar-header flex">
        <div className="month-label-cell" />
        {["月", "火", "水", "木", "金", "土", "日"].map((dayName) => (
          <div key={`weekday-${dayName}`} className="calendar-weekday sc-cell flex-1">
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
          <div key={`week-${weekStart}`} className="calendar-week flex">
            {/* 月表示のセル */}
            <div className="month-label-cell">
              {firstDayOfMonth && <span className="month-indicator">{firstDayOfMonth.month}月</span>}
            </div>

            {/* 日付セル */}
            {week.map((date, dateIndex) => {
              if (!date) {
                const dayOfWeek = dateIndex
                const spacerKey = generateSpacerKey(weekStart, dayOfWeek)
                return <div key={spacerKey} className="calendar-spacer flex-1" />
              }

              return <DateCell key={`date-${getDateNum(date)}`} date={date} />
            })}
          </div>
        )
      })}
    </div>
  )
}
