import { useEffect, useState } from "react"
import { SettingsContext } from "../contexts/SettingsContext"
import { type Settings, defaultSettings } from "../types/Settings"

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    // ローカルストレージから設定を読み込む
    const savedSettings = localStorage.getItem("calendarSettings")
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings
  })

  // 設定が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem("calendarSettings", JSON.stringify(settings))
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
