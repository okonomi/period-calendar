import type { YearMonth } from "../domain/YearMonth"

export type DisplayMode = "monthly" | "continuous"
export type ViewMode = "split" | "single"

export interface Settings {
  // 1期目の開始年月設定
  firstPeriodStart: YearMonth
  // カレンダー表示モード
  displayMode: DisplayMode
  // カレンダー分割表示モード
  viewMode: ViewMode
}

export type SettingsContextType = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

// デフォルト設定
export const defaultSettings: Settings = {
  firstPeriodStart: { year: 2001, month: 1 },
  displayMode: "monthly",
  viewMode: "split",
}
