import { useState } from "react"
import { Calendar } from "./components/Calendar"
import { PeriodSelector } from "./components/PeriodSelector"
import { HolidaysProvider } from "./providers/HolidaysProvider"
import { SettingsProvider } from "./providers/SettingsProvider"
import type { PeriodRange } from "./types/PeriodRange"
import { generateDates, getToday } from "./utils/dateUtils"
import { calculateInitialPeriod, getFirstHalfPeriodRange, getSecondHalfPeriodRange } from "./utils/periodUtils"

function generateDatesFromPeriodRange(periodRange: PeriodRange): Date[] {
  return generateDates(periodRange.startYear, periodRange.startMonth, periodRange.endYear, periodRange.endMonth)
}

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(calculateInitialPeriod(getToday()))

  const firstHalfDates = generateDatesFromPeriodRange(getFirstHalfPeriodRange(selectedPeriod))
  const secondHalfDates = generateDatesFromPeriodRange(getSecondHalfPeriodRange(selectedPeriod))

  const handlePrevPeriod = () => setSelectedPeriod(selectedPeriod - 1)
  const handleNextPeriod = () => setSelectedPeriod(selectedPeriod + 1)

  return (
    <SettingsProvider>
      <HolidaysProvider period={selectedPeriod}>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-2 py-6">
            <div className="max-w-5xl mx-auto">
              <PeriodSelector period={selectedPeriod} onPrevPeriod={handlePrevPeriod} onNextPeriod={handleNextPeriod} />
              <div className="flex gap-8 justify-center">
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
    </SettingsProvider>
  )
}
