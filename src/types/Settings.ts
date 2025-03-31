export interface Settings {
  // 1期目の開始年月設定
  firstPeriodStartYear: number
  firstPeriodStartMonth: number
  // カレンダー表示モード
  displayMode: "monthly" | "continuous"
}

export type SettingsContextType = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

// デフォルト設定
export const defaultSettings: Settings = {
  firstPeriodStartYear: 1999,
  firstPeriodStartMonth: 8,
  displayMode: "monthly",
}
