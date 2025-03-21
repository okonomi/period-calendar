import { useEffect, useRef, useState } from "react"
import { useSettings } from "../hooks/use-settings"
import type { Settings } from "../types/Settings"
import { SettingsForm } from "./SettingsForm"

// 設定フォームの表示制御コンポーネント（開閉状態管理）
export const SettingsDialog: React.FC = () => {
  const { settings, updateSettings } = useSettings()
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleSettings = () => setIsOpen(!isOpen)
  const closeSettings = () => setIsOpen(false)

  // ESCキー押下でフォームを閉じる
  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeSettings()
      }
    }

    window.addEventListener("keydown", handleEscKeyDown)
    return () => {
      window.removeEventListener("keydown", handleEscKeyDown)
    }
  }, [isOpen])

  // フォーム外クリックでフォームを閉じる
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        formRef.current &&
        buttonRef.current &&
        !formRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeSettings()
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen])

  const handleSaveSettings = (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth">) => {
    updateSettings(newSettings)
    closeSettings()
  }

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleSettings}
        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        ⚙️ 設定
      </button>

      {isOpen && (
        <SettingsForm settings={settings} onSave={handleSaveSettings} onCancel={closeSettings} formRef={formRef} />
      )}
    </div>
  )
}
