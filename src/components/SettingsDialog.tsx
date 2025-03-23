import { clsx } from "clsx"
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

  const buttonClasses = clsx(
    "p-1.5 rounded-md flex items-center justify-center w-9 h-9",
    "bg-[#fffcf8] border border-stone-200 text-stone-600",
    "hover:bg-[#fff9f0] hover:border-stone-300",
    "transition-colors duration-200",
    "shadow-sm"
  )

  return (
    <>
      <button type="button" onClick={openSettings} className={buttonClasses} aria-label="設定">
        <SettingsIcon className="w-5 h-5" />
      </button>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="p-0 rounded-md shadow-xl border border-gray-200 fixed m-auto inset-0 backdrop:bg-black/50"
      >
        <SettingsForm settings={settings} onSave={handleSaveSettings} onCancel={closeSettings} />
      </dialog>
    </>
  )
}
