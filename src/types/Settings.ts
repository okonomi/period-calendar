export type DisplayMode = "monthly" | "continuous"

export interface Settings {
  // 1期目の開始年月設定
  firstPeriodStartYear: number
  firstPeriodStartMonth: number
  // カレンダー表示モード
  displayMode: DisplayMode
}

export type SettingsContextType = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

// デフォルト設定
export const defaultSettings: Settings = {
  firstPeriodStartYear: 2001,
  firstPeriodStartMonth: 1,
  displayMode: "monthly",
}
