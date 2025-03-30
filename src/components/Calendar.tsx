import { type CalendarDate, getDateNum } from "../domain/CalendarDate"
import { groupDatesByMonth, groupDatesByContinuous } from "../domain/Dates"
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
  displayMode?: 'monthly' | 'continuous'
}

export const Calendar: React.FC<Props> = ({ dates, displayMode = 'continuous' }) => {
  const weeklyDates = displayMode === 'monthly'
    ? groupDatesByMonth(dates)
    : groupDatesByContinuous(dates)

  return (
    <div className="sc-box calendar-container">
      {/* 曜日の行 */}
      <div className="flex">
        <div className="flex-[1.5]" />
        {["月", "火", "水", "木", "金", "土", "日"].map((dayName) => (
          <div key={`weekday-${dayName}`} className="@container aspect-square flex-1">
            <div className="grid size-full place-content-center">
              <span className="text-[40cqw] leading-none font-medium">{dayName}</span>
            </div>
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
            {/* 月表示のセル - 月表示モードまたは月初めの場合に表示 */}
            {(displayMode === 'monthly' || firstDayOfMonth) ? (
              <div className="@container flex-[1.5]">
                <div className="grid size-full place-content-center">
                  {firstDayOfMonth && (
                    <span className="text-[30cqw] leading-none font-medium">{firstDayOfMonth.month}月</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-[1.5]" />
            )}

            {/* 日付セル */}
            {week.map((date, dateIndex) => {
              if (!date) {
                const dayOfWeek = dateIndex
                const spacerKey = generateSpacerKey(weekStart, dayOfWeek)
                return <div key={spacerKey} className="flex aspect-square flex-1" />
              }

              return (
                <div key={`date-${getDateNum(date)}`} className="@container aspect-square flex-1">
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
