import { createContext } from "react"
import { type SettingsContextType, defaultSettings } from "../types/Settings"

// デフォルト値でコンテキストを作成
export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
})
