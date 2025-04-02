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

  const handleSaveSettings = (newSettings: Pick<Settings, "firstPeriodStart" | "displayMode">) => {
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
      <button
        type="button"
        onClick={openSettings}
        className="sc-box sc-button text-calendar-text flex size-9 cursor-pointer items-center justify-center p-1.5 transition-all hover:scale-105 hover:shadow"
        aria-label="設定"
      >
        <SettingsIcon className="h-5 w-5" />
      </button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="fixed inset-0 m-auto rounded-md border border-gray-200 p-0 backdrop:bg-black/50"
      >
        <div className="w-96 bg-white p-6">
          <SettingsForm settings={settings} onSave={handleSaveSettings} onCancel={closeSettings} />
        </div>
      </dialog>
    </>
  )
}
