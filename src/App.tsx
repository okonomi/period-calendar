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
  const [selectedPeriod, setSelectedPeriod] = useState(() => calculateInitialPeriod(getToday(), settings))

  const firstHalfDates = generateDatesFromPeriodRange(getFirstHalfPeriodRange(selectedPeriod, settings))
  const secondHalfDates = generateDatesFromPeriodRange(getSecondHalfPeriodRange(selectedPeriod, settings))

  const handlePrevPeriod = () => setSelectedPeriod(selectedPeriod - 1)
  const handleNextPeriod = () => setSelectedPeriod(selectedPeriod + 1)

  return (
    <HolidaysProvider period={selectedPeriod}>
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto p-2">
          <div className="max-w-5xl mx-auto relative">
            <div className="flex justify-center">
              <div className="w-full max-w-2xl flex items-center justify-between">
                <div className="w-12" />
                <div className="grow">
                  <PeriodSelector
                    period={selectedPeriod}
                    onPrevPeriod={handlePrevPeriod}
                    onNextPeriod={handleNextPeriod}
                  />
                </div>
                <div className="w-12 flex justify-end">
                  <SettingsDialog />
                </div>
              </div>
            </div>
            <div className="flex gap-8 justify-center mt-4">
              <div className="shrink">
                <Calendar dates={firstHalfDates} />
              </div>
              <div className="shrink">
                <Calendar dates={secondHalfDates} />
              </div>
            </div>
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
