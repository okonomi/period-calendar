import { useState } from "react"
import { Calendar } from "./components/Calendar"
import { PeriodSelector } from "./components/PeriodSelector"
import { generateDates } from "./utils/dateUtils"

// メインアプリケーションコンポーネント
export const App: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(26)

  // selectedPeriod から currentYear を計算
  // 例: 26期 (2024年8月〜2025年7月) → 2024年
  const currentYear = 1998 + selectedPeriod

  // 前半6か月（8月から1月）のデータ
  const firstHalfDates = generateDates(currentYear, 8, currentYear + 1, 1)
  // 後半6か月（2月から7月）のデータ
  const secondHalfDates = generateDates(currentYear + 1, 2, currentYear + 1, 7)

  const handlePrevPeriod = () => setSelectedPeriod(selectedPeriod - 1)
  const handleNextPeriod = () => setSelectedPeriod(selectedPeriod + 1)

  return (
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
  )
}
