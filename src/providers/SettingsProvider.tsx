import { useEffect, useState } from "react"
import { SettingsContext } from "../contexts/SettingsContext"
import { type Settings, defaultSettings } from "../types/Settings"

const STORAGE_KEY = "calendarSettings"

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const SETUP_TOAST_KEY = "setupToastDismissed"

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

  // 初回起動判定（setupToastDismissed が未設定なら初回）
  const [showSetupToast, setShowSetupToast] = useState<boolean>(() => {
    return localStorage.getItem(SETUP_TOAST_KEY) !== "true"
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

  // セットアップトーストを閉じる（表示済みフラグをセット）
  const dismissSetupToast = () => {
    setShowSetupToast(false)
    localStorage.setItem(SETUP_TOAST_KEY, "true")
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, showSetupToast, dismissSetupToast }}>
      {children}
    </SettingsContext.Provider>
  )
}
