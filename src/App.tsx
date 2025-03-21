import { useState } from "react"
import { Calendar } from "./components/Calendar"
import { PeriodSelector } from "./components/PeriodSelector"
import { SettingsForm } from "./components/SettingsForm"
import { useSettings } from "./hooks/use-settings"
import { HolidaysProvider } from "./providers/HolidaysProvider"
import { SettingsProvider } from "./providers/SettingsProvider"
import type { PeriodRange } from "./types/PeriodRange"
import { generateDates, getToday } from "./utils/dateUtils"
import { calculateInitialPeriod, getFirstHalfPeriodRange, getSecondHalfPeriodRange } from "./utils/periodUtils"

function generateDatesFromPeriodRange(periodRange: PeriodRange): Date[] {
  return generateDates(periodRange.startYear, periodRange.startMonth, periodRange.endYear, periodRange.endMonth)
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
        <div className="container mx-auto px-2 py-6">
          <div className="max-w-5xl mx-auto relative">
            <div className="absolute top-0 right-0 z-10">
              <SettingsForm />
            </div>

            <div className="pt-10 mb-4">
              <div className="mx-auto max-w-md">
                <PeriodSelector
                  period={selectedPeriod}
                  onPrevPeriod={handlePrevPeriod}
                  onNextPeriod={handleNextPeriod}
                />
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
