import type { YearMonth } from "../domain/YearMonth"

export type MonthLayoutMode = "monthly" | "continuous"
export type PeriodSplitMode = "split" | "single"

export interface Settings {
  // 1期目の開始年月設定
  firstPeriodStart: YearMonth
  // 月のレイアウトモード（月区切り/連続表示）
  monthLayoutMode: MonthLayoutMode
  // 前期・後期の分割表示モード（2つに分ける/1つにまとめる）
  periodSplitMode: PeriodSplitMode
}

export type SettingsContextType = {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

// デフォルト設定
export const defaultSettings: Settings = {
  firstPeriodStart: { year: 2001, month: 1 },
  monthLayoutMode: "monthly",
  periodSplitMode: "split",
}
