import { useEffect, useState } from "react"
import { SettingsContext } from "../contexts/SettingsContext"
import { type Settings, defaultSettings } from "../types/Settings"

const STORAGE_KEY = "calendarSettings"

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    // ローカルストレージから設定を読み込む
    const savedSettings = localStorage.getItem(STORAGE_KEY)
    if (!savedSettings) {
      return defaultSettings
    }

    // 古い形式のデータを変換する処理
    const parsedSettings = JSON.parse(savedSettings)

    // 古い形式 (YearMonth 統合前) のデータ変換
    if ("firstPeriodStartYear" in parsedSettings && "firstPeriodStartMonth" in parsedSettings) {
      return {
        firstPeriodStart: {
          year: parsedSettings.firstPeriodStartYear,
          month: parsedSettings.firstPeriodStartMonth,
        },
        monthLayoutMode: parsedSettings.displayMode || defaultSettings.monthLayoutMode,
        periodSplitMode: parsedSettings.viewMode || defaultSettings.periodSplitMode,
      }
    }

    // プロパティ名変更前のデータ変換（displayMode → monthLayoutMode, viewMode → periodSplitMode）
    if ("displayMode" in parsedSettings || "viewMode" in parsedSettings) {
      return {
        firstPeriodStart: parsedSettings.firstPeriodStart,
        monthLayoutMode: parsedSettings.displayMode || defaultSettings.monthLayoutMode,
        periodSplitMode: parsedSettings.viewMode || defaultSettings.periodSplitMode,
      }
    }

    return parsedSettings
  })

  // 設定が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  // 部分的な設定の更新をサポート
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }))
  }

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}
