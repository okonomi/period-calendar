export interface Settings {
  // カレンダーの表示設定
  displayMode: "normal" | "compact"
  // 休日の表示設定
  showHolidays: boolean
  // 週末の表示設定
  highlightWeekends: boolean
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
}
