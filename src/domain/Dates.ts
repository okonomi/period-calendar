import { type CalendarDate, createCalendarDateFromDate } from "./CalendarDate"
import type { YearMonth } from "./YearMonth"

export type Dates = Date[]

const DAYS_IN_WEEK = 7

// 互換性のためにラッパー関数を保持
export function groupDatesByWeek(dates: CalendarDate[], displayMode: 'monthly' | 'continuous' = 'continuous'): (CalendarDate | null)[][] {
  if (dates.length === 0) return []

  return displayMode === 'monthly' 
    ? groupDatesByMonth(dates)
    : groupDatesByContinuous(dates)
}

// 連続表示モード用の週グループ化関数
export function groupDatesByContinuous(dates: CalendarDate[]): (CalendarDate | null)[][] {
  if (dates.length === 0) return []

  // 最初の週に必要なパディングを計算（月曜始まり）
  const firstDate = dates[0]
  const firstDayOfWeek = firstDate.weekday
  // 日曜日は0なので6に、それ以外は-1して前の週の月曜からの日数を計算
  const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // 最後の週に必要なパディングを計算（月曜始まり）
  const lastDate = dates[dates.length - 1]
  const lastDayOfWeek = lastDate.weekday
  // 日曜日は0なので6に、それ以外は7から引いて次の週の日曜までの日数を計算
  const endPadding = DAYS_IN_WEEK - (lastDayOfWeek === 0 ? 7 : lastDayOfWeek)

  // 前後にパディングを追加
  const paddedDates: (CalendarDate | null)[] = [
    ...Array(startPadding).fill(null),
    ...dates,
    ...Array(endPadding).fill(null),
  ]

  // 7日ずつグループ化
  const weeks: (CalendarDate | null)[][] = []
  for (let i = 0; i < paddedDates.length; i += DAYS_IN_WEEK) {
    weeks.push(paddedDates.slice(i, i + DAYS_IN_WEEK))
  }
  
  return weeks
}

// 月区切り表示モード用の週グループ化関数
export function groupDatesByMonth(dates: CalendarDate[]): (CalendarDate | null)[][] {
  if (dates.length === 0) return []

  // 最初の週に必要なパディングを計算（月曜始まり）
  const firstDate = dates[0]
  const firstDayOfWeek = firstDate.weekday
  // 日曜日は0なので6に、それ以外は-1して前の週の月曜からの日数を計算
  const startPadding = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

  // 最後の週に必要なパディングを計算（月曜始まり）
  const lastDate = dates[dates.length - 1]
  const lastDayOfWeek = lastDate.weekday
  // 日曜日は0なので6に、それ以外は7から引いて次の週の日曜までの日数を計算
  const endPadding = DAYS_IN_WEEK - (lastDayOfWeek === 0 ? 7 : lastDayOfWeek)

  // 前後にパディングを追加
  const paddedDates: (CalendarDate | null)[] = [
    ...Array(startPadding).fill(null),
    ...dates,
    ...Array(endPadding).fill(null),
  ]

  // 月区切りでグループ化
  const weeks: (CalendarDate | null)[][] = []
  let currentWeek: (CalendarDate | null)[] = []
  let currentMonth: number | null = null
  
  for (let i = 0; i < paddedDates.length; i++) {
    const date = paddedDates[i]
    
    // 日付が存在する場合
    if (date) {
      // 最初の月を設定
      if (currentMonth === null) {
        currentMonth = date.month
      }
      
      // 月が変わった場合（ただし最初の日付は除く）
      if (date.month !== currentMonth && currentWeek.length > 0) {
        // 現在の週の残りを null で埋める
        while (currentWeek.length < DAYS_IN_WEEK) {
          currentWeek.push(null)
        }
        weeks.push([...currentWeek])
        currentWeek = []
        
        // 新しい月の最初の週の前にパディングを追加
        const monthFirstDayOfWeek = date.weekday
        const monthStartPadding = monthFirstDayOfWeek === 0 ? 6 : monthFirstDayOfWeek - 1
        
        for (let j = 0; j < monthStartPadding; j++) {
          currentWeek.push(null)
        }
        
        // 現在の月を更新
        currentMonth = date.month
      }
    }
    
    currentWeek.push(date)
    
    // 週の終わりか最後の要素に達した場合
    if (currentWeek.length === DAYS_IN_WEEK || i === paddedDates.length - 1) {
      // 不完全な最後の週を null で埋める
      while (currentWeek.length < DAYS_IN_WEEK) {
        currentWeek.push(null)
      }
      
      // 空行かどうかチェック（すべての要素がnullの場合は空行）
      const hasNonNullValue = currentWeek.some(item => item !== null)
      if (hasNonNullValue) {
        weeks.push([...currentWeek])
      }
      
      currentWeek = []
    }
  }
  
  return weeks
}

// 指定された期間の全日付を生成
export function generateDates(start: YearMonth, end: YearMonth): CalendarDate[] {
  const dates: CalendarDate[] = []

  // Start and end dates (months are 0-indexed in JavaScript)
  const startDate = new Date(start.year, start.month - 1, 1)
  const endDate = new Date(end.year, end.month, 0) // Last day of end month

  // Current date pointer
  const currentDate = new Date(startDate)

  // Loop through each day in the range
  while (currentDate <= endDate) {
    dates.push(createCalendarDateFromDate(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}
