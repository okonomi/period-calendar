import { useRef } from "react"
import { useSettings } from "../hooks/use-settings"
import type { Settings } from "../types/Settings"
import { SettingsForm } from "./SettingsForm"
import { SettingsIcon } from "./SettingsIcon"

export const SettingsDialog: React.FC = () => {
  const { settings, updateSettings } = useSettings()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openSettings = () => dialogRef.current?.showModal()
  const closeSettings = () => dialogRef.current?.close()

  const handleSaveSettings = (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth">) => {
    updateSettings(newSettings)
    closeSettings()
  }

  const handleDialogClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      closeSettings()
    }
  }

  return (
    <>
      <button type="button" onClick={openSettings} className="sc-box sc-button settings-button" aria-label="設定">
        <SettingsIcon className="h-5 w-5" />
      </button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <dialog ref={dialogRef} onClick={handleDialogClick} className="settings-dialog">
        <SettingsForm settings={settings} onSave={handleSaveSettings} onCancel={closeSettings} />
      </dialog>
    </>
  )
}
