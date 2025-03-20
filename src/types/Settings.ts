export interface Settings {
  // カレンダーの表示設定
  displayMode: "normal" | "compact"
  // 休日の表示設定
  showHolidays: boolean
  // 週末の表示設定
  highlightWeekends: boolean
  // 1期目の開始年月設定
  firstPeriodStartYear: number
  firstPeriodStartMonth: number
}

export type SettingsContextType = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

// デフォルト設定
export const defaultSettings: Settings = {
  displayMode: "normal",
  showHolidays: true,
  highlightWeekends: true,
  firstPeriodStartYear: 1999,
  firstPeriodStartMonth: 8,
}
