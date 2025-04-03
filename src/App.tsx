import { useState } from "react"
import { Calendar } from "./components/Calendar"
import { PeriodSelector } from "./components/PeriodSelector"
import { SettingsDialog } from "./components/SettingsDialog"
import { type CalendarDate, getToday } from "./domain/CalendarDate"
import { generateDates } from "./domain/Dates"
import type { PeriodRange } from "./domain/Period"
import { calculateInitialPeriod, getFirstHalfPeriodRange, getSecondHalfPeriodRange } from "./domain/Period"
import { useSettings } from "./hooks/use-settings"
import { HolidaysProvider } from "./providers/HolidaysProvider"
import { SettingsProvider } from "./providers/SettingsProvider"

function generateDatesFromPeriodRange(periodRange: PeriodRange): CalendarDate[] {
  return generateDates(periodRange.start, periodRange.end)
}

// アプリケーションのメインコンテンツ
const AppContent: React.FC = () => {
  const { settings } = useSettings()
  const firstPeriodYearMonth = settings.firstPeriodStart
  const [selectedPeriod, setSelectedPeriod] = useState(() => calculateInitialPeriod(getToday(), firstPeriodYearMonth))

  const firstHalfDates = generateDatesFromPeriodRange(getFirstHalfPeriodRange(selectedPeriod, firstPeriodYearMonth))
  const secondHalfDates = generateDatesFromPeriodRange(getSecondHalfPeriodRange(selectedPeriod, firstPeriodYearMonth))

  // 両方の期間を合わせた日付配列（ひとまとめ表示用）
  const allDates = [...firstHalfDates, ...secondHalfDates]

  const handlePrevPeriod = () => setSelectedPeriod(selectedPeriod - 1)
  const handleNextPeriod = () => setSelectedPeriod(selectedPeriod + 1)

  return (
    <HolidaysProvider period={selectedPeriod}>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto p-2">
          <div className="relative mx-auto max-w-5xl">
            <div className="flex justify-center">
              <div className="flex w-full max-w-2xl items-center justify-between">
                <div className="w-12" />
                <div className="grow">
                  <PeriodSelector
                    period={selectedPeriod}
                    onPrevPeriod={handlePrevPeriod}
                    onNextPeriod={handleNextPeriod}
                  />
                </div>
                <div className="flex w-12 justify-end">
                  <SettingsDialog />
                </div>
              </div>
            </div>

            {settings.viewMode === "split" ? (
              // 分割表示モード（前期・後期を別々に表示）
              <div className="mt-4 flex place-content-center gap-8">
                <div className="w-[338px]">
                  <Calendar dates={firstHalfDates} displayMode={settings.displayMode} />
                </div>
                <div className="w-[338px]">
                  <Calendar dates={secondHalfDates} displayMode={settings.displayMode} />
                </div>
              </div>
            ) : (
              // ひとまとめ表示モード（前期・後期を連続して表示）
              <div className="mt-4 flex place-content-center">
                <div className="w-[338px]">
                  <Calendar dates={allDates} displayMode={settings.displayMode} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HolidaysProvider>
  )
}

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  )
}
