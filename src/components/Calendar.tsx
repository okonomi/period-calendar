import { clsx } from "clsx"
import { type CalendarDate, getDateNum, isPastMonth } from "../domain/CalendarDate"
import { groupDatesByWeekContinuous, groupDatesByWeekMonthly } from "../domain/Dates"
import type { MonthLayoutMode } from "../types/Settings"
import { DateCell } from "./DateCell"

function generateWeekKey(firstValidDate: CalendarDate | null | undefined) {
  if (!firstValidDate) return "empty-week"
  return `week-${firstValidDate.year}-${firstValidDate.month}-${firstValidDate.day}`
}

function generateSpacerKey(weekStart: string, dayOfWeek: number) {
  return `${weekStart}-spacer-${dayOfWeek}`
}

type Props = {
  dates: CalendarDate[]
  displayMode?: MonthLayoutMode
}

export const Calendar: React.FC<Props> = ({ dates, displayMode = "monthly" }) => {
  const weeklyDates = displayMode === "monthly" ? groupDatesByWeekMonthly(dates) : groupDatesByWeekContinuous(dates)

  return (
    <div className="sc-box bg-calendar-bg mx-auto p-4">
      {/* 曜日の行 */}
      <div className="flex">
        <div className="flex-[1.5]" />
        {["月", "火", "水", "木", "金", "土", "日"].map((dayName) => (
          <div key={`weekday-${dayName}`} className="@container aspect-square flex-1">
            <div className="grid size-full place-content-center">
              <span className="text-calendar-text text-[40cqw] leading-none font-medium">{dayName}</span>
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
            {displayMode === "monthly" || firstDayOfMonth ? (
              <div className="@container flex-[1.5]">
                <div className="grid size-full place-content-center">
                  {firstDayOfMonth && (
                    <span
                      className={clsx("text-calendar-text text-[30cqw] leading-none font-medium", {
                        "opacity-40": isPastMonth(firstDayOfMonth),
                      })}
                    >
                      {firstDayOfMonth.month}月
                    </span>
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
                  <DateCell date={date} displayMode={displayMode} />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
