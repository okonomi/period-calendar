import { useState } from "react"
import type { Settings } from "../types/Settings"

// 設定フォームの本体コンポーネント（入力と検証処理）
type SettingsFormProps = {
  settings: Settings
  onSave: (newSettings: Pick<Settings, "firstPeriodStartYear" | "firstPeriodStartMonth">) => void
  onCancel: () => void
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ settings, onSave, onCancel }) => {
  const [year, setYear] = useState(settings.firstPeriodStartYear.toString())
  const [month, setMonth] = useState(settings.firstPeriodStartMonth.toString())

  const handleSave = () => {
    const yearValue = Number.parseInt(year, 10)
    const monthValue = Number.parseInt(month, 10)

    if (Number.isNaN(yearValue) || yearValue < 1900 || yearValue > 2100) {
      alert("年の値が不正です。1900〜2100の間で設定してください。")
      return
    }

    if (Number.isNaN(monthValue) || monthValue < 1 || monthValue > 12) {
      alert("月の値が不正です。1〜12の間で設定してください。")
      return
    }

    onSave({
      firstPeriodStartYear: yearValue,
      firstPeriodStartMonth: monthValue,
    })
  }

  return (
    <div className="settings-form">
      <h3 className="settings-form-title">カレンダー設定</h3>

      <div className="settings-form-section">
        <h4 className="settings-form-subtitle">1期目の開始年月</h4>
        <div className="settings-form-field-group">
          <div>
            <label htmlFor="firstPeriodYear" className="settings-form-label">
              年
            </label>
            <input
              type="number"
              id="firstPeriodYear"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="1900"
              max="2100"
              className="settings-form-input settings-form-input-year"
            />
          </div>
          <div>
            <label htmlFor="firstPeriodMonth" className="settings-form-label">
              月
            </label>
            <input
              type="number"
              id="firstPeriodMonth"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min="1"
              max="12"
              className="settings-form-input settings-form-input-month"
            />
          </div>
        </div>
        <p className="settings-form-help">例：1期が1999年8月から始まる場合、1999と8を設定</p>
      </div>

      <div className="settings-form-actions">
        <button type="button" onClick={onCancel} className="settings-form-button settings-form-button-cancel">
          キャンセル
        </button>
        <button type="button" onClick={handleSave} className="settings-form-button settings-form-button-save">
          保存
        </button>
      </div>
    </div>
  )
}
